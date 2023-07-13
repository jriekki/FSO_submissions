import { useState } from "react"

const NewBlog = ({ sendBlog }) => {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogAuthor, setBlogAuthor] = useState("")
    const [blogUrl, setBlogUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        const hasAuthor = blogAuthor.length > 0
        const blogObject = {
            "title": blogTitle,
            ...(hasAuthor && { "author": blogAuthor }),
            "url": blogUrl
        }
        sendBlog(blogObject)
        setBlogAuthor("")
        setBlogTitle("")
        setBlogUrl("")
    }

    return(
        <div>
            <form onSubmit={addBlog}>
                title:&nbsp;
                <input
                    type="text"
                    value={blogTitle}
                    name="Title"
                    id="title"
                    onChange={({ target }) => setBlogTitle(target.value)}
                    placeholder="Blog name"
                />
                <br></br>
                url:&nbsp;
                <input
                    type="text"
                    value={blogUrl}
                    name="url"
                    id="url"
                    onChange={({ target }) => setBlogUrl(target.value)}
                    placeholder="example.com"
                />
                <br></br>
                Author:&nbsp;
                <input
                    type="text"
                    value={blogAuthor}
                    name="Author"
                    id="author"
                    onChange={({ target }) => setBlogAuthor(target.value)}
                    placeholder="(optional)"
                />
                <br></br>
                <button type="submit" id="submit-button" style={{ width: "250px", }}>Send</button>
            </form>
        </div>
    )
}

export default NewBlog
