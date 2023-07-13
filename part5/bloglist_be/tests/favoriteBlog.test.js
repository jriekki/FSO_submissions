const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog ', () => {

    const listOfBlogs = [
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
        "title": "Cloks!",
        "author": "Matrin Clock",
        "url": "time.time",
        "likes": 110,
        "id": "64a6bae1b30359fe7e14a35a"
        }
        ]
    
    test('when list has only one blog', () => {
      expect(favoriteBlog([listOfBlogs[1]]).likes).toEqual(7)
    })
  
    test('of a bigger list is correct', () => {
      expect(favoriteBlog(listOfBlogs).likes).toEqual(110)
    })
  })