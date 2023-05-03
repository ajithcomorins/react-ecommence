import { createSlice } from "@reduxjs/toolkit";


export const Counterslice = createSlice({
    name : "counter",
    initialState:{
        value:0,
        login:"",
        loginDetails:{
            name:'',
            password:''
        },
        logoutDetails:false,
        registerDetails:{
            name:"",
            email:"",
            job_desc:"",
            salary:"",
            employee_id:"",
            branch_id:""
        },
        adminregister:{
            name:'',
            email:"",
            mobile:"",
            password:""
        },
        otpverify:{
            email:"",
            otp:''
        },
        current_user:"",
        userDetails:"",
        productDetails:"",
        todolist:{
            task:""
        },
        todogetvalue:"",
        todoupdate:{
            id:"",
            task:""
        },
        new_product:{
            category:'',
            title:'',
            description:'',
            price:'',
            image:'',
            mimetype:'',
            pic_name:''
        },
        ownproduct:'',
        addcardname:'',
        addcardimage:'',
        filterproduct:'',
        searchtext:{
            search:''
        },
        addshop:0,
        clickaddshop:'',
        totalshop:'',
        totalamount:''
    },
    reducers : {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        setloginDetails:(state,action)=>{
            state.loginDetails = action.payload
        },
        setlogoutDetails:(state,action)=>{
            state.logoutDetails = action.payload
        },
        setregisterDetails:(state,action)=>{
            state.registerDetails = action.payload
        },
        setadminregisterDetails:(state,action)=>{
            state.adminregister = action.payload
        },
        setotpverifyDetails:(state,action)=>{
            state.otpverify = action.payload
        },
        setcurrentUser:(state,action)=>{
            state.current_user = action.payload
        },
        setuserDetails:(state,action)=>{
            state.userDetails = action.payload
        },
        setproductDetails:(state,action)=>{
            state.productDetails = action.payload
        },
        settodolistDetails:(state,action) => {
            state.todolist = action.payload
        },
        settodogetvalueDetails:(state,action)=>{
            state.todogetvalue = action.payload
        },
        settodoupdateDetails:(state,action)=>{
            state.todoupdate = action.payload
        },
        setnewproductdetails:(state,action)=>{
            state.new_product = action.payload
        },
        setownproductDetails:(state,action)=>{
            state.ownproduct = action.payload
        },
        setaddcardnameDetails:(state,action)=>{
            state.addcardname = action.payload
        },
        setaddcardimageDetails:(state,action)=>{
            state.addcardimage = action.payload
        },
        setsearchtextDetails:(state,action)=>{
            state.searchtext = action.payload
        },
        setfilterproduct:(state,action)=>{
            state.filterproduct = action.payload
        },
        setaddshopDetails :(state)=>{
            state.addshop += 1
        },
        setdeleteshopDetails :(state)=>{
            state.addshop -= 1
        },
        // setclickaddshopDetails:(state,action)=>{
        //     const itemIndex = state.clickaddshop.findIndex(
        //         (item) => item.id === action.payload.id
        //     );
        //     if(itemIndex>=0){
        //         state.clickaddshop[itemIndex].cardQuantity += 1;
        //     }else{
        //         const tempProduct = {...action.payload, cardQuantity:1}
        //         state.clickaddshop.push(tempProduct)
        //     }
        // }
        setclickaddshopDetails:(state,action)=>{
                state.clickaddshop = action.payload
        },
        settotalshopDetails:(state,action)=>{
            state.totalshop = action.payload
        },
        settotalamountDetails:(state,action)=>{
            state.totalamount = action.payload
        }
    }
}) 

export const {increment, decrement, incrementByAmount,setloginDetails,setlogoutDetails,setregisterDetails,setadminregisterDetails,setotpverifyDetails,setcurrentUser,setuserDetails,setproductDetails,settodolistDetails,settodogetvalueDetails,settodoupdateDetails,setnewproductdetails,setownproductDetails,setaddcardnameDetails,setaddcardimageDetails,setsearchtextDetails,setaddshopDetails,setclickaddshopDetails,settotalshopDetails,settotalamountDetails,setdeleteshopDetails,setfilterproduct} = Counterslice.actions
export default Counterslice.reducer

