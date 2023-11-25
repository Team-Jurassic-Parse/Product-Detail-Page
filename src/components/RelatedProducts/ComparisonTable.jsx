/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './ComparisonTable.css';

// Utility Functions
const combine = (obj1, obj2) => {
  const newObj = {};

  if (obj1 && obj1.features && obj2 && obj2.features) {
    obj1.features.forEach(
      (item) => (newObj[item.feature] = { currentProduct: item.value })
    );
    obj2.features.forEach((item) => {
      if (newObj[item.feature]) {
        newObj[item.feature] = {
          ...newObj[item.feature],
          ...{ comparedProduct: item.value },
        };
      } else {
        newObj[item.feature] = { comparedProduct: item.value };
      }
    });
  }

  return newObj;
};

function ComparisonTable({ currentProduct, comparedProduct }) {
  const [loading, setLoading] = useState(true);
  const [productObj, setProductObj] = useState({});

  useEffect(() => {
    if (currentProduct) {
      const newObj = combine(currentProduct, comparedProduct);
      setProductObj(newObj);
      setLoading(false);
    }
  }, [currentProduct, comparedProduct]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="related-table">
      <thead>
        <tr>
          <th>{currentProduct.name}</th>
          <th className="bold-column">Comparison</th>
          <th>{comparedProduct.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${currentProduct.default_price}</td>
          <td className="bold-column">Price</td>
          <td>${comparedProduct.default_price}</td>
        </tr>
        <tr>
          <td>{currentProduct.category}</td>
          <td className="bold-column">Category</td>
          <td>{comparedProduct.category}</td>
        </tr>
        {Object.keys(productObj).map((key, index) => (
          <tr key={index}>
            <td>{productObj[key].currentProduct}</td>
            <td className="bold-column">{key}</td>
            <td>{productObj[key].comparedProduct}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComparisonTable;
