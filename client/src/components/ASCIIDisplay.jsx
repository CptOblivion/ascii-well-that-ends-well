import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function GalleryEntry({ entry, size, maxFont = Infinity }) {
  const [fontSize, setFontSize] = useState(10);
  const ref = useRef();

  useEffect(() => {
    if (ref.current && entry.asciiLines) {
      setFontSize(Math.min((size / entry.asciiLines.length) * 0.75, maxFont));
    }
  }, [size]);

  if (!entry.asciiLines) return null;

  return (
    <div ref={ref} style={{ fontSize: fontSize, margin: 0, border: 0, padding: 0 }} className='art col'>
      {entry.asciiLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
GalleryEntry.propTypes = { entry: PropTypes.object, size: PropTypes.number, maxFont: PropTypes.number };

export default GalleryEntry;
