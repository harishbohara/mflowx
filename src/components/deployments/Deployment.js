/* eslint-disable import/no-anonymous-default-export */
import { Alert } from "@mui/material"

function D({deployment}) {
    return (
        <h2>
            {deployment.data.label}            
        </h2>
    )
}

export default({deployment}) => {
    return (
        <>            
            {deployment != null &&
                <D deployment={deployment}></D>
            }
             {deployment == null &&
                <h2>
                    <Alert severity="info">Please select a deployment from left menu!</Alert>
                </h2>
            }
        </>
    )
}