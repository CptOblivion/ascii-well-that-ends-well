import React from 'react';
import PropTypes from 'prop-types';

function Modal({ show, closeHandler, children }) {
  if (!show) return null;
  return (
    <div className='modalBack' onClick={() => closeHandler(false)}>
      <div className='modalMain'>
        {children}
        <button className='closeButton' onClick={() => closeHandler(false)}>X</button>
      </div>
    </div>
  )
}

Modal.propTypes = { show: PropTypes.any, closeHandler: PropTypes.func, children: PropTypes.any }

export default Modal;
