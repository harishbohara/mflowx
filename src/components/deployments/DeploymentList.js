import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const elements = [
    {
      id: '1',
      data: { label: 'Login Model', link: "/login/model" },
    },
    {
      id: '2',
      data: { label: 'Logout Model', link: "/loginout/model" },
    },
    {
      id: '3',
      data: { label: 'Payment Model', link: "/payment/model" },
    },    
  ];


// Left menu style
const style = {width: '100%',maxWidth: 360,bgcolor: 'background.paper',};
  
// eslint-disable-next-line import/no-anonymous-default-export
export default() => {

    // These are the deployments - TODO (get if from outside)
    const [deployments] = useState(elements);

    // Add all models in left menu
    const menuItems = deployments.map((deployment) =>
        <>
         <ListItem button>
            <ListItemText primary={deployment.data.label} />
            </ListItem>
            <Divider />
        </>
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