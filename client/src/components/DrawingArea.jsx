import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import {RatioContext} from './App.jsx'

const [gridWidth, gridHeight] = [80, 40];
const [blockWidth, blockHeight] = [2, 3];
const width = gridWidth * blockWidth;
const height = gridHeight * blockHeight;
const line = Array(gridWidth).fill(' ').join('');
const emptyAscii = Array(gridHeight).fill(line).join('\n');

function DrawingArea({ updateArt }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [ascii, setAscii] = useState(emptyAscii);
  const [charToPix, setCharToPix] = useState(.63)
  const ref = useRef(null);

  const ratio = useContext(RatioContext)
  const canvasWidth = 800 * ratio;
  const canvasHeight = 800;

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
      imageGrid(ctx.getImageData(0, 0, width, height).data);
    }
  }

  function imageGrid(pixelArray) {
    //the pixel array is a single line of RGBA values, that we need to break up into blocks of characters
    let newAscii = '';
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const blockOffset = i * blockHeight * width + j * blockWidth;
        let escape = false;
        for (let bi = 0; !escape && bi < blockHeight * width; bi += width) {
          for (let bj = 0; !escape && bj < blockWidth; bj++) {
            if (pixelArray[(blockOffset + bi + bj) * 4 + 3] > 0) {
              newAscii += '@';
              escape = true;
            }
          }
        }
        if (!escape) newAscii += ' ';
        //end of the line
        if (j === gridWidth - 1) newAscii += '\n';
      }
    }
    setAscii(newAscii);
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        width={width}
        height={height}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseMove={getLine}
        onMouseOut={() => setMouseDown(false)}
        style={{ width: canvasWidth, height: canvasHeight}}
        />
      <canvas
        ref={ref}
        id='drawingArea'
        hidden={true}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: canvasWidth,
          height: canvasHeight,
          pointerEvents: 'none',
        }}
      >
        <ASCIIDisplay
          entry={{ ascii: ascii, asciiLines: ascii.split('\n'), asciiWidth: gridWidth }}
          size={canvasWidth / charToPix}
        />
      </div>
    </div>
  );
}

DrawingArea.propTypes = { updateArt: PropTypes.func };

export default DrawingArea;
