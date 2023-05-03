import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setcurrentUser, setloginDetails,setlogoutDetails } from './Counterslice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loginDetails,logoutDetails} = useSelector((state)=>state.counter)
    const login = async() =>{
        const {data} = await axios.post('http://127.0.0.1:5000/multi_login',loginDetails);
        console.log(data)
        if(data.status == "success"){
            dispatch(setlogoutDetails(true))
            dispatch(setcurrentUser(data.data))
            dispatch(setloginDetails({...loginDetails,name:"",password:""}))
                navigate('/counter')   
        }
    }
    const register =() =>{
        navigate('register')
    }
    const adminregister =() =>{
        navigate('adminregister')
    }
    return (
        <div className='bg-info' style={{height:'100vh'}}>
            <div className='container'>
                <h1 className='text-center'>Login</h1>
                <form className='container w-50'>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Email address</label>
                        <input type="text" id="form2Example1" class="form-control" request onChange={(e)=>{dispatch(setloginDetails({...loginDetails,name:e.target.value}))}}/>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example2">Password</label>
                        <input type="password" id="form2Example2" class="form-control" request onChange={(e)=>{dispatch(setloginDetails({...loginDetails,password:e.target.value}))}}/>
                    </div>
                    <div className='text-center'>
                        <button type='button' className='btn btn-primary m-2' onClick={()=>login()}>login</button>
                    </div>
                    <div className='text-center'>
                        <button type='button' className='btn btn-success' onClick={()=>register()}>Register</button>
                    </div>
                    <div className='text-center'>
                        <button type='button' className='btn btn-danger mt-3' onClick={()=>adminregister()}>Admin Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login