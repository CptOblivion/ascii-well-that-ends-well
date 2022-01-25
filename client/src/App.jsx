import React from 'react';
import SubmitForm from './SubmitForm.jsx'

export default function App () {
  function submitAscii (user, email, ascii) {
    console.log(user, email, ascii)
  }
  return (
    <div className='container'>
      <SubmitForm submitAscii={submitAscii} />
    </div>
  )
}
