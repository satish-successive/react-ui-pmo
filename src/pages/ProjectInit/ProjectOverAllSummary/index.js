import React, { useState, useContext, useMemo } from 'react';

import {
    Box,
    TextField,
    Select,
    MenuItem,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    Avatar,
    Checkbox,
    ListItemText,
    Paper,
    Tooltip,
    ListSubheader,
    InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import CancelIcon from '@mui/icons-material/Cancel';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { deepOrange } from '@mui/material/colors';

import { projectInitiaonMock } from '../../../constant/mock';
import { multiStepContext } from '../../../store/StepContext';
import { MenuProps1, useStyles } from "../../../utils/style";
import { useAxiosGetAPI } from '../../../utils/helper/step1Hook';
import { configuration, tokenStr } from '../../../configs/configuration';
import { containsText } from '../../../utils/helper/helper';


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

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '33px',
    height: '35px',
};

const ProjectOverAllSummary = () => {
    // console.log('CountryData : ', CountryData.countries)
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();
    const classes = useStyles();
    const [isSubProject, setIsSubProject] = useState(false);
    const [isToolpitOpen, setIsToolpitOpen] = React.useState(false);
    const [searchText, setSearchText] = useState("");
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
            const filteredArray = userData[key].filter(e => e.uuid !== val.uuid);
            setUserData({
                ...userData,
                [key]: filteredArray
            });
        }
        else {
            const filteredArray = userData[key].filter(e => e.id !== val.id);
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

    const { stepData: phaseListData } = useAxiosGetAPI(
        `${configuration.resourceUrl}/project-type`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: projectDomain } = useAxiosGetAPI(
        `${configuration.resourceUrl}/project-domain`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: projectType } = useAxiosGetAPI(
        `${configuration.resourceUrl}/billing-type`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: projectLifeCycleModel } = useAxiosGetAPI(
        `${configuration.resourceUrl}/lifecycle-model`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: parameters } = useAxiosGetAPI(
        `${configuration.resourceUrl}/project-parameter`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: primaryTeckStack } = useAxiosGetAPI(
        `${configuration.resourceUrl}/primary-technology`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: secondaryTeckStack } = useAxiosGetAPI(
        `${configuration.resourceUrl}/secondary-technology`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: addSubProject } = useAxiosGetAPI(
        `${configuration.resourceUrl}/project-listings`,
        { headers: { "Authorization": tokenStr } }
    );
    const { stepData: accountAndProjectManagers } = useAxiosGetAPI(
        `${configuration.resourceUrl}/user`,
        { headers: { "Authorization": tokenStr } }
    );

    console.log('userData step2 : ', userData);
    const displayedOptions = useMemo(
        () => projectDomain?.length && projectDomain.filter((option) => {
            return containsText(option.name, searchText)
        })
    );

    const handleSubProject = (event) => {
        const { target: { checked } } = event;
        setIsSubProject(checked);
    }

    const handleTooltipClose = () => {
        setIsToolpitOpen(false);
    };

    const handleTooltipOpen = () => {
        setIsToolpitOpen(true);
    };

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
                    <FormControl sx={{ width: '48%', }} required>
                        <span style={{ fontWeight: 'bold', marginLeft: 10 }} id="full-width-text-field">Project Name *</span>
                        <TextField
                            required
                            id="full-width-text-field"
                            // label="Project Name"
                            placeholder="Enter Name"
                            name="projectName"
                            value={userData.projectName}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, ml: 1, width: '48%' }} required>
                        {/* <InputLabel id="phase-label">Phase </InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 15 }} id="phase-label">Phase *</span>
                        <Select
                            sx={{ ml: 2 }}
                            labelId="phase-label"
                            id="phase"
                            fullWidth
                            value={userData.phase}
                            name="phase"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Phase" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.phase ? "visible" : "hidden" }} onClick={(e) => handleClearClick('phase')}><ClearIcon />
                            </IconButton>}
                            displayEmpty
                            renderValue={userData.phase !== "" ? undefined : () =>
                                <Typography color={'GrayText'}>Select Phase</Typography>}
                        >
                            {phaseListData?.length ? phaseListData.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 3, width: '48%' }} required>
                        {/* <InputLabel id="project-type-label">Project Type</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="project-type-label">Project Type *</span>
                        <Select
                            labelId="project-type-label"
                            id="project-type"
                            required
                            value={userData.projectType}
                            name="projectType"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Project Type *" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.projectType ? "visible" : "hidden" }} onClick={(e) => handleClearClick('projectType')}><ClearIcon />
                            </IconButton>}
                            displayEmpty
                            renderValue={userData.projectType !== "" ? undefined : () =>
                                <Typography color={'GrayText'}>Select Project Type</Typography>}
                        >
                            {projectType?.length ? projectType.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm.name}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 3, width: '48%' }} required>
                        {/* <InputLabel id="governance-model-label">Governance Model</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 2 }} id="governance-model-label">Governance Model *</span>
                        <Select
                            labelId="governance-model-label"
                            id="governance-model"
                            value={userData.governanceModel}
                            name="governanceModel"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Governance Model" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.governanceModel ? "visible" : "hidden" }} onClick={(e) => handleClearClick('governanceModel')}><ClearIcon />
                            </IconButton>}
                            displayEmpty
                            renderValue={userData.governanceModel !== "" ? undefined : () =>
                                <Typography color={'GrayText'}>Select Governance Model</Typography>}
                        >
                            {names?.length ? names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 2, width: '48%' }}>
                        {/* <InputLabel id="lifecycle-model-label">Project Lifecycle Model</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="lifecycle-model-label">Project Lifecycle Model *</span>
                        <Select
                            labelId="lifecycle-model-label"
                            id="lifecycle-model"
                            // multiple
                            value={userData.projectLifeCycleModel}
                            name="projectLifeCycleModel"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Project Lifecycle Model" />}
                            MenuProps={MenuProps}
                            endAdornment={<IconButton
                                sx={{ visibility: userData.projectLifeCycleModel.length ? "visible" : "hidden" }} onClick={(e) => handleClearClick('projectLifeCycleModel')}><ClearIcon />
                            </IconButton>}
                            displayEmpty
                            renderValue={userData.governanceModel !== "" ? undefined : () =>
                                <Typography color={'GrayText'}>Select Lifecycle Model</Typography>}
                        >
                            {projectLifeCycleModel?.length ? projectLifeCycleModel.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 2, width: '48%' }} required>
                        {/* <InputLabel id="project-domain-label" >Project Domain</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="project-domain-label">Project Domain *</span>
                        <Select
                            labelId="project-domain-label"
                            id="project-domain-label"
                            multiple
                            value={userData.projectDomain}
                            name="projectDomain"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Project Domain" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected?.length ? (
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
                            ) : <Typography color={'GrayText'}>Select Project Domain</Typography>}
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
                                {/* <div>
                                    Create
                                    <Chip
                                        color='primary'
                                        onClick={(e) => Abc(e, searchText)}
                                        clickable
                                        label={searchText}
                                    />
                                </div> */}
                            </ListSubheader>
                            {displayedOptions?.length ? displayedOptions.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
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
                    <FormControl sx={{ m: 1, mt: "27px", width: '48%' }} required>
                        {/* <InputLabel id="parameters-label">Parameters</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="parameters-label">Parameters *</span>
                        <Select
                            labelId="parameters-label"
                            id="parameters"
                            multiple
                            // sx={{mt:3}}
                            value={userData.parameters}
                            name="parameters"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Parameters" />}
                            MenuProps={MenuProps}
                            IconComponent={() => userData.parameters.length > 2 ? (
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
                                                    maxHeight: userData.parameters.length > 5 ? 250 : 400,
                                                    overflow: userData.parameters.length > 5 ? 'auto' : ''
                                                }}
                                                >
                                                    {userData.parameters.slice(2).map((itm) => {
                                                        return (
                                                            <Chip
                                                                avatar={<Avatar
                                                                    sx={{ mr: 1, width: 30, height: 30, bgcolor: deepOrange[100] }}
                                                                >{`${itm.name.charAt(0).toUpperCase()}${itm.name.slice(1).charAt(0).toUpperCase()}`}</Avatar>}
                                                                key={itm.name}
                                                                variant="outlined"
                                                                clickable
                                                                onDelete={(e) => handleDelete(e, itm, 'parameters')}
                                                                deleteIcon={
                                                                    <CancelIcon
                                                                        onMouseDown={(event) => event.stopPropagation()}
                                                                    />
                                                                }
                                                                onClick={(e) => handleDelete()}
                                                                sx={{ border: 'none' }}
                                                                label={<div>
                                                                    <Typography>{itm.name}</Typography>
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
                                        <span style={{ fontSize: '15px' }}>{`+${userData.parameters.slice(2).length}`}</span>
                                    </IconButton>
                                </Tooltip>
                            ) : <ArrowDropDownIcon />
                            }
                            displayEmpty
                            renderValue={(selected) => selected?.length ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.slice(0, 2).map((item) => (
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
                            ) : <Typography color={'GrayText'}>Select Project Parameters</Typography>}
                        >
                            {parameters?.length ? parameters.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
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
                    <FormControl className={classes.formControl} sx={{ m: 1, width: '48%' }} >
                        <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => handleSubProject(e)} />} label={<b>Add Sub-Project</b>} />
                        <FormControl sx={{ mt: 0, mb: 0, pb: 0 }} required>
                            {/* <InputLabel id="addsub-project-label">Add Sub - Project</InputLabel> */}
                            <Select
                                labelId="addsub-project-label"
                                id="addsub-project"
                                multiple
                                disabled={!isSubProject}
                                value={userData.addSubProject}
                                onChange={handleSubProjectChange}
                                // input={<OutlinedInput label="Add Sub - Project" />}
                                MenuProps={MenuProps1}
                                displayEmpty
                                renderValue={(selected) => selected.length ? (
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
                                ) : <Typography color={'GrayText'}>Add Sub-Project</Typography>}
                            >
                                {addSubProject?.length ? addSubProject.map((itm) => (
                                    <MenuItem
                                        key={itm.project_name}
                                        value={itm}
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
                    </FormControl>
                    <FormControl sx={{ m: 1, mb: 3, mt: 4, width: '48%' }} required>
                        {/* <InputLabel id="primary-tech-stack-label">Primary Tech Stack</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="primary-tech-stack-label">Primary Tech Stack *</span>
                        <Select
                            labelId="primary-tech-stack-label"
                            id="primary-tech-stack"
                            multiple
                            value={userData.primaryTeckStack}
                            name="primaryTeckStack"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Primary Tech Stack" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected.length ? (
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
                            ) : <Typography color={'GrayText'}>Select Primary Tech Stack</Typography>}
                        >
                            {primaryTeckStack?.length ? primaryTeckStack.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 4, width: '48%' }} required>
                        {/* <InputLabel id="secondary-teck-stack-label">Secondary Tech Stack</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="secondary-teck-stack-label">Secondary Tech Stack *</span>
                        <Select
                            labelId="secondary-teck-stack-label"
                            id="secondary-teck-stack"
                            multiple
                            value={userData.secondaryTeckStack}
                            name="secondaryTeckStack"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Secondary Tech Stack" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected.length ? (
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
                            ) : <Typography color={'GrayText'}>Select Secondary Tech Stack</Typography>}
                        >
                            {secondaryTeckStack?.length ? secondaryTeckStack.map((itm) => (
                                <MenuItem
                                    key={itm.name}
                                    value={itm}
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
                    <FormControl sx={{ m: 1, mb: 3, mt: 3, width: '48%' }} required>
                        {/* <InputLabel id="account-manager-label">Account Managers</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="account-manager-label">Account Managers *</span>
                        <Select
                            labelId="account-manager-label"
                            id="account-manager"
                            multiple
                            value={userData.accountManagers}
                            name="accountManagers"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Account Managers" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected.length ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((item, i) => (
                                        <Chip
                                            avatar={<Avatar
                                                sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                                src={'https://cdn.vuetifyjs.com/images/lists/1.jpg'}
                                            >{item.full_name}</Avatar>}
                                            key={i}
                                            variant="outlined"
                                            clickable
                                            onDelete={(e) => handleDelete(e, item, 'accountManagers')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                            sx={{ border: 'none' }}
                                            label={<div>
                                                <Typography sx={{ mb: -1 }}>{item.full_name}</Typography>
                                                <Typography variant='caption'>{item.email}</Typography>
                                            </div>}
                                        />
                                    ))}
                                </Box>
                            ) : <Typography color={'GrayText'}>Select Secondary Tech Stack</Typography>}
                        >
                            {accountAndProjectManagers?.length ? accountAndProjectManagers.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>{itm.full_name}</Avatar>}
                                >
                                    <Avatar
                                        sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}
                                        src={'https://cdn.vuetifyjs.com/images/lists/1.jpg'}
                                    >{itm.full_name}</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{itm.full_name}</Typography>
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
                    <FormControl sx={{ m: 1, mt: 3, width: '48%' }} required>
                        {/* <InputLabel id="project-manager-label">Project Managers</InputLabel> */}
                        <span style={{ fontWeight: 'bold', marginLeft: 4 }} id="project-manager-label">Project Managers *</span>
                        <Select
                            labelId="project-manager-label"
                            id="project-manager"
                            multiple
                            value={userData.projectManagers}
                            name="projectManagers"
                            onChange={handleChange}
                            // input={<OutlinedInput label="Project Managers" />}
                            MenuProps={MenuProps}
                            displayEmpty
                            renderValue={(selected) => selected.length ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((itm, i) => (
                                        <Chip
                                            avatar={<Avatar
                                                sx={{ width: 24, height: 24, bgcolor: deepOrange[400] }}
                                                src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                                            >{itm.full_name}</Avatar>}
                                            key={i}
                                            variant="outlined"
                                            clickable
                                            onDelete={(e) => handleDelete(e, itm, 'projectManagers')}
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                            onClick={(e) => handleDelete()}
                                            sx={{ border: 'none' }}
                                            label={<div>
                                                <Typography sx={{ mb: -1 }}>{itm.full_name}</Typography>
                                                <Typography variant='caption'>{itm.email}</Typography>
                                            </div>}
                                        />
                                    ))}
                                </Box>
                            ) : <Typography color={'GrayText'}>Select Secondary Tech Stack</Typography>}
                        >
                            {accountAndProjectManagers?.length ? accountAndProjectManagers.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm}
                                    leftIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>}
                                >
                                    <Avatar
                                        sx={{ mr: 1, width: 24, height: 24, bgcolor: deepOrange[400] }}
                                        src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                                    >{itm.full_name}</Avatar>
                                    <div>
                                        <Typography sx={{ mb: -1 }}>{itm.full_name}</Typography>
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
                    <FormControl sx={{ m: 1, width: '48%' }}>
                        <FormLabel sx={{ fontWeight: "bold", color: "black" }}>Summary</FormLabel>
                        <Textarea
                            placeholder="Project Summary"
                            minRows={2}
                            value={userData.summary}
                            name="summary"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
                        <FormLabel sx={{ fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label">Sow</FormLabel>
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

export default ProjectOverAllSummary;
