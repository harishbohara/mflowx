import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Left menu style
const style = {width: '100%',maxWidth: 360,bgcolor: 'background.paper',};
  
// eslint-disable-next-line import/no-anonymous-default-export
export default({deployments, setDeployment}) => {


    // Add all models in left menu
    const menuItems = deployments.map((deployment) =>
        <div key={deployment.id}>
            <ListItem  button>
                <ListItemText primary={deployment.data.label} onClick={() => setDeployment(deployment)} />            
            </ListItem>    
            <Divider />
        </div>
    );

    // Final component
    return(
       <div>
           <List sx={style} component="nav" aria-label="mailbox folders">
                {menuItems}   
            </List>   
       </div>
    )
}