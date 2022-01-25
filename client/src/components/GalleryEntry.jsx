import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function GalleryEntry({ entry, size }) {
  const [fontSize, setFontSize] = useState(10);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setFontSize(Math.min(size / entry.ascii.length * .75, 20));
    }
  }, [size]);

  return (
    <div className='row'>
      <button className='art col' ref={ref}>
        <div style={{ fontSize: fontSize }}>
          {entry.ascii.map((line, i) => (
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
