import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setotpverifyDetails } from './Counterslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Adminotp() {
    const {adminregister,otpverify} = useSelector((state)=>state.counter)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[otp,setOtp] = useState("");
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);

    const verify = async() =>{
        const {data} = await axios.post("http://127.0.0.1:5000/verify_otp",otpverify)
        if(data == "success"){
            navigate('/newproduct')
        }else{
            toast(<div><i class="fa fa-thumbs-down"></i><p>OTP wrong</p></div>)
            navigate('/otp')
        }
    }
    const resendotp = async() =>{
        toast(<div><i class="fa fa-thumbs-up"></i><p>resend OTP</p></div>)
        setMinutes(0);
        setSeconds(59);
        const {data} = await axios.post('http://127.0.0.1:5000/resendotp',{email:otpverify.email})
        console.log(data)
        if(data == "success"){
            navigate('/newproduct')
        }else{
            toast(<div><i class="fa fa-thumbs-down"></i><p>OTP wrong</p></div>)
            navigate('/otp')
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

      console.log(otpverify)
    return (
        <div className='container w-50'>
            <div className='card p-3 mt-4'>
                <form>
                    <div class="mb-3">
                        <label className="form-label" >Email address</label>
                        <input type="email" className="form-control" placeholder="Enter Email" value={adminregister.email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >Verify OTP</label>
                        <input className="form-control" placeholder="Enter OTP" onChange={(e)=> dispatch(setotpverifyDetails({...otpverify,otp:e.target.value}))}/>
                    </div>
                    <div className="countdown-text">
                            {seconds > 0 || minutes > 0 ? (
                                <div className='text-center'>
                                    <p className='text-center'>
                                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                    <button type='button' className='btn btn-primary' onClick={()=>verify()}>Verify</button>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p>Didn't recieve code?</p>,
                                    <button type='button' className='btn btn-danger text-white' onClick={()=>resendotp()}>
                                    Resend OTP
                                </button>
                            </div>
                            )}
                        </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Adminotp