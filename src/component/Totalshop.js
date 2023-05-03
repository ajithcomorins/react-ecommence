import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setclickaddshopDetails, settotalamountDetails,setlogoutDetails,setdeleteshopDetails } from './Counterslice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Totalshop() {
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const { clickaddshop, totalamount,addshop, } = useSelector((state) => state.counter);
    const back = () => {
        navigate('/newproduct')
    }
    const payment = () =>{
        navigate('/payment')
    }
    const shopview = () => {
        dispatch(setclickaddshopDetails(clickaddshop))
        let total = 0;
        let totalamounts =0;
        for (let i = 0; i < clickaddshop.length; i++) {
            var sum = clickaddshop[i].price
            var amount = sum.replace(/[^a-zA-Z0-9 ]/g, '');
            total += parseInt(amount)
            totalamounts = total.toLocaleString()
            dispatch(settotalamountDetails(totalamounts))
        }
    }
    const deleteitem = (id)=>{
        let total = 0;
        let totalamount = 0;
        const newArr = clickaddshop.filter(object => {
            return object.id !== id;
        });
        for (let i = 0; i < newArr.length; i++) {
            var sum = newArr[i].price
            console.log("sum",sum)
            var amount = sum.replace(/[^a-zA-Z0-9 ]/g, '');
            total -= parseInt(amount)
            totalamount = total.toLocaleString();
            dispatch(settotalamountDetails(totalamount))
        }
        dispatch(setdeleteshopDetails())
        dispatch(setclickaddshopDetails(newArr))
        toast(<div><i class="fa fa-trash"></i><p>Delete Card</p></div>)
    }
    useEffect(() => {
        shopview()
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button type="button" class="btn btn-primary m-2" onClick={() => back()}>
                        back
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            {/* <h5 className="nav-link">{current_user[0].name}</h5> */}
                            <button className='btn btn-info m-1'><i class="fa fa-shopping-cart" style={{fontSize:30,margin:10}}><sup >{addshop}</sup></i></button>
                            <button type='button' className='btn btn-info m-1' onClick={() => dispatch(setlogoutDetails(false))}>logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="row align-self-stretch w-75 mx-auto ms-auto">
                {clickaddshop && clickaddshop.map((data, index) => {
                    return (
                        <>
                            <div className='col-4 card'>
                                <img src={`data:image/jpeg;base64,${data.image}`} className="card-img-top h-100" alt="..." />
                            </div>
                            <div className='col-4 card p-3'>
                                <h6><b>Category:</b>{data.category}</h6>
                                <h5 className="card-title"><b>Title:</b>{data.title}</h5>
                                <p className="card-text"><b>Description:</b>{data.description}</p>
                                <p className="card-text"><b>Price:</b>{data.price}</p>
                            </div>
                            <div className='col-4 card p-5'>
                                <button className='btn btn-primary m-2' value={data.id} onClick={()=>deleteitem(data.id)}>Delete</button>
                            </div>
                        </>
                    )
                })}
                <div>
                    {((addshop == 0) ? <div><h1 className='text-center'>NO ANY PURCHASES</h1></div>:<div><button className='btn btn-success text-start m-2'>Total Amount:${totalamount}</button><button className='btn btn-info text-end m-2' onClick={payment}>PAY</button></div> )}
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Totalshop