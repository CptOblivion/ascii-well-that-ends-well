import React, { useState } from 'react';
import PropTypes from 'prop-types'

function SubmitForm({ submitAscii }) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [ascii, setAscii] = useState('');
  const [invalid, setInvalid] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    if (user === '' || email === '' || ascii === '') return setInvalid(true);
    submitAscii(user, email, ascii);
  }

  return (
    <form onSubmit={submitHandler} className='submitForm'>
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder='username' />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
      <textarea value={ascii} onChange={(e) => setAscii(e.target.value)} placeholder='ASCII' />
      <button className={invalid ? 'badInput' : ''}>Submit</button>
    </form>
  );
}

SubmitForm.propTypes = { submitAscii: PropTypes.string };

export default SubmitForm;
