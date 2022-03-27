import { Link, Typography } from '@material-ui/core';
import React from 'react'

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{ alignSelf: 'center' }}>
            {'Copyright © '}
            <Link color="inherit" href="https://trade4sports.com/">Trade4Sports</Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright