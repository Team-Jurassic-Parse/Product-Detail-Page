import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Overview({ productId, styleId, setStyleId }) { // eslint-disable-line
  // const [currentView, setCurrentView] = useState('default');
  const [productInfo, setProductInfo] = useState();
  const productFetchController = new AbortController();

  const [productStyles, setProductStyles] = useState();
  const stylesFetchController = new AbortController();

  useEffect(() => {
    if (productId) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
        signal: productFetchController.signal,
      })
        .then((res) => {
          setProductInfo(res.data);
        })
        .catch(() => {
          setProductInfo(null);
        });
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
        signal: stylesFetchController.signal,
      })
        .then((res) => {
          setProductStyles(res.data);
          setStyleId(res.data.results[0].style_id);
        })
        .catch(() => {
          setStyleId(null);
        });
    }

    return (() => {
      stylesFetchController.abort();
      productFetchController.abort();
    });
  }, [productId]);

  return (
    <>
      <p>Overview</p>

      {productInfo && <p>{productId + ': ' + productInfo.name}</p>}{/*eslint-disable-line*/}
      {productStyles && <p>{styleId}</p>}
    </>
  );
}

export default Overview;

//  this is the overview
// second change
