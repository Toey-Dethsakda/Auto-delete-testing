import React, { useState, useEffect } from 'react';
import './App.css';

const initialProductList = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Fruit',
    name: 'Orange',
  },
  {
    type: 'Fruit',
    name: 'Mango',
  },
  {
    type: 'Fruit',
    name: 'Pineapple',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
];

const App = () => {
  const [productList, setProductList] = useState(initialProductList);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [inputProductName, setInputProductName] = useState(''); // Added input state

  const addToCategory = () => {
    if (inputProductName) {
      const product = productList.find((item) => item.name === inputProductName);

      if (product) {
        if (product.type === 'Fruit') {
          setFruits((prevFruits) => [...prevFruits, product]);
        } else if (product.type === 'Vegetable') {
          setVegetables((prevVegetables) => [...prevVegetables, product]);
        }

        // Remove the selected product from the list
        setProductList((prevList) => prevList.filter((item) => item.name !== inputProductName));

        setInputProductName('');

        // Remove the product from fruits/vegetables after 5 seconds
        setTimeout(() => {
          if (product.type === 'Fruit') {
            setFruits((prevFruits) => prevFruits.filter((item) => item.name !== product.name));
          } else if (product.type === 'Vegetable') {
            setVegetables((prevVegetables) => prevVegetables.filter((item) => item.name !== product.name));
          }

          // Move the product back to the product list
          setProductList((prevList) => [...prevList, product]);
        }, 5000);
      }
    }
  };

  // Handle changes in the input field
  const handleInputChange = (e) => {
    setInputProductName(e.target.value);
  };

  // Handle clicking a product in the list
  const handleProductClick = (productName) => {
    setInputProductName(productName);
  };

  return (
    <div>
      <h1>Auto Delete TODO</h1>
      <div className="inputList">
        <input

          type="text"
          placeholder="Enter product name"
          value={inputProductName}
          onChange={handleInputChange}
        />
        <button onClick={addToCategory}>ADD</button>
      </div>

      <div class="flex">
        <div class="w-1/2">
          <h2>Product List</h2>
          <ul className="product-list">
            {productList.map((product) => (
              <li key={product.name} onClick={() => handleProductClick(product.name)}>
                {product.name}
              </li>
            ))}
          </ul>
        </div>
        <div class="w-1/2">
          <h2>Fruits</h2>
          <ul className="list-item">
            {fruits.map((fruit) => (
              <li key={fruit.name}>{fruit.name}</li>
            ))}
          </ul>
        </div>
        <div class="w-1/2">
          <h2>Vegetables</h2>
          <ul className="list-item">
            {vegetables.map((vegetable) => (
              <li key={vegetable.name}>{vegetable.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
