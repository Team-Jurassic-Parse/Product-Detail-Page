/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import './RelatedProducts.css';
import './Outfit.css';
import Modal from '../UI/Modal.jsx';
import ComparisonTable from './ComparisonTable.jsx';

function RelatedProducts({ productId, setProductId, styleId }) {
  const [relatedItems, setRelatedItems] = useState(null);
  const [outfits, setOutfits] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [openComparisonModal, setOpenComparisonModal] = useState(false);
  const relatedFetchController = new AbortController();
  const productIdFetchController = new AbortController();
  const stylesFetchController = new AbortController();
  const outfitsIdFetchController = new AbortController();
  const outfitsStylesFetchController = new AbortController();

  const getRelatedProducts = () => {
    useServerFetch(
      'get',
      `products/${productId}/related`,
      {},
      relatedFetchController
    )
      .then((res) => {
        const items = {};
        let counter = 0;
        res.data.forEach((id) => {
          useServerFetch('get', `products/${id}`, {}, productIdFetchController)
            .then((res2) => {
              items[res2.data.id] = res2.data;
            })
            .then(() => {
              useServerFetch(
                'get',
                `products/${id}/styles`,
                {},
                stylesFetchController
              )
                .then((res3) => {
                  const styles = res3.data.results;
                  const lowestSalePriceStyle = styles.reduce(
                    (lowestStyle, currentStyle) => {
                      if (
                        !lowestStyle.sale_price ||
                        (currentStyle.sale_price &&
                          currentStyle.sale_price < lowestStyle.sale_price)
                      ) {
                        return currentStyle;
                      }
                      return lowestStyle;
                    },
                    {}
                  );
                  items[id].photos = lowestSalePriceStyle.photos;
                  items[id].sale_price =
                    lowestSalePriceStyle.sale_price || styles[0].sale_price;
                  items[id].original_price =
                    lowestSalePriceStyle.original_price;
                })
                .then(() => {
                  counter += 1;
                  if (Object.keys(items).length === counter) {
                    setRelatedItems((prevState) => ({
                      ...prevState,
                      relatedItems: items,
                    }));
                  }
                });
            });
        });
      })
      .catch((err) => {
        console.error('Error fetching related items id', err);
      });
  };

  useEffect(() => {
    getRelatedProducts();

    return () => {
      relatedFetchController.abort();
      productIdFetchController.abort();
      stylesFetchController.abort();
    };
  }, [productId]);

  const onClickRelatedProduct = (e) => {
    const currentProductId = e.currentTarget.getAttribute('data-key');
    if (currentProductId) {
      setProductId(currentProductId);
    }
  };

  const onClickAddOutfits = () => {
    const outfitsData = {};
    useServerFetch('get', `products/${productId}`, {}, outfitsIdFetchController)
      .then((res) => {
        outfitsData[res.data.id] = res.data;
      })
      .then(() => {
        useServerFetch(
          'get',
          `products/${productId}/styles`,
          {},
          outfitsStylesFetchController
        )
          .then((res2) => {
            const styleOutfits = res2.data.results;
            const selectedStyle = styleOutfits.find(
              (style) => style.style_id === styleId
            );

            if (selectedStyle) {
              outfitsData[res2.data.product_id].photos = selectedStyle.photos;
              outfitsData[res2.data.product_id].sale_price =
                selectedStyle.sale_price;
              outfitsData[res2.data.product_id].original_price =
                selectedStyle.original_price;
              setOutfits((prevState) => ({
                ...prevState,
                ...outfitsData,
              }));
            } else {
              console.error('Style not found for style_id: ', styleId);
            }
          })
          .catch((err) => {
            console.error('Error fetching styles data: ', err);
          });
      })
      .catch((err) => {
        console.error('Error fetching product data: ', err);
      });
  };

  const removeItem = (itemId) => {
    const updatedOutfits = { ...outfits };
    delete updatedOutfits[itemId];

    setOutfits(updatedOutfits);
  };

  const setCurrentIdAndUpdateModal = (key) => {
    setcurrentId(key);
    setOpenComparisonModal((prev) => !prev);
  };

  return (
    <>
      <div className="row-related-title">
        <h1>
          <b>Related Products</b>
        </h1>
      </div>
      <div className="row-related-product">
        <div className="carousel-container">
          <RelatedProductsList
            relatedItems={relatedItems}
            onClickRelatedProduct={onClickRelatedProduct}
            setProductId={setProductId}
            setCurrentId={setCurrentIdAndUpdateModal}
          />
        </div>
      </div>
      <div className="row-outift-title">
        <h1>
          <b>Your Outfit</b>
        </h1>
      </div>
      <div className="row-outfit-product">
        <div className="outfit-carousel-container">
          <OutfitList
            outfits={outfits}
            onClickAddOutfits={onClickAddOutfits}
            removeItem={removeItem}
          />
        </div>
      </div>
      {/* {openComparisonModal && (
        <Modal
          handleClose={() => setOpenComparisonModal(false)}
          children={
            <ComparisonTable
              currentProduct={currentProduct}
              comparedProduct={relatedItems.relatedItems[relatedItems.currentId]}
            />
          }
        ></Modal>
      )} */}
    </>
  );
}

export default RelatedProducts;
