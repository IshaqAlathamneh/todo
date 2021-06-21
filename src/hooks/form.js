import {useState} from 'react';

const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleSubmit = (e) => {
        console.log("inside handleSubmit", values)
        e.preventDefault();
        // e.target.reset();
        console.log(callback);
        callback(values);
    }

    const handleChange = (e) => {
        console.log("inside handleChange", {[e.target.name]: e.target.value})
        setValues({...values, [e.target.name]: e.target.value});
    }
    return [handleSubmit, handleChange, values];
}

export default useForm;