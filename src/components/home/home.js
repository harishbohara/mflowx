import { Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchData, fetchDataDone } from "../../features/deployments/deploymentsSlice"
import DeploymentsContainer from "../deployments/v1/DeploymentsContainer"
import Menu from '../menu/Menu'
import axios from "axios";
import { getRegisteredModels } from "../../features/deployments/fetch"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const dispatch = useDispatch()

    // Load data at start
    useEffect(() => {
        getRegisteredModels(dispatch)
    }, []);

    return (
        <Container >
            <Menu></Menu>
            <DeploymentsContainer />
        </Container>
    )
}