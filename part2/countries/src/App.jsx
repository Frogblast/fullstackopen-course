import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {

  const list = countries.filter(country => { return country.name.common.toLowerCase().includes(filter.toLowerCase()) })

  let result = list.length > 10 ? 'List is too long' :
    <ul>
      {list.map(country =>
        <li key={country.cca3}>{country.name.common}</li>
      )}
    </ul>

  if (list.length === 1) {
    const country = list[0]
    result =
      <div>
        <h2> {country.name.common} </h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h3> Languages </h3>
        <ul>
          {Object.values(country.languages).map(language => <li>{language}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
  }

  return (
    <div>
      {result}
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (filter) {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
    } else {
      setCountries([])
    }
  }, [filter])

  return (
    <>
      <div>
        find countries <input onChange={text => setFilter(text.target.value)} />
      </div>
      <Countries countries={countries} filter={filter} />
    </>
  )
}

export default App
