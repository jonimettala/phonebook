import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          <h2>Add new</h2>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    )
}

export default PersonForm
