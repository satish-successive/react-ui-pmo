// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const ClientDialog = (props) => {
    const { onClose, open } = props;

    const emails = ['username@gmail.com', 'user02@gmail.com'];

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is the content of the dialog.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        // <Dialog onClose={handleClose} open={open}>
        //     <DialogTitle>Set backup account</DialogTitle>
        //     <List sx={{ pt: 0 }}>
        //         {emails.map((email) => (
        //             <ListItem disableGutters>
        //                 <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
        //                     <ListItemAvatar>
        //                         <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        //                             <PersonIcon />
        //                         </Avatar>
        //                     </ListItemAvatar>
        //                     <ListItemText primary={email} />
        //                 </ListItemButton>
        //             </ListItem>
        //         ))}

        //         <ListItem disableGutters>
        //             <ListItemButton
        //                 autoFocus
        //                 onClick={() => handleListItemClick('addAccount')}
        //             >
        //                 <ListItemAvatar>
        //                     <Avatar>
        //                         <AddIcon />
        //                     </Avatar>
        //                 </ListItemAvatar>
        //                 <ListItemText primary="Add account" />
        //             </ListItemButton>
        //         </ListItem>
        //     </List>
        // </Dialog>
    );
}

export default ClientDialog;
