/* eslint-disable import/no-anonymous-default-export */
import { Alert, CardHeader } from "@mui/material"
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';

function D({deployment}) {

    const cards = deployment.data.versions.map((version) =>
        <div key={version.id}>
            <Card>
                <CardHeader title={version.title}>     
                </CardHeader>
                <CardContent>
                    URL: {version.url}
                    <Switch inputProps={ 'aria-label', 'Switch demo' } />
                </CardContent>
            </Card>
            <Divider />
        </div>
    );

    return (
        <>
            {cards}       
        </>        
    )
}

export default({deployment}) => {
    return (
        <>            
            {deployment != null &&
                <>
                    <D deployment={deployment}></D>
                </>
            }
             {deployment == null &&
                <h2>
                    <Alert severity="info">Please select a deployment from left menu!</Alert>
                </h2>
            }
        </>
    )
}