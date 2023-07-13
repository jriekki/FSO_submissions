import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, likeFunction, removeBlog, username }) => {

    const [visible, setVisible] = useState(false)

    const updateVisibility = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

    const bigStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        display: visible ? "" : "none"
    }
    const smallStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        display: visible ? "none" : ""
    }

    const hideStyle = {
        display: username === blog.user.username ? "" : "none"
    }



    const like =  (event) => {
        event.preventDefault()

        const updatedBlog = { ...blog,  likes: blog.likes + 1 }
        likeFunction(updatedBlog, blog.id)

    }
    const remove = (event) => {
        event.preventDefault()
        const blogName = blog.author ? blog.title + " by " + blog.author : blog.title
        removeBlog(blogName, blog.id)
    }
    return (
        <div className="blog">
            <div style={smallStyle} className = "partialNote">
                {blog.title} {blog.author ? " by " : ""} {blog.author ? blog.author : ""}
                &nbsp;<button onClick={updateVisibility} id="showMore-button">more</button>
            </div>
            <div style={bigStyle} className = "fullNote">
                {blog.title} {blog.author ? " by " : ""} {blog.author ? blog.author : ""} &nbsp;<button onClick={updateVisibility}>Hide details</button>
                <br></br>
                {blog.url}
                <br></br>
                likes:   {blog.likes} <button onClick={like} id="like-button">like</button>
                <br></br>
                User: {blog.user.username}
                <br></br>
                <button onClick={remove} id="delete-button" style={hideStyle}>Delete blog</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeFunction: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

export default Blog