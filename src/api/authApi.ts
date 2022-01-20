import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})



export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export  const authApi = {
    login(params: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId?: number }>>(`/auth/login`, params)
    },
}


type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}
