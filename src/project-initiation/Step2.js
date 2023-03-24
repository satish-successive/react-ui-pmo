import React, { useState, useContext } from 'react';

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
    Avatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import _without from "lodash/without";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { projectInitiaonMock } from './mock';
import { multiStepContext } from '../StepContext';

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


const Step2 = () => {

    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();

    const { userData, setUserData } = useContext(multiStepContext);

    const handleChange = (event) => {

        const {
            target: { name, value },
        } = event;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleDelete = (event, val, key) => {
        const filteredArray = userData[key].filter(e => e !== val)
        setUserData({
            ...userData,
            [key]: filteredArray
        });
    };

    const handleRadioButton = (key) => {

        setUserData({
            ...userData,
            sowYes: false,
            sowNo: false,
            [key]: true,
        })
    }

    const handleClearClick = (key) => {

        setUserData({
            ...userData,
            [key]: "",
        });
    };

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
                    <TextField
                        required
                        id="full-width-text-field"
                        label="Project Name"
                        placeholder="Enter Name"
                        name="projectName"
                        value={userData.projectName}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="demo-multiple-name-label">Phase </InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            value={userData.phase}
                            name="phase"
                            displayEmpty
                            onChange={handleChange}
                            input={<OutlinedInput label="Phase" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.phase.length ? "visible" : "hidden" }} onClick={(e) => handleClearClick('phase')}><ClearIcon />
                            </IconButton>}
                        >
                            {
                                phaseData.map((itm) => (
                                    <MenuItem
                                        key={itm.name}
                                        value={itm.name}
                                        style={getStyles(itm.name, userData, theme)}
                                    >
                                        {itm.name}
                                    </MenuItem>
                                ))
                            }
                            {/* <Button
                                color='success'
                                variant='contained'
                            >
                                Close
                            </Button> */}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="demo-multiple-name-label">Project Type</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            required
                            value={userData.projectType}
                            name="projectType"
                            onChange={handleChange}
                            input={<OutlinedInput label="Project Type *" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.projectType ? "visible" : "hidden" }} onClick={(e) => handleClearClick('projectType')}><ClearIcon />
                            </IconButton>}
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
                        <InputLabel id="demo-multiple-name-label">Governance Model</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            value={userData.governanceModel}
                            name="governanceModel"
                            onChange={handleChange}
                            input={<OutlinedInput label="Governance Model" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.governanceModel ? "visible" : "hidden" }} onClick={(e) => handleClearClick('governanceModel')}><ClearIcon />
                            </IconButton>}
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
                    <FormControl sx={{ m: 1, width: '48%' }}>
                        <InputLabel id="demo-multiple-name-label">Project Lifecycle Model</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            // multiple
                            value={userData.projectLifeCycleModel}
                            name="projectLifeCycleModel"
                            onChange={handleChange}
                            input={<OutlinedInput label="Project Lifecycle Model" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.projectLifeCycleModel.length ? "visible" : "hidden" }} onClick={(e) => handleClearClick('projectLifeCycleModel')}><ClearIcon />
                            </IconButton>}
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
                        <InputLabel id="demo-multiple-name-label" >Project Domain</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.projectDomain}
                            name="projectDomain"
                            onChange={handleChange}
                            input={<OutlinedInput label="Project Domain" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={(e) => handleDelete(e, value, 'projectDomain')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                        />
                                    ))}
                                </Box>
                            )}
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
                        <InputLabel id="demo-multiple-name-label">Parameters</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.parameters}
                            name="parameters"
                            onChange={handleChange}
                            input={<OutlinedInput label="Parameters" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            onDelete={(e) => handleDelete(e, value, 'parameters')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                            label={value}
                                        />
                                    ))}
                                </Box>
                            )}
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
                        <InputLabel id="demo-multiple-name-label">Add Sub - Project</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            disabled
                            value={userData.addSubProject}
                            name="addSubProject"
                            onChange={handleChange}
                            input={<OutlinedInput label="Add Sub - Project" />}
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
                        <InputLabel id="demo-multiple-name-label">Primary Tech Stack</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.primaryTeckStack}
                            name="primaryTeckStack"
                            onChange={handleChange}
                            input={<OutlinedInput label="Primary Tech Stack" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={(e) => handleDelete(e, value, 'primaryTeckStack')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                        />
                                    ))}
                                </Box>
                            )}
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
                        <InputLabel id="demo-multiple-name-label">Secondary Tech Stack</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.secondaryTeckStack}
                            name="secondaryTeckStack"
                            onChange={handleChange}
                            input={<OutlinedInput label="Secondary Tech Stack" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={(e) => handleDelete(e, value, 'secondaryTeckStack')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                        />
                                    ))}
                                </Box>
                            )}
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
                        <InputLabel id="demo-multiple-name-label">Account Managers</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.accountManagers}
                            name="accountManagers"
                            onChange={handleChange}
                            input={<OutlinedInput label="Account Managers" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            avatar={<Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>}
                                            key={value}
                                            variant="outlined"
                                            clickable
                                            onDelete={(e) => handleDelete(e, value, 'accountManagers')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                            sx={{ border: 'none' }}
                                            label={<div>
                                                <Typography sx={{ mb: -1 }}>{value}</Typography>
                                                <Typography variant='caption'>{'abc@gmail.com'}</Typography>
                                            </div>}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {phaseData.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    <Avatar sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                                        <Typography variant='caption'>{itm.email}</Typography>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="demo-multiple-name-label">Project Managers</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={userData.projectManagers}
                            name="projectManagers"
                            onChange={handleChange}
                            input={<OutlinedInput label="Project Managers" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            avatar={<Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>}
                                            key={value}
                                            variant="outlined"
                                            clickable
                                            onDelete={(e) => handleDelete(e, value, 'projectManagers')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                            sx={{ border: 'none' }}
                                            label={<div>
                                                <Typography sx={{ mb: -1 }}>{value}</Typography>
                                                <Typography variant='caption'>{'abc@gmail.com'}</Typography>
                                            </div>}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {phaseData.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    <Avatar sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}>N</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{itm.name}</Typography>
                                        <Typography variant='caption'>{itm.email}</Typography>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '48%' }} required>
                        <FormLabel>Summary</FormLabel>
                        <Textarea
                            placeholder="Project Summary"
                            minRows={2}
                            value={userData.summary}
                            name="summary"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
                        <FormLabel id="demo-row-radio-buttons-group-label">Sow</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.sowYes ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="yes"
                                    checked={userData.sowYes}
                                    onChange={(event) => handleRadioButton('sowYes')}
                                    control={<Radio />}
                                    label="Yes"
                                />
                            </Box>
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.sowNo ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="no"
                                    checked={userData.sowNo}
                                    onChange={(event) => handleRadioButton('sowNo')}
                                    control={<Radio />}
                                    label="No"
                                />
                            </Box>
                        </RadioGroup>
                    </FormControl>

                </Box>
            </Box>
        </>
    );
}

export default Step2;
