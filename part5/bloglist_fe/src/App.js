import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import NewBlog from "./components/NewBlog"
import LoginForm from "./components/LoginForm"
import Hideable from "./components/Hideable"

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    const style = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={style} className="notification">
            {message}
        </div>
    )
}

const Error = ({ message }) => {
    if (message === null) {
        return null
    }
    const style = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={style} className="error">
            {message}
        </div>
    )
}

const blogLikeComparison = (a,b) => {
    return b.likes - a.likes
}


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const [notificationMsg, setNotificationMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort(blogLikeComparison)
            setBlogs(blogs)
        }
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const loginEvent = async (event) => {
        event.preventDefault()
        try {
            const userObject = { username, password }
            const user = await loginService.login(userObject)
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            setNotificationMsg("Logged in!")
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
        }
        catch (exception) {
            setErrorMsg("Wrong credentials")
            console.log(exception)
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        }
    }

    const logoutEvent = async (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem("loggedBlogappUser")
        setNotificationMsg("Logged out")
        setTimeout(() => {
            setNotificationMsg(null)
        }, 5000)
    }
    const newBlogRef = useRef()
    const addBlog = (blogObject) => {
        blogService
            .postBlog(blogObject)
            .then(returnedBlog => {
                blogService.getAll().then(blogs => {
                    blogs.sort(blogLikeComparison)
                    setBlogs(blogs)
                }
                )
                let newBlogNotification = "Added " + returnedBlog.title
                if (returnedBlog.author) {
                    newBlogNotification = newBlogNotification + " by " + returnedBlog.author
                }
                setNotificationMsg(newBlogNotification)
                newBlogRef.current.toggleVisibility()
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 5000)
            }).catch(error => {
                console.log(error)
                setErrorMsg("Couldn't add blog")
                setTimeout(() => {
                    setErrorMsg(null)
                }, 5000)

            })
    }

    const removeBlog = (name, id) => {
        if (window.confirm(`Delete ${name} from bloglist?`)){
            blogService
                .removeBlog(id)
                .then(() => {
                    blogService.getAll()
                        .then(blogs => {
                            blogs.sort(blogLikeComparison)
                            setBlogs(blogs)
                        })
                    setNotificationMsg(`Deleted ${name} from bloglist`)
                }
                )
        }
    }

    const likeBlog = (blogObject, blogId) => {
        blogService
            .likeBlog(blogObject, blogId).then(() => {
                blogService.getAll()
                    .then(blogs => {
                        blogs.sort(blogLikeComparison)
                        setBlogs(blogs)
                    })

            })
    }

    if (user === null) {
        return (
            <div>
                <Notification message={notificationMsg}/>
                <Error message={errorMsg}/>
                <LoginForm username = {username} setUsername = {setUsername} password={password} setPassword={setPassword} submitEvent={loginEvent}/>

            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notificationMsg}/>
            <Error message={errorMsg}/>
            {user.name} logged in
            <form onSubmit={logoutEvent}>
                <button type="submit" style={{ width: "250px", }}>logout</button>
            </form>
            <div id="blogList">
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} likeFunction={likeBlog} removeBlog={removeBlog} username={user.username} />
                )}
            </div>
            <Hideable buttonLabel = 'Add new blog' ref = {newBlogRef}>
                <h2> Add new blog</h2>
                <NewBlog sendBlog={addBlog}/>
            </Hideable>

        </div>
    )
}

export default App