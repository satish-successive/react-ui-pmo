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
    Avatar,
    Checkbox,
    ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import _without from "lodash/without";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { projectInitiaonMock } from './mock';
import { multiStepContext } from '../StepContext';
import axios from 'axios';
import { MenuProps1, useStyles, options } from "./utils";
// import CountryData from 'country-data';


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
    // console.log('CountryData : ', CountryData.countries)
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();
    const classes = useStyles();
    const [projectDomain, setProjectDomain] = useState([]);
    const [projectType, setProjectType] = useState([]);
    const [projectLifeCycleModel, setProjectLifeCycleModel] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [primaryTeckStack, setPrimaryTeckStack] = useState([]);
    const [secondaryTeckStack, setSecondaryTeckStack] = useState([]);
    const [addSubProject, setAddSubProject] = useState([]);
    const { userData, setUserData } = useContext(multiStepContext);

    // const {
    //     state = '',
    //     company = '',
    //     country = '',
    //     client = [],
    //     address = '',
    //     projectName = '',
    //     phase = '',
    //     projectType = '',
    //     governanceModel = '',
    //     projectLifeCycleModel = [],
    //     projectDomain = [],
    //     parameters = [],
    //     addSubProject = [],
    //     primaryTeckStack = [],
    //     secondaryTeckStack = [],
    //     accountManagers = [],
    //     projectManagers = [],
    //     sowYes = false,
    //     sowNo = false,
    //     summary = '',
    //     startDate = '',
    //     endDate = '',
    //     noOfDays = '',
    //     totalApprovedHours = '',
    //     redmin = false,
    //     zira = false,
    //     tracker = false,
    //     monthly = false,
    //     hourly = false,
    //     fortnightly = false
    // } = userData;

    const handleChange = (event) => {

        const {
            target: { name, value },
        } = event;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubProjectChange = (event) => {
        const value = event.target.value;
        setUserData({
            ...userData,
            ['addSubProject']: value
        });
    };

    const handleDelete = (event, val, key) => {
        // console.log('val : ', val)
        if (key === 'addSubProject') {
            const filteredArray = userData[key].filter(e => e.uuid !== val.uuid)
            setUserData({
                ...userData,
                [key]: filteredArray
            });
        }
        else {
            const filteredArray = userData[key].filter(e => e.id !== val.id)
            setUserData({
                ...userData,
                [key]: filteredArray
            });
        }
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

    useEffect(() => {
        const baseURL = "https://test.resource-api.writso.com/v1";
        let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk3OWVkMTU1OTdhYjM1Zjc4MjljZTc0NDMwN2I3OTNiN2ViZWIyZjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk4MjQwODYsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTgyNDA4NiwiZXhwIjoxNjc5ODI3Njg2LCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.VwZ8AHjprmyleYETO0U0RkZncjCOovxAfI3TUBnV24szebdVc8iCtifI_LXAx2A55OdlUpiz_19z6Hx_Q7txsVZjwuM26MNewDgnKiFEL7Axppevvjt_n5EtVTXGpdsCT9NRBfXkZeHjvFxG9UoZJUbJ4HvmzcABoQdCi1ozeKWJE1lHHv0lxEJojoWANa6NktcAvN4dUG1nISayOm95f6GApM-GCEO7nZ4X2SidnEQcLCs0tVmhchVs6rzlAmW_K3mVCbCO5lAm56Z1z56aEu0Vh8xkC__HCrTscbAffBBWCXzoxb3HIwnBBekWDqncLx7YWx5TMX3q5t1l4TGURA"
        axios.get(`${baseURL}/project-domain`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setProjectDomain(response?.data?.data || []);
            });

        axios.get(`${baseURL}/billing-type`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setProjectType(response?.data?.data || []);
            });

        axios.get(`${baseURL}/lifecycle-model`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setProjectLifeCycleModel(response?.data?.data || []);
            });

        axios.get(`${baseURL}/project-parameter`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setParameters(response?.data?.data || []);
            });

        axios.get(`${baseURL}/primary-technology`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setPrimaryTeckStack(response?.data?.data || []);
            });

        axios.get(`${baseURL}/secondary-technology`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setSecondaryTeckStack(response?.data?.data || []);
            });

        axios.get(`${baseURL}/project-listings`,
            {
                headers: { "Authorization": tokenStr }
            }).then((response) => {
                setAddSubProject(response?.data?.data || []);
            });
    }, []);

    console.log('addSubProject : ', userData.addSubProject);

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
                        <InputLabel id="demo-multiple-phase-label">Phase </InputLabel>
                        <Select
                            labelId="demo-multiple-phase-label"
                            id="demo-multiple-phase"
                            // multiple
                            value={userData.phase}
                            name="phase"
                            // displayEmpty
                            onChange={handleChange}
                            input={<OutlinedInput label="Phase" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.phase.length ? "visible" : "hidden" }} onClick={(e) => handleClearClick('phase')}><ClearIcon />
                            </IconButton>}
                            displayEmpty={true ? <Typography>dd</Typography> : ''}
                        >
                            {phaseData?.length ? phaseData.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                            {projectType?.length ? projectType.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                            {names?.length ? names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, userData, theme)}
                                >
                                    {name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                            {projectLifeCycleModel?.length ? projectLifeCycleModel.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                                    {selected.map((item) => (
                                        <Chip
                                            key={item.name}
                                            label={item.name}
                                            color="primary"
                                            onDelete={(e) => handleDelete(e, item, 'projectDomain')}
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
                            {projectDomain?.length ? projectDomain.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                                    {selected.map((item) => (
                                        <Chip
                                            key={item.name}
                                            label={item.name}
                                            color="primary"
                                            onDelete={(e) => handleDelete(e, item, 'parameters')}
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
                            {parameters?.length ? parameters.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} sx={{ m: 1, width: '48%' }} required>
                        <InputLabel id="mutiple-select-label">Add Sub - Project</InputLabel>
                        <Select
                            labelId="mutiple-select-label"
                            multiple
                            value={userData.addSubProject}
                            onChange={handleSubProjectChange}
                            input={<OutlinedInput label="Add Sub - Project" />}
                            MenuProps={MenuProps1}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((item) => (
                                        <Chip
                                            key={item.project_name}
                                            label={item.project_name}
                                            color="primary"
                                            onDelete={(e) => handleDelete(e, item, 'addSubProject')}
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
                            {addSubProject?.length ? addSubProject.map((itm) => (
                                <MenuItem
                                    key={itm.project_name}
                                    value={itm}
                                    style={getStyles(itm.project_name, userData, theme)}
                                >
                                    <ListItemIcon>
                                        <Checkbox checked={userData.addSubProject.indexOf(itm) > -1} />
                                    </ListItemIcon>
                                    <ListItemText primary={itm.project_name} />
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                                    {selected.map((item) => (
                                        <Chip
                                            key={item.name}
                                            label={item.name}
                                            color="primary"
                                            onDelete={(e) => handleDelete(e, item, 'primaryTeckStack')}
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
                            {primaryTeckStack?.length ? primaryTeckStack.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                                    {selected.map((item) => (
                                        <Chip
                                            key={item.name}
                                            label={item.name}
                                            color="primary"
                                            onDelete={(e) => handleDelete(e, item, 'secondaryTeckStack')}
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
                            {secondaryTeckStack?.length ? secondaryTeckStack.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
                                    style={getStyles(itm.name, userData, theme)}
                                >
                                    {itm.name}
                                </MenuItem>
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                            {phaseData?.length ? phaseData.map((itm) => (
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
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
                            {phaseData?.length ? phaseData.map((itm) => (
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
                            )) :
                                <MenuItem disabled>
                                    No data available
                                </MenuItem>
                            }
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
