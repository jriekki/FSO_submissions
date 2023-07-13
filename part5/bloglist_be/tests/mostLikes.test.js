const mostLikes = require('../utils/list_helper').mostLikes

describe('author with most likes', () => {

    const listOfBlogs = [
        {
        "title": "A simple financial advice blog",
        "author": "Martin Clock",
        "url": "biz.com",
        "likes": 11,
        "id": "64a6bae1b30359fe7e14a3g1"
        },
        {
        "title": "Cooking blog",
        "author": "Jordan Ramsay",
        "url": "jordoncooks.com",
        "likes": 110,
        "id": "64a6b0659667475d12ddfbd5"
        },
        {
        "title": "Books!",
        "author": "Mary Perry",
        "url": "bookbymary.info",
        "likes": 7,
        "id": "64a6b0979667475d12ddfbd8"
        },
        {
        "title": "More books!",
        "author": "Mary Perry",
        "url": "booksbymary.net",
        "likes": 70,
        "id": "64a6b0912667475d12ddfbd8"
        },
        {
        "title": "Cloks!",
        "author": "Martin Clock",
        "url": "time.time",
        "likes": 110,
        "id": "64a6bae1b30359fe7e14a35a"
        },
        {
        "title": "No more books!",
        "author": "Mary Perry",
        "url": "books.arebad.net",
        "likes": 0,
        "id": "64a6b0912667475d12dd123h"
        }
        ]
    
    test("when list has only one blog", () => {
      expect(mostLikes([listOfBlogs[1]])).toEqual({"author": "Jordan Ramsay", "likes": 110})
    })
  
    test('in a bigger list is correct', () => {
      expect(mostLikes(listOfBlogs)).toEqual({"author": "Martin Clock", "likes": 121})
    })
  })