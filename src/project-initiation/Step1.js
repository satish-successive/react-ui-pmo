import React, { useState, useContext, useEffect } from 'react';
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
    FormHelperText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
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

function getStyles(name, personName, theme) {
    // console.log('name : ', name)
    return {
        fontWeight: theme.typography.fontWeightMedium,
    };
}
//personName.indexOf(name) === -1
// ? theme.typography.fontWeightRegular
// : theme.typography.fontWeightMedium,


const Step1 = (props) => {
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();

    const { userData, setUserData } = useContext(multiStepContext);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [getClientListData, setGetClientListData] = useState([]);
    const [hasError, setHasError] = useState(false);

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
    let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk2MzM5ODUsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTYzMzk4NSwiZXhwIjoxNjc5NjM3NTg1LCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.eIowTcmxwo9zqZX5N9H0eMijmsdtvyhCWczLCWH3_zgkBu-mATAU5AFs5p5WSt5oXE8QKiZlMybiJd81DY9qNDU7DJEGIBkW9JqmixUnIsWEPboS1bUcmjdaKESF2xS5CwE6iz7XvnMac-lxw3J4fY3VxlQSRU8CZY5OpsTCbhiEqAiQmnELKWW9KrH0V9Or75PXNJBnG4b5AIMbSTaC9iL0l0CWFVzpE_6MpPAdyAMCYaW-NADaK_6YKtPBHubF01YG781PSDxb9bRXS9ze0Pz3Sa5o59tSWfyP4Tnr2KmgLl-9tdQKZdhyy6lJhKV6-MlKjTAdVpzM_u6z9mKzuA";

    useEffect(() => {
        axios.get(baseURL, { headers: { "Authorization": tokenStr } }).then((response) => {
            setGetClientListData(response?.data?.data);
            // setUserData({ ['client']: response?.data?.data})
        });
    }, []);
    console.log('Dayta->>>', getClientListData);

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
                        <InputLabel id="demo-multiple-name-label">Client</InputLabel>
                        <Select
                            required
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            helperText="fff"
                            value={userData.client}
                            onChange={(event) => handleChange(event, 'client')}
                            input={<OutlinedInput label="Client" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected?.length && selected.map((item) => (
                                        <Chip
                                            avatar={<Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>}
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
                            {getClientListData?.length && getClientListData.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>}
                                    style={getStyles(itm.name, getClientListData, theme)}
                                >
                                    <Avatar sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                                        <Typography variant='caption'>{itm.emails}</Typography>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                        {hasError && (
                            <FormHelperText>This field is required</FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        required
                        err or
                        id="full-width-text-field"
                        label="Company"
                        placeholder="Company Name"
                        value={userData.company}
                        onChange={(event) => handleChange(event, 'company')}
                        margin="normal"
                        fullWidth
                        helperText="ddd"
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
                        <InputLabel id="demo-multiple-name-label">Country </InputLabel>
                        <Select
                            required
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            value={userData.country}
                            onChange={(event) => handleChange(event, 'country')}
                            input={<OutlinedInput label="Country" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip
                                        avatar={<Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}><IconFlagIN /></Avatar>}
                                        key={selected}
                                        variant="outlined"
                                        sx={{ border: 'none' }}
                                        label={<div>
                                            <Typography>{selected}</Typography>
                                        </div>}
                                    />
                                </Box>
                            )}
                        >
                            {phaseData.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
                                // style={getStyles(itm.name, userData, theme)}

                                >
                                    <Avatar sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}><IconFlagIN /></Avatar>
                                    <Typography>{itm.name}</Typography>
                                    {/* <IconFlagIN  /> */}
                                </MenuItem>
                            ))}
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
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, userData, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
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
