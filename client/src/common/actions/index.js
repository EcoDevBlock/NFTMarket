import axios from 'axios';


export const fetchAssets = (param) => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });
    const res = await axios.get(`http://localhost:5000/api/asset${param}`)
    if (res.status === 200) {
        dispatch({ type: 'HIDE_LOADER' });
        dispatch({ type: 'FETCH_ASSETS', payload: res.data})
    } else {
        dispatch({ type: 'HIDE_LOADER' });
    }
}

export const actionCall = (owner, location) => async(dispatch) => {
    if(location!== 'sidebar'){
        dispatch({ type: 'SHOW_LOADER' });;
    }
    const res = await axios.post('http://localhost:5000/token/balance', { address:sessionStorage.getItem("userId") })
        if (res.status === 200) {
            const hexToDecimal = hex => parseInt(hex, 16);
            const dec1 = hexToDecimal(res.data);
            dispatch({ type: 'HIDE_LOADER' });
            dispatch({ type: 'FETCH_ACCOUNT_DETAILS', payload:{ dec1 }});
        } else {
            dispatch({ type: 'HIDE_LOADER' });
        }
}