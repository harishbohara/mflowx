/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { Box, Card, CardContent, CardHeader, Grid, Slider, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getModelVersionRollout, isModelVersionEnabled } from '../../../features/deployments/fetch';

export default ({ version, tag }) => {
    const [enabled, setEnabled] = useState(isModelVersionEnabled(version))
    const [rollout, setRollout] = useState(getModelVersionRollout(version))

    const versionEnableStatusChanged = (event) => {
        setEnabled(event.target.checked);
    };

    useEffect(() => {
        if (tag == null) return
        var rollloutNotFound = true;
        var enabledNotFound = true;

        for (var i = 0; i < tag.length; i++) {
            const t = tag[i]
            if (t.key === "__rollout__") {
                tag[i].value = rollout
                rollloutNotFound = false
            }
        }
        for (var i = 0; i < tag.length; i++) {
            const t = tag[i]
            if (t.key === "__enabled__") {
                tag[i].value = enabled
                enabledNotFound = false
            }
        }
        if (rollloutNotFound) {
            tag.push({ key: "__rollout__", value: rollout })
        }
        if (enabledNotFound) {
            tag.push({ key: "__enabled__", value: enabled })
        }
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
