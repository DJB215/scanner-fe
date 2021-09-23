import React from 'react';
import {
    CssBaseline,
    AppBar,
    Box,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    createTheme,
    ThemeProvider,
    TextField
} from '@material-ui/core';
import uniqueRandom from 'unique-random';
import emailjs from 'emailjs-com';

const VerifyForm = (props) => {
    const values = props.values;
    console.log('Props passed to form 2: ', props);

    const emailAddress = `${values.loginId}@einstein.edu`;

    const random = uniqueRandom(100000, 999999);
    const verification = random()
    console.log(emailAddress);
    console.log(verification);

    const message = `Your 6-digit verification code is ${verification}. Enter this code to continue.`

    const templateParams = {
        user_email: emailAddress,
        message: message,
        from_name: 'Einstein COVID-19 Team',
        user_id: values.loginId,
        from_email: 'covid19testing@einstein.edu'
    }

    const messageCheck = `Your 6-digit verification code was sent to ${emailAddress}. Please check your email and enter the code to continue.`

    function sendEmail(e) {        
        emailjs.send('service_0iui8ar', 'template_uvu3tfw', templateParams, 'user_cTGqLcdgWqF5eCt96B1IJ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    sendEmail();



    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                    Login
                    </Typography>
                    <Stepper activeStep={props.activeStep} sx={{ pt: 3, pb: 5 }}>
                    {props.steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                    </Stepper>
                    <Typography variant="caption" color="error" align="center">
                    {messageCheck}
                    </Typography>
                    <br /><br /><br />
                    <React.Fragment>
                        <AppBar title="Enter Verification Code" />
                        <TextField 
                            required 
                            id="secretCode" 
                            name="secretCode" 
                            label="Verification Code" 
                            variant="outlined"
                            onChange={props.handleChange}
                            autoComplete="off"
                        />
                        <TextField
                        type="hidden"
                        id="userId"
                        name="userId"
                        value={values.loginId}
                        />
                        <TextField
                        type="hidden"
                        id="randomCode"
                        name="randomCode"
                        value={verification}
                        />
                        <br />
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {props.activeStep !== 0 && (
                                <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                                Back
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                onClick={props.handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {props.activeStep === props.steps.length - 1 ? 'Login' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>    
            </Container>
            
        </ThemeProvider>
    )
}

export default VerifyForm
