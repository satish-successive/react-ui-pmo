import React, { useState } from "react";
import PropTypes from 'prop-types';

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
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
import schema from '../utils/helper/schema';
import { configuration, tokenStr } from '../configs/configuration';

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
        axios.post(`${configuration.resourceUrl}/client`, data, {
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
