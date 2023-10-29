import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Catalog.css';

const Catalog = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/types/getAllTypes')
      .then((response) => {
        setTypes(response.data);
        // Initially, set filtered products to all products.
        setFilteredProducts(response.data.map((type) => type.products).flat());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleTypeSelect = (event) => {
    const selected = event.target.value;
    setSelectedType(selected);

    if (selected === '') {
      // If 'All Types' is selected, set filtered products to all products.
      setFilteredProducts(types.map((type) => type.products).flat());
    } else {
      // Filter products based on the selected type.
      const selectedProducts = types.find((type) => type.typeName === selected)?.products || [];
      setFilteredProducts(selectedProducts);
    }
  };

  return (
    <div className="catalog-container">
      <h1>Catalog Page</h1>
      <div>
        <select value={selectedType} onChange={handleTypeSelect}>
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.typeId} value={type.typeName}>
              {type.typeName}
            </option>
          ))}
        </select>
      </div>
      <div className="type-list">
      <h2>{selectedType || "All Types"}</h2>
        {filteredProducts.map((product) => (
          <div key={product.productId} className="type-item">
           
            <div style={{ float: "left",width: "200px"}}>
            {product.image && (
          <img
            src={`data:image/*;base64, ${product.image}`} 
            alt={product.productName}
            width="300"
            height="150"
          />
        )}
        </div>
          <div style={{marginLeft: "220px"}}>
          <h2>{product.productName}</h2>
            <ul className="characteristic-list">
              {Object.entries(product.caracteristics).map(([charId, value]) => {
                const characteristic = types
                  .flatMap((type) => type.caracteristics)
                  .find((char) => char.caracteristicId.toString() === charId);
                return (
                  <li key={charId} className="characteristic-item">
                    {characteristic ? `${characteristic.caracteristicName}: ${value}` : ''}
                  </li>
                );
              })}
            </ul>
          </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Catalog;
