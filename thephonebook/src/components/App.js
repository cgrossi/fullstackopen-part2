import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(p => p.concat(response.data))
      })
  },[])

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

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
      const persObj = {
        name: newName,
        number: newNumber
      }

      axios
        .post('http://localhost:3001/persons', persObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    e.target.value.length ? setShowAll(false) : setShowAll(true)
    setSearch(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add New Person</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons numbers={numbers} />
    </div>
  )
}

export default App