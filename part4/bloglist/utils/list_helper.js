const ld = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    blogs.sort((a,b) => b.likes - a.likes)
    const zeroBlog = blogs[0]
    return {
        title: zeroBlog.title,
        author: zeroBlog.author,
        likes: zeroBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const authorCounts = ld.countBy(blogs, a => a.author)
    const topAuthor = Object.entries(authorCounts).sort((a,b) => b[1]-a[1])[0]
    return {
        "author": topAuthor[0],
        "blogs": topAuthor[1]
    }
}

const mostLikes = (blogs) => {
    const listOfLikes = ld.groupBy(blogs, a => a.author)
    const reducer = (sum, item) => sum + item.likes
    const authorLikes = ld.mapValues(listOfLikes, function(likes) {
        return likes.reduce(reducer, 0)
    })
    const topAuthor = Object.entries(authorLikes).sort((a,b) => b[1]-a[1])[0]
    return {
        "author": topAuthor[0],
        "likes": topAuthor[1]
    }

}

module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}