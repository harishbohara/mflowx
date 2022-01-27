import { createSlice } from '@reduxjs/toolkit';
import { getRegisteredModels } from './fetch';
import axios from "axios";
import { useDispatch } from 'react-redux';

const deployments = [
    {
        id: '1',
        index: 0,
        data: {
            label: 'Login Model',
            link: "/login/model",
            versions: [
                { id: '11', enabled: true, title: "Login Model first version", url: "https://mui.com/components/switches/", rollout: 1 },
                { id: '12', enabled: true, title: "Login Model second version", rollout: 10 }
            ]
        },
    },
    {
        id: '2',
        index: 1,
        data: {
            label: 'Logout Model',
            link: "/loginout/model",
            versions: [
                { id: '21', title: "Logout Model first Version", enabled: true, rollout: 1 },
                { id: '22', title: "Logout Model second Version", enabled: false, rollout: 1 }
            ]
        },
    },
    {
        id: '3',
        index: 2,
        data: {
            label: 'Payment Model',
            link: "/payment/model",
            versions: [
                { id: '31', title: "Payment model first version", enabled: false, enabled1: "true", rollout: 1 },
                { id: '32', title: "Payment model second version", enabled: true, enabled1: "false", rollout: 1 }
            ]
        },
    },
    {
        id: '4',
        index: 3,
        data: {
            label: 'Bad Model',
            link: "/payment/model",
            versions: [
                { id: '41', title: "Bad model first version", enabled: true, rollout: 1 },
                { id: '42', title: "Bad model second version", enabled: false, rollout: 1 }
            ]
        },
    },
];

export const deploymentsSlice = createSlice({
    name: 'deployment',
    initialState: {
        index: 0,
        deployments: deployments
    },
    reducers: {
        upldateRolloutPercentage: (state, event) => {
            const payload = event.payload
            // console.log("Called upldateRolloutPercentage")
            // console.log(payload)
            const versions = state.deployments[state.index].data.versions
            for (var i = 0; i < versions.length; i++) {
                const version = versions[i];
                if (version.id === payload.id) {
                    versions[i].rollout = payload.rollout
                    versions[i].enabled = payload.enabled
                }
            }
        },

        setCurrentDeploymentIndex: (state, event) => {
            state.index = event.payload.index
            console.log("Called setCurrentDeploymentIndex: payload=" + state.index)
        },

        fetchData: (state) => {
            console.log("Called fetchData... NO-OP")
        },

        fetchDataDone: (state, event) => {
            console.log("Called fetchDataDone... ")
            state.deploymentsV1 = event.payload.data
        },
    }
})

export const { upldateRolloutPercentage, setCurrentDeploymentIndex, fetchData, fetchDataDone } = deploymentsSlice.actions
export default deploymentsSlice.reducer
