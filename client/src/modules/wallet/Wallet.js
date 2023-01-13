/* global BigInt */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from "../../common/components/Loader";
import { actionCall } from "../../common/actions";
import Toast from "../../common/components/Toast";

const Wallet = () => {
    const owner = useSelector(state => state.userId);
    const dispatch = useDispatch();
    const [toastMsg, setToastMsg] = useState('');
    const [classProp, setClassProp] = useState('');
    const [showToast, setShowToast] = useState(false);
    const { isLoading, accountDetails } = useSelector(state => state);
    const [bal,setBal] = useState(0);
    const [isData,setData]= useState(false);
    useEffect(() => {
        actionCall(owner);
    }, []);

   
    const actionCall =  async(dispatch) => {
        setData(true);
        const res = await axios.post('http://localhost:5000/token/balance', { address:sessionStorage.getItem("userId") })
        if (res.status === 200) {
            
                setBal(BigInt(`0x${res.data}`).toString(10));
                
            } else {
                dispatch({ type: 'HIDE_LOADER' });
            }
    }

    const addToken = async () => {
        const tokenForm = document.getElementById('tokenForm');
        const res = await axios.post('http://localhost:5000/mint', { addr:sessionStorage.getItem("userId") })
        if (res.status === 200) {
            setShowToast(true);
            setClassProp('bg-success show');
            setToastMsg(res.data);
            setTimeout(() => setShowToast(false), 3000);
            actionCall(owner);
        }else {
            setShowToast(true);
            setClassProp('bg-danger show');
            setToastMsg(res.error.response.data);
            setTimeout(() => setShowToast(false), 3000);
        }
    }
    return (isLoading ? <Loader /> : (
        <div>
            <h4 className="d-flex justify-content-center">Your Wallet</h4>
            <div className="text-center m-5 p-4 border shadow-lg ">
                
                <div className="row mx-0 mb-4">
                    <div className="col-6">
                        Token Balance:
                    </div>
                    <div className="col-6">
                        {bal} ECT
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-primary"  onClick={addToken} >Buy Tokens</button>
                </div>
            </div>
            <div className="modal fade" tabIndex="-1" id="addToken">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ADD TOKENS</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="tokenForm">
                                <div className='form-group mb-3'>
                                    <label htmlFor='token' className='mb-2'>Number of Tokens</label>
                                    <input id='token' type='number' min={1} className='form-control' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addToken}>Add Tokens</button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <Toast className={classProp} msg={toastMsg} showToast={showToast} />}

        </div>))
}

export default Wallet;