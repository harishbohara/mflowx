/* eslint-disable import/no-anonymous-default-export */

import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import DeploymentList from "./DeploymentList"
import Deployment from "./Deployment"
import { useDispatch, useSelector } from 'react-redux';

export default () => {

    // These are the deployments - TODO (get if from outside)
    // const [deployments] = useState(elements);
    const deployments = useSelector(state => state.elements)

    // This is the deployment which will be shown
    const deployment = useSelector(state => state.deployment);

    return (
        <Container>
            <Row >

                <Col xs={3}><DeploymentList deployments={deployments}></DeploymentList></Col>
                <Col xs={9}><Deployment deployment={deployment}></Deployment></Col>
            </Row>
        </Container>
    )
}