import React, { useState } from "react";
import App from './App';

export const multiStepContext = React.createContext();

const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        state: '',
        company: '',
        country: '',
        client: [],
        address: '',
        projectName: '',
        phase: '',
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
    const [finalData, setFinalData] = useState([]);

    return (
        <>
            <multiStepContext.Provider
                value={{
                    currentStep,
                    setCurrentStep,
                    userData,
                    setUserData,
                    finalData,
                    setFinalData
                }}
            >
                <App />
            </multiStepContext.Provider>
        </>
    )
}

export default StepContext;


