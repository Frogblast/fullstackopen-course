import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import { Notification } from './components/Notification'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

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

    if (newName === '' || newNumber === '') {
      alert('Provide both name and number')
      return
    }
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already in the phonebook.
        Do you want to replace the old number with the new?`)) {
        const personToUpdate = persons.filter(person => person.name === newName)[0]
        const updatedPerson = { ...personToUpdate, number: newNumber }
        contactService
          .update(personToUpdate.id, updatedPerson)
          .then(response => 
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : response)))
          .catch(() => {
            setNotification({message: `${newName} was already removed from the phonebook`, type: 'error'})
            setTimeout(()=> setNotification(null), 4000)
            setPersons(persons.filter(p=>p.id!==personToUpdate.id))
          })
      }
    } else {
      contactService
        .add(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNotification({ message: `Added ${newName}`, type: 'success' })
    setTimeout(() => {setNotification(null)}, 4000)
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    const person = persons.find(person => person.id === id)
    if (person === null) return

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      contactService.deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({message: `${person.name} was removed`, type: 'success'})
        })
        .catch(error => { alert(error) })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
