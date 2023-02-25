import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const loginCall = async (userCredentials, dispatch) => {

    dispatch({ type: "LOGIN_START"});
    
    try {
        const res = await axios.post(SERVER_URL + "/auth/login", userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err})
    }
}