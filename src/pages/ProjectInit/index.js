import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Paper,
    Chip,
    CssBaseline,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Link
} from '@mui/material';
import {
    makeStyles,
} from "@material-ui/core";
import {
    East,
    West,
    FilePresentOutlined,
    PermIdentityOutlined,
    RestorePageOutlined,
    AlarmOnOutlined,
    ArrowForwardIos,
    Refresh
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


import clsx from 'clsx';
import CompanyInformation from './CompanyInformation/index';
import ProjectOverAllSummary from './ProjectOverAllSummary/index';
import TimelineAndFunding from './TimelineAndFunding/index';
import axios from 'axios';
import { configuration, tokenStr } from '../../configs/configuration';

import { multiStepContext } from '../../store/StepContext';

const steps = [
    { step: 'Step1', detailStep: 'Client Information', chipLable: 'success', chipColor: 'success' },
    { step: 'Step2', detailStep: 'Detail & Parameters', chipLable: 'In Progress', chipColor: 'primary' },
    { step: 'Step3', detailStep: 'Timeline & Funding', chipLable: 'Pending', chipColor: 'default' }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '150px',
        },
    },
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'blue',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'blue',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const ProjectInitiation = () => {
    const useStyles = makeStyles(() => ({
        root: {
            height: '30px',
            width: '30px',
            backgroundColor: '#eaeaf0',
            padding: 3,
            display: 'inline-block',
            borderRadius: '50%',
        },
        active: {
            backgroundColor: 'blue',
            color: 'white',
        },
        completed: {
            backgroundColor: 'green',
            color: 'green',
        },
    }));
    const [age, setAge] = React.useState('');
    const [isStep1Completed, setIsStep1Completed] = React.useState(false);
    const [isStep2Completed, setIsStep2Completed] = React.useState(false);
    const [isStep3Completed, setIsStep3Completed] = React.useState(false);
    const [draftData, setDraftData] = React.useState([]);


    const { currentStep, setCurrentStep, setUserData, userData } = useContext(multiStepContext);

    const handleNext = () => {

        if (currentStep === 1) {
            setIsStep1Completed(true);
        }
        if (currentStep === 2) {
            setIsStep2Completed(true);
        }
        if (currentStep === 3) {
            setIsStep3Completed(true);
        }
        if (currentStep !== steps.length) {
            setCurrentStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep((prevActiveStep) => prevActiveStep - 1);
    };
    const classes = useStyles();
    // const CustomStepIcon = (props) => {
    //     const { active, completed } = props;

    //     const stepIcons = {
    //         1: <PermIdentityOutlined />,
    //         2: <RestorePageOutlined />,
    //         3: <AlarmOnOutlined />,
    //     };
    //     return (
    //         <div
    //             className={clsx(classes.root, {
    //                 [classes.active]: active,
    //                 [classes.completed]: completed,
    //             })}
    //         >
    //             {stepIcons[String(props.icon)]}
    //         </div>
    //     );
    // };

    const PermIdentityOutlinedIcon = (props) => {
        const { active, completed } = props;
        const stepIcons = {
            1: <PermIdentityOutlined />,
        };
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {stepIcons[String(props.icon)]}
            </div>
        );
    };

    const RestorePageOutlinedIcon = (props) => {
        const { active, completed } = props;
        const stepIcons = {
            2: <RestorePageOutlined />,
        };
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {stepIcons[String(props.icon)]}
            </div>
        );
    };

    const AlarmOnOutlinedIcon = (props) => {
        const { active, completed } = props;
        const stepIcons = {
            3: <AlarmOnOutlined />,
        };
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {stepIcons[String(props.icon)]}
            </div>
        );
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const resetFormData = () => {
        setUserData({
            state: '',
            company: '',
            country: '',
            client: [],
            address: '',
            projectName: '',
            phase: [],
            projectType: '',
            governanceModel: '',
            projectLifeCycleModel: [],
            projectDomain: [],
            parameters: [],
            addSubProject: [],
            primaryTeckStack: [],
            secondaryTeckStack: [],
            accountManagers: [],
            projectManagers: [],
            sowYes: false,
            sowNo: false,
            summary: '',
            startDate: '',
            endDate: '',
            noOfDays: '',
            totalApprovedHours: '',
            redmin: false,
            zira: false,
            tracker: false,
            monthly: false,
            hourly: false,
            fortnightly: false
        });
    }


    console.log('currentStep : ', currentStep)

    const submitFinalData = () => {

        // axios.post(baseURL, data, {
        //     headers: { "Authorization": tokenStr },

        // }).then((response) => {
        //     console.log('create client response : ', response);
        //     handleClose();
        // });
    };

    useEffect(() => {
        axios.get(`${configuration.resourceUrl}/project-type`, {
            headers: { "Authorization": tokenStr },

        }).then((response) => {
            setDraftData(response?.data?.data);
            console.log('response : ', response);
        });
    }, []);

    return (
        <div>
            <Box sx={{ pb: 15, width: '100%' }}>
                <CssBaseline />
                <Box sx={{ display: 'flex', m: 1, mt: 4, mb: 5 }}>
                    <Typography sx={{ ml: 1, fontSize: '15px', color: 'grey' }}>Home</Typography>
                    <ArrowForwardIos sx={{ fontSize: '15px', m: '4px', color: 'grey' }} />
                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>Project Initiation</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end", mt: -10 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Drafts</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            label="Draft"
                            onChange={handleChange}
                            sx={{ height: '38px', width: '150px' }}
                            MenuProps={MenuProps}
                        >
                            {draftData.map((itm, i) => (
                                <MenuItem
                                    key={i}
                                    value={itm.project_name}
                                >
                                    {itm.project_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <Button onClick={resetFormData} color="primary">
                            <Refresh />
                            <Link to="/about">
                                Reset Form
                            </Link>
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 1, mb: 5 }}>
                    <FilePresentOutlined />
                    <Typography sx={{ ml: '5px', fontSize: '20px', fontWeight: 'bold' }}>Project Initiation</Typography>
                </Box>
                <Stepper activeStep={currentStep - 1} alternativeLabel connector={<QontoConnector />} >
                    {/* {
                        steps.map((obj, index) => {
                            // const stepProps = {};
                            const labelProps = {};
                            //  labelProps.error = true;
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <>
                                        <Typography sx={{ fontWeight: 'bold', color: 'black' }} variant="subtitle2">{obj.detailStep}</Typography>
                                        <Chip sx={{ borderRadius: 2 }} label={obj.chipLable} size="small" color={obj.chipColor} variant="outlined" />
                                    </>

                                );
                            }
                            return returnStep(obj, labelProps);
                        })
                    } */}

                    <Step sx={{ color: isStep1Completed ? 'green' : 'green' }} completed={isStep1Completed} key={steps[0].step}>
                        <StepLabel
                            StepIconComponent={!isStep1Completed ? PermIdentityOutlinedIcon : ''}
                            optional={
                                <>
                                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} variant="subtitle2">Client Information</Typography>
                                    <Chip
                                        sx={{
                                            borderRadius: 1,
                                            backgroundColor: isStep1Completed ? '#e5f5ea' : '#eee',
                                            color: isStep1Completed ? 'green' : 'blue'
                                        }}
                                        label={isStep1Completed ? 'completed' : currentStep === 1 ? 'In Progress' : 'Pending'}
                                        size="small"
                                        variant="outlined" />
                                </>
                            }
                        >
                            {steps[0].step}
                        </StepLabel>
                    </Step>
                    <Step completed={isStep2Completed} key={steps[1].step}>
                        <StepLabel
                            StepIconComponent={!isStep2Completed ? RestorePageOutlinedIcon : ''}
                            optional={
                                <>
                                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} variant="subtitle2">Detail & Parameters</Typography>
                                    <Chip
                                        sx={{
                                            borderRadius: 1,
                                            backgroundColor: isStep2Completed ? '#e5f5ea' : currentStep !== 2 ? '#e6e6e6' : '#eee',
                                            color: isStep2Completed ? 'green' : currentStep !== 2 ? 'grey' : 'blue'
                                        }}
                                        label={isStep2Completed ? 'completed' : currentStep === 2 ? 'In Progress' : 'Pending'}
                                        size="small"
                                        variant="outlined" />
                                </>
                            }
                        >
                            {steps[1].step}
                        </StepLabel>
                    </Step>
                    <Step completed={isStep3Completed} key={steps[2].step}>
                        <StepLabel
                            StepIconComponent={!isStep3Completed ? AlarmOnOutlinedIcon : ''}
                            optional={
                                <>
                                    <Typography sx={{ fontWeight: 'bold', color: 'black' }} variant="subtitle2">Timeline & Funding</Typography>
                                    <Chip
                                        sx={{
                                            borderRadius: 1,
                                            backgroundColor: isStep3Completed ? '#e5f5ea' : currentStep !== 3 ? '#e6e6e6' : '#eee',
                                            color: isStep3Completed ? 'green' : currentStep !== 3 ? 'grey' : 'blue'
                                        }}
                                        label={isStep3Completed ? 'completed' : currentStep === 3 ? 'In Progress' : 'Pending'}
                                        size="small"
                                        variant="outlined" />
                                </>
                            }
                        >
                            {steps[2].step}
                        </StepLabel>
                    </Step>
                </Stepper>
                {currentStep === 1 && (
                    <CompanyInformation />
                )}
                {currentStep === 2 && (
                    <ProjectOverAllSummary />
                )}
                {currentStep === 3 && (
                    <TimelineAndFunding />
                )}

            </Box>

            <Paper style={{ backgroundColor: '#fafafa', zIndex: 1 }} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px' }} elevation={5}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
                    {currentStep !== 1 && (
                        <Button
                            variant="outlined"
                            startIcon={<West />}
                            disabled={currentStep === 0}
                            onClick={handleBack}
                            sx={{ m: 2, mr: 1 }}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep === steps.length ? (
                        <Button
                            onClick={() => submitFinalData()}
                            variant="contained"
                            // endIcon={currentStep !== steps.length ? <East /> : ''}
                            sx={{ m: 2 }}
                        >
                            Submit
                        </Button>
                    ) :
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            endIcon={<East />}
                            sx={{ m: 2 }}
                        >
                            Continue
                        </Button>
                    }
                </Box>
            </Paper>

        </div>
    );
}

export default ProjectInitiation;
