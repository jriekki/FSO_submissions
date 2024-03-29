const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('post-data', function getData (req) {
  if(req.method === 'POST')
    return JSON.stringify(req.body)
    else return null
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-64231"
    }
]


const generateId = () => {
    const id =  Math.floor(Math.random() * 100000000)
    return id
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    if (!persons.every(p => p.name !== body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req,res) => {
    const total = persons.length
    const reqTime = new Date()
    res.send(`<p>Phonebook has info for ${total} people.<br/><br/>
    ${reqTime}</p>`)
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

