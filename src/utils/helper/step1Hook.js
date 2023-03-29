import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';

const useAxiosGetAPI = (url, payload) => {
    const [stepData, setStepData] = useState([]);
    const [apiResponseError, setApiResponseError] = useState("");

    useEffect(() => {
        axios
            .get(url, payload)
            .then((response) => setStepData(response.data.data || []))
            .catch((error) => setApiResponseError(error.message))
    }, []);

    return { stepData, apiResponseError };
};

const useAxiosPostAPI = (url, payload) => {
    const [stepData, setStepData] = useState([]);
    const [apiResponseError, setApiResponseError] = useState("");

    useEffect(() => {
        axios
            .post(url, payload)
            .then((response) => setStepData(response.data.data || []))
            .catch((error) => setApiResponseError(error.message))
    }, []);

    return { stepData, apiResponseError };
};

export { useAxiosGetAPI, useAxiosPostAPI };
