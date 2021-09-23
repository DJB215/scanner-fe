import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import axios from 'axios';
import LoginForm from './LoginForm';
import VerifyForm from './VerifyForm';

const Login = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [loginId, setLoginId] = useState('');

    const history = useHistory();

    const steps = ['Einstein Login ID', 'Verification Code'];

    const handleNextLogin = (e) => {
        e.preventDefault();
        setLoginId(document.getElementById('EinsteinId').value);
        setActiveStep(activeStep + 1 );
    }

    const handleNextVerify = (e) => {
        e.preventDefault();
        let newVerifyCode = document.getElementById('secretCode').value
        let newRandomCode = document.getElementById('randomCode').value
        
        console.log('Codes: ', newVerifyCode, newRandomCode)
        console.log('From next verify: ', values);

        if (newVerifyCode === newRandomCode) {
            console.log('It matches!!')
            history.push({
                pathname: '/scanner',
                state: { loginId: values.loginId }
            });
        } else {
            alert("No match. Please try again")
        }
        
    }

    const handleBack = (e) => {
        setActiveStep(activeStep - 1 );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value, loginId)
    }

    const handleChange = input => e => {
        //console.log(document.getElementById('loginId').value);
        console.log(input)
        //console.log(e.target.name)
        // if (e.target.name === 'loginId') {
        //     console.log(e)
        //     //setLoginId(e.target.value)
        //     //console.log(e.target.value);
        // } else {
        //     setVerifyCode(e.target.value)
        // }
    }

    const values = { loginId }

    switch (activeStep) {
        case 0:
            return (
                <LoginForm
                    handleChange={handleChange}
                    values={values}
                    handleNext={handleNextLogin}
                    steps={steps}
                    activeStep={activeStep}
                    handleSubmit={handleSubmit}
                />
            );
        case 1:
            return (
                <VerifyForm
                    handleChange={handleChange}
                    values={values}
                    handleBack={handleBack}
                    handleNext={handleNextVerify}
                    steps={steps}
                    activeStep={activeStep}
                />
            );
        default:
            throw new Error('Unknown step');
    }
}

export default Login;