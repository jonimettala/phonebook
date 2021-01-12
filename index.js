const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const morganFormat = (tokens, req, res) => {
  if (tokens.method(req, res) === 'POST') {
    const personToAdd = req.body
    const person = {}
    person.name = personToAdd.name
    person.number = personToAdd.number

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(person)
    ].join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}

app.use(cors())
app.use(express.json())
app.use(morgan(morganFormat))
app.use(express.static('build'))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  
  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'The request must include both name and number' 
    })
  } else  {
    const oldPerson = persons.find(p => p.name === person.name)
    if (oldPerson) {
      return response.status(400).json({ 
        error: `Name ${person.name} already exists in phonebook`
      })
    } else {
      person.id = Math.floor(Math.random() * (99999 - 5) + 5)
      persons = persons.concat(person)
      response.status(201).json(person)
    }
  }
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people<br /><br />${Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
