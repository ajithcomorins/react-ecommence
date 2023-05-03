import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setaddcardnameDetails,setaddcardimageDetails,setlogoutDetails, setaddshopDetails,setclickaddshopDetails } from './Counterslice';

function Cardadd() {
    const { addcardname,addcardimage,current_user,addshop,clickaddshop} = useSelector((state)=>state.counter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams()
    const back = () =>{
        navigate('/newproduct')
    }
    const viewdetails = async() =>{
        const id = params.id;
        const {data} = await axios.get(`http://127.0.0.1:5000/product_data/${id}`)
        dispatch(setaddcardnameDetails(data))
    }
    const viewimage = async ()=>{
        const id = params.id
        const url = `http://127.0.0.1:5000/product_image/${id}`
        dispatch(setaddcardimageDetails(url));
    }
    const addcard = (data)=>{
      dispatch(setaddshopDetails());
      const shopcollection = dispatch(setclickaddshopDetails([...clickaddshop,addcardname]))    
    }
    const shopdetails = ()=>{
      navigate('/shopcollection')
    }
    useEffect(()=>{
        viewdetails()
        viewimage()
    },[])
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="btn btn-primary" onClick={()=> back()}>BACK</button>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                    {/* <h5 className="nav-link">{current_user[0].name}</h5> */}
                  <button className='btn btn-info m-1'  onClick={()=>shopdetails()}><i class="fa fa-shopping-cart" style={{fontSize:30,margin:10}}><sup >{addshop}</sup></i></button>
                <button type='button' onClick={() => dispatch(setlogoutDetails(false))}>logout</button>
              </div>
            </div>
          </div>
        </nav>
        <h1>Purchase Page</h1>
        <div className='row m-0'>
            <div className='col-6 h-50'>
                <img src={addcardimage} alt="image" className='w-100 h-100 text-center m-3'/>
                <div className='text-center'>
                    <button className='btn btn-success'value={addcardname.id} onClick={()=>addcard(addcard)}>Add Card</button>
                </div>
            </div>
            <div className='col-6 p-4'>
               <h4>Category:<b>{addcardname.category}</b></h4>
               <h4>Title:<b>{addcardname.title}</b></h4>
               <h4>Description:<b>{addcardname.description}</b></h4>
               <h4>Price:<b>{addcardname.price}</b></h4>
            </div>
        </div>
    </div>
  )
}

export default Cardadd