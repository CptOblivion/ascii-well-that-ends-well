import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';

const artGrid = [80, 40];
const artPixels = [2, 4];
const width = artGrid[0] * artPixels[0];
const height = artGrid[1] * artPixels[1];
const emptyLine = Array(artGrid[0]).fill('.').join('');
const emptyAscii = Array(artGrid[1]).fill(emptyLine);
function DrawingArea({ updateArt }) {
  const [mouseDown, setMouseDown] = useState(false);

  const [ascii, setAscii] = useState(emptyAscii);
  const ref = useRef(null);
  // useEffect(() => {
  //   const canvas = ref.current;
  //   const context=canvas.getContext('2d')
  // }, [])

  function getLine(e) {
    if (mouseDown) {
      const offs = e.target.getBoundingClientRect();
      const endX = e.pageX - offs.left;
      const endY = e.pageY - offs.top;
      const scaleX = width / offs.width;
      const scaleY = height / offs.height;
      const ctx = ref.current.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
      ctx.moveTo((endX - e.movementX) * scaleX, (endY - e.movementY) * scaleY);
      ctx.lineTo(endX * scaleX, endY * scaleY);
      ctx.stroke();
    }
  }

  function imageGrid() {}

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={ref}
        id='drawingArea'
        width={width}
        height={height}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseMove={getLine}
        style={{ width: '100%', height: 'auto' }}
      />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, pointerEvents: 'none' }}>
        <ASCIIDisplay entry={{ asciiLines: ascii, asciiWidth: artGrid[0] }} size={800} />
      </div>
    </div>
  );
}

DrawingArea.propTypes = { updateArt: PropTypes.func };

export default DrawingArea;
