import React, { useState, useEffect } from 'react';
import useServerFetch from '../../hooks/useServerFetch.js';
import RelatedProductsList from './RelatedProductsList.jsx';
import OutfitList from './OutfitList.jsx';
import './RelatedProducts.css';
import './Outfit.css';
import './ComparisonTable.css';
import ComparisonTable from './ComparisonTable.jsx';
import { calculateAverageRating } from '../ReviewStars/ProductStarRating.jsx';

function RelatedProducts({
  productId,
  setProductId,
  styleId,
  productReview,
  productInfo,
  productStyles,
}) {
  const [relatedItems, setRelatedItems] = useState(null);
  const [outfits, setOutfits] = useState(() => {
    const storedOutfits = localStorage.getItem('userOutfits');
    return storedOutfits ? JSON.parse(storedOutfits) : null;
  });
  const [currentId, setcurrentId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [openComparisonModal, setOpenComparisonModal] = useState(false);
  const relatedFetchController = new AbortController();
  const productIdFetchController = new AbortController();
  const stylesFetchController = new AbortController();
  const starFetchController = new AbortController();

  const getRelatedProducts = async () => {
    if (productId && productId !== 40353 && productId !== 40345) {
      try {
        const res = await useServerFetch(
          'get',
          `products/${productId}/related`,
          {},
          relatedFetchController
        );
        const relatedItemIds = res.data.filter(
          (id) => id !== 40353 && id !== 40345
        );
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
              const [productData, stylesData, ratingsData] = await Promise.all([
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
                useServerFetch(
                  'get',
                  `reviews/meta?product_id=${id}`,
                  {},
                  starFetchController
                ).then((res4) => res4.data.ratings),
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
              productData.avg_ratings = calculateAverageRating(ratingsData);

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

  useEffect(() => {
    if (outfits) {
      localStorage.setItem('userOutfits', JSON.stringify(outfits));
    }
  }, [outfits]);

  const onClickRelatedProduct = (e) => {
    const currentProductId = e.currentTarget.getAttribute('data-key');
    if (currentProductId) {
      setProductId(currentProductId);
    }
  };

  const fetchDataAndSetOutfits = () => {
    const outfitsData = {};
    outfitsData[productId] = productInfo;

    const styleOutfits = productStyles.results;
    const selectedStyle = styleOutfits.find(
      (style) => style.style_id === styleId
    );

    if (selectedStyle) {
      outfitsData[productId].photos = selectedStyle.photos;
      outfitsData[productId].sale_price = selectedStyle.sale_price;
      outfitsData[productId].original_price = selectedStyle.original_price;
      outfitsData[productId].avg_ratings = calculateAverageRating(
        productReview.ratings
      );
      return outfitsData;
    }
    console.error('Style not found for style_id: ', styleId);
    return null;
  };

  const onClickAddOutfits = () => {
    const outfitsData = fetchDataAndSetOutfits();
    if (outfitsData) {
      setOutfits((prevState) => ({
        ...prevState,
        ...outfitsData,
      }));
    }
  };

  const setCurrentIdAndUpdateModal = (key) => {
    const outfitsData = fetchDataAndSetOutfits();
    if (outfitsData) {
      setCurrentProduct(outfitsData);
      setcurrentId(key);
      setOpenComparisonModal((prev) => !prev);
    }
  };

  const removeItem = (itemId) => {
    const updatedOutfits = { ...outfits };
    delete updatedOutfits[itemId];

    setOutfits(updatedOutfits);
  };

  return (
    <>
      <div className="row-related-title">
        <h2>
          <b>RELATED PRODUCTS</b>
        </h2>
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
        <h2>
          <b>YOUR OUTFITS</b>
        </h2>
      </div>
      <div className="row-outfit-product">
        <div className="outfit-carousel-container">
          <OutfitList
            outfits={outfits}
            onClickAddOutfits={onClickAddOutfits}
            removeItem={removeItem}
            onClickRelatedProduct={onClickRelatedProduct}
            productReview={productReview}
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
