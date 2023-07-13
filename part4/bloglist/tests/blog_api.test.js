const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { forEach } = require('lodash')

const listOfBlogs = [
    {
    "title": "A simple financial advice blog",
    "author": "Matrin Clock",
    "url": "biz.com",
    "likes": 11
    },
    {
    "title": "Cooking blog",
    "author": "Jordan Ramsay",
    "url": "jordoncooks.com",
    "likes": 110
    },
    {
    "title": "Books!",
    "author": "Mary Perry",
    "url": "bookbymary.info",
    "likes": 7
    },
    {
    "title": "More books!",
    "author": "Mary Perry",
    "url": "booksbymary.net",
    "likes": 70
    },
    {
    "title": "Cloks!",
    "author": "Matrin Clock",
    "url": "time.time",
    "likes": 110
    },
    {
    "title": "No more books!",
    "author": "Mary Perry",
    "url": "books.arebad.net",
    "likes": 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = listOfBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe("GET request response", () => {
    test('is JSON and has code 200', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('has correct number of items', async () => {
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(listOfBlogs.length)
      })
})


test('single item identifier is named "id"', async () => {
    const response = await api
        .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

describe('POST request', () => {
    test('returns right code and adds item to database', async () => {
        const newBlog = {
            "title": "Tests!",
            "author": "Thomas Est",
            "url": "tests.ai",
            "likes": 91
            }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(listOfBlogs.length + 1)
        const simplifiedResponse = response.body.map(({id, ...rest}) => rest)
        expect(simplifiedResponse).toContainEqual(newBlog)
        
    })
    
    test('"likes" defaults to 0', async () => {
        const newBlog = {
            "title": "No likes",
            "author": "Bas Blogger",
            "url": "zerolikes.com"
            }
    
        const blogObject = new Blog(newBlog)
        await blogObject.save()
    
        const newId = blogObject.id
        const response = await api
            .get(`/api/blogs/${newId}`)
    
        expect(response.body.likes).toBe(0)
    })
    
    test("title and url are mandatory, author isn't", async () => {
        const noTitle = {
            "author": "Nemo",
            "url": "mysteryblog.net",
            "likes": 12
            }
        
        const noUrl = {
            "title": "My router broke",
            "author": "Old Timer",
            "likes": 0
        }
    
        const noAuthor = {
            "title": "My secret blog",
            "url": "secrit.net"
            }
    
        const noBlog = {
            "author": "Marky Mark",
            "likes": 1000
            }
    
        await api
            .post('/api/blogs')
            .send(noTitle)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(noUrl)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(noBlog)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(noAuthor)
            .expect(201)
    })
})


describe('deleting a blog', () => {
    test('with a valid id works', async () => {
        const allBlogs = await api
            .get('/api/blogs')
        const validId = allBlogs.body[0].id
        await api
            .delete(`/api/blogs/${validId}`)
            .expect(204)
        
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(allBlogs.body.length - 1)

        expect(allBlogs.body).toContainEqual(allBlogs.body[0])
        expect(response.body).not.toContainEqual(allBlogs.body[0])
            
    })
    test('with an invalid id does nothing', async () => {
        const allBlogs = await api
            .get('/api/blogs')
        const invalidId = 101010
        
        await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400)
        
        const response = await api
            .get('/api/blogs')
        expect(response.body).toHaveLength(allBlogs.body.length)
    })
})

describe('changing the information of a blog', () => {
    test('works for a valid id', async () => {
        const allBlogs = await api
            .get('/api/blogs')
        const newBlog = { ...allBlogs.body[0], "likes": allBlogs.body[0].likes + 1}

        await api
            .put(`/api/blogs/${allBlogs.body[0].id}`)
            .send(newBlog)
            .expect(200)
        
            const newBlogs = await api
            .get('/api/blogs')

            expect(newBlogs.body).toContainEqual(newBlog)

    })

    test('does nothing for an invalid id', async () => {
        const allBlogs = await api
            .get('/api/blogs')
        const newBlog = { ...allBlogs.body[0], "likes": allBlogs.body[0].likes + 1}

        await api
            .put(`/api/blogs/1234`)
            .send(newBlog)
            .expect(400)
        
            const newBlogs = await api
            .get('/api/blogs')

            expect(newBlogs.body).toEqual(allBlogs.body)

    })
})
afterAll(async () => {
  await mongoose.connection.close()
})