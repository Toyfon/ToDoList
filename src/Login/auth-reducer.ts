import {RootThunkType} from "../app/Redux-store";
import {setAppStatus} from "../app/app-reducer";
import {authApi, LoginParamsType} from "../api/authApi";
import {handleServerAppError, handleServerNetworkError} from "../helpers/error-helpers";


const initState:InitStateType = {
    isLoggedIn:false
}


export const authReducer = (state:InitStateType = initState, action:AuthActionType):InitStateType => {
    switch (action.type) {
        case "login/LOGGED_IN":
            return {...state,  isLoggedIn: action.payload.value}
        default:
            return state
    }
}

//action creators
export const setIsLoggedIn = (value: boolean) => ({type:'login/LOGGED_IN', payload:{value}} as const)

//Thunk creators
export const loginTC = (params: LoginParamsType): RootThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
       let {data} = await authApi.login(params)
        if (data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(data,dispatch)
        }

    } catch (error:any) {
            handleServerNetworkError(error, dispatch)
    }
}

export type AuthActionType = ReturnType<typeof setIsLoggedIn>
type InitStateType = {
    isLoggedIn:boolean
}