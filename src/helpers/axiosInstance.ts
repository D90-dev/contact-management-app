import axios from 'axios'

export const axiosInstance = axios.create({
    // @ts-ignore-next-line
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json'
    }
})
