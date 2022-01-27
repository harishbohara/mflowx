/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { Box, Card, CardContent, CardHeader, Grid, Slider, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upldateRolloutPercentage } from '../../../features/deployments/deploymentsSlice';

export default ({ version }) => {
    const [enabled, setEnabled] = useState(version.enabled)
    const [rollout, setRollout] = useState(version.rollout)
    const dispatch = useDispatch()

    const versionEnableStatusChanged = (event) => {
        setEnabled(event.target.checked);
    };

    // Do something when 
    useEffect(() => {
        dispatch(upldateRolloutPercentage({ ...version, rollout, enabled }))
    }, [rollout, version, enabled]);

    return (
        <div>
            <Box key={version.id} sx={{ width: '100%', minWidth: 200, bgcolor: 'background.paper' }}>
                <Card>

                    <CardHeader title={"Version = " + version.title} style={{ backgroundColor: !enabled ? "#E7EAEF" : "#9BF8C6" }} />

                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={3}>URL</Grid>
                            <Grid item xs={9}><a href={version.url}>{version.url}</a></Grid>
                            <Grid item xs={3}>Enabled</Grid>
                            <Grid item xs={9}>
                                <Switch
                                    checked={enabled}
                                    onChange={versionEnableStatusChanged}
                                />
                            </Grid>
                            <Grid item xs={3}>Rollout ({rollout})</Grid>
                            <Grid item xs={9}>
                                <Slider key={version.id}
                                    value={rollout}
                                    step={1}
                                    min={0}
                                    max={100}
                                    onChange={(ev) => setRollout(ev.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>
            </Box>
        </div>
    );
}
