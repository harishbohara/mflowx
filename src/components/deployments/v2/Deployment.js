/* eslint-disable import/no-anonymous-default-export */
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Version from './Version';

// A single card to show a single version of a deployment
function InternalDeployments({ deployment, tags }) {
    const cards = deployment.model_versions.map((version, index) =>
        <Version key={version.version + version.run_id} version={version} tag={tags[index]}></Version>
    );
    return (<div>{cards}</div>)
}

export default ({ deployment, name }) => {
    const [loading, setLoading] = React.useState(false);
    const [deploymentSaveError, setDeploymentSaveError] = React.useState({ err: false, rollout: 0 })
    const [tags, setTags] = useState([])

    const handleSaveButtonClick = (event) => {
        setLoading(false)
        console.log("Deployments saved... " + JSON.stringify(tags))

        // Calculate total rollout values for all versions
        var total = 0;
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i] == null || tags[i] === undefined ? [] : tags[i]

            var isEnabled = false
            for (var j = 0; j < tag.length; j++) {
                const t = tag[j]
                if (t.key === "__enabled__") {
                    isEnabled = t.value === "true" || t.value === true
                }
            }

            for (var j = 0; j < tag.length && isEnabled; j++) {
                const t = tag[j]
                if (t.key === "__rollout__") {
                    total = total + parseInt(t.value);
                }
            }
        }

        // If total is != 100 then something is wrong
        if (total !== 100) {
            setDeploymentSaveError({ err: true, rollout: total })
        } else {
            console.log("Apply this deployment settings...")
            console.log(deployment)
            setLoading(true);
        }
    };


    useEffect(() => {
        if (deployment === undefined || deployment == null) return
        const temp = []
        for (var i = 0; deployment.model_versions != null && i < deployment.model_versions.length; i++) {
            const m = deployment.model_versions[i]
            var t = []
            for (var j = 0; m.tags != null && m.tags !== undefined && j < m.tags.length; j++) {
                console.log(m.tags[j])
                t.push({ key: m.tags[j].key, value: m.tags[j].value, version: m.version, run_id: m.run_id })
            }
            temp.push(t)
        }
        console.log("Deployments saved... " + JSON.stringify(temp))
        setTags(temp)
    }, [deployment])


    return (
        <div>
            {deployment != null &&
                <>
                    <Stack spacing={2} >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Chip label={name} />
                            </Grid>
                            <Grid item xs={2}>
                                <LoadingButton
                                    color="secondary"
                                    onClick={handleSaveButtonClick}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    style={{ float: 'right' }}
                                >Save</LoadingButton>
                            </Grid>
                        </Grid>

                        <InternalDeployments deployment={deployment} tags={tags} />
                    </Stack>
                </>
            }
            {deployment == null &&
                <h2>
                    <Alert severity="info">Did not find deployment to show!</Alert>
                </h2>
            }

            <Dialog open={deploymentSaveError.err} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Deployment Error?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Total rollut percentage must be 100, but current total is {deploymentSaveError.rollout}. Please make sure
                        that the total value of rollout from enabled versions is 100.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setDeploymentSaveError({ err: false, rollout: deploymentSaveError.rollout })}>Ok!</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
