import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ASCIIDisplay from './ASCIIDisplay.jsx';
import { RatioContext } from './App.jsx';
import PencilIcon from '../assets/icon-pencil.svg'
import EraserIcon from '../assets/icon-eraser.svg'

const [gridWidth, gridHeight] = [80, 40];
const [blockWidth, blockHeight] = [2, 2];
const width = gridWidth * blockWidth;
const height = gridHeight * blockHeight;
const line = Array(gridWidth).fill(' ').join('');
const emptyAscii = Array(gridHeight).fill(line).join('\n');

let ctx;

const asciiMap = [
  ' ',
  "'", //TL dot
  "'", //TR dot
  '"', //T line
  '.', //BL dot
  '[', //L line
  '/', //diag A
  '/', //TL corner
  '.', //BR dot
  '\\', //diag B
  ']', //R line
  '\\', //TR corner
  '_', //B line
  '\\', //BL corner
  '/', //BR corner
  '#', //full
];
function DrawingArea({ updateArt, canvas, rendered }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [ascii, setAscii] = useState(emptyAscii);
  const [charToPix] = useState(0.63);
  const [tool, setTool] = useState('draw')

  useEffect(() => {
    if (canvas) {
      ctx = canvas.getContext('2d')
    }
  }, [canvas])


  const ratio = useContext(RatioContext);
  const canvasWidth = 800 * ratio;
  const canvasHeight = 800;

  function drawDot(e) {
    setMouseDown(true);
    const offs = e.target.getBoundingClientRect();
    const posX = (e.pageX - offs.left) * (width / offs.width);
    const posY = (e.pageY - offs.top) * (height / offs.height);
    let style, comp;
    if (tool === 'draw') {
      style = '#000000ff'
      comp = 'source-over'
    } else if (tool === 'erase') {
      style = '#000000ff';
      console.log(ctx.globalCompositeOperation)
      comp = "destination-out";
    }
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    ctx.globalCompositeOperation = comp
    ctx.fillRect(posX, posY, 1, 1);
    imageToAscii();
  }
  function drawLine(e) {
    if (mouseDown) {
      const offs = e.target.getBoundingClientRect();
      const endX = e.pageX - offs.left;
      const endY = e.pageY - offs.top;
      const scaleX = width / offs.width;
      const scaleY = height / offs.height;
      ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
      ctx.moveTo((endX - e.movementX) * scaleX, (endY - e.movementY) * scaleY);
      ctx.lineTo(endX * scaleX, endY * scaleY);
      ctx.stroke();
      imageToAscii();
    }
  }

  function imageToAscii() {
    const pixelArray = ctx.getImageData(0, 0, width, height).data;
    //the pixel array is a single line of RGBA values, that we need to break up into blocks of characters
    let newAscii = '';
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const blockOffset = i * blockHeight * width + j * blockWidth;
        let index = 0;
        for (let bi = 0; bi < blockHeight; bi ++) {
          for (let bj = 0; bj < blockWidth; bj++) {
            if (pixelArray[(blockOffset + bi * width + bj) * 4 + 3] > 128) {
              index += 1 << (bi * blockWidth + bj)
            }
          }
        }
        newAscii += asciiMap[index]
        //end of the line
        if (j === gridWidth - 1) newAscii += '\n';
      }
    }
    setAscii(newAscii);
    updateArt(newAscii);
  }

  useEffect(() => {
    imageToAscii()
  }, [rendered])

  return (
    <div >
      <div style={{ position: 'relative', width: 'fit-content'}} className='cleanBorder'>
        <div
          width={width}
          height={height}
          onMouseDown={drawDot}
          onMouseUp={() => setMouseDown(false)}
          onMouseMove={drawLine}
          onMouseOut={() => setMouseDown(false)}
          style={{ width: canvasWidth, height: canvasHeight }}
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
      <div>
        <button type="button" onClick={() => setTool('draw')} disabled={tool === 'draw'} >
          <img src={PencilIcon} />
        </button>
        <button type="button"  onClick={() => setTool('erase')} disabled={tool === 'erase'} >
          <img src={EraserIcon} />
        </button>
      </div>
    </div>
  );
}

DrawingArea.propTypes = { updateArt: PropTypes.func, canvas: PropTypes.any, rendered: PropTypes.bool };

export default DrawingArea;
