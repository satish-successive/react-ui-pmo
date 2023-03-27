import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    InputLabel,
    TextField,
    Select,
    OutlinedInput,
    MenuItem,
    Typography,
    FormControl,
    FormLabel,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Avatar,
    CardHeader,
    FormHelperText,
    InputAdornment,
    ListSubheader,
    Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import {
    IconFlagTR,
    IconFlagIN,
    IconFlagUS
} from 'material-ui-flags';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

import { projectInitiaonMock } from './mock';
import { multiStepContext } from '../StepContext';
import AddClientDialog from './AddClientDialog';
import CountryData from '../helper/countryData'
import useAxiosAPI from '../helper/step1Hook';
import ClientDialog from './dialog/ClientDialog';

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
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

function getStyles(name, personName, theme) {
    // console.log('name : ', name)
    return {
        fontWeight: theme.typography.fontWeightMedium,
    };
}
const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '33px',
    height: '35px',
};
const Step1 = (props) => {
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();

    const { userData, setUserData } = useContext(multiStepContext);
    const [openDialog, setOpenDialog] = useState(false);
    // const [getClientListData, setGetClientListData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [stateData, setSetStateData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isToolpitOpen, setIsToolpitOpen] = React.useState(false);

    const handleChange = (event, key) => {
        console.log(event, key);
        const {
            target: { value },
        } = event;
        setUserData((prevState) => {
            return ({
                ...prevState,
                [key]: value,
            });
        });
        // if (!value.length) {
        //     setHasError(true);
        // }
    };

    const handleDelete = (e, val) => {
        console.log('valvalval : ', e, val)
        const filteredArray = userData.client.filter(e => e !== val)
        setUserData({
            ...userData,
            ['client']: filteredArray
        });

    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const baseURL = "https://test.resource-api.writso.com/v1/client";
    let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk4MjgyNjAsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTgyODI2MCwiZXhwIjoxNjc5ODMxODYwLCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.SF_n1TEgOpHdjEqdPwek9TcPPd63SCx_LarQtbMMBaeB0A0iOr7SYs7V36w82m2nK8NzMO67N4pZwrSEFSsCo-d99oVWfuQpTbOqB28ISuv26ufM5WfKfrh0ICvWLyq74v5JeU83N_Hp7OfVyvB52WbfS0P2lhXydqR7Lw4INtvRZYsFVsgvko8wvTVebTqgmjo-3OvwEe6fk6BmCX4euGZqUwsQorNDYVocgH16WNw6NHb7u0Almims56vfm5EQ6jyBbIqYnvWT6QDd-QKHEUktC5njfuFM7L-zd26wQamy6Nfa1PgfsAlYZfrqK2373kuF7TNdP37RxTHl0cJ32w"

    const { getClientListData, getClientListDataError } = useAxiosAPI(
        baseURL,
        { headers: { "Authorization": tokenStr } }
    );
    /*useEffect(async () => {
        await axios.get(baseURL, { headers: { "Authorization": tokenStr } }).then((response) => {
            setGetClientListData(response?.data?.data);
        })
    }), [];*/

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

    const showToolpitOnClick = () => {
        return (
            <TextField></TextField>
        )
    }

    return (
        <>
            <Box sx={{ mt: 5 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '48%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="search-select-label">Client</InputLabel>
                        <Select
                            labelId="search-select-label"
                            id="search-select"
                            multiple
                            value={userData.client}
                            onChange={(event) => handleChange(event, 'client')}
                            onClose={() => setSearchText("")}
                            input={<OutlinedInput label="Client" />}
                            MenuProps={MenuProps}
                            IconComponent={() => userData.client.length > 0 ? (
                                <Tooltip
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={handleTooltipClose}
                                    open={isToolpitOpen}
                                    onOpen={showToolpitOnClick}
                                    // disableHoverListener
                                    // disableTouchListener
                                    title={showToolpitOnClick}
                                // describeChild={showToolpitOnClick}
                                >
                                    <IconButton
                                        onClick={handleTooltipOpen}
                                        sx={{ ...commonStyles, color: 'blue' }}
                                        size="small" variant="outlined">
                                        <PlusOneIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            ) : ''
                            }
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected?.length && selected.map((item) => (
                                        <Chip
                                            avatar={<Avatar
                                                src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
                                                sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                            >N</Avatar>}
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
                                    ))}
                                </Box>
                            )}
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
                                    style={getStyles(option.name, phaseData, theme)}
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
                    <TextField
                        required
                        id="full-width-text-field"
                        label="Company"
                        placeholder="Company Name"
                        value={userData.company}
                        onChange={(event) => handleChange(event, 'company')}
                        margin="normal"
                        fullWidth
                    />
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
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="demo-multiple-country-label">Country </InputLabel>
                        <Select
                            required
                            labelId="demo-multiple-country-label"
                            id="demo-multiple-country-name"
                            // multiple
                            value={userData.country}
                            onChange={(event) => handleChange(event, 'country')}
                            input={<OutlinedInput label="Country" />}
                            MenuProps={MenuProps}
                            renderValue={(item, i) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip
                                        avatar={
                                            <Avatar
                                                sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                                src={`https://flagcdn.com/${(item.countryShortCode).toLowerCase()}.svg`}
                                            />}
                                        key={i}
                                        variant="outlined"
                                        sx={{ border: 'none' }}
                                        label={<div>
                                            <Typography>{item.countryName}</Typography>
                                        </div>}
                                    />
                                </Box>
                            )}
                        >
                            {CountryData?.length ? CountryData.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm}
                                // style={getStyles(itm.name, userData, theme)}

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
                        <InputLabel id="demo-multiple-name-label">State</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            required
                            value={userData.state}
                            onChange={(event) => handleChange(event, 'state')}
                            input={<OutlinedInput label="State" />}
                            MenuProps={MenuProps}
                        >
                            {
                                userData.country?.regions?.length ?
                                    userData.country.regions.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            value={item}
                                            style={getStyles(item.name, userData, theme)}
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
                        <FormLabel>Address</FormLabel>
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

export default Step1;
