
import axios from "axios";

export function getRegisteredModels() {
    axios.get(process.env.REACT_APP_MLFOW_API_SERVER + "/mlflow/registered-models/list", {}
    ).then((response) => {
        console.log(response.data);
    });
}