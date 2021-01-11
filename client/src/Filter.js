import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleFilterChange} /><br />
    </>
  )
}

export default Filter
