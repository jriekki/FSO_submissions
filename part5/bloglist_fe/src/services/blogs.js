import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postBlog = newBlog => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.post(baseUrl, newBlog, config)
    return request.then(response => response.data)
}

const likeBlog = (blogObject, id) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}`, blogObject, config)
    return request.then(response => response.data)

}

const removeBlog = (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { getAll, postBlog, likeBlog, removeBlog, setToken }