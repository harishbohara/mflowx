import { configureStore } from '@reduxjs/toolkit';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Provider } from 'react-redux';
import Deployment from '../deployments/Deployments';
import { deploymentsSlice } from '../deployments/deploymentsReducer';

export const store = configureStore({
    reducer: deploymentsSlice.reducer
})

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">MlFlowX</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#deployments">Deployments</Nav.Link>
                        {/*
                        <Nav.Link href="#models">Models</Nav.Link>
                        <Nav.Link href="#help">Help</Nav.Link>                   
                        */}
                    </Nav>
                </Container>
            </Navbar>
            <Provider store={store}>
                <Container fluid>
                    <Deployment></Deployment>
                </Container>
            </Provider>
        </>
    )
}