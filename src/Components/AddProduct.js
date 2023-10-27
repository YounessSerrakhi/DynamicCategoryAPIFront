import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [selectedType, setSelectedType] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  const [types, setTypes] = useState([]);
  const [productData, setProductData] = useState({});
  const [productName, setProductName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/api/types/getAllTypes')
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching types:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      // Fetch the characteristics for the selected type
      axios.get(`http://localhost:8081/api/types/getType/${selectedType}`)
        .then((response) => {
          setCharacteristics(response.data.caracteristics);
        })
        .catch((error) => {
          console.error('Error fetching characteristics:', error);
        });
    } else {
      setCharacteristics([]);
    }
  }, [selectedType]);
  const handleCharacteristicChange = (e, characteristicId) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [characteristicId]: { ...prevData[characteristicId], [name]: value },
    }));
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = () => {
    // Create a product object to send to the API
    const product = {
      typeId: selectedType,
      characteristics: productData,
    };

    // Send the product data to the API
    axios.post('http://localhost:8081/api/products/addProduct', product)
      .then((response) => {
        console.log('Product added:', response.data);
        // Reset form or show a success message
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        // Handle the error, e.g., display an error message
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <div className="form-floating mb-3 col-md-12">
        <input
          type="text"
          className="form-control"
          id="typeName"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="name@example.com"
        />
        <label htmlFor="typeName">Product Name</label>
      </div>
      <div>
        <label>Select a type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select a type</option>
          {types.map((type) => (
            <option key={type.typeId} value={type.typeId}>
              {type.typeName}
            </option>
          ))}
        </select>
      </div>
      <h2>Characteristics:</h2>
      {characteristics.map((characteristic) => (
        <div key={characteristic.caracteristicId}>
          <label>{characteristic.caracteristicName}:</label>
          {characteristic.caracteristicType === 'Text' && (
            <input
              type="text"
              name="caracteristicName"
              value={productData[characteristic.caracteristicId]?.caracteristicName || ''}
              onChange={(e) => handleCharacteristicChange(e, characteristic.caracteristicId)}
            />
          )}
          {characteristic.caracteristicType === 'Number' && (
            <input
              type="number"
              name="caracteristicName"
              value={productData[characteristic.caracteristicId]?.caracteristicName || ''}
              onChange={(e) => handleCharacteristicChange(e, characteristic.caracteristicId)}
            />
          )}
          {characteristic.caracteristicType === 'Date' && (
            <input
              type="date"
              name="caracteristicName"
              value={productData[characteristic.caracteristicId]?.caracteristicName || ''}
              onChange={(e) => handleCharacteristicChange(e, characteristic.caracteristicId)}
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
};

export default AddProduct;
