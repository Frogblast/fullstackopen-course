import { useState, useEffect } from 'react'
import contactService from './services/contacts'

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

const Contact = ({name, number, id, deleteContact}) => {
  return (
    <div>{name} {number}
      <button onClick={() => deleteContact(id)} >delete</button>
    </div>
  )
}

const Persons = ({ persons, filter, deleteContact }) => {
  const personsToShow = () => {
    return persons.filter(person => { return person.name.toLowerCase().includes(filter.toLowerCase()) })
  }

  return (
    <>
      {personsToShow().map(person => 
        <Contact 
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          deleteContact={deleteContact}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    contactService.getAll().then(response => setPersons(response.data))
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

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      if(window.confirm(`${newName} is already in the phonebook.
        Do you want to replace the old number with the new?`)){
          const personToUpdate = persons.filter(person => person.name === newName)[0]
          const updatedPerson = {...personToUpdate, number: newNumber}                 
          contactService
          .update(personToUpdate.id, updatedPerson)
          .then(response => setPersons(persons.map(p=>p.id!==personToUpdate.id ? p : response)))
        }
      return
    }
    if (newName === '' || newNumber === '') {
      alert('Provide both name and number')
      return
    }
    contactService
      .add(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    const person = persons.find(person => person.id === id)
    if (person === null) return

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      contactService.deleteContact(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {alert(error)})
    }
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
      <Persons persons={persons} filter={newFilter} deleteContact={deleteContact} />
    </div>
  )
}

export default App
