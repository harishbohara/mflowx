/* eslint-disable import/no-anonymous-default-export */
import { Alert } from "@mui/material"

export default({deployment}) => {
    return (
        <>            
            {deployment != null &&
                <h2>
                    {deployment.data.label}
                </h2>
            }
             {deployment == null &&
                <h2>
                    <Alert severity="info">Please select a deployment from left menu!</Alert>
                </h2>
            }
        </>
    )
}