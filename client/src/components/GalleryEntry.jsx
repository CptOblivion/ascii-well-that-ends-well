import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function GalleryEntry({ entry, size }) {
  const [fontSize, setFontSize] = useState(10);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setFontSize(Math.min(size / entry.asciiLines.length * .75, 20));
    }
  }, [size]);

  function clickHandler() {
    navigator.clipboard.writeText(entry.ascii)
  }

  return (
    <div className='row'>
      <button className='art col' ref={ref} onClick={clickHandler}>
        <div style={{ fontSize: fontSize, margin: 0, border: 0, padding: 0 }}>
          {entry.asciiLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </button>
      <div className='col'>
        <div>{entry.title ? entry.title : 'untitled'}</div>
        <div>{entry.user}</div>
      </div>
    </div>
  );
}
GalleryEntry.propTypes = { entry: PropTypes.object, size: PropTypes.number };

export default GalleryEntry;
