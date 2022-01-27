
import axios from "axios";
import { fetchDataDone, setCurrentDeployment } from "./deploymentsSlice";

export function getRegisteredModels(dispatch) {
    axios.get(process.env.REACT_APP_MLFOW_API_SERVER + "/preview/mlflow/registered-models/list")
        .then((res) => {
            dispatch(fetchDataDone({ data: res.data }))
        })
}

export function getModelVersions(dispatch, name) {
    console.log(name)
    axios.post(process.env.REACT_APP_MLFOW_API_SERVER + "/mlflow/registered-models/get-latest-versions", {
        "name": name,
        "stages": ["Production", "None", "Staging"],
        method: "get"
    }
    ).then((res) => {
        // console.log("Fetch - got versions for model: name=" + name, " data=" + JSON.stringify(res.data))
        dispatch(setCurrentDeployment({ deployment: res.data, deploymentName: name }))
    })
}


export function updateTagsInModelVersion(dispatch, name) {

}

export function isModelVersionEnabled(version) {
    if (version.tags != null) {
        for (var i = 0; i < version.tags.length; i++) {
            const tag = version.tags[i];
            if (tag.key === "__enabled__") {
                return tag.value === "true";
            }
        }
    }
    return false;
}

export function getModelVersionRollout(version) {
    if (version.tags != null) {
        for (var i = 0; i < version.tags.length; i++) {
            const tag = version.tags[i];
            if (tag.key === "__rollout__") {
                return parseInt(tag.value);
            }
        }
    }
    return 0;
}