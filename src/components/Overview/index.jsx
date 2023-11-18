import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js' //eslint-disable-line

function Overview({ productId, styleId, setStyleId }) { // eslint-disable-line
  // const [currentView, setCurrentView] = useState('default');
  const [productInfo, setProductInfo] = useState();
  const productFetchController = new AbortController();

  const [productStyles, setProductStyles] = useState();
  const stylesFetchController = new AbortController();

  useEffect(() => {
    if (productId) {
      useServerFetch('get', `products/${productId}`, productFetchController)
        .then((res) => {
          setProductInfo(res.data);
        })
        .catch(() => {
          setProductInfo(null);
        });
      useServerFetch('get', `products/${productId}/styles`, stylesFetchController)
        .then((res) => {
          setProductStyles(res.data);
          setStyleId(res.data.results[0].style_id);
        })
        .catch(() => {
          setStyleId(null);
        });
    }

    return (() => {
      productFetchController.abort();
      stylesFetchController.abort();
    });
  }, [productId]);

  return (
    <>
      <p>Overview</p>

      {productInfo && <p>{`${productId}: ${productInfo.name}`}</p>}{/*eslint-disable-line*/}
      {productStyles && <p>{styleId}</p>}
    </>
  );
}

export default Overview;

//  this is the overview
// second change
