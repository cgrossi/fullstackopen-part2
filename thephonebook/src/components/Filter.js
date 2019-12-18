import React from 'react'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
    Search the names shown <input value={search} onChange={handleSearch} />
    </div>
  )
}

export default Filter