import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setnewproductdetails, setownproductDetails, setlogoutDetails, setsearchtextDetails, setaddshopDetails, setclickaddshopDetails, setfilterproduct } from './Counterslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Add_product() {
    const { new_product, ownproduct, logoutDetails, current_user, searchtext, addshop, clickaddshop, filterproduct } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const back = () => {
        navigate('/counter')
    }
    // if(logoutDetails == false){
    //     navigate('/')
    //   }
    const addone = async () => {
        let data;
        const formData = new FormData();
        formData.append('category', new_product.category)
        formData.append('title', new_product.title)
        formData.append('description', new_product.description)
        formData.append('price', new_product.price)
        formData.append('image', new_product.image)
        formData.append('mimetype', new_product.mimetype)
        formData.append('pic_name', new_product.pic_name)
        await axios.post('http://127.0.0.1:5000/product_add', formData, {
            header: {
                Accept: "application/json",
                "Content-type": "multiple/form-data",
            },
        }).then((response) => (data = response))
        add_ownproduct()
    }
    const add_ownproduct = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/product_read')
        dispatch(setownproductDetails(data))
        dispatch(setfilterproduct(""))
    }
    const handleInput = () => {
        return ownproduct.filter((item) =>
            item.title.toLowerCase().includes(searchtext.search) || item.category.toLowerCase().includes(searchtext.search) || item.price.toLowerCase().includes(searchtext.search))
    }
    const clickadd = (data) => {
        dispatch(setaddshopDetails());
        const shopcollection = dispatch(setclickaddshopDetails([...clickaddshop, data]))
        toast(<div><i class="fa fa-thumbs-up"></i><p>Success Add Card</p></div>)
    }
    const shopdetails = () => {
        navigate('/shopcollection')
    }
    const logout = () => {
        dispatch(setlogoutDetails(false))
        navigate('/')
    }
    const all = () => {
        add_ownproduct()
    }
    const bike = () => {
        let bikeArr = []
        ownproduct && ownproduct.map((data, index) => {
            if (data.title == 'BIKE') {
                bikeArr.push(data)
            }
        })
        console.log(bikeArr)
        dispatch(setfilterproduct(bikeArr))
    }
    const watch = () => {
        let watchArr = []
        ownproduct && ownproduct.map((data, index) => {
            if (data.title == 'WATCH') {
                watchArr.push(data)
            }
        })
        console.log(watchArr)
        dispatch(setfilterproduct(watchArr))
    }
    const shoes = () => {
        let shoesArr = []
        ownproduct && ownproduct.map((data, index) => {
            if (data.title == 'SHOES') {
                shoesArr.push(data)
            }
        })
        console.log(shoesArr)
        dispatch(setfilterproduct(shoesArr))
    }
    useEffect(() => {
        add_ownproduct()
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
                            <button className='btn btn-info m-1' onClick={() => shopdetails()}><i class="fa fa-shopping-cart" style={{ fontSize: 30, margin: 10 }}><sup >{addshop}</sup></i></button>
                            <button type='button' className='btn btn-info m-1' onClick={() => logout()}>logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className='row m-4'>
                <div className='col-4'>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add_New
                    </button>
                </div>
                <div className='col-4'>
                    <button className='btn btn-info m-2 text-white' onClick={() => all()}>All</button>
                    <button className='btn btn-info m-2 text-white' onClick={() => bike()}>Bike</button>
                    <button className='btn btn-info m-2 text-white' onClick={() => watch()}>Watch</button>
                    <button className='btn btn-info m-2 text-white' onClick={() => shoes()}>Shoes</button>
                </div>
                <div className='col-4'>
                    <div class="form-group form-input-fields form-group-lg has-feedback">
                        <label class="sr-only" for="search">Search</label>
                        <div class="input-group">
                            <input type="text" class="form-control input-search" name="text" id="search" placeholder="Search" onChange={(val) => dispatch(setsearchtextDetails({ ...searchtext, search: val.target.value }))} />
                            <span class="input-group-addon group-icon"> <span class="glyphicon glyphicon-user"></span>
                            </span>
                            {/* <button type="submit" class="btn btn-lg btn-success btn-submit" onClick={() => filterProduct()}>
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New_Product</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form enctype="multipart/form-data">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Category</label>
                                    <input type="text" class="form-control" name='category' id="category" aria-describedby="emailHelp" value={new_product.category} onChange={(e) => dispatch(setnewproductdetails({ ...new_product, category: e.target.value }))} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Title</label>
                                    <input type="tetx" class="form-control" name='title' id="title" value={new_product.title} onChange={(e) => dispatch(setnewproductdetails({ ...new_product, title: e.target.value }))} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Description</label>
                                    <input type="tetx" class="form-control" name='description' id="description" value={new_product.description} onChange={(e) => dispatch(setnewproductdetails({ ...new_product, description: e.target.value }))} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Price</label>
                                    <input type="tetx" class="form-control" name='price' id="price" value={new_product.price} onChange={(e) => dispatch(setnewproductdetails({ ...new_product, price: e.target.value }))} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Image</label>
                                    <input type="file" class="form-control" name='image' id="file" onChange={(e) => dispatch(setnewproductdetails({ ...new_product, image: e.target.files[0] }))} />
                                    <input type="hidden" class="form-control" name='miimetype' id="file" onChange={(e) => dispatch(setnewproductdetails({ ...new_product, mimetype: e.target.files[0].type }))} />
                                    <input type="hidden" class="form-control" name='pic_name' id="file" onChange={(e) => dispatch(setnewproductdetails({ ...new_product, pic_name: e.target.files[0].name }))} />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addone}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row align-self-stretch m-0">
                    {filterproduct.length > 1 ? (<>
                        {filterproduct.map((data, index) => {
                            return (
                                <div className="col-3 p-3">
                                    <div className="card h-100 rounded border-0">
                                        <img src={`data:image/jpeg;base64,${data.image}`} className="card-img-top h-100 p-2" alt="..." />
                                        <div className="card-body">
                                            <h6><b>Category:</b>{data.category}</h6>
                                            <h5 className="card-title"><b>Title:</b>{data.title}</h5>
                                            <p className="card-text"><b>Description:</b>{data.description}</p>
                                            <p className="card-text"><b>Price:</b>{data.price}</p>
                                            <button className='btn btn-primary m-2' id={data.id} value={data.id} onClick={() => clickadd(data)}>Add</button>
                                            <Link to={`/cardadd/${data.id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>) : (<>
                        {ownproduct && ownproduct && handleInput().map((data, index) => {
                            return (
                                <div className="col-3 p-3">
                                    <div className="card h-100 rounded-3 border-0">
                                        <img src={`data:image/jpeg;base64,${data.image}`} className="card-img-top h-100 p-2" alt="..." />
                                        <div className="card-body">
                                            <h6><b>Category:</b>{data.category}</h6>
                                            <h5 className="card-title"><b>Title:</b>{data.title}</h5>
                                            <p className="card-text"><b>Description:</b>{data.description}</p>
                                            <p className="card-text"><b>Price:</b>{data.price}</p>
                                            <button className='btn btn-primary m-2' id={data.id} value={data.id} onClick={() => clickadd(data)}>Add</button>
                                            <Link to={`/cardadd/${data.id}`}><button className="btn btn-primary">View Details</button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>)}

                    <ToastContainer />
                </div>
            </div>

        </div>
    )
}

export default Add_product