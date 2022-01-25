
import { Container } from '@mui/material';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import Deployment from '../deployments/Deployments';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
    <>
        <Navbar bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home">MfFlowX</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="#deployments">Deployments</Nav.Link>
                    <Nav.Link href="#models">Models</Nav.Link>
                    <Nav.Link href="#help">Help</Nav.Link>                   
                </Nav>
            </Container>            
        </Navbar>
        <Container fluid>
            <Deployment></Deployment>
        </Container>
    </>
  )
}