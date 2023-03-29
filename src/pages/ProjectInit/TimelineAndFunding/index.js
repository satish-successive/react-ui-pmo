import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import {
    Box,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { projectInitiaonMock } from '../../../constant/mock';
import { multiStepContext } from '../../../store/StepContext';

const TimelineAndFunding = () => {
    const { phaseData } = projectInitiaonMock;
    const theme = useTheme();

    const [step1Data, setStep1Data] = useState({
        state: [],
        country: [],
        client: [],
    });

    // const [isRadioButtonEnable, setIsRadioButtonEnable] = useState({
    //     redmin: false,
    //     zira: false,
    //     tracker: false,
    //     monthly: false,
    //     hourly: false,
    //     fortnightly: false
    // });

    const { userData, setUserData } = useContext(multiStepContext);


    console.log('userData : ', userData)

    const handleDelete = () => {
        // setPersonName();
    };

    const handleChange = (val, key) => {

        setUserData({
            ...userData,
            [key]: val,
        });
    };

    const handleInputChange = (event, key) => {
        const {
            target: { value },
        } = event;
        setUserData({
            ...userData,
            [key]: value,
        });
    };


    const handleBillingFrequencyRadioButton = (key) => {

        setUserData({
            ...userData,
            monthly: false,
            hourly: false,
            fortnightly: false,
            [key]: true,
        });
    }

    const handleProjectBillingRadioButton = (key) => {
        setUserData({
            ...userData,
            redmin: false,
            zira: false,
            tracker: false,
            [key]: true,
        });
    }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(2008, 1, 22);
    const secondDate = new Date(2008, 1, 12);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    let diff = Math.floor((Date.parse('13/03/2023') - Date.parse('10/03/2023')) / 86400000);
    console.log('difffff : ', diffDays)


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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                        <DatePicker
                            label="Start Date *"
                            input
                            defaultValue={dayjs('2022-04-17')}
                            value={userData.startDate}
                            onChange={(newValue) => handleChange(newValue, 'startDate')}
                        />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date *"
                            value={userData.endDate}
                            onChange={(newValue) => handleChange(newValue, 'endDate')}
                        />
                    </LocalizationProvider>
                </Box>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ width: '20%', mt: 3 }} required>
                        <span style={{ fontWeight: 'bold', marginLeft: 10 }} id="full-width-days-field">Number of days *</span>
                        <TextField
                            required
                            id="full-width-days-field"
                            // label="Number of days"
                            placeholder="Days"
                            value={userData.noOfDays}
                            onChange={(event) => handleInputChange(event, 'noOfDays')}

                        />
                    </FormControl>
                    <FormControl sx={{ width: '20%', mt: 3, ml: 3 }} required>
                        <span style={{ fontWeight: 'bold', marginLeft: 10 }} id="full-width-hours-field">Total Approved Hours *</span>
                        <TextField
                            required
                            id="full-width-hours-field"
                            // label="Total Approved Hours"
                            placeholder="Approved Hours"
                            value={userData.totalApprovedHours}
                            onChange={(event) => handleInputChange(event, 'totalApprovedHours')}

                        />
                    </FormControl>
                </Box>

                <Divider sx={{ mt: 3, mb: 3 }} variant="middle" />

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '48%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
                        <FormLabel
                            sx={{ fontWeight: "bold", color: "black" }}
                            id="demo-row-radio-buttons-group-label">Project Billing</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.redmin ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="redmin"
                                    checked={userData.redmin}
                                    onChange={(event) => handleProjectBillingRadioButton('redmin')}
                                    control={<Radio />}
                                    label="Redmin"
                                />
                            </Box>
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.zira ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="zira"
                                    checked={userData.zira}
                                    onChange={(event) => handleProjectBillingRadioButton('zira')}
                                    control={<Radio />}
                                    label="Zira"
                                />
                            </Box>
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.tracker ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="tracker"
                                    checked={userData.tracker}
                                    onChange={(event) => handleProjectBillingRadioButton('tracker')}
                                    control={<Radio />}
                                    label="Tracker"
                                />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ m: 1, mt: 1, width: '48%' }} required>
                        <FormLabel
                            sx={{ fontWeight: "bold", color: "black" }}
                            id="demo-row-radio-buttons-group-label">Billing Frequency</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.monthly ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="monthly"
                                    checked={userData.monthly}
                                    onChange={(event) => handleBillingFrequencyRadioButton('monthly')}
                                    control={<Radio />}
                                    label="Monthly"
                                />
                            </Box>
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.hourly ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="hourly"
                                    checked={userData.hourly}
                                    onChange={(event) => handleBillingFrequencyRadioButton('hourly')}
                                    control={<Radio />}
                                    label="Hourly"
                                />
                            </Box>
                            <Box
                                sx={{
                                    m: '5px', pl: '10px',
                                    border: '1px solid grey',
                                    backgroundColor: userData.fortnightly ? '#e6f2ff' : 'white'
                                }}>
                                <FormControlLabel
                                    value="fortnightly"
                                    checked={userData.fortnightly}
                                    onChange={(event) => handleBillingFrequencyRadioButton('fortnightly')}
                                    control={<Radio />}
                                    label="Fortnightly"
                                />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </>
    );
}

export default TimelineAndFunding;
