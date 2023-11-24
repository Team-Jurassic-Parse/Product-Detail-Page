import React from 'react';
import styled from 'styled-components';
import useServerFetch from '../../../hooks/useServerFetch.js'

function UnstyledAddToCartView({ currentStyle }) { // eslint-disable-line
  const [selectedSku, setSelectedSku]  = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [availableSkus, setAvailableSkus] = React.useState();
  const [message, setMessage] = React.useState(null);
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if(currentStyle) {
      setAvailableSkus(Object.keys(currentStyle.skus).map((sku, index) => {
        if(currentStyle.skus[sku].quantity) {
          return(sku);
        }
      }))
      setAdded(false);
    }
  }, [currentStyle]);

  const dropDownStyle = {

  }

  const addToCartButtonStyle = {

  }


  return (
    <>
      {currentStyle && currentStyle.skus ? <form onSubmit={(e) => {
        e.preventDefault();
        const posts = [];
        const postObject = { 'sku_id': selectedSku };
        if(selectedSku) {
        setAdded(true);
        for(var i = 0; i < quantity; i++) {
            posts.push(useServerFetch('post', 'cart', postObject));
            console.log(postObject);
          }
        Promise.all(posts)
          .then((res) => {
            setMessage(null);
            setSelectedSku(null);
            setQuantity(0);
          })
          .catch((err) => {
            setAdded(false);
            setMessage('ERROR');
          })
        } else {
          document.getElementById(`selectSize`).click();
          setMessage('Please select size')
        }
        console.log(selectedSku, quantity);
        }}>
        {availableSkus && !added ? <>

          {message && <p>{message}</p>}
          <select defaultValue='Select Size' id={'selectSize'} style={dropDownStyle} onChange={(e) => {
            setSelectedSku(e.target.value);
            setQuantity(quantity || 1);
          }}>
            <option value={null} disabled hidden>Select Size</option>
            {availableSkus.map((sku) => {
              if(currentStyle.skus[sku]) {
                return <option value={sku} key={sku}>{currentStyle.skus[sku].size}</option>
              }
            }
            )}
          </select>

          <select defaultValue='-' style={dropDownStyle} disabled={!(selectedSku)} onChange={(e) => setQuantity(e.target.value)}>
            {selectedSku ? Array(currentStyle.skus[selectedSku].quantity).fill('').slice(0, 15).map((x, num) =>
              <option value={num + 1} key={num}>{num + 1}</option>
            ) : <option value={null}>-</option>}
          </select>
          <button type='submit' style={addToCartButtonStyle}>Add to Cart</button>
        </> : (added ? <p>ADDED</p> : <p>OUT OF STOCK</p>)}
      </form> : <p>LOADING...</p>}
    </>
  );
}

const AddToCartView = styled(UnstyledAddToCartView)`
`;

export default AddToCartView;
