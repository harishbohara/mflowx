import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

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

  
// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    const [deployments] = useState(elements);

    const listItems = deployments.map((deployment) =>
        <Nav.Link key={deployment.id} href={deployment.data.link}>{deployment.data.label}</Nav.Link>              
    );

    return(
       <div style={{border: "4px dotted blue"}}>
            <ul>
            {listItems}               
          </ul>
       </div>
    )
}