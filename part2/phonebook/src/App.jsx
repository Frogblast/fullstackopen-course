import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ onChange }) => {
  return (
    <div>
      filter shown with: <input onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, onChangeName, valueName, onChangeNumber, valueNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input onChange={onChangeName} value={valueName} /></div>
      <div>number: <input onChange={onChangeNumber} value={valueNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Contact = ({ name, number }) => {
  return <div>{name} {number}</div>
}

const Persons = ({ persons, filter }) => {
  const personsToShow = () => {
    return persons.filter(person => { return person.name.toLowerCase().includes(filter.toLowerCase()) })
  }

  return (
    <>
      {personsToShow().map(person => <Contact key={person.id} name={person.name} number={person.number} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }, []) // The [] argument makes this get request only happens when the component renders

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }

  const addNewContact = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (newName === '' || newNumber === '') {
      alert('Provide both name and number')
      return
    }
    setNewName('')
    setNewNumber('')
    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewContact} onChangeName={handleNameInput} valueName={newName}
        onChangeNumber={handleNumberInput} valueNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
