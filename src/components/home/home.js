import { Container } from "@mui/material"
import DeploymentsContainer from "../deployments/v1/DeploymentsContainer"
import Menu from '../menu/Menu'
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <Container >
            <Menu></Menu>
            <DeploymentsContainer />
        </Container>
    )
}