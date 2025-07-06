import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }
  
  const personsToShow = () => {
    return persons.filter(person => {return person.name.toLowerCase().includes(newFilter.toLowerCase())})
  }


  const addNewContact = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: String(persons.length),
      number: newNumber
    }
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (newName === '' || newNumber === '') {
      alert('Provide both name and number')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const Contact = ({ name, number }) => {
    return <div>{name} {number}</div>
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input onChange={handleFilterInput}/> 
          </div>
      <h2>Add a new</h2>
      <form onSubmit={addNewContact}>
        <div>name: <input onChange={handleNameInput} value={newName} /></div>
        <div>number: <input onChange={handleNumberInput} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {personsToShow().map(person => <Contact key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App