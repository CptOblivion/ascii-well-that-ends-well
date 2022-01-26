import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrawingArea from './DrawingArea.jsx';

function SubmitForm({ submitArt, toast }) {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [ascii, setAscii] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [asciiHeight, setAsciiHeight] = useState(0);
  const [drawing, setDrawing] = useState(false);

  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      setAsciiHeight(inputRef.current.clientHeight);
      //TODO: doesn't shrink with reducing content size
    }
  }, [ascii]);

  function submitHandler(e) {
    e.preventDefault();
    if (user === '') {
      toast('Please enter a username!');
      return setInvalid(true);
    }
    if (email === '') {
      toast('Please enter a username!');
      return setInvalid(true);
    }
    if (ascii === '') {
      toast("Couldn't find any ASCII to save!");
      return setInvalid(true);
    }
    submitArt(user, email, ascii, title).then(() => {
      setTitle('');
      setUser('');
      setEmail('');
      setAscii('');
      setInvalid(false);
    });
  }

  return (
    <form
      onSubmit={submitHandler}
      className='col submitForm'
      style={{ flex: 1, alignItems: 'flex-start' }}
      autoComplete='off'
      id='search-form'
      data-lpignore='true'
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
      <canvas ref={canvasRef} id='drawingArea' hidden={true} />
      {drawing ? (
        <DrawingArea updateArt={setAscii} canvas={canvasRef.current} rendered={drawing} />
      ) : (
        <textarea
          style={{ height: asciiHeight, alignSelf: 'stretch' }}
          ref={inputRef}
          className='art artInput'
          value={ascii}
          onChange={(e) => setAscii(e.target.value)}
          placeholder='ASCII'
          autoComplete='off'
          id='search-field'
        />
      )}
      <button
        type='button'
        onClick={() => setDrawing(!drawing)}
        style={{ alignSelf: 'flex-end', width: 'fit-content' }}
      >
        {drawing ? 'paste art instead' : 'draw art instead'}
      </button>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder='username'
        style={{ minWidth: '20em' }}
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email'
        style={{ minWidth: '40em' }}
      />
      <button className={invalid ? 'badInput' : ''}>Save</button>
    </form>
  );
}

SubmitForm.propTypes = { submitArt: PropTypes.func, toast: PropTypes.func };

export default SubmitForm;
