/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function Modal({ children, handleClose }) { // eslint-disable-line

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleClose();
        }}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            handleClose();
          } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
          }
        }}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          borderStyle: 'none',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          overflow: 'scroll',
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
        {' '}
      </button>
    </div>
  );
}

export default Modal;
