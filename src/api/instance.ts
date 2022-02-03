import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})