/* eslint-disable import/no-anonymous-default-export */
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack } from '@mui/material';
import React from 'react';
import Version from './Version';

// A single card to show a single version of a deployment
function InternalDeployments({ deployment }) {
    const cards = deployment.model_versions.map((version) =>
        <Version key={version.version + version.run_id} version={version}></Version>
    );
    return (<div>{cards}</div>)
}

export default ({ deployment, name }) => {
    const [loading, setLoading] = React.useState(false);
    const [deploymentSaveError, setDeploymentSaveError] = React.useState({ err: false, rollout: 0 })

    const handleSaveButtonClick = (event) => {
        setLoading(false)
        console.log("Deployments saved...")
        console.log(deployment.data.versions)

        // Calculate total rollout values for all versions
        var total = 0;
        for (var i = 0; i < deployment.data.versions.length; i++) {
            var version = deployment.data.versions[i]
            if (version.enabled && version.rollout > 0) {
                total = total + version.rollout;
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

                        <InternalDeployments deployment={deployment} />
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
