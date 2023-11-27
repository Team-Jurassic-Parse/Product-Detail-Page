/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import './RelatedProducts.css';
import './Outfit.css';
import './ComparisonTable.css';
import ComparisonTable from './ComparisonTable.jsx';

function RelatedProducts({ productId, setProductId, styleId }) {
  const [relatedItems, setRelatedItems] = useState(null);
  const [outfits, setOutfits] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [openComparisonModal, setOpenComparisonModal] = useState(false);
  const relatedFetchController = new AbortController();
  const productIdFetchController = new AbortController();
  const stylesFetchController = new AbortController();
  const outfitsIdFetchController = new AbortController();
  const outfitsStylesFetchController = new AbortController();

  const getRelatedProducts = async () => {
    if (productId) {
      try {
        const res = await useServerFetch(
          'get',
          `products/${productId}/related`,
          {},
          relatedFetchController
        );
        const relatedItemIds = res.data;
        let existingItems = relatedItems
          ? { ...relatedItems.relatedItems }
          : {};

        const keysToRemove = [];
        Object.keys(existingItems).forEach((itemId) => {
          if (!relatedItemIds.includes(Number(itemId))) {
            keysToRemove.push(itemId);
          }
        });

        keysToRemove.forEach((itemId) => {
          const { [itemId]: removedItem, ...remainingItems } = existingItems;
          existingItems = remainingItems;
        });

        const newItems = await Promise.all(
          relatedItemIds
            .filter((id) => !existingItems[id])
            .map(async (id) => {
              const [productData, stylesData] = await Promise.all([
                useServerFetch(
                  'get',
                  `products/${id}`,
                  {},
                  productIdFetchController
                ).then((res2) => res2.data),
                useServerFetch(
                  'get',
                  `products/${id}/styles`,
                  {},
                  stylesFetchController
                ).then((res3) => res3.data.results),
              ]);

              const lowestSalePriceStyle = stylesData.reduce(
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

              productData.photos = lowestSalePriceStyle.photos;
              productData.sale_price =
                lowestSalePriceStyle.sale_price || stylesData[0].sale_price;
              productData.original_price = lowestSalePriceStyle.original_price;

              return { [id]: productData };
            })
        );

        const mergedItems = Object.assign({}, existingItems, ...newItems);

        setRelatedItems({ relatedItems: mergedItems });
      } catch (err) {
        console.error('Error fetching related items', err);
      }
    }
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

  const fetchDataAndSetOutfits = () => {
    const outfitsData = {};
    return useServerFetch(
      'get',
      `products/${productId}`,
      {},
      outfitsIdFetchController
    )
      .then((res) => {
        outfitsData[res.data.id] = res.data;
      })
      .then(() =>
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
              return outfitsData;
            }
            console.error('Style not found for style_id: ', styleId);
          })
          .catch((err) => {
            console.error('Error fetching styles data: ', err);
          })
      )
      .catch((err) => {
        console.error('Error fetching product data: ', err);
      });
  };

  const onClickAddOutfits = () => {
    fetchDataAndSetOutfits().then((outfitsData) => {
      setOutfits((prevState) => ({
        ...prevState,
        ...outfitsData,
      }));
    });
  };

  const setCurrentIdAndUpdateModal = (key) => {
    fetchDataAndSetOutfits().then((outfitsData) => {
      setCurrentProduct(outfitsData);
      setcurrentId(key);
      setOpenComparisonModal((prev) => !prev);
    });
  };

  const removeItem = (itemId) => {
    const updatedOutfits = { ...outfits };
    delete updatedOutfits[itemId];

    setOutfits(updatedOutfits);
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
            setCurrentIdAndUpdateModal={setCurrentIdAndUpdateModal}
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
            onClickRelatedProduct={onClickRelatedProduct}
          />
        </div>
      </div>
      {openComparisonModal && (
        <div
          className="modal-overlay"
          onClick={() => setOpenComparisonModal(false)}
        >
          <div className="modal-container">
            <span
              className="modal-close-button"
              onClick={() => setOpenComparisonModal(false)}
            >
              &times;
            </span>
            <ComparisonTable
              currentProduct={currentProduct[productId]}
              comparedProduct={relatedItems.relatedItems[currentId]}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default RelatedProducts;
