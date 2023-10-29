import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../style/Product.css'; 

const AddProduct = () => {
  const [selectedType, setSelectedType] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  const [types, setTypes] = useState([]);
  const [productData, setProductData] = useState({});
  const [productName, setProductName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleCharacteristicChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
 const handleImageChange = (event) => {
  const file = event.target.files[0];
  setSelectedImage(file);
};

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('image', selectedImage);
  formData.append('product', new Blob([JSON.stringify({
    typeId: selectedType,
    productName: productName,
    characteristics: productData,
  })], { type: 'application/json' }));

  axios.post('http://localhost:8081/api/products/addProduct', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      alert('Product added successfully!');
      setSelectedType('');
      setProductName('');
      setProductData({});
      setSelectedImage(null);
    })
    .catch((error) => {
      console.error('Error adding the product:', error);
    });
};

  

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <div className="form-floating mb-3 col-md-12">
        <input
          type="text"
          className="form-control"
          id="typeName"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Product Name"
        />
        <label htmlFor="typeName">Product Name</label>
      </div>
      <div>
        <label>Select an image:</label>
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />
      </div>
      <div>
        <br></br>
        <label></label>
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
          {characteristic.caracteristicType === 'Text' ? (
            <input
              type="text"
              name={characteristic.caracteristicId}
              value={productData[characteristic.caracteristicId] || ''}
              onChange={handleCharacteristicChange}
            />
          ) : characteristic.caracteristicType === 'Double' ? (
            <input
              type="number"
              name={characteristic.caracteristicId}
              value={productData[characteristic.caracteristicId] || ''}
              onChange={handleCharacteristicChange}
            />
          ) : characteristic.caracteristicType === 'Date' ? (
            <input
              type="date"
              name={characteristic.caracteristicId}
              value={productData[characteristic.caracteristicId] || ''}
              onChange={handleCharacteristicChange}
            />
          ) : null}
        </div>
      ))}
      <button className="add-button" onClick={handleSubmit}>Add Product</button>
    </div>
  );
};

export default AddProduct;
