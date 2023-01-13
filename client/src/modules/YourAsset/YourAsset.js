import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchAssets } from "../../common/actions";
import Toast from "../../common/components/Toast";
import NoAssets from "../../common/components/noAssets";
import PlaceHolder from "../../common/components/Placeholder";


const YourAsset = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const owner = useSelector(state => state.userId);
    const { isLoading,  accountDetails } = useSelector(state => state);
    const param = userId ? `/${userId}` : '';
    const btnColor = userId ? 'danger' : 'primary';
    const [token, setToken] = useState({});
    const [toastMsg, setToastMsg] = useState('');
    const [classProp, setClassProp] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [assets,setAsset] = useState([]);
    const [bal,setBal] = useState(0);

    useEffect(() => {
        // dispatch(fetchAssets(param));
        actionCall();
        getBalance();
    }, []);

     const actionCall =  async(dispatch) => {
        const res = await axios.get('http://localhost:5000/product/all')
            if (res.status === 200) {
                const filtered = res.data.filter( p=> p.ownerAddress === sessionStorage.getItem('userId'));
                setAsset([...assets,...filtered]);
                console.log(typeof(res));
            } else {
                dispatch({ type: 'HIDE_LOADER' });
            }
    }
    const getBalance =  async(dispatch) => {
        const res=await axios.post('http://localhost:5000/token/balance', { address:sessionStorage.getItem("userId") })
            if (res.status === 200) {
                const hexToDecimal = hex => parseInt(hex, 16);
                const dec1 = hexToDecimal(res.data);
                setBal(dec1);
            } else {
                dispatch({ type: 'HIDE_LOADER' });
            }
    }

    return (isLoading ? <PlaceHolder btnColor={btnColor}/> : (assets.length > 0 ? (
        <div className="mt-4">
            <div className="row mx-0 justify-content-center">
                <h4 className="text-center mb-4">{ 'Your Assets' }</h4>
                {assets.map(el => <div key={el._id} className="col-md-3 col-12 card mx-3 shadow-lg p-3 mb-5" >
                    <img src={el.image} className="card-img-top" alt={el.asset} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
                    }} style={{ height: "15rem" }} />
                    <div className="card-body">
                        <h5 className="card-title">{el.asset}</h5>
                        <p>{el.type}</p>
                        <p className="card-text">{el.description}</p>
                        <p className="card-text">Price : {el.price} ECT</p>
                    </div>
                </div>)}
                
            </div>
            {showToast && <Toast className={classProp} msg={toastMsg} showToast={showToast} />}
        </div>
    ) : (<div><NoAssets/>
            {showToast && <Toast className={classProp} msg={toastMsg} showToast={showToast} />}
    </div>)))
}

export default YourAsset;