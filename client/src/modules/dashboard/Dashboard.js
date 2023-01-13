import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from "../../common/components/Toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const { userId } = useSelector(state => state);
    const [ toastMsg, setToastMsg] = useState('');
    const [ classProp, setClassProp] = useState('');
    const [showToast, setShowToast ] = useState(false);

    const addAsset = () => {
        // const toast = document.getElementById('liveToast');
        const formData = document.getElementById("assetForm")
        axios.post('http://localhost:5000/product/create', {
            name: formData.asset.value,
            type: formData.type.value,
            price: formData.price.value,
            description: formData.desc.value,
            image: formData.img.value,
            from: sessionStorage.getItem("userId"),
        }).then(res => {
            setShowToast(true);
            setClassProp('bg-success show');
            setToastMsg(res.data);
            setTimeout(() => setShowToast(false), 3000);
        }).catch(error => {
            setShowToast(true);
            setClassProp('bg-danger show');
            setToastMsg(error.response.data);
            setTimeout(() => setShowToast(false), 3000);
        });
    }
    return (<div>
        <div className="row mx-0 mt-4 px-5 justify-content-center">
            <div className="col-12 col-md-3" role="button" data-bs-toggle="modal" data-bs-target="#registerAsset">
                <div className="card text-dark bg-warning mb-3 shadow-lg">
                    <div className="card-header text-center fw-bold">Asset Registration</div>
                    <div className="card-body">
                        <p className="card-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="190" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3" role="button" onClick={() => navigate('/marketplace')}>
                <div className="card text-dark bg-danger mb-3 shadow-lg">
                    <div className="card-header text-center fw-bold">Asset Market Place</div>
                    <div className="card-body">
                        <p className="card-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="190" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3" role="button" onClick={() => navigate('/wallet')}>
                <div className="card text-dark bg-secondary mb-3 shadow-lg">
                    <div className="card-header text-center fw-bold">Wallet</div>
                    <div className="card-body">
                        <p className="card-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="190" fill="currentColor" className="bi bi-wallet" viewBox="0 0 16 16">
                                <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mx-0 mt-4 px-5 justify-content-center">
            <div className="col-12 col-md-3" role="button" onClick={() => navigate('/asset-history')}>
                <div className="card text-dark bg-success mb-3 shadow-lg">
                    <div className="card-header text-center fw-bold">Asset History</div>
                    <div className="card-body">
                        <p className="card-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="190" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3" role="button" onClick={() => navigate(`/assets`)}>
                <div className="card text-dark bg-primary mb-3 shadow-lg">
                    <div className="card-header text-center fw-bold">Your Assets</div>
                    <div className="card-body">
                        <p className="card-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="230" height="190" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                            </svg>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div className="modal fade" tabIndex="-1" id="registerAsset">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Register your Asset</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="assetForm">
                            <div className='form-group mb-3'>
                                <label htmlFor='asset' className='mb-2'>Asset</label>
                                <input id='asset' type='text' className='form-control' />
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='type' className='mb-2'>Type of Asset</label>
                                <input id='type' type='text' className='form-control' />
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='img' className='mb-2'>Image url</label>
                                <input id='img' type='text' className='form-control' />
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='desc' className='mb-2'>Description</label>
                                <textarea id='desc' type='text' className='form-control' />
                            </div>
                            <div className='form-group mb-3 mt-3'>
                                <label htmlFor='price' className='mb-2'>Quote your price</label>
                                <input id='price' type='text' placeholder="Enter amount in tokens" className='form-control' />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => addAsset()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        {showToast && <Toast className={classProp} msg={toastMsg} showToast={showToast}/>}
    </div>)
}

export default Dashboard;