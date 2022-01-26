import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const stayTime = 1500;
const animTime = 400;

function Toast({ message, setMessage }) {
  const [el, setEl] = useState(null);
  const [closing, setClosing] = useState();

  useEffect(() => {
    if (message) {
      setClosing(false);
      setTimeout(() => {
        setClosing(true);
        setTimeout(() => {
          setMessage('');
          setClosing(false)
        }, animTime);
      }, stayTime + animTime);
    }
  }, [message]);

  useEffect(() => {
    const newEl = document.createElement('div');
    document.body.append(newEl);
    setEl(newEl);
  }, []);

  if (!message || !el) return null;
  return ReactDOM.createPortal(
    <div className={`toast ${closing ? 'closing' : ''}`}>{message}</div>,
    el
  );
}

Toast.propTypes = { message: PropTypes.string, setMessage: PropTypes.func };

export default Toast;
