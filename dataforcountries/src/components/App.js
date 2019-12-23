import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'
import Search from './Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
 
  const filtered = countries.filter(country => country.name.includes(query))
  const countryEl = filtered.map(country => {
    return (
    <div key={country.numericCode}>
      {country.name} <button onClick={() => setQuery(country.name)}>Show</button>
    </div>
    )
  })

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(c => c.concat(response.data))
      })
  },[])

  const handleChange = (e) => {
    if(query.length === 0 && Object.entries(weather).length !== 0) {
      setWeather({})
      setQuery(e.target.value)
    } else {
      setQuery(e.target.value)
    }
  }

  const updateWeather = (data) => {
    setWeather(data)
  }

  return (
    <div>
      <Search query={query} handleChange={handleChange} />
      <Country query={query} filtered={filtered} countryEl={countryEl} updateWeather={updateWeather} weather={weather} />
    </div>
  )
}

export default App
