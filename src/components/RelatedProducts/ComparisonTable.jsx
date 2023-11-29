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
    <div className="table-container">
      <table className="related-table">
        <thead>
          <tr>
            <th colSpan="3" className="table-header">
              Comparison Table
            </th>
          </tr>
          <tr>
            <th className="product-header">
              <div>
                <span>{currentProduct.name}</span>
              </div>
              <div>
                <img
                  src={currentProduct.photos[0].thumbnail_url}
                  alt="Product Thumbnail"
                  className="thumbnail-image"
                />
              </div>
            </th>
            <th className="bold-column">Name</th>
            <th className="product-header">
              <div>
                <span>{comparedProduct.name}</span>
              </div>
              <div>
                <img
                  src={comparedProduct.photos[0].thumbnail_url}
                  alt="Product Thumbnail"
                  className="thumbnail-image"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              ${currentProduct.default_price}{' '}
              {currentProduct.default_price &&
                comparedProduct.default_price &&
                (Number(currentProduct.default_price) <
                Number(comparedProduct.default_price) ? (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &#10004;
                  </span>
                ) : (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &nbsp;
                  </span>
                ))}
            </td>
            <td className="bold-column">Price</td>
            <td>
              ${comparedProduct.default_price}{' '}
              {currentProduct.default_price &&
                comparedProduct.default_price &&
                (Number(comparedProduct.default_price) <
                Number(currentProduct.default_price) ? (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &#10004;
                  </span>
                ) : (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &nbsp;
                  </span>
                ))}
            </td>
          </tr>
          <tr>
            <td>
              {currentProduct.category}{' '}
              {currentProduct.category && (
                <span style={{ color: 'green', fontSize: '18px' }}>
                  &#10004;
                </span>
              )}
            </td>
            <td className="bold-column">Category</td>
            <td>
              {comparedProduct.category}{' '}
              {comparedProduct.category && (
                <span style={{ color: 'green', fontSize: '18px' }}>
                  &#10004;
                </span>
              )}
            </td>
          </tr>
          {Object.keys(productObj).map((key, index) => (
            <tr key={index}>
              <td>
                {productObj[key].currentProduct}{' '}
                {productObj[key].currentProduct && (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &#10004;
                  </span>
                )}
              </td>
              <td className="bold-column">{key}</td>
              <td>
                {productObj[key].comparedProduct}{' '}
                {productObj[key].comparedProduct && (
                  <span style={{ color: 'green', fontSize: '18px' }}>
                    &#10004;
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
