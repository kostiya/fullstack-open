import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = ({filter, setFilter}) => {
  return(
    <>
      find countries:
      <input value = {filter}
            onChange={(event) => setFilter(event.target.value)} />
    </>
  )
}

const CountryInfo = ({country}) => {
  const [temp, setTemp] = useState(0)
  const [icon, setIcon] = useState('')
  const [wind, setWind] = useState(0)
  const api_key = process.env.REACT_APP_API_KEY
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
  .then(
    (response) => {
      const weatherData= response.data
      setTemp(weatherData.main.temp)
      setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
      setWind(weatherData.wind.speed)
    }
  )
  return(
  <>
  <h1>{country.name.common}</h1>
  capital {country.capital[0]} <br/>
  area {country.area}
  <h3>languages</h3>
  <ul>
    {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li> )}
  </ul>
  <div style={{ fontSize : '150px'}}>{country.flag}</div>
  <h1>Weather in {country.capital[0]}</h1>
  temprature {temp} Celcius<br />
  <img src={icon} /><br/>
  wind {wind} m/s<br/>
  </>
)}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all')
         .then(respons => setCountries(respons.data))
  }, [])

  if(countries.length === 0){
    return(<h1>Loading countries</h1>)
  }
  
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  if(filteredCountries.length > 10){
    return(
    <>
    <FindCountries filter={filter} setFilter={setFilter} />
    <h1>Too many countries, specify another filter.</h1>
    </>)
  }

  if(filteredCountries.length > 1){
    return(
    <>
      <FindCountries filter={filter} setFilter={setFilter} />
      <table>
        <tbody>
          {filteredCountries.map((country) => 
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td><button onClick={() => setFilter(country.name.common)}>show</button></td>
          </tr>)}
        </tbody>
      </table>
    </>
    )
  }

  if(filteredCountries.length === 0){
    return(
    <>
      <FindCountries filter={filter} setFilter={setFilter} />
    </>
    )
  }

  const country = filteredCountries[0]

  return(
  <>
  <FindCountries filter={filter} setFilter={setFilter} />
  <CountryInfo country={country} />
  </>
  )
}

export default App;
