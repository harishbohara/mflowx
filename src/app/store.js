import { configureStore } from '@reduxjs/toolkit'
import deploymentSlice from '../features/deployments/deploymentsSlice'

export default configureStore({
    reducer: {
        deployments: deploymentSlice,
    }
})