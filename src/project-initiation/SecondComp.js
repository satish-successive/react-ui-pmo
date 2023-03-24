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

import { multiStepContext } from '../StepContext';

const SecondComp = (props) => {

    const {
        setIsStep1Completed,
        setIsStep2Completed,
        setIsStep3Completed,
        steps
    } = props;

    const { currentStep, setCurrentStep, setUserData, finalData } = useContext(multiStepContext);

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

    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px' }} elevation={5}>
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
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        endIcon={currentStep !== steps.length ? <East /> : ''}
                        sx={{ m: 2 }}
                    >
                        {currentStep === steps.length ? 'Submit' : 'Continue'}
                    </Button>
                </Box>
            </Paper>

        </>
    );
}

export default SecondComp;
