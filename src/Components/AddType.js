import React, { useState } from 'react';
import axios from 'axios';
import '../style/Type.css';

const AddType = () => {
  const [typeName, setTypeName] = useState('');
  const [characteristics, setCharacteristics] = useState([{ characteristicName: '', characteristicType: '' }]);

  const handleTypeNameChange = (event) => {
    setTypeName(event.target.value);
  };

  const handleCharacteristicChange = (event, index) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index][event.target.name] = event.target.value;
    setCharacteristics(updatedCharacteristics);
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, { characteristicName: '', characteristicType: '' }]);
  };

  const removeCharacteristic = (index) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics.splice(index, 1);
    setCharacteristics(updatedCharacteristics);
  };

  const handleSubmit = () => {
    const formattedCharacteristics = characteristics.map((characteristic) => ({
      caracteristicName: characteristic.characteristicName,
      caracteristicType: characteristic.characteristicType,
    }));

    const typeData = {
      typeName: typeName,
      characteristics: formattedCharacteristics,
    };

    // Use Axios for the POST request
    axios.post('http://localhost:8081/api/types/addType', typeData)
      .then((response) => {
        console.log('Type added:', response.data);
        // Display an alert for successful addition
        alert('Type added successfully');
        // Reset the fields
        setTypeName('');
        setCharacteristics([{ characteristicName: '', characteristicType: '' }]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-type-container">
      <h2>Add Type</h2>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="typeName"
          value={typeName}
          onChange={handleTypeNameChange}
          placeholder="Type Name"
        />
        <label htmlFor="typeName">Type Name</label>
      </div>

      <div className="mt-4 mb-4">
        <h3>Characteristics:</h3>
        {characteristics.map((characteristic, index) => (
          <div key={index} className="row g-3 mb-3">
            <div className="col-md-5">
              <label htmlFor={`characteristicName${index}`}>Characteristic Name:</label>
              <input
                type="text"
                className="form-control"
                id={`characteristicName${index}`}
                name="characteristicName"
                value={characteristic.characteristicName}
                onChange={(e) => handleCharacteristicChange(e, index)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor={`characteristicType${index}`}>Characteristic Type:</label>
              <select
                className="form-select"
                id={`characteristicType${index}`}
                name="characteristicType"
                value={characteristic.characteristicType}
                onChange={(e) => handleCharacteristicChange(e, index)}
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="Text">Text</option>
                <option value="Double">Double</option>
                <option value="Date">Date</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-danger" onClick={() => removeCharacteristic(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-md-5">
          <button className="btn btn-primary" onClick={addCharacteristic}>
            Add Characteristic
          </button>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success" onClick={handleSubmit}>
            Add Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddType;
