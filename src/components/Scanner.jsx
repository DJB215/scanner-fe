import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Box,
    Container,
    Button,
    Typography,
    createTheme,
    ThemeProvider,
    TextField,
    Select,
    MenuItem, 
    FormControl,
    InputLabel,
} from '@material-ui/core';
import axios from 'axios';
//import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner2';

const url = 'http://localhost:5000/covid/new'

const Scanner = (props) => {
    const [data, setData] = useState('Not Found');
    const [testResult, setTestResult] = useState('');
    const history = useHistory();

    const loginId = history.location.state.loginId;


    const theme = createTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        formData.append('EinsteinID', formData.get('userId'));
        formData.append('CovidTestCode', formData.get('testId'));
        formData.append('TestResult', formData.get('testResult'));

        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/covid/new',
                data: {
                    EinsteinID: formData.get('userId'),
                    CovidTestCode: formData.get('testId'),
                    TestResult: formData.get('testResult'),
                },
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((response) => {
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }

        // console.log(event.currentTarget);

        // console.log({
        //     testID: formData.get('testId'),
        //     testResult: formData.get('testResult'),
        //     loginId: formData.get('userId')
        // });


        // console.log(data);

        // fetch('http://localhost:5000/covid/new', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         EinsteinID: formData.get('userId'),
        //         CovidTestCode: formData.get('testId'),
        //         TestResult: formData.get('testResult')
        //     })
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))

        // console.log(req.body)

        // axios.post('http://localhost:5000/covid/new', formData)
        // .then(response => {
        //     console.log(response.data);
        // });
        
        // fetch('http://localhost:5000/covid/new', {
        //     method: 'POST',
        //     mode: 'cors',
        //     crossDomain: 'true',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success: ', data);
        // })
        // .catch((error) => {
        //     console.error('Error: ', error)
        // });
    };

    const handleChange = (event) => {
      setTestResult(event.target.value);
      console.log(testResult);
    };

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    const classes = useStyles()

    return (
        <div className="pageLook">
            <BarcodeScannerComponent 
            width={300} 
            height={300}
            onUpdate={(err, result) => {
                if (result) setData(result.text)
            }}
            />

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Scan
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} action={url} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="testId"
                        label="Covid-19 Test ID"
                        name="testId"
                        autoFocus
                        value={data}
                        />
                        <TextField
                        type="hidden"
                        id="userId"
                        name="userId"
                        value={loginId}
                        />
                        <FormControl style={{ width: '100%' }} className={classes.formControl}>
                            <InputLabel id="test">Test Result</InputLabel>
                            <Select
                            labelId="test"
                            id="testResult"
                            name="testResult"
                            value={testResult}
                            onChange={handleChange}
                            label="Test Result"
                            fullWidth
                            >
                                <MenuItem value={'None'}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Negative'}>Negative</MenuItem>
                                <MenuItem value={'Positive'}>Positive</MenuItem>
                                <MenuItem value={'Invalid'}>Invalid</MenuItem>
                            </Select>
                        </FormControl>
                       
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Submit
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
    
        </div>
    );
}




export default Scanner;

