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
    DialogActions,
    Avatar
} from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
// import { Formik, Form } from 'formik';
import schema from './schema';

const BootstrapDialogTitle = (props) => {
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        display: 'none',
    },
    avatar: {
        width: theme.spacing(100),
        height: theme.spacing(100),
    },
}));

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
        email: "",
        touched: {
            firstName: false,
            lastName: false,
            designation: false,
            email: false,
        }
    });

    const classes = useStyles();
    const [avatar, setAvatar] = useState('');

    const handleAvatarChange = (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
    };

    const {
        openDialog,
        handleClose,
    } = props;

    const handleChange = (event, key) => {
        console.log(event, key);
        const {
            target: { value },
        } = event;
        setDialogData({
            ...dialogData,
            [key]: value
        });
    };

    const hasErrors = () => {
        try {
            schema.validateSync(dialogData);
        } catch (err) {
            return true;
        }
        return false;
    };

    const getError = (field) => {
        const { touched } = dialogData;
        if (touched[field] && hasErrors()) {
            try {
                schema.validateSyncAt(field, dialogData);
                return false;
            } catch (err) {
                return err.message;
            }
        }
    };

    const isTouched = (field) => {
        const { touched } = dialogData;
        setDialogData({
            ...dialogData,
            touched: {
                ...touched,
                [field]: true,
            },
        });
    };
    const handleSubmit = () => {
        const {
            firstName = "",
            middleName = "",
            lastName = "",
            designation = "",
            email = ""
        } = dialogData;
        const data = {
            name: `${firstName} ${middleName} ${lastName}`,
            email: email,
            designation: designation
        };
        const baseURL = "https://test.resource-api.writso.com/v1/client";
        let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk3NDk4ODcsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTc0OTg4NywiZXhwIjoxNjc5NzUzNDg3LCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.DpVXXz9PmrgQTdJbDonthbcjLKJ0lh5UBz934UwdWZtqEnZDM3FdXGbxrT6cTdAmgbi4ZLEYhpM0171ps7UbKX5pNqpQv0_1E04vMslyOBry1SM04iG9LXL-9l1uViYXNWmxIcSqxToKV2_QMRaTHoAJlS9fHPd6tDQKkidWYPLaRkniAm9ozWXauF51V6d941Jzv3D1R3Jv4nt24KtjlH5I1lu5UK4V2ySqwe4fLTH6GnFCedBCoAaI1PvQTH3uywdZBC4JdLlYzs6Xn1BvftBLuB1Y7e4bo0SWLfuDghEEsQw5gJBTyOJVBlI1ySxjn4B4oew9rlK4c2OV9pe8yQ"
        axios.post(baseURL, data, {
            headers: { "Authorization": tokenStr },

        }).then((response) => {
            console.log('create client response : ', response);
            handleClose();
        });
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    New Client Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        <Avatar
                            sx={{ border: '0.1px solid lightgray', margin: 2, bgcolor: 'white', width: '125px', height: '125px', }}
                            // className={classes.avatar}
                            alt="My Avatar"
                            src={avatar}

                        >
                            <label htmlFor="avatar-upload">
                                <IconButton
                                    sx={{
                                        marginRight: 5,
                                        marginTop: 3
                                    }}
                                    color="primary" aria-label="upload picture" component="span">
                                    <PhotoCameraIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </label>
                        </Avatar>
                    </div>
                    <TextField
                        required
                        margin="normal"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        helperText={getError('firstName')}
                        error={!!getError('firstName')}
                        onChange={(event) => handleChange(event, 'firstName')}
                        onBlur={() => isTouched('firstName')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="middleName"
                        name="middleName"
                        label="Middle Name"
                        type="text"
                        onChange={(event) => handleChange(event, 'middleName')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        type="text"
                        helperText={getError('lastName')}
                        error={!!getError('lastName')}
                        onChange={(event) => handleChange(event, 'lastName')}
                        onBlur={() => isTouched('lastName')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="designation"
                        label="Designation"
                        name="designation"
                        type="text"
                        helperText={getError('designation')}
                        error={!!getError('designation')}
                        onChange={(event) => handleChange(event, 'designation')}
                        onBlur={() => isTouched('designation')}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="normal"
                        id="email"
                        defaultValue=""
                        label="Email"
                        name="email"
                        type="email"
                        helperText={getError('email')}
                        error={!!getError('email')}
                        onChange={(event) => handleChange(event, 'email')}
                        onBlur={() => isTouched('email')}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" disabled={hasErrors()} onClick={() => handleSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddClientDialog;
