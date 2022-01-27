
import axios from "axios";
import { version } from "react";
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


export function updateTagsInModelVersion(dispatch, name, versions, callback) {
    try {
        for (var i = 0; i < versions.length; i++) {
            const ver = versions[i]
            for (var j = 0; j < ver.length; j++) {
                var t = ver[j]
                if (t.modified === false) continue

                const data = {
                    "name": name,
                    "version": t.version,
                    "key": t.key,
                    "value": t.value + "",
                }
                console.debug(data)
                axios.post(process.env.REACT_APP_MLFOW_API_SERVER + "/preview/mlflow/model-versions/set-tag", data).then((res) => {
                    console.debug("Modified = " + JSON.stringify(t))
                })
            }
        }
        callback({ status: "ok" })
    } catch (e) {
        callback({ status: "not-ok", error: e })
    }

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