import axios from "axios"
const baseUrl = "http://localhost:3000"

export function simplePost(location, data) {
    axios.post(`${baseUrl}/${location}`, data).then(response => {
        return response
    })
}

