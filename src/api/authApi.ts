import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})

export const authApi = {
    authMe() {
        return instance.get<CommonResponseType<ResponseMeType>>(`/auth/me`)
    },
    login(params: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId?: number }>>(`/auth/login`, params)
    },
    logout() {
        return instance.delete<CommonResponseType>(`/auth/login`)
    }
}


type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}


export type ResponseMeType = {
    id: number,
    email: string,
    login: string
}
