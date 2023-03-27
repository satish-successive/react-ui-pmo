import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Paper,
    BottomNavigation,
    Container,
    Grid,
    Chip,
    Card,
    CardActionArea,
    CardHeader,
    IconButton,
    CardContent,
    CssBaseline,
    OutlinedInput,
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
    RestoreIcon,
    ArrowForwardIos,
    Refresh
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


import clsx from 'clsx';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import FirsComp from './FirsComp';
import SecondComp from './SecondComp';
import axios from 'axios';

import { multiStepContext } from '../StepContext';

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

    // const returnStep = (obj, labelProps) => {
    //     return <Step key={obj.step}>
    //         <StepLabel
    //             StepIconComponent={CustomStepIcon}
    //             {...labelProps}>{obj.step}
    //         </StepLabel>
    //     </Step>
    // }

    // {
    //     "project_name": "project name",
    //     "company_name": "company",
    //     "company_address": "address",
    //     "project_domain": [
    //         2
    //     ],
    //     "billing_type": 1,
    //     "approved_hours": "80",
    //     "project_components": "[1]",
    //     "maximum_hours_billed": null,
    //     "initiation_date": "2023-04-06",
    //     "status": "1",
    //     "project_manager_id": [
    //         1
    //     ],
    //     "account_manager_id": [
    //         1
    //     ],
    //     "technologies": [],
    //     "estimated_timeline_to": "2023-04-06",
    //     "estimated_timeline_from": "2023-03-24",
    //     "client_detail": "[{\"full_name\":\"test123 test123 tets\",\"address\":\"test90@gmail.com\"}]",
    //     "project_type_id": 1,
    //     "gov_category_id": 1,
    //     "subProject": false,
    //     "parent_id": [],
    //     "lifecycle_model_id": 1,
    //     "state": "Adrar",
    //     "country": "Algeria",
    //     "billing_interval": 0,
    //     "project_id": "cd8cade5-9b47-4be8-84f4-62715c3871a6",
    //     "billing_medium": 1,
    //     "project_summary": "summary",
    //     "primary_technologies": [
    //         110
    //     ],
    //     "secondary_technologies": [
    //         5
    //     ],
    //     "project_category_id": null,
    //     "project_sow": 0
    // }

    const submitFinalData = () => {

        // const {
        //     state = '',
        //     company: company_name = '',
        //     country = '',
        //     client: client_detail = [],
        //     address: company_address = '',
        //     projectName: project_name = '',
        //     phase: [],
        //     projectType: '',
        //     governanceModel: '',
        //     projectLifeCycleModel: [],
        //     projectDomain: project_domain = [],
        //     parameters: [],
        //     addSubProject: [],
        //     primaryTeckStack: primary_technologies = [],
        //     secondaryTeckStack: secondary_technologies = [],
        //     accountManagers: [],
        //     projectManagers: [],
        //     sowYes: false,
        //     sowNo: false,
        //     summary: project_summary = '',
        //     startDate: estimated_timeline_to = '',
        //     endDate: estimated_timeline_from'',
        //     noOfDays: '',
        //     totalApprovedHours: approved_hours='',
        //     redmin: false,
        //     zira: false,
        //     tracker: false,
        //     monthly: false,
        //     hourly: false,
        //     fortnightly: false,
        //     // subProject= false,
        //     // billing_type: 1,
        // } = userData;

        // const requestPayload = {
        //     'project_name': requestData.project_name,
        //     'company_name': requestData.company_name,
        //     'company_address': requestData.company_address,
        //     'project_domain': requestData.project_domain,
        //     'billing_type': requestData.billing_type,
        //     'approved_hours': requestData.approved_hours,
        //     'project_components': JSON.stringify(requestData.project_components),
        //     'maximum_hours_billed': requestData.maximum_hours_billed,
        //     'initiation_date': requestData.initiation_date,
        //     'status': '1',
        //     'project_documents_link': JSON.stringify(requestData.project_documents_link),
        //     'project_manager_id': requestData.project_manager_id,
        //     'account_manager_id': requestData.account_manager_id,
        //     'technologies': requestData.technologies,
        //     'estimated_timeline_to': requestData.estimated_timeline_to,
        //     'estimated_timeline_from': requestData.estimated_timeline_from,
        //     'client_detail': JSON.stringify(requestData.client_detail),
        //     'project_type_id': requestData.project_type_id,
        //     'gov_category_id': requestData.gov_category_id,
        //     'subProject': requestData.subProject,
        //     'parent_id': requestData.parent_id,
        //     'lifecycle_model_id': requestData.lifecycle_model_id,
        //     'state': requestData.companyState,
        //     'country': requestData.companyCountry,
        //     'billing_interval': requestData.billing_interval,
        //     'project_id': requestData.project_id,
        //     'billing_medium': requestData.billing_medium,
        //     'project_summary': requestData.project_summary,
        //     'primary_technologies': requestData.primary_technologies,
        //     'secondary_technologies': requestData.secondary_technologies,
        //     'project_category_id':requestData.project_category_id,
        //     'project_sow':requestData.project_sow
        //   }


        // const baseURL = "https://test.resource-api.writso.com/v1/client";
        // let tokenStr = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2F0aXNoIEt1bWFyIFBhdGVsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJSMkJEZEV6RGtwVTZNbzhralFGUGNnd1VxZUFSTkJYSVd0VW5sPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Jlc291cmNlLWF2YWlhYmlsaXR5IiwiYXVkIjoicmVzb3VyY2UtYXZhaWFiaWxpdHkiLCJhdXRoX3RpbWUiOjE2Nzk2NTkwMTIsInVzZXJfaWQiOiJod1RabzlCdE5PYUFZc2hZM1BORGFWMFZpd28yIiwic3ViIjoiaHdUWm85QnROT2FBWXNoWTNQTkRhVjBWaXdvMiIsImlhdCI6MTY3OTY1OTAxMiwiZXhwIjoxNjc5NjYyNjEyLCJlbWFpbCI6InNhdGlzaC5wYXRlbEBzdWNjZXNzaXZlLnRlY2giLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDA2NDQ1NjA3NjcyNTgyNTk5NCJdLCJlbWFpbCI6WyJzYXRpc2gucGF0ZWxAc3VjY2Vzc2l2ZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.e3f3U9091HibxwA_g67oWJmOHTOrfkCGVYk0tdYR37ueUYNehNKottRt5IvhGZbOhTZuUCesSit6X22gatpf3W8JJ_4zE2SyKwJxeqNF5F1uxpMRCX9XuHlOb9xinTHVeYNdW_yN8hMOE7BHWRZP1Eh-yKSE7_lrnpKr-lpncxarqlxal5oCTUcFSCb6Hppfa-YZwfaa_D_rIKnKw9okSAC_fjEpd2EV4FojISvruz3LMpT8_U4Vy0psQPzUrC727uBOrO6Y1l8tpVJ9QG7V9Yz5SbppFCfrTU78vNggVfsLb_5c0PuUotyPAIQC7s9xlqG6kpt7PWe8J5L7_KxXpA"
        // axios.post(baseURL, data, {
        //     headers: { "Authorization": tokenStr },

        // }).then((response) => {
        //     console.log('create client response : ', response);
        //     handleClose();
        // });
    };

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
                            sx={{ height: '38px', width: '120px' }}
                        >
                            <MenuItem value="draft">
                                Draft
                            </MenuItem>
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
                    <Step1 />
                )}
                {currentStep === 2 && (
                    <Step2 />
                )}
                {currentStep === 3 && (
                    <Step3 />
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
