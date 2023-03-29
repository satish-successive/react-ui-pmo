import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string()
        .required("This field is required"),
    lastName: yup.string()
        .required("This field is required"),
    designation: yup.string()
        .required("This field is required"),
    email: yup.string()
        .email("Email must be valid!")
        .required("This field is required"),
});

export default schema;
