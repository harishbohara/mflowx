/* eslint-disable import/no-anonymous-default-export */

import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import DeploymentList from "./DeploymentList"
import Deployment from "./Deployment"

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
    {
      id: '4',
      data: { label: 'Bad Model', link: "/payment/model" },
    },    
  ];

export default() => {

    // These are the deployments - TODO (get if from outside)
    const [deployments] = useState(elements);

    // This is the deployment which will be shown
    const [deployment, setDeployment] = useState(null);

    return(
        <Container>
            <Row>
                <Col xs={3}><DeploymentList deployments={deployments} setDeployment={setDeployment}></DeploymentList></Col>
                <Col xs={6}><Deployment deployment={deployment}></Deployment></Col>
            </Row>      
        </Container>
    )
}