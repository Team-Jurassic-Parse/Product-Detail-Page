import React, { useState, useEffect } from 'react';

// Utility Functions
const combine = (obj1, obj2) => {
  var newObj = {};

  obj1.features.forEach(
    (item) => (newObj[item.feature] = { currentProduct: item.value }),
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

  return newObj;
};

const ComparisonTable = ({ currentProduct, comparedProduct }) => {
  const productObj = combine(currentProduct, comparedProduct);

  return (
    <table className="related-table">
      <thead>
        <tr>
          <th>{currentProduct.name}</th>
          <th></th>
          <th>{comparedProduct.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${currentProduct.default_price}</td>
          <td>Price</td>
          <td>${comparedProduct.default_price}</td>
        </tr>
        <tr>
          <td>{currentProduct.category}</td>
          <td>Category</td>
          <td>{comparedProduct.category}</td>
        </tr>
        {Object.keys(productObj).map(function (key, index) {
          return (
            <tr key={index}>
              <td>{productObj[key].currentProduct}</td>
              <td>{key}</td>
              <td>{productObj[key].comparedProduct}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ComparisonTable;
