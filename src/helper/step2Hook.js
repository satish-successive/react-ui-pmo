// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const useAxiosAPI = (url, payload) => {
//     const [projectDomain, setProjectDomain] = useState([]);
//     const [projectType, setProjectType] = useState([]);
//     const [projectLifeCycleModel, setProjectLifeCycleModel] = useState([]);
//     const [parameters, setParameters] = useState([]);
//     const [primaryTeckStack, setPrimaryTeckStack] = useState([]);
//     const [secondaryTeckStack, setSecondaryTeckStack] = useState([]);
//     const [addSubProject, setAddSubProject] = useState([]);
//     const [getClientListDataError, setGetClientListDataError] = useState("");

//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setProjectDomain(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setProjectType(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setProjectLifeCycleModel(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setParameters(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setPrimaryTeckStack(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setSecondaryTeckStack(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);
//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response) => setAddSubProject(response.data.data || []))
//             .catch((error) => setGetClientListDataError(error.message))
//     }, []);

//     return { getClientListData, getClientListDataError };
// };

// export default useAxiosAPI;
