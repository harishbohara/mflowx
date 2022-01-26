import { createSlice } from '@reduxjs/toolkit';


const elements = [
    {
        id: '1',
        index: 0,
        data: { label: 'Login Model', link: "/login/model", versions: [{ id: '1', enabled: true, title: "First version", url: "https://mui.com/components/switches/", rollout: 1 }, { id: '2', enabled: true, title: "2", rollout: 10 }] },
    },
    {
        id: '2',
        index: 1,
        data: { label: 'Logout Model', link: "/loginout/model", versions: [{ id: '1', title: "Second Version", enabled: true, rollout: 1 }, { id: '2', title: "2", enabled: true, rollout: 1 }] },
    },
    {
        id: '3',
        index: 2,
        data: { label: 'Payment Model', link: "/payment/model", versions: [{ id: '1', title: "Third version", enabled: true, rollout: 1 }, { id: '2', title: "2", enabled: true, rollout: 1 }] },
    },
    {
        id: '4',
        index: 3,
        data: { label: 'Bad Model', link: "/payment/model", versions: [{ id: '1', title: "1", enabled: true, rollout: 1 }, { id: '2', title: "2", enabled: true, rollout: 1 }] },
    },
];

export const deploymentsSlice = createSlice(
    {
        name: "deployments",
        initialState: {
            index: 0,
            deployment: elements[0],
            elements: elements,
            version: 0
        },
        reducers: {

            fetchDeployments: state => {
                console.log(state)
            },

            setIndex: (state, action) => {
                state.index = action.payload.index
                state.deployment = state.elements[action.payload.index]
                console.log("Set index for deployment= " + state.index)
            },

            updateDeployment: (state, action) => {
                state.version = state.version + 1
                const payload = action.payload
                for (var i = 0; i < state.elements.length; i++) {
                    if (state.elements[i].id === payload.deploymentId) {
                        const version = state.elements[i].data.versions
                        for (var j = 0; j < version.length; j++) {
                            if (version[j].id === payload.versionId) {
                                version[j].rollout = payload.rollout
                                version[j].enabled = payload.enabled
                            }
                        }
                    }
                }
            }
        }
    }
)

export const { fetchDeployments, setIndex, updateDeployment } = deploymentsSlice.actions

