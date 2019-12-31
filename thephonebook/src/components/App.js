import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import noteService from '../services/notes'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(p => p.concat(response.data))
      })
  },[])

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

const numbers = () => namesToShow.map(person => <div key={person.name}>{person.name} {person.number || ''} <button onClick={() => handleDelete(person.name, person.id)}>Delete</button></div>)

  const handleSubmit = (e) => {
    e.preventDefault()
    let duplicate = false
    persons.forEach(person => {
      if(person.name === newName) {
        duplicate = true
        if(window.confirm(`${person.name} is already in the phonebook, would you like to update their phone number?`)) {
          let newContact = {...person}
          newContact.number = newNumber
          noteService
            .updateContact(person.id, newContact)
            .then(response => {
              setMessage(`Updated ${response.data.name} successfully`)
              setTimeout(() => {
                setMessage(null)
              },3500)
              setPersons(persons.map(contact => {
                if(contact.name === newName) {
                  return response.data
                } else {
                  return contact
                }
              }))
              setNewName('')
              setNewNumber('')
            })
            .catch(() => {
              setError(`${newContact.name} has already been removed from the server`)
              setTimeout(() => {
                setError(null)
              },3500)
              setPersons(persons.filter(person => person.name !== newContact.name))
              setNewName('')
              setNewNumber('')
            })
        }
      }
    }) 
    if(!duplicate) {
      const persObj = {
        name: newName,
        number: newNumber
      }

      noteService
        .addContact(persObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Added ${response.data.name} successfully`)
          setTimeout(() => {
            setMessage(null)
          },3500)
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

  const handleDelete = (name, id) => {
    let confirm = window.confirm('Are you sure you want to delete this contact?')
    if(confirm) {
      noteService
        .deleteContact(id)
        .then(() => {
          const newPersons = persons.filter(contact => contact.name !== name)
          setPersons(newPersons)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add New Person</h3>
      <Notification message={message} error={error}/>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons numbers={numbers} />
    </div>
  )
}

export default App