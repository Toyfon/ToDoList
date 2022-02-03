import {instance} from "./instance";


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
