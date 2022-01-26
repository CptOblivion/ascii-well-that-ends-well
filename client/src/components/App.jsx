import React, { useState, useEffect } from 'react';
import SubmitForm from './SubmitForm.jsx';
import { getAllArt, postArt } from '../utilities/api.js';
import Gallery from './Gallery.jsx';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  function updateGallery() {
    getAllArt().then((newGallery) => {
      for (const entry of newGallery) {
        entry.asciiWidth = 0;
        entry.asciiLines = entry.ascii.split('\n')
        for (const line of entry.asciiLines) {
          entry.asciiWidth = Math.max(entry.asciiWidth, line.length)
        }
      }
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
    <div>
      <div id='container'>
        <SubmitForm submitArt={submitArt} />
        <Gallery entries={gallery} />
      </div>
      <button id='darkMode' onClick={() => setDarkMode(!darkMode)} />
    </div>
  );
}
