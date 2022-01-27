
import axios from "axios";
import { fetchDataDone } from "./deploymentsSlice";

export function getRegisteredModels(dispatch) {
    axios.get(process.env.REACT_APP_MLFOW_API_SERVER + "/mlflow/registered-models/list")
        .then((res) => {
            dispatch(fetchDataDone({ data: res.data }))
        })
}