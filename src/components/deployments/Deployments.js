/* eslint-disable import/no-anonymous-default-export */

import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import DeploymentList from "./DeploymentList"
import Deployment
 from "./Deployment"
export default() => {
    return(
        <Container>
            <Row>
                <Col xs={3}><DeploymentList></DeploymentList></Col>
                <Col xs={6}><Deployment></Deployment></Col>
            </Row>      
        </Container>
    )
}