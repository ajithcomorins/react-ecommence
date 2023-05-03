import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setadminregisterDetails, setotpverifyDetails } from './Counterslice'

function Adminregister() {
    const { adminregister } = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminregi = async () => {
        const { data } = await axios.post("http://127.0.0.1:5000/registerotp", adminregister)
        if (data.status == "success") {
            dispatch(setotpverifyDetails({ email: adminregister.email }))
            navigate('/otp')
        }
    }
    return (
        <div className=' register-bg'>
            <div className='container w-50'>
                <div className='row m-0 pt-5'>
                    <div className='col-12 card p-3'>
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" onChange={(e) => dispatch(setadminregisterDetails({ ...adminregister, name: e.target.value }))} />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email address</label>
                                <input type="email" class="form-control" onChange={(e) => dispatch(setadminregisterDetails({ ...adminregister, email: e.target.value }))} />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Mobile_number</label>
                                <input type="text" class="form-control" onChange={(e) => dispatch(setadminregisterDetails({ ...adminregister, mobile: e.target.value }))} />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" onChange={(e) => dispatch(setadminregisterDetails({ ...adminregister, password: e.target.value }))} />
                            </div>
                            <div className='text-center'>
                                <button type="button" class="btn btn-primary" onClick={() => adminregi()}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Adminregister