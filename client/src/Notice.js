import React from 'react'

import './Notice.css'

const errorStyle = {
  color: 'red'
}

const Notice = ({ notice }) => {
  return (
    <div className='notice' style={notice.type === 'error' ? errorStyle : null}>
      <p>{notice.text}</p>
    </div>
  )
}

export default Notice
