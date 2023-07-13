const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
    test('of empty list is zero', () => {
      expect(totalLikes([])).toBe(0)
    })

      const listOfBlogs = [
        {
        "title": "Cooking blog",
        "author": "Jordan Ramsay",
        "url": "jordoncooks.com",
        "likes": 66,
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
  
    test('when list has only one blog, equals the likes of that', () => {
      expect(totalLikes([listOfBlogs[1]])).toBe(7)
    })
  
    test('of a bigger list is calculated right', () => {
      expect(totalLikes(listOfBlogs)).toBe(183)
    })
  })