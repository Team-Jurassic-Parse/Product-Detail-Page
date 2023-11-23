import React from 'react';
import styled from 'styled-components';

function UnstyledStyleItem({ item, setStyleId, isActive }) { // eslint-disable-line
  return (
    <div style={{
      width: '100%',
      aspectRatio: '1',
      textAlign: 'center',
      borderRadius: '12px',
      borderColor: 'black',
      borderWidth: '2px',
      borderStyle: isActive ? 'solid' : 'none'
    }}>
      <img
        style={{
          width: '90%',
          aspectRatio: '1',
          objectFit: 'cover',
          objectPosition: 'center center',
          borderRadius: '10px',
          marginTop: 'calc(5% + 1px)',
          cursor: 'pointer',
        }}
        src={item.photos[0].thumbnail_url}
        alt={item.style_id}
        onClick={() => setStyleId(item.style_id)}
      />
    </div>
  );
}

const StyleItem = styled(UnstyledStyleItem)`
`;

export default StyleItem;
