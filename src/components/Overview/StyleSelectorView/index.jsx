import React from 'react';
import styled from 'styled-components';
import StyleItem from './StyleItem.jsx'; // eslint-disable-line

function UnstyledStyleSelectorView({ productStyles, styleId, setStyleId }) { // eslint-disable-line
  console.log(productStyles);

  const StyleSelector = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-auto-rows: 50px;
    border-bottom: 1px solid lightgray;
    max-height: 20vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    text-align: center;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <>
      <h3>Style Selector</h3>
      <StyleSelector>
        {productStyles && productStyles.results.map((style) => ( // eslint-disable-line
          <StyleItem
            item={style}
            setStyleId={setStyleId}
            isActive={style.style_id === styleId}
            key={style.style_id}
          />
        ))}
      </StyleSelector>
    </>
  );
}

const StyleSelectorView = styled(UnstyledStyleSelectorView)`
`;

export default StyleSelectorView;
