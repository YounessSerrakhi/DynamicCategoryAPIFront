import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddType = () => {
  const [typeName, setTypeName] = useState('');
  const [characteristics, setCharacteristics] = useState([{ caracteristicName: '', caracteristicType: '' }]);
  const navigate = useNavigate();

  const handleTypeNameChange = (event) => {
    setTypeName(event.target.value);
  };

  const handleCharacteristicChange = (event, index) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index][event.target.name] = event.target.value;
    setCharacteristics(updatedCharacteristics);
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, { caracteristicName: '', caracteristicType: '' }]);
  };

  const removeCharacteristic = (index) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics.splice(index, 1);
    setCharacteristics(updatedCharacteristics);
  };

  const handleSubmit = () => {
    const typeData = {
      typeName: typeName,
      characteristics: characteristics,
    };

    // Use Axios for the POST request
    axios.post('http://localhost:8081/api/types/addType', typeData)
      .then((response) => {
        console.log('Type added:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const goToCreateProduct = () =>{
        navigate("/createProduct")
  }

  return(
    





<div className="container">
      <div className='row g-3'>
      <h2 className="mt-3">Add Type</h2>
      <div className="form-floating mb-3 col-md-12">
        <input
          type="text"
          className="form-control"
          id="typeName"
          value={typeName}
          onChange={handleTypeNameChange}
          placeholder="name@example.com"
        />
        <label htmlFor="typeName">Type Name</label>
      </div>
      <h3 className="mt-3">Characteristics:</h3>
      {characteristics.map((characteristic, index) => (
         <><div key={index} className="form-group col-md-4">
          <label htmlFor={`caracteristicName${index}`}>Characteristic Name:</label>
          <input
            type="text"
            className="form-control"
            id={`caracteristicName${index}`}
            name="caracteristicName"
            value={characteristic.caracteristicName}
            onChange={(e) => handleCharacteristicChange(e, index)} />
        </div>
        <div className='col-md-4'>
            <label htmlFor={`caracteristicType${index}`}>Characteristic Type:</label>
            <select
              className="form-control"
              id={`caracteristicType${index}`}
              name="caracteristicType"
              value={characteristic.caracteristicType}
              onChange={(e) => handleCharacteristicChange(e, index)}
            >
                <option value="" disabled selected>
        Select a type
      </option> 
              <option value="Text">Text</option>
              <option value="Double">Double</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className='col-md-2'>
            <button className="btn btn-danger mt-6" onClick={() => removeCharacteristic(index)}>
              Remove
            </button>
            </div>
            <div className='col-md-2'>
            <button className="btn btn-primary" onClick={addCharacteristic}>
        + Add Characteristic
      </button>
            </div>
          </>
      ))}
        <div className='col-md-6'>
      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        Add Type
      </button>
      </div>
      <div className='col-md-6'>
      <button className="btn btn-success mt-3" onClick={goToCreateProduct}>
        Add Product
      </button>
      </div> 
      </div>

    </div>

  );
};

export default AddType;
