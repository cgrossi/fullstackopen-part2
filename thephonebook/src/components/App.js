import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase() === search.toLowerCase())

  const numbers = () => namesToShow.map(person => <div key={person.name}>{person.name} {person.number || ''} </div>)

  const handleSubmit = (e) => {
    e.preventDefault()
    let duplicate = false
    persons.forEach(person => {
      if(person.name === newName) {
        duplicate = true
        return alert(`${newName} is already in the phonebook`)
      }
    }) 
    if(!duplicate) {
      if(newNumber) {
        const persObj = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(persObj))
      } else {
        const persObj = {
          name: newName
        }
        setPersons(persons.concat(persObj))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    console.log(search, search.length)
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search the names shown <input value={search} onChange={handleSearch} />
      </div>
      <h2>Add New Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App