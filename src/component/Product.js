import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { setproductDetails } from './Counterslice';
import { useNavigate } from 'react-router-dom';

function Product() {
    const { productDetails } = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usertable = async () => {
        const { data } = await axios.get("https://fakestoreapi.com/products/");
        dispatch(setproductDetails(data))
    }
    useEffect(() => {
        usertable()
    })
    const back = ()=>{
        navigate('/counter')
    }
    const todo = ()=>{
        navigate('/todolist')
    }
    return (
        <div>
            <button onClick={()=> back()}>Back</button>
            <button onClick={()=>todo()}>Todo</button>
            <h1>Product page</h1>
            <div className="row align-self-stretch m-0">
                {productDetails && productDetails.map((data, index) => {
                    return (
                        <div className="col-3 p-3">
                            <div className="card h-100">
                                <img src={data.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h6>{data.category}</h6>
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text">{data.description}</p>
                                    <button className="btn btn-primary">{data.price}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Product