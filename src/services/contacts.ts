import axios from 'axios';

export const apiBaseURL = axios.create({
    baseURL: "http://localhost:4000/",
    headers: {
        "Content-type": "application/json"
    }
})
