import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  const filtered = countries.filter(country => country.name.includes(query))

  const countryEl = filtered.map(country => <div key={country.numericCode}>{country.name}</div>)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(c => c.concat(response.data))
      })
  },[])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }
  
  const renderCountries = () => {
    if(query.length === 0) {
      return <div>this is where the country display will go</div>
    } else if (filtered.length > 10) {
      return <div>Too many results. Be more specific.</div>
    } else if (filtered.length === 1) {
      const [ country ]  = filtered
      return (
        <div>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h2>Languages</h2>
          <ul>{country.languages.map(({iso639_1, name}) => <li key={iso639_1}>{name}</li>)}</ul>
          <div><img src={country.flag} alt={`${country.name} - flag`} width="180px" /></div>
        </div>
      )
    } else {
      return <>{countryEl}</>
    }
  }

  return (
    <div>
      find a country <input value={query} onChange={handleChange}/>
      {renderCountries()}
    </div>
  )
}

export default App
