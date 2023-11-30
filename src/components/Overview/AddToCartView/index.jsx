import React from 'react';
import styled from 'styled-components';
import useServerFetch from '../../../hooks/useServerFetch.js'; // eslint-disable-line
import ButtonWrapper from '../../UI/StyledButton.js' // eslint-disable-line

function UnstyledAddToCartView({ currentStyle }) { // eslint-disable-line
  const [selectedSku, setSelectedSku] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [availableSkus, setAvailableSkus] = React.useState();
  const [message, setMessage] = React.useState(null);
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if (currentStyle && currentStyle.skus) { // eslint-disable-line
      setAvailableSkus(Object.keys(currentStyle.skus).map((sku) => { // eslint-disable-line
        if (currentStyle.skus[sku].quantity) { // eslint-disable-line
          return (sku);
        }
      }));
      setAdded(false);
    }
  }, [currentStyle]);

  const dropDownStyle = {
    display: 'inline-block',
    margin: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginLeft: '20px',
    marginRight: '20px',
    width: '10vw',
    height: '5vh',
    fontSize: '20px',
  };

  const AddButton = styled(ButtonWrapper)`
    display: block;
    width: 10vw;
    height: 5vh;
    overflow: hidden;
    margin: auto;
    margin-top: 1vh;
    font-size: 20px;
  `;

  const AddToCartForm = styled.form`
    text-align: center;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    max-height: 20vh;
  `;

  return (
    <div>
      {currentStyle && currentStyle.skus ? ( // eslint-disable-line
        <AddToCartForm style={{}} onSubmit={(e) => { // eslint-disable-line
          e.preventDefault();
          const posts = [];
          const postObject = { sku_id: selectedSku };
          if (selectedSku) {
            setAdded(true);
            for (let i = 0; i < quantity; i++) { // eslint-disable-line
              posts.push(useServerFetch('post', 'cart', postObject));
            }
            Promise.all(posts)
              .then(() => {
                setMessage(null);
                setSelectedSku(null);
                setQuantity(0);
              })
              .catch(() => {
                setAdded(false);
                setMessage('ERROR');
              });
          } else {
            document.getElementById('selectSize').click();
            setMessage('Please select size');
          }
        }}
        >
          {(availableSkus && !added) && (
            <>

              {message && <p style={{ margin: '1vh' }}>{message}</p>}
              <select
                defaultValue="Select Size"
                id="selectSize"
                style={dropDownStyle}
                onChange={(e) => {
                  setSelectedSku(e.target.value);
                  setQuantity(quantity || 1);
                }}
              >
                <option value={null} disabled hidden>Select Size</option>
                {availableSkus.map((sku) => { // eslint-disable-line
                  if (currentStyle.skus[sku]) { // eslint-disable-line
                    return <option value={sku} key={sku}>{currentStyle.skus[sku].size}</option>; // eslint-disable-line
                  }
                })}
              </select>

              <select defaultValue="-" style={dropDownStyle} disabled={!(selectedSku)} onChange={(e) => setQuantity(e.target.value)}>
                {selectedSku ? Array(currentStyle.skus[selectedSku].quantity).fill('').slice(0, 15).map( // eslint-disable-line
                  (x, num) =><option value={num + 1} key={num}>{num + 1}</option>) // eslint-disable-line
                  : <option value={null}>-</option>}
              </select>
              <AddButton type="submit">Add to Cart</AddButton>
            </>
          )}
          {!availableSkus && <p>OUT OF STOCK</p>}
          {added && <p>ADDED</p>}
        </AddToCartForm>
      ) : <p>LOADING...</p>}
    </div>
  );
}

const AddToCartView = styled(UnstyledAddToCartView)`
`;

export default AddToCartView;
