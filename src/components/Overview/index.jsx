import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import ImageView from './ImageView/index.jsx'; //eslint-disable-line
import ProductDetailsView from './ProductDetailsView/index.jsx'; //eslint-disable-line
import StyleSelectorView from './StyleSelectorView/index.jsx'; //eslint-disable-line
import AddToCartView from './AddToCartView/index.jsx'; //eslint-disable-line

function Overview({ productId, styleId, setStyleId }) { //eslint-disable-line
  // eslint-disable-line
  // const [currentView, setCurrentView] = useState('default');
  const [productInfo, setProductInfo] = useState();
  const productFetchController = new AbortController();

  const [productStyles, setProductStyles] = useState();
  const stylesFetchController = new AbortController();

  const [currentStyle, setCurrentStyle] = useState();

  const [view, setView] = useState('default');

  const [currentImg, setCurrentImg] = useState(0);
  const [start, setStart] = useState(0);

  const defaultOverviewLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33.33%)',
    borderWidth: '2px',
    borderColor: 'black',
    gridTemplateRows: 'repeat(8, 10vh)',
    borderRadius: '10px',
  };

  const expandedOverviewLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33.33%)',
    borderWidth: '2px',
    borderColor: 'black',
    gridTemplateRows: 'repeat(11, 10vh)',
    borderRadius: '10px',
  };

  const overviewLayoutSection = (column, row) => ({
    gridColumn: column,
    gridRow: row,
    borderWidth: '1px',
    borderColor: 'black',
    overflow: 'hidden',
  });

  useEffect(() => {
    if (productId) {
      useServerFetch('get', `products/${productId}`, {}, productFetchController)
        .then((res) => {
          setProductInfo(res.data);
        })
        .catch(() => {
          setProductInfo(null);
        });
      useServerFetch(
        'get',
        `products/${productId}/styles`,
        {},
        stylesFetchController,
      )
        .then((res) => {
          setProductStyles(res.data);
          setStyleId(res.data.results[0].style_id);
        })
        .catch(() => {
          setStyleId(null);
        });
    }

    return () => {
      stylesFetchController.abort();
      productFetchController.abort();
    };
  }, [productId]);

  useEffect(() => {
    if (styleId) {
      setCurrentStyle(
        productStyles.results.filter((style) => style.style_id === styleId)[0],
      );
    }
  }, [styleId]);

  return (
    <div>
      {view === 'default' ? (
        <div style={defaultOverviewLayoutStyle}>
          <div style={overviewLayoutSection('1 / 3', '1 / 9')}>
            <ImageView
              currentStyle={currentStyle}
              view={view}
              setView={setView}
              currentImg={currentImg}
              setCurrentImg={setCurrentImg}
              start={start}
              setStart={setStart}
            />
          </div>

          <div style={overviewLayoutSection('3', '1 / 4')}>
            <ProductDetailsView
              productInfo={productInfo}
              currentStyle={currentStyle}
            />
          </div>

          <div style={overviewLayoutSection('3', '4 / 7')}>
            <StyleSelectorView
              productStyles={productStyles}
              styleId={styleId}
              setStyleId={setStyleId}
            />
          </div>

          <div style={overviewLayoutSection('3', '7 / 9')}>
            <AddToCartView currentStyle={currentStyle} />
          </div>
        </div>
      ) : (
        <div style={expandedOverviewLayoutStyle}>
          <div style={overviewLayoutSection('1 / 4', '1 / 9')}>
            <ImageView
              currentStyle={currentStyle}
              view={view}
              setView={setView}
              currentImg={currentImg}
              setCurrentImg={setCurrentImg}
              start={start}
              setStart={setStart}
            />
          </div>

          <div style={overviewLayoutSection('1', '9 / 12')}>
            <ProductDetailsView
              productInfo={productInfo}
              currentStyle={currentStyle}
            />
          </div>

          <div style={overviewLayoutSection('2', '9 / 12')}>
            <StyleSelectorView
              productStyles={productStyles}
              styleId={styleId}
              setStyleId={setStyleId}
            />
          </div>

          <div style={overviewLayoutSection('3', '9 / 12')}>
            <AddToCartView currentStyle={currentStyle} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;

//  this is the overview
// second change
