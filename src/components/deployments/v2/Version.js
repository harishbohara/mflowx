/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { Box, Card, CardContent, CardHeader, Grid, Slider, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getModelVersionRollout, isModelVersionEnabled } from '../../../features/deployments/fetch';

export default ({ version }) => {
    const [enabled, setEnabled] = useState(isModelVersionEnabled(version))
    const [rollout, setRollout] = useState(getModelVersionRollout(version))
    const dispatch = useDispatch()

    const versionEnableStatusChanged = (event) => {
        setEnabled(event.target.checked);
    };

    // Do something when 
    useEffect(() => {
        // dispatch(upldateRolloutPercentage({ ...version, rollout, enabled }))
    }, [rollout, version, enabled]);

    return (
        <div>
            <Box key={version.version} sx={{ width: '100%', minWidth: 200, bgcolor: 'background.paper' }}>
                <Card>

                    <CardHeader title={"Version = " + version.run_id} style={{ backgroundColor: !enabled ? "#E7EAEF" : "#9BF8C6" }} />

                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={3}>URL</Grid>
                            <Grid item xs={9}><a href={version.source}>{version.source}</a></Grid>
                            <Grid item xs={3}>Enabled</Grid>
                            <Grid item xs={9}>
                                <Switch
                                    checked={enabled}
                                    onChange={versionEnableStatusChanged}
                                />
                            </Grid>
                            <Grid item xs={3}>Rollout ({rollout})</Grid>
                            <Grid item xs={9}>
                                <Slider key={version.run_id}
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
