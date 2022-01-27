import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData, fetchDataDone } from "../../features/deployments/deploymentsSlice"
import DeploymentsContainer from "../deployments/v1/DeploymentsContainer"
import Menu from '../menu/Menu'
import axios from "axios";
import { getRegisteredModels } from "../../features/deployments/fetch"

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