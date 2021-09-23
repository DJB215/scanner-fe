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

const LoginForm = (props) => {
    const values = props.values;
    console.log('Props passed to form: ', props);

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
                    <React.Fragment>
                        <AppBar title="Enter Einstein Login ID" />
                        
                        <TextField 
                            required 
                            id="EinsteinId" 
                            name="EinsteinId" 
                            label="Einstein Login ID" 
                            variant="outlined"
                            onChange={props.handleChange}
                            defaultValue={values.EinsteinID}
                            autoComplete="off" 
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

export default LoginForm
