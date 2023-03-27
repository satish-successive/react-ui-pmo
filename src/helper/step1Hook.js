import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';

const useAxiosAPI = (url, payload) => {
    const [getClientListData, setGetClientListData] = useState([]);
    const [getClientListDataError, setGetClientListDataError] = useState("");

    useEffect(() => {
        axios
            .get(url, payload)
            .then((response) => setGetClientListData(response.data.data || []))
            .catch((error) => setGetClientListDataError(error.message))
    }, []);

    return { getClientListData, getClientListDataError };
};

export default useAxiosAPI;
