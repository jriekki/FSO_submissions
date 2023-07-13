const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const listOfUsers = [
    {
    "username": "alb22",
    "name": "Albert Fisher",
    "password": "paswrd"
    },
    {
    "username": "xX_marv_Xx",
    "name": "Marvin Bagley",
    "password": "qwerty"
    },
    {
    "username": "donk_the_bonk",
    "password": "hudasau_!f76ttqfugqh4"
    }
]

beforeEach(async () => {
    console.log("FORST!")
    await User.deleteMany({})
    const userObjects = listOfUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    console.log("SECND")
})


describe("GET request response", () => {
    test('is JSON and has code 200', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('has correct number of items', async () => {
        const response = await api
            .get('/api/users')
        expect(response.body).toHaveLength(listOfUsers.length)
      })
})

test('single item identifier is named "id"', async () => {
    const response = await api
        .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


describe('POST request', () => {
    test('returns right code and adds item to database', async () => {
        const newUser = {
            "username": "n00b",
            "name": "New User",
            "password": "ndew78t"
            }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        
        const response = await api
            .get('/api/users')
        expect(response.body).toHaveLength(listOfUsers.length + 1)
        expect(response.body.map(u => u.username)).toContainEqual(newUser.username)
        
    })
    
    test("username and password are mandatory, author isn't", async () => {
        const noUsername = {
            "name": "Nemo",
            "password": "jdef0008"
            }
        
        const noPassword = {
            "username": "Mike_Balmer",
            "name": "Mike Balmer"
        }
    
        const noName = {
            "username": "secter123",
            "url": "sikrti321"
            }
    
        await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)
    
        await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)
    
        await api
            .post('/api/users')
            .send(noName)
            .expect(201)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})