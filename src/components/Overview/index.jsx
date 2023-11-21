import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import ImageView from './ImageView/index.jsx'; //eslint-disable-line
import ProductDetailsView from './ProductDetailsView/index.jsx' //eslint-disable-line
import StyleSelectorView from './StyleSelectorView/index.jsx' //eslint-disable-line
import AddToCartView from './AddToCartView/index.jsx' //eslint-disable-line

function Overview({ productId, styleId, setStyleId }) { // eslint-disable-line
  // const [currentView, setCurrentView] = useState('default');
  const [productInfo, setProductInfo] = useState();
  const productFetchController = new AbortController();

  const [productStyles, setProductStyles] = useState();
  const stylesFetchController = new AbortController();

  const [currentStyle, setCurrentStyle] = useState();

  const DefaultOverviewLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    border-width: 2px;
    border-style: solid;
    border-color: black;
    grid-template-rows: repeat(4, 20vh);
    border-radius: 10px;
  `;

  const OverviewLayoutSection = styled.div`
      border: 1px, solid, black;
      grid-column: ${(props) => props.column /* eslint-disable-line*/};
      grid-row: ${(props) => props.row /* eslint-disable-line*/};
      border-width: 1px;
      border-style: solid;
      border-color: black;
      overflow: hidden;
    `;

  OverviewLayoutSection.defaultProps = {
    column: 1,
    row: 1,
    component: <div />,
  };

  useEffect(() => {
    if (productId) {
      useServerFetch('get', `products/${productId}`, {}, productFetchController)
        .then((res) => {
          setProductInfo(res.data);
        })
        .catch(() => {
          setProductInfo(null);
        });
      useServerFetch('get', `products/${productId}/styles`, {}, stylesFetchController)
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

  useEffect(() => {
    if (styleId) {
      setCurrentStyle(productStyles.results.filter((style) => style.style_id === styleId)[0]);
    }
  }, [styleId]);

  return (
    <>
      <DefaultOverviewLayout>

        <OverviewLayoutSection column="1 / 3" row="1 / 5">
          <ImageView
            currentStyle={currentStyle}
          />
        </OverviewLayoutSection>

        <OverviewLayoutSection column="3" row="1 / 3">
          <ProductDetailsView
            productInfo={productInfo}
            currentStyle={currentStyle}
          />
        </OverviewLayoutSection>

        <OverviewLayoutSection column="3" row="3">
          <StyleSelectorView
            productStyles={productStyles}
            styleId={styleId}
            setStyleId={setStyleId}
          />
        </OverviewLayoutSection>

        <OverviewLayoutSection column="3" row="4">
          <AddToCartView
            currentStyle={currentStyle}
          />
        </OverviewLayoutSection>

      </DefaultOverviewLayout>
      {productInfo && <p>{`${productId}: ${productInfo.name}`}</p>}{/*eslint-disable-line*/}
      {productStyles && <p>{styleId}</p>}
    </>
  );
}

export default Overview;

//  this is the overview
// second change
