import React, { useState, useEffect } from 'react';

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
      <h1>Product List</h1>
      <ul>
        {productList.map((product) => (
          <li key={product.name} onClick={() => handleProductClick(product.name)}>
            {product.name} - {product.type}
          </li>
        ))}
      </ul>
      <h2>Fruits</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.name}>{fruit.name}</li>
        ))}
      </ul>
      <h2>Vegetables</h2>
      <ul>
        {vegetables.map((vegetable) => (
          <li key={vegetable.name}>{vegetable.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter product name"
        value={inputProductName}
        onChange={handleInputChange}
      />
      <button onClick={addToCategory}>Add to Category</button>
    </div>
  );
};

export default App;
