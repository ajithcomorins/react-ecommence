import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setlogoutDetails, setuserDetails, setproductDetails } from "./Counterslice";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Counter() {
  const { value, logoutDetails, current_user, userDetails } = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    usertable();
  }, [logoutDetails])
  if(logoutDetails == false){
    navigate('/')
  }
  const usertable = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/multi_read");
    dispatch(setuserDetails(data))
  }
  const productpage = () =>{
    navigate('/product')
  }
  const newproduct = () =>{
    navigate('/newproduct')
  }
  const logout = () =>{
    dispatch(setlogoutDetails(false))
    navigate('/')
  }
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="navbar-brand btn btn-primary">Home</button>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                    <h5 className="nav-link bg-dark text-white">{current_user[0].name}</h5>
                <button type='button' className="btn btn-info m-2" onClick={() => logout()}>logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <button
          aria-label="Decrement value"
          className="btn btn-success m-2"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{value}</span>
        <button
          aria-label="Increment value"
          className="bt btn-danger m-2"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
         <button className="btn btn-warning m-2" onClick={()=> productpage()}>allProduct</button>
         <button className="btn btn-secondary m-2" onClick={()=>newproduct()}>New Product</button>
      </div>
      <div className='text-center mt-5'>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">content</th>
              <th scope="col">user_id</th>
            </tr>
          </thead>
          <tbody>
            {userDetails && userDetails.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.content}</td>
                  <td>{data.user_id}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}