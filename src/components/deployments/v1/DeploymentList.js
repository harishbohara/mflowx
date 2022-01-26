/* eslint-disable import/no-anonymous-default-export */

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import { setCurrentDeploymentIndex } from '../../../features/deployments/deploymentsSlice';


export default ({ deployments }) => {
    const dispatch = useDispatch()

    const deploymentItems = deployments.map((deployment) =>
        <div key={deployment.id}>
            <ListItem button>
                <ListItemText primary={deployment.data.label} onClick={() => dispatch(setCurrentDeploymentIndex({ index: deployment.index }))} />
            </ListItem>
            <Divider />
        </div>
    );

    return (
        <>{deploymentItems}</>
    )
}