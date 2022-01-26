import { Box, Container } from "@mui/material"
import DeploymentsContainer from "../deployments/v1/DeploymentsContainer"
import Menu from '../menu/Menu'
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <Box sx={{ width: '80%', minWidth: 800, bgcolor: 'background.paper' }}>
            <Menu></Menu>
            <DeploymentsContainer />
        </Box>
    )
}