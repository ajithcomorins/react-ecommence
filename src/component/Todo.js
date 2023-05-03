import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { settodogetvalueDetails, settodolistDetails,settodoupdateDetails } from './Counterslice'
import axios from 'axios'

function Todo() {
    const { todolist, todogetvalue,todoupdate } = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = () => {
        navigate('/product')
    }
    const todoadd = async () => {
        const { data } = await axios.post('http://127.0.0.1:5000/todo_add', todolist)
        if (data == "success") {
            dispatch(settodolistDetails({ ...todolist, task: "" }))
        }
        todo_read()
    }
    const todo_read = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/todo_read', todogetvalue)
        dispatch(settodogetvalueDetails(data))
    }
    const todo_update = async()=>{
        const {data} = await axios.put(`http://127.0.0.1:5000/todo_update`,todoupdate)
        if(data.status=="success"){
            dispatch(settodoupdateDetails({...todoupdate,id:"",task:""}))
        }
        todo_read()
    }
    const todo_delete = async(id)=>{
        const {data} = await axios.post(`http://127.0.0.1:5000/todo_delete/${id}`)
        todo_read()
    }
    useEffect(() => {
        todo_read()
    }, [])
    return (
        <div>
            <button onClick={() => back()}>Back</button>
            <h1>Todolist</h1>
            {((todoupdate.task.length>0) ? <input type='text' name='task' value={todoupdate.task} onChange={(e) => dispatch(settodoupdateDetails({ ...todoupdate, task: e.target.value }))} /> : <input type='text' name='task' value={todolist.task} onChange={(e) => dispatch(settodolistDetails({ ...todolist, task: e.target.value }))} />)}
            {(todoupdate.task.length>0) ? <button onClick={todo_update}>update</button> : <button onClick={todoadd}>Add</button>}
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">task</th>
                        <th scope="col">edit</th>
                        <th scope="col">delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todogetvalue && todogetvalue.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.task}</td>
                                <td><button onClick={()=>dispatch(settodoupdateDetails({...todoupdate,id:data.id,task:data.task}))} className='btn btn-info'><i class="fa fa-edit hover-overlay" aria-hidden="true"></i></button></td>
                                <td><button onClick={()=>todo_delete(data.id)} className='btn btn-danger'><i class="fa fa-trash hover-overlay" aria-hidden="true"></i></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Todo