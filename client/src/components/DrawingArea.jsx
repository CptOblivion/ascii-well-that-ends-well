import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';

function DrawingArea({ updateArt }) {
  const [mouseDown, setMouseDown] = useState(false);
  const ref = useRef(null);
  // useEffect(() => {
  //   const canvas = ref.current;
  //   const context=canvas.getContext('2d')
  // }, [])

  const width = 320;
  const height = 320;

  function getLine(e) {
    if (mouseDown) {
      const offs = e.target.getBoundingClientRect()
      const endX = e.pageX - offs.left;
      const endY = e.pageY - offs.top;
      const scaleX = width / offs.width;
      const scaleY = height / offs.height;
      const ctx=ref.current.getContext('2d')
      ctx.beginPath();
      ctx.moveTo((endX - e.movementX) * scaleX, (endY - e.movementY) * scaleY);
      ctx.lineTo(endX * scaleX, endY * scaleY);
      ctx.stroke();
    }
  }

  return (
    <canvas
      ref={ref}
      id='drawingArea'
      width={width}
      height={height}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={getLine}
    />
  );
}

DrawingArea.propTypes = { updateArt: PropTypes.func };

export default DrawingArea;
