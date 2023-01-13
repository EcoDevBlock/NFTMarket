import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { actionCall } from "../../common/actions";

import { useNavigate } from 'react-router-dom';
import Grower from "./Grower";

const Sidebar = () => {
    const { userId, accountDetails } = useSelector(state => state);
    const dispatch = useDispatch();
    const [ loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        dispatch(actionCall(userId, 'sidebar'));
        setTimeout(() =>setLoader(false), 300);
    }, [])

    const navigate = useNavigate();
    return (<div className="d-flex flex-column flex-shrink-0 p-3 bg-light border" style={{ width: "280px", position: 'absolute', top: '100%', right: '0', zIndex: '999' }}>
        <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <span className="fs-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="26" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>Account Details</span>
        </span>
        <hr />
        {loader? <Grower/> : <ul className="nav nav-pills flex-column mb-auto">
            
            <li>
                <button className="nav-link link-dark" onClick={() => navigate('/')}>
                    Logout
                </button>
            </li>
        </ul>}
    </div>)
}
export default Sidebar;