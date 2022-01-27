/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModelVersions } from '../../../features/deployments/fetch';
import Deployment from './Deployment';
import DeploymentList from './DeploymentList';

export default () => {
    const deploymentsV1 = useSelector(state => state.deployments.deploymentsV1)
    const selectedIndex = useSelector(state => state.deployments.index)
    const deployment = useSelector(state => state.deployments.deployment)
    const deploymentName = useSelector(state => state.deployments.currentDeploymentName)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("selectedIndex=", selectedIndex)
        getModelVersions(dispatch, deploymentsV1.registered_models[selectedIndex].name)
    }, [selectedIndex])

    return (
        <Box sx={{ width: '100%', minWidth: 1000, bgcolor: 'background.paper' }}>
            <Grid container spacing={2} >
                <Grid item xs={3}><DeploymentList deploymentsV1={deploymentsV1} /></Grid>
                <Grid item xs={9}><Deployment deployment={deployment} name={deploymentName} /></Grid>
            </Grid>
        </Box >
    )
}
