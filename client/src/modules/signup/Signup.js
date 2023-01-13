import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [err, setError] = useState(null);
    const formSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target.name, e.target.email, e.target.pwd);
        axios.post("http://localhost:5000/register", {name: e.target.email.value, password: e.target.pwd.value}).then(res => {
            if(res.status === 200){
                navigate('/');
            }
        }).catch(error => {
            setError(error.response.data);
        });
    }

    return (<div className='d-flex justify-content-center'>
        <form className='m-5 p-4 border shadow-lg' style={{flexBasis: '36%'}} onSubmit={(e) =>formSubmit(e)}>
        {err && <div className='alert alert-danger text-center'>{err}</div>}
        <h3 className='mb-3'>Create an Account</h3>
            <div className='form-group mb-3'>
                <label htmlFor='name' className='mb-2'>Name</label>
                <input id='name' type='text' className='form-control'/>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='email' className='mb-2'>Email</label>
                <input id='email' type='email' className='form-control'/>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='pwd' className='mb-2'>Password</label>
                <input id='pwd' type='password' className='form-control'/>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='cpwd' className='mb-2'>Confirm Password</label>
                <input id='cpwd' type='password' className='form-control'/>
            </div>
            <div className='d-flex justify-content-end mt-4'>
            <button className='btn btn-primary mx-2' type="button" onClick={() => navigate('/')}>Login</button>
                <button className='btn btn-success' type="submit">Signup</button>
            </div>
        </form>
    </div>)
}

export default Signup;