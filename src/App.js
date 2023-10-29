import { Routes,Route, useNavigate } from 'react-router-dom';
import './App.css';
import AddType from './Components/AddType';
import AddProduct from './Components/AddProduct';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Catalog from './Components/Catalog';


function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path='/addType' element={<AddType/>} />
          <Route path='/catalog' element={<Catalog/>} />
        </Routes>
    </div>

  );
}

export default App;
