import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewInput = (event) => {
    setNewName(event.target.value)
  }

  const addNewName = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName
    }
    const names = persons.map(person => person.name)
    if (!names.includes(newName)){
      setPersons(persons.concat(personObject))
      setNewName('')
    } else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const DisplayAllNames = () => {
    return (
      <div>
        {persons.map(person => displayName(person))}
      </div>
    )
  }

  const displayName = (person)=>{
    return (
      <div>
        {person.name}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
          value={newName}
          onChange={handleNewInput}
        />
        </div>
        <div>
          <button onClick={addNewName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayAllNames />
    </div>
  )
}

export default App