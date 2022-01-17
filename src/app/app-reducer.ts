const initState: InitStateType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: InitStateType = initState, action: AppActionsType):InitStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status:action.status}
        case 'APP/SET-ERROR':
            return {...state, error:action.error}
        default:
            return {...state}
    }
}

//actions
export const setAppError = (error: string | null) => ({type:'APP/SET-ERROR',error}as const)
export const setAppStatus = (status: StatusType) => ({type:'APP/SET-STATUS',status}as const)

//types
export type InitStateType = {
    status: StatusType
    error: string | null
}
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetErrorActionType =  ReturnType<typeof setAppError>
export type SetStatusActionType =  ReturnType<typeof setAppStatus>
export type AppActionsType =  SetErrorActionType | SetStatusActionType

