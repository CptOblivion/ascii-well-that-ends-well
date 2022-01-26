import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Modal({ show, closeHandler, children }) {
  const [el, setEl] = useState(null)

  useEffect(() => {
    const newEl = document.createElement('div')
    document.body.append(newEl)
    setEl(newEl)
  }, [])

  if (!show || !el) return null;
  return (
    ReactDOM.createPortal(
      <div className='modalBack' onClick={() => closeHandler(false)}>
        <div className='modalMain' onClick={(e) => e.stopPropagation()}>
          <div className='modalFrame'>
            {children}
          </div>
          <button className='closeButton' onClick={() => closeHandler(false)}>X</button>
        </div>
      </div>,
      el
    )
  )
}

Modal.propTypes = { show: PropTypes.any, closeHandler: PropTypes.func, children: PropTypes.any }

export default Modal;
