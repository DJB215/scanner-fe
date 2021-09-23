import React from 'react';
import { Typography } from './Copyright';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textPrimary" align="center">
            {'Copyright © '}
            Einstein Innovation
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright
