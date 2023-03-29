import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    Typography,
    FormControl,
    FormLabel,
    Chip,
    Divider,
    Avatar,
    InputAdornment,
    ListSubheader,
    Tooltip,
    Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import IconButton from '@mui/material/IconButton';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

import { projectInitiaonMock } from '../../../constant/mock';
import { multiStepContext } from '../../../store/StepContext';
import AddClientDialog from '../../../components/AddClientDialog';
import CountryData from '../../../constant/countryData';
import { useAxiosGetAPI } from '../../../utils/helper/step1Hook';
import { configuration, tokenStr } from '../../../configs/configuration';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '33px',
    height: '35px',
};
const ClientInformation = (props) => {
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();

    const { userData, setUserData } = useContext(multiStepContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isToolpitOpen, setIsToolpitOpen] = useState(false);

    const handleChange = (event, key) => {
        const {
            target: { value },
        } = event;

        console.log('bbbbbbbbbbb : ', value)
        setUserData((prevState) => {
            return ({
                ...prevState,
                [key]: value,
            });
        });
    };

    const handleDelete = (e, val) => {
        const filteredArray = userData.client.filter(e => e !== val)
        setUserData({
            ...userData,
            'client': filteredArray
        });

    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const { stepData: getClientListData, apiResponseError: getClientListDataError } = useAxiosGetAPI(
        `${configuration.resourceUrl}/client`,
        { headers: { "Authorization": tokenStr } }
    );

    /*useEffect(() => {
        try {
            if (!userData.country.countryName) {
                const countryStates = CountryData.find((country) => {
                    if (country.regions.length !== 0 && country.countryName === userData.country.countryName) {

                        return country.regions;
                    }
                })
                setSetStateData(countryStates.regions);
            }
        } catch (e) {
            return [];
        }
    }, [userData.country.countryName]);*/

    // const { stepData: getClientDetails, apiResponseError: getClientDetailsError } = useAxiosGetAPI(
    //     `${baseURL}/get-company-from-client?id[]=${userData.client[0]?.id}`,
    //     { headers: { "Authorization": tokenStr } }
    // );

    useEffect(() => {
        try {
            if (userData.client[0]?.id) {
                axios
                    .get(`${configuration.resourceUrl}/get-company-from-client?id[]=${userData.client[0]?.id}`, { headers: { "Authorization": tokenStr } })
                    .then((response) => {
                        setUserData({
                            ...userData,
                            'company': response.data.data.company_name,
                            'country': CountryData.filter((itm) => itm.countryName === response.data.data.company_name[0]?.country),
                            'address': response.data.data.company_name[0]?.company_address,
                            'state': CountryData.filter((itm, i) => itm.regions[i].name === response.data.data.company_name[0]?.state),
                        })
                    })
            }
        } catch (error) {
            console.log('erro-----------> : ', error);
        }
    }, [userData.client[0]?.id]);

    // useEffect(() => {
    //     try {
    //         if (userData.client[0]?.id !== null) {
    //             // getClientDetailsFun(userData.client[0]?.id);
    //             // setUserData({
    //             //     ...userData,
    //             //     ['country']:
    //             // })
    //         }
    //     } catch (e) {
    //         return [];
    //     }
    // }, []);


    const displayedOptions = useMemo(
        () => getClientListData?.length && getClientListData.filter((option) => {
            return containsText(option.name, searchText)
        })
    );

    const handleTooltipClose = () => {
        setIsToolpitOpen(false);
    };

    const handleTooltipOpen = () => {
        setIsToolpitOpen(true);
    };

    console.log('sfssss : ', userData)
    console.log('userData : ', userData.state)

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <span style={{ fontWeight: 'bold' }} id="search-select-label">Client *</span>
                        <Select
                            labelId="search-select-label"
                            id="search-select"
                            multiple
                            value={userData.client}
                            onChange={(event) => handleChange(event, 'client')}
                            onClose={() => setSearchText("")}
                            placeholder="Type to search..."
                            // input={<OutlinedInput label="Client" />}
                            MenuProps={MenuProps}
                            IconComponent={() => userData.client.length > 2 ? (
                                <Tooltip    
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    sx={{ borderColor: 'none' }}
                                    style={{ borderColor: 'none' }}
                                    onClose={handleTooltipClose}
                                    open={isToolpitOpen}
                                    // disableHoverListener
                                    // disableTouchListener
                                    title={
                                        <div style={{ borderColor: 'none' }}>
                                            <Box
                                                sx={{
                                                    border: 'none',
                                                    display: 'flex',
                                                    margin: -2,
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: '300px',
                                                        maxHeight: '800px',
                                                    },
                                                }}
                                            >
                                                <Paper elevation={3} style={{
                                                    maxHeight: userData.client.length > 5 ? 250 : 400,
                                                    overflow: userData.client.length > 5 ? 'auto' : ''
                                                }}
                                                >
                                                    {userData.client.slice(2).map((itm) => {
                                                        return (
                                                            <Chip
                                                                avatar={<Avatar
                                                                    src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
                                                                    sx={{ mr: 1, width: 30, height: 30, bgcolor: deepOrange[400] }}
                                                                >{itm.name}</Avatar>}
                                                                key={itm.name}
                                                                variant="outlined"
                                                                clickable
                                                                onDelete={(e) => handleDelete(e, itm)}
                                                                deleteIcon={
                                                                    <CancelIcon
                                                                        onMouseDown={(event) => event.stopPropagation()}
                                                                    />
                                                                }
                                                                onClick={(e) => handleDelete()}
                                                                sx={{ border: 'none', margin: 1 }}
                                                                label={<div>
                                                                    <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                                                                    <Typography variant='caption'>{itm.emails}</Typography>
                                                                </div>}
                                                            />)
                                                    })}
                                                </Paper>
                                            </Box>
                                        </div>
                                    }
                                >
                                    <IconButton
                                        onClick={handleTooltipOpen}
                                        sx={{ ...commonStyles, color: 'blue' }}
                                        size="small" variant="outlined">
                                        <span style={{ fontSize: '15px' }}>{`+${userData.client.slice(2).length}`}</span>
                                    </IconButton>
                                </Tooltip>
                            ) : ''
                            }
                            displayEmpty
                            renderValue={(selected) => selected?.length ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {
                                        selected.slice(0, 2).map((item) => (
                                            <Chip
                                                avatar={<Avatar
                                                    src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
                                                    sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                                >{item.name}</Avatar>}
                                                key={item.name}
                                                variant="outlined"
                                                clickable
                                                onDelete={(e) => handleDelete(e, item)}
                                                deleteIcon={
                                                    <CancelIcon
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                    />
                                                }
                                                onClick={(e) => handleDelete()}
                                                sx={{ border: 'none' }}
                                                label={<div>
                                                    <Typography sx={{ mb: -1 }}>{item.name}</Typography>
                                                    <Typography variant='caption'>{item.emails}</Typography>
                                                </div>}
                                            />
                                        ))
                                    }

                                </Box>
                            ) : <Typography color={'GrayText'}>Select Client Name</Typography>}
                        >
                            <ListSubheader>
                                <TextField
                                    size="small"
                                    autoFocus
                                    placeholder="Type to search..."
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key !== "Escape") {
                                            e.stopPropagation();
                                        }
                                    }}
                                />
                            </ListSubheader>
                            {displayedOptions?.length > 0 ? displayedOptions.map((option, i) => (
                                <MenuItem
                                    key={i}
                                    value={option}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>}
                                >
                                    <Avatar
                                        src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
                                        sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}
                                    >N</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{option.name}</Typography>
                                        <Typography variant='caption'>{option.emails}</Typography>
                                    </div>
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '48%' }} required>
                        <span style={{ fontWeight: 'bold', marginLeft: 5 }} id="full-width-text-field">Company *</span>
                        <TextField
                            required
                            id="full-width-text-field"
                            // label="Company"
                            placeholder="Company Name"
                            value={userData.company[0]?.company_name}
                            onChange={(event) => handleChange(event, 'company')}
                            margin="normal"
                            fullWidth
                        />
                    </FormControl>
                    <Button
                        sx={{ m: 1, mt: 3, mb: 3 }}
                        variant="outlined"
                        startIcon={<PersonAddAltIcon />}
                        onClick={handleClickOpen}
                    >
                        Add New Client
                    </Button>
                </Box>

                <Divider sx={{ mb: 4 }} variant="middle" />

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '48%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, width: '48%' }}>
                        <span style={{ fontWeight: 'bold' }} id="search-select-label">Country *</span>
                        {/* <InputLabel id="demo-multiple-country-label">Country </InputLabel> */}
                        <Select
                            labelId="demo-multiple-country-label"
                            id="demo-multiple-country-name"
                            multiple
                            value={userData.country}
                            onChange={(event) => handleChange(event, 'country')}
                            // input={<OutlinedInput label="Country" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected.length !== 0 ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip
                                        avatar={
                                            <Avatar
                                                sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                                src={`https://flagcdn.com/${(selected[0].countryShortCode)?.toLowerCase()}.svg`}
                                            />}
                                        key={selected[0].countryName}
                                        variant="outlined"
                                        sx={{ border: 'none' }}
                                        label={<div>
                                            <Typography>{selected[0].countryName}</Typography>
                                        </div>}
                                    />
                                </Box>

                            ) : <Typography color={'GrayText'}>Select Country</Typography>}
                        >
                            {CountryData?.length ? CountryData.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm}

                                >
                                    <Avatar
                                        sx={{ mr: 1, width: 35, height: 35 }}
                                        src={`https://flagcdn.com/${(itm.countryShortCode).toLowerCase()}.svg`}
                                    />
                                    <Typography>{itm.countryName}</Typography>
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <span style={{ fontWeight: 'bold' }} id="search-state-label">State *</span>
                        {/* <InputLabel id="demo-multiple-name-label">State</InputLabel> */}
                        <Select
                            labelId="search-state-label"
                            id="search-state"
                            multiple
                            required
                            value={userData.state}
                            onChange={(event) => handleChange(event, 'state')}
                            // input={<OutlinedInput label="State" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={userData.state !== "" ? undefined : () =>
                                <Typography color={'GrayText'}>Select State</Typography>}
                        >
                            {
                                userData.country[0]?.regions?.length ?
                                    userData.country[0].regions.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item}
                                        >
                                            {item.name}
                                        </MenuItem>

                                    )) :
                                    <MenuItem disabled>
                                        No data available
                                    </MenuItem>
                            }

                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <FormLabel sx={{ fontWeight: 'bold', color: 'black' }}>Address</FormLabel>
                        <Textarea
                            placeholder="Address"
                            minRows={2}
                            value={userData.address}
                            onChange={(event) => handleChange(event, 'address')}
                        />
                    </FormControl>
                </Box>
                {openDialog && (
                    <AddClientDialog
                        openDialog={openDialog}
                        handleClose={handleCloseDialog}
                    />
                )}
            </Box>
        </>
    );
}

export default ClientInformation;
