/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentDeploymentIndex } from '../../../features/deployments/deploymentsSlice';


export default ({ deployments, deploymentsV1 }) => {
    const dispatch = useDispatch()
    const [items, setItems] = useState(<div>Hi</div>)

    const deploymentItems = deployments === undefined ? <></> : deployments.map((deployment) =>
        <div key={deployment.id}>
            <ListItem button>
                <ListItemText primary={deployment.data.label} onClick={() => dispatch(setCurrentDeploymentIndex({ index: deployment.index }))} />
            </ListItem>
            <Divider />
        </div>
    );

    useEffect(() => {
        const allItems = []
        for (var i = 0; i < deploymentsV1.registered_models.length; i++) {
            const index = i;
            const deployment = deploymentsV1.registered_models[index];
            const item = <div key={deployment.creation_timestamp}>
                <ListItem button>
                    <ListItemText primary={deployment.name} onClick={() => dispatch(setCurrentDeploymentIndex({ index: index }))} />
                </ListItem>
                <Divider />
            </div>
            allItems.push(item)
        }
        setItems(allItems)
    }, [deploymentsV1])

    return (
        <>
            {deploymentItems}
            {items}
        </>

    )
}