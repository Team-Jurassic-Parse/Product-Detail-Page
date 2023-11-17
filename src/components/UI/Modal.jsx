import React, { useState } from 'react';

function Modal({children, text = 'Click', buttonStyle}) { // eslint-disable-line

  const [open, setOpen] = useState(false);

  function handleOpenModal() {
    setOpen(!open);
  }

  return (
    (
      <div>
        {open
        && (
        <button
          type="button"
          onClick={() => {
            handleOpenModal();
          }}
          style={
          {
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
          }
        }
        >
          <div onClick={(e) => {e.stopPropagation()}}>{children}</div> {/* eslint-disable-line */}
        </button>
        )}
        <button type="button" onClick={handleOpenModal} style={buttonStyle}>{text}</button>
      </div>
    )
  );
}

export default Modal;
