import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import deploymentSlice from '../features/deployments/deploymentsSlice'

const asyncFunctionMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)

export default configureStore({
    reducer: {
        deployments: deploymentSlice,
    }
}, middlewareEnhancer)

