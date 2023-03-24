import React, { useState } from "react";
import PropTypes from 'prop-types';

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
    DialogActions
} from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const AddClientDialog = (props) => {

    const [dialogData, setDialogData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        designation: "",
        email: ""
    });

    const {
        openDialog,
        handleClose,
    } = props;

    const handleChange = (event, key) => {
        console.log(event, key);
        const {
            target: { value },
        } = event;
        setDialogData((prevState) => {
            return ({
                ...prevState,
                [key]: value,
            });
        });
    };

    const handleSubmit = (inputData) => {
        console.log('inside handleSubmit inputData : ', inputData);
        const {
            firstName = "",
            middleName = "",
            lastName = "",
            designation = "",
            email = ""
        } = inputData;
        const data = {
            name: `${firstName} ${middleName} ${lastName}`,
            email: email,
            designation: designation
        };
        const baseURL = "https://test.resource-api.writso.com/v1/client";
        let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk2NDA4OTIsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTY0MDg5MiwiZXhwIjoxNjc5NjQ0NDkyLCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.VW4GRLMItirytnmwtasAX8mDXiYu4R_RfteZ2LLqFx3Zpj40xrSoGYcAJN6tANEj5x4J63xPAgFVP65--vNtWemOfrmGeeWHfx2LZU7zcwBUDCMu6Ey2OiOmLpWxUKpDWCVRAn2uN1ApDvtgn-3YxJSCQvF4zkI5tVq9t-r_gmQyfMk15-9XPtOy87hD8bgfLeGVWzGThZYnePnYFQjFL5eElNFdyEygdvXNoZOe1eGY6lfXH7Ks_R0lB2RiY3aqchpD8JZTMe5bMxhgMCiSHu9-VsyshoVdvKy7gbNMrTD4Vt7DlHh6SIRqmur2jmf_sViAqKzNjy3yjCCfV3Wrzg";
        axios.post(baseURL, data, {
            headers: { "Authorization": tokenStr },

        }).then((response) => {
            console.log('create client response : ', response);
        });
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    New Client Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                <ImageListItem key={'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}>
                                    <img
                                        src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={'title'}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            </ImageList> */}
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        name="firstName"
                        label="First Name"
                        type="text"
                        onChange={(event) => handleChange(event, 'firstName')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        name="middleName"
                        label="Middle Name"
                        type="text"
                        onChange={(event) => handleChange(event, 'middleName')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        label="Last Name"
                        name="lastName"
                        type="text"
                        onChange={(event) => handleChange(event, 'lastName')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        label="Designation"
                        name="designation"
                        type="text"
                        onChange={(event) => handleChange(event, 'designation')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="name"
                        label="Email"
                        name="email"
                        type="email"
                        onChange={(event) => handleChange(event, 'email')}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={(e) => handleSubmit(dialogData)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddClientDialog;
