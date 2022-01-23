import {RootThunkType} from "./Redux-store";
import {authApi} from "../api/authApi";
import {handleServerAppError, handleServerNetworkError} from "../helpers/error-helpers";
import {setIsLoggedIn} from "../Login/auth-reducer";

const initState: InitStateType = {
    status: 'idle',
    error: null,
    theme: 'light',
    isInitialized: false
}


export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-THEME':
            return {...state, theme: action.theme}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}


//actions
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatus = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)
export const setAppTheme = (theme: ThemeType) => ({type: 'APP/SET-THEME', theme} as const)

//Enum
enum ResponseStatusCodes {
    success = 0,
    error = 1,
    captcha = 10
}

// thunk
export const initializeApp = (): RootThunkType => async dispatch => {
    try {
        const {data} = await authApi.authMe()
        if (data.resultCode === ResponseStatusCodes.success) {
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerAppError(data, dispatch)
        }
        dispatch(setAppInitialized(true))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

//types
export type InitStateType = {
    status: StatusType
    error: string | null
    // true, когда приложение проинициализировалось (проверили юзера, получили настройки и т.д.)
    isInitialized: boolean
    theme: ThemeType
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeType = 'light' | 'dark'

export type SetErrorActionType = ReturnType<typeof setAppError>
export type SetStatusActionType = ReturnType<typeof setAppStatus>
export type SetInitializedActionType = ReturnType<typeof setAppInitialized>
export type SetAppThemeActionType = ReturnType<typeof setAppTheme>
export type AppActionsType = SetErrorActionType
    | SetStatusActionType
    | SetInitializedActionType
    | SetAppThemeActionType

