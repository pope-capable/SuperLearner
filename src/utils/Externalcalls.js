import axios from "axios"
const baseUrl = "http://localhost:8000/"

export function simplePost(location, data) {
    axios.post(`${baseUrl}/${location}`, data).then(response => {
        return response
    })
}

export function postWithHeaders(location, data, headers) {
    return axios.post(baseUrl + location, data, {headers})
}

export function getWithHeaders(location, headers) {
    return axios.get(baseUrl + location, {headers})
}