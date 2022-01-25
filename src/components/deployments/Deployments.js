import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import DeploymentList from "./DeploymentList"

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    return(
        <Container>
            <Row>
                <Col xs={3}><DeploymentList></DeploymentList></Col>
                <Col xs={6}>2 of 3 (wider)</Col>
            </Row>      
        </Container>
    )
}