import { useState, useEffect } from 'react'
import personService from './services/persons'

const personDelete = (person,persons,setPersons) => {
  if (window.confirm(`Delete ${person.name} from contacts?`)){
    personService.deletePerson(person.id).then(response => console.log(response))
    setPersons(persons.filter(p => p.id !== person.id))}
  }

const Person = ({person, persons, setPersons}) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => personDelete(person,persons,setPersons)}>Delete</button>
    </div>
  )
}

const FilterForm = ({val, fun}) => {
  return(
    <div>
  Filter by name:
  <input value = {val} onChange={fun}/>
  </div>
  )
}

const Notification = ({ message,style}) => {
  if (message === null) {
    return null
  }

  

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const ContactList = ({filteredPersons, persons, setPersons}) => filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/>)

const PersonForm = ({addPerson,newName,nameChange,newNumber,numberChange}) => {
  return(
  <form onSubmit = {addPerson}>
      <div>
          name: <input 
          value = {newName}
          onChange = {nameChange}/><br></br>
          number: <input 
          value = {newNumber}
          onChange = {numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {

  const positiveStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const negativeStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(positiveStyle)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const inequalName = (person) => person.name !== newName;
    if (persons.every(inequalName)){
      personService.addPerson(personObject).then(response => {
        setPersons(persons.concat(response))
        setAddedMessage(`${personObject.name} was added to contacts`)
      }
      ).catch(
        error => {
          setNotificationStyle(negativeStyle)
          setAddedMessage(error.response.data.error)
        }
      )
      
    }
    else {
      const idMatch = persons.find(p => !inequalName(p)).id
      if (window.confirm(`${personObject.name} is already in the phonebook. Update the number?`))
        {
        personService.updatePerson(idMatch,personObject).then(response => {
          setPersons(persons.filter(inequalName).concat(response))
          setAddedMessage(`Number of ${personObject.name} was updated.`)
          
        })
          .catch(error => {
          setNotificationStyle(negativeStyle)
          setAddedMessage(error.response.data.error)  
        })

          
        
      }
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setAddedMessage(null)
      setNotificationStyle(positiveStyle)
    }, 5000)
  }
  
  const nameChange = (event) => {
    setNewName(event.target.value)
  }
  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChange = (event) => {
    setFilterName(event.target.value)
  }
  

  const filteredPersons = filterName === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  useEffect(() => {personService.getAll().then(response => setPersons(response))}
    , [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={addedMessage} style={notificationStyle} />
        <FilterForm val={filterName} fun={filterChange} />
      <h3>Add new contact</h3>
        <PersonForm addPerson={addPerson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <ContactList filteredPersons={filteredPersons} persons = {persons} setPersons={setPersons} />
    </div>
  )
}

export default App