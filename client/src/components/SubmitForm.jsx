import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrawingArea from './DrawingArea.jsx';

function SubmitForm({ submitArt }) {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [ascii, setAscii] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [asciiHeight, setAsciiHeight] = useState(0);
  const [drawing, setDrawing] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      setAsciiHeight(inputRef.current.scrollHeight);
      //TODO: doesn't shrink with reducing content size
    }
  }, [ascii]);

  function submitHandler(e) {
    e.preventDefault();
    if (user === '' || email === '' || ascii === '') return setInvalid(true);
    submitArt(user, email, ascii, title).then(() => {
      setTitle('');
      setUser('');
      setEmail('');
      setAscii('');
      setInvalid(false);
    });
  }

  return (
    <form onSubmit={submitHandler} className='col submitForm' style={{ flex: 1 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder='username' />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email'
      />
      {drawing ? (
        <DrawingArea updateArt={setAscii}/>
      ) : (
        <textarea
          style={{ height: asciiHeight }}
          ref={inputRef}
          className='art artInput'
          value={ascii}
          onChange={(e) => setAscii(e.target.value)}
          placeholder='ASCII'
        />
      )}
      <button className={invalid ? 'badInput' : ''}>Submit</button>
    </form>
  );
}

SubmitForm.propTypes = { submitArt: PropTypes.func };

export default SubmitForm;
