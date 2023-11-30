import React from 'react';
import styled from 'styled-components';
import StyleItem from './StyleItem.jsx'; // eslint-disable-line

function UnstyledStyleSelectorView({ productStyles, styleId, setStyleId, currentStyle, view }) { // eslint-disable-line
  // eslint-disable-line

  const StyleSelector = styled.div`
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, calc(30px + 3vw));
    grid-auto-rows: calc(30px + 3vw);
    border-bottom: 1px solid lightgray;
    max-height: 20vh;
    max-width: calc((35px + 3vw) * 4);
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: auto;
    padding-bottom: 20px;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div style={{ marginTop: view === 'expanded' ? '30px' : '0px' }}>
      <h3 style={{textTransform: 'uppercase', marginLeft: '3vw'}}>{currentStyle && currentStyle.name}</h3> {/*eslint-disable-line*/}
      <StyleSelector>
        {productStyles
          && productStyles.results.map( // eslint-disable-line
            (
              style // eslint-disable-line
            ) => (
              <StyleItem
                item={style}
                setStyleId={setStyleId}
                isActive={style.style_id === styleId}
                key={style.style_id}
              />
            ),
          )}
      </StyleSelector>
    </div>
  );
}

const StyleSelectorView = styled(UnstyledStyleSelectorView)`
  text-align: center;
`;

export default StyleSelectorView;
