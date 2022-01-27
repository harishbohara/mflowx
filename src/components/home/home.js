import { Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRegisteredModels } from "../../features/deployments/fetch"
import DeploymentsContainer from "../deployments/v2/DeploymentsContainer"
import Menu from '../menu/Menu'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch()
    const deploymentsV1 = useSelector(state => state.deployments.deploymentsV1)

    // Load data at start
    useEffect(() => {
        getRegisteredModels(dispatch)
    }, []);

    return (
        <Container >
            {deploymentsV1 !== undefined &&
                <>
                    <Menu></Menu>
                    <DeploymentsContainer />
                </>
            }
        </Container>
    )
}