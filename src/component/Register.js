import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setregisterDetails } from './Counterslice'



function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {registerDetails} = useSelector((state)=>state.counter)
    const new_register = async() =>{
        const {data} = await axios.post("http://127.0.0.1:5000/empolyee_add",registerDetails);
        if(data.status=="success"){
            navigate('/counter')
        }
    }
  return (
    <div className='container'>
    <h1>Register</h1>
    <form className='container'>
    <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">Name</label>
            <input type="text" id="form2Example1" class="form-control" onChange={(e)=>dispatch(setregisterDetails({...registerDetails,name:e.target.value}))}/>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">Email address</label>
            <input type="email" id="form2Example1" class="form-control" request onChange={(e)=>dispatch(setregisterDetails({...registerDetails,email:e.target.value}))}/>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Job_desc</label>
            <input type="text" id="form2Example2" class="form-control" request onChange={(e)=>{dispatch(setregisterDetails({...registerDetails,job_desc:e.target.value}))}}/>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Salary</label>
            <input type="text" id="form2Example2" class="form-control" request onChange={(e)=>{dispatch(setregisterDetails({...registerDetails,salary:e.target.value}))}}/>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Employee_id</label>
            <input type="text" id="form2Example2" class="form-control" request onChange={(e)=>{dispatch(setregisterDetails({...registerDetails,employee_id:e.target.value}))}}/>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Branch</label>
            <input type="text" id="form2Example2" class="form-control" request onChange={(e)=>{dispatch(setregisterDetails({...registerDetails,branch_id:e.target.value}))}}/>
        </div>
        <div className='text-center'>
            <button type='button' onClick={()=>new_register()}>Register</button>
        </div>
    </form>
</div>
  )
}

export default Register