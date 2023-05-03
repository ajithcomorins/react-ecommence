import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { Counter } from './component/Counter';
import Login from './component/login';
import Register from './component/Register';
import Product from './component/Product';
import Todo from './component/Todo';
import Add_product from './component/Add_product';
import Cardadd from './component/Cardadd';
import Totalshop from './component/Totalshop';
import Payment from './component/Payment';
import Adminregister from './component/Adminregister';
import Adminotp from './component/Adminotp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/adminregister' element={<Adminregister />} />
        <Route path='/otp' element={<Adminotp />} />
        <Route path='/counter'  element={<Counter />}/>
        <Route path='/product'  element={<Product />}/>
        <Route path='/todolist'  element={<Todo />}/>
        <Route path='/newproduct' element={<Add_product />} />
        <Route path='/cardadd/:id' element={<Cardadd />} />
        <Route path='/shopcollection' element={<Totalshop />} />
        <Route path='/payment' element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
