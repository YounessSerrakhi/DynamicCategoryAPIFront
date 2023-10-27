import { Routes,Route, useNavigate } from 'react-router-dom';
import './App.css';
import AddType from './Components/AddType';
import AddProduct from './Components/AddProduct';
import { useEffect } from 'react';


function App() {
  const navigate = useNavigate()
useEffect(() =>{
     navigate("/")
     document.title = "Dynamic Type"
},[])
  return (
    <div className="App">
        <Routes>
          <Route path='/createProduct' element={<AddProduct/>} />
          <Route path='/' element={<AddType/>} />
        </Routes>
    </div>

  );
}

export default App;
