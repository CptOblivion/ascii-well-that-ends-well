import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function GalleryEntry({ entry }) {

  const [fontSize, setFontSize] = useState(10);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current)
    }
  }, [ref.current])


  return (
    <div className='art' ref={ref}>
      <div>
        {entry.ascii.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </div>
  )
}
GalleryEntry.propTypes = { entry: PropTypes.object }

export default GalleryEntry;