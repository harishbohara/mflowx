/* eslint-disable import/no-anonymous-default-export */
import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Deployment from './Deployment';
import DeploymentList from './DeploymentList';

export default () => {
    const deployments = useSelector(state => state.deployments.deployments)
    const deploymentsV1 = useSelector(state => state.deployments.deploymentsV1)
    const selectedIndex = useSelector(state => state.deployments.index)

    return (
        <Box sx={{ width: '100%', minWidth: 1000, bgcolor: 'background.paper' }}>
            <Grid container spacing={2} >
                <Grid item xs={3}><DeploymentList deployments={deployments} deploymentsV1={deploymentsV1} /></Grid>
                <Grid item xs={9}><Deployment deployment={deployments[selectedIndex]} /></Grid>
            </Grid>
        </Box >
    )
}
