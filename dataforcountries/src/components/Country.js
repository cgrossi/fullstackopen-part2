import React from 'react'
import axios from 'axios'

const Country = ({query, filtered, countryEl, updateWeather, weather}) => {
  if(query.length === 0) {
    return <div>this is where the country display will go</div>
  } else if (filtered.length > 10) {
    return <div>Too many results. Be more specific.</div>
  } else if (filtered.length === 1 && Object.entries(weather).length === 0) {
    const [ country ]  = filtered
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
      .then(response => {
        updateWeather(response.data.current)
      })
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
  } else if (filtered.length === 1 && weather) {
    const [ country ]  = filtered
    return (
      <div>
        <h1>{country.name}</h1>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h2>Languages</h2>
        <ul>{country.languages.map(({iso639_1, name}) => <li key={iso639_1}>{name}</li>)}</ul>
        <div><img src={country.flag} alt={`${country.name} - flag`} width="180px" /></div>
        <h3>Weather in {country.capital}</h3>
    <strong>Temperature: {weather.temperature} Celsius</strong>
  <div><img src={weather.weather_icons[0]} alt={`weather-icon`} /></div>
  <strong>Wind: {weather.wind_speed}kph direction: {weather.wind_dir}</strong>
      </div>
    )
  } else {
    return <>{countryEl}</>
  }
}

export default Country