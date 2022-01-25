import React, { useState, useEffect } from 'react';
import SubmitForm from './SubmitForm.jsx';
import { getAllArt, postArt } from '../utilities/api.js';
import Gallery from './Gallery.jsx';

export default function App() {
  const [gallery, setGallery] = useState([]);

  function updateGallery() {
    getAllArt().then((newGallery) => {
      newGallery.forEach((entry) => (entry.ascii = entry.ascii.split('\n')));
      setGallery(newGallery);
    });
  }

  useEffect(() => {
    updateGallery();
  }, []);

  function submitArt(user, email, ascii) {
    return postArt({ user, email, ascii }).then(() => updateGallery());
  }

  return (
    <div className='container'>
      <SubmitForm submitArt={submitArt} />
      <Gallery entries={gallery} />
    </div>
  );
}
