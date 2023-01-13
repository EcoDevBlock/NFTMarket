import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../../common/components/Loader';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state);
    const [err, setError] = useState(null);
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch({type: 'SHOW_LOADER'});
        axios.post("http://localhost:5000/login", { name: e.target.email.value, password: e.target.pwd.value }).then(res => {
            if (res.status === 200) {
                console.log(res.data.address);
                sessionStorage.setItem("userId",res.data.address);
                dispatch({ type: 'SAVE_USER_ID', payload: res.data.userId});
                dispatch({ type: 'HIDE_LOADER'});
                navigate('/dashboard');
            }
        }).catch(error => {
            console.log(error.response.data);
            dispatch({ type: 'HIDE_LOADER'});
            setError(error.response.data)
        }
        )
    }
    const userSignup = () => {
        navigate('/signup');
    }
    return (isLoading? <Loader/> : (<div className='d-flex justify-content-center'>
        <form className='m-5 p-4 border shadow-lg' style={{ flexBasis: '36%' }} onSubmit={(e) => formSubmit(e)}>
            {err && <div className='alert alert-danger text-center'>{err}</div>}
            <h3 className='mb-3'>Login to Your Account</h3>
            <div className='form-group mb-3'>
                <label htmlFor='email' className='mb-2'>Email</label>
                <input id='email' type='email' className='form-control' />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='pwd' className='mb-2'>Password</label>
                <input id='pwd' type='password' className='form-control' />
            </div>
            <div className='d-flex justify-content-end mt-4'>
                <button className='btn btn-primary mx-2' type="button" onClick={userSignup}>Signup</button>
                <button className='btn btn-success' type="submit">Login</button>

            </div>
        </form>
    </div>))
}

export default Login;