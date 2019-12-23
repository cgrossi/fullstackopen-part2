import React from 'react'

const Search = ({query, handleChange}) => {

  return (
    <div>
      find a country <input value={query} onChange={handleChange}/>
    </div>
  )
}

export default Search