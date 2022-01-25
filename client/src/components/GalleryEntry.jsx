import React from 'react'
import PropTypes from 'prop-types'

function GalleryEntry({ entry }) {
  return (
    <div className='art'>
      {/* {entry.ascii} */}
      {entry.ascii.map((line, i) => <div key={i}>{line}</div>)}
    </div>
  )
}
GalleryEntry.propTypes = { entry: PropTypes.object }

export default GalleryEntry;