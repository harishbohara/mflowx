/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */

import React, { useState, useEffect } from 'react';
import { Alert, CardHeader, Switch } from "@mui/material"
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack } from "@mui/material";
import { Grid, Slider } from "@mui/material";
const lightTheme = createTheme({ palette: { mode: 'light' } });

// This is a specific version of a deployment
function Version({version}) {
    const [rollout, setRollout] = useState(version.rollout)

    // Do something when 
    useEffect(() => {
        // console.log("Rollout value changed: rollout=" + rollout + " version=" + version.id)
    }, [rollout, version]);

    return (
        <div key={version.id}>
            <ThemeProvider theme={lightTheme}>
                <Box key={version.id} sx={{ width: '100%', minWidth: 200, bgcolor: 'background.paper' }}>    
                    <Card>
                        <CardHeader title={"Version = " + version.title}/>     
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2} >
                                <Grid item xs={3}>URL</Grid>
                                <Grid item xs={9}><a href="#">{version.url}</a></Grid>                      
                                <Grid item xs={3}>Enabled</Grid>
                                <Grid item xs={9}><Switch></Switch></Grid>
                                <Grid item xs={3}>Rollout ({rollout})</Grid>
                                <Grid item xs={9}>
                                    <Slider key={version.id} 
                                        value={rollout} 
                                        step={1} marks 
                                        min={0} 
                                        max={100} 
                                        onChange={(ev) => setRollout(ev.target.value)}
                                    />
                                </Grid>
                            </Grid>                                                    
                        </CardContent>
                    </Card>            
                </Box>
            </ThemeProvider>
        </div>
    )
}

// A single card to show a single version of a deployment
function SingleDeployment({deployment}) {
    const cards = deployment.data.versions.map((version) =>
        <Version key={version.id} version={version}></Version>
    );
    return (<>{cards}</>)
}

// A deployment object which lists all the versions avaliable in the deployment
export default({deployment}) => {
    return (
        <>            
            {deployment != null &&
                <Grid container spacing={2} >
                    <Grid xs={12}><Alert icon={false} severity="success">List of all avaliable deployments for this model!</Alert></Grid>
                    <Grid xs={12}>
                        <Stack spacing={8}>
                            <SingleDeployment deployment={deployment}/>
                        </Stack>
                    </Grid>
                </Grid>                    
            }
             {deployment == null &&
                <h2>
                    <Alert severity="info">Please select a deployment from left menu!</Alert>
                </h2>
            }
        </>
    )
}