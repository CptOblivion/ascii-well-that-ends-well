import React, { useState, useEffect } from 'react';
import SubmitForm from './SubmitForm.jsx';
import { getAllArt, postArt, deleteArt } from '../utilities/api.js';
import Gallery from './Gallery.jsx';

export const RatioContext = React.createContext()

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [ratio, setRatio] = useState(1.05) //1.63?

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

  function onDeleteArt(art_id) {
    deleteArt(art_id)
      .then(() => {
        updateGallery();
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    updateGallery();
  }, []);

  function submitArt(user, email, ascii) {
    return postArt({ user, email, ascii }).then(() => updateGallery());
  }

  return (
    <div>
      <RatioContext.Provider id='container' className='row' value={ratio}>
        <div style={{flex:1}} >
          <SubmitForm submitArt={submitArt} />
        </div>
        <Gallery entries={gallery} deleteArt={onDeleteArt} />
      </RatioContext.Provider>
      <button id='darkMode' onClick={() => setDarkMode(!darkMode)} />
    </div>
  );
}
