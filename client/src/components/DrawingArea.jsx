import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';


const [gridWidth, gridHeight] = [80, 40];
const [blockWidth, blockHeight] = [2, 4];
const width = gridWidth * blockWidth;
const height = gridHeight * blockHeight;
const line = Array(gridWidth).fill('.').join('');
const emptyAscii = Array(gridHeight).fill(line).join('\n')

function DrawingArea({ updateArt }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [ascii, setAscii] = useState(emptyAscii);
  const ref = useRef(null);

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
      imageGrid(ctx.getImageData(0, 0, width, height).data)
    }
  }

  function imageGrid(pixelArray) {
    /**
     * break image pixels into blocks
     * take advantage of linear nature of pixel array, and linear nature of a string:
     * walk through string (skip newlines), get segment multiplying i by image width, then use segment length, repeat segment height times
     */
    let newAscii = '';
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const blockOffset = i * gridHeight * blockHeight * 4
        // const block = []
        for (let bi = 0; bi < height; bi += width * 4)  {
          for(let bj = blockOffset + bi; bj < blockOffset + bi + blockWidth; bj += 4) {
            if (pixelArray[bj] > 128) {
              console.log(bi, bj)
              newAscii += '@'
              break
            }
          }
          // block.push(pixelArray.slice(, blockOffset + bi + blockSize[0]))
        }
        newAscii += '.'
        //end of the line
        if (j === gridWidth - 1) newAscii += '\n'
      }
    }
    setAscii(newAscii);
  }

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
        <ASCIIDisplay entry={{ ascii: ascii, asciiLines: ascii.split('\n'), asciiWidth: gridWidth }} size={800} />
      </div>
    </div>
  );
}

DrawingArea.propTypes = { updateArt: PropTypes.func };

export default DrawingArea;
