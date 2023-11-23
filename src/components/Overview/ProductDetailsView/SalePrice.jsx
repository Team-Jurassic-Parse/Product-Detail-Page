import React from 'react';
import styled from 'styled-components';

function SalePrice({currentStyle}) {
  const onSale = React.useMemo(() => currentStyle ? !!currentStyle.sale_price : false, [currentStyle]) // eslint-disable-line

  const OriginalPrice = styled.p`
    ${onSale && (`
      color: red;
      text-decoration: line-through;
      display: inline;
    `)}
  `;

  return (
    <>
          <OriginalPrice>{`$${currentStyle.original_price}`}</OriginalPrice> {/*eslint-disable-line*/}
          {onSale && <p style={{display: 'inline'}}>{`$${currentStyle.sale_price}`}</p>} {/*eslint-disable-line*/}
    </>
  )
}

export default SalePrice;