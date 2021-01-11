import React from 'react'

const Person = ({ person, handleDelete }) => {
  return (
    <>
      {person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button><br />
    </>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => <Person person={person} key={person.name} handleDelete={handleDelete} />)
}

export default Persons
