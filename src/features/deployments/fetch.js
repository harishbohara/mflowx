
import axios from "axios";

import { fetchDataDone, setCurrentDeployment } from "./deploymentsSlice";

console.log(axios);

export function getRegisteredModels(dispatch) {
    axios.get(process.env.REACT_APP_MLFOW_API_SERVER + "/preview/mlflow/registered-models/list")
        .then((res) => {
            dispatch(fetchDataDone({ data: res.data }))
        })
}

export function getModelVersions(dispatch, name) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://model-repository.stg.dreamplug.net/ajax-api/2.0/preview/mlflow/model-versions/search?filter=name%3D%27" + name + "%27", requestOptions)
        .then(response => response.text())
        .then(result => dispatch(setCurrentDeployment({ deployment: JSON.parse(result), deploymentName: name })))
        .catch(error => console.log('error', error));
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