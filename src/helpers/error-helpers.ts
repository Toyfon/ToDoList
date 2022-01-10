import {setError, SetErrorActionType, setStatus, SetStatusActionType} from "../app/app-reducer";
import {CommonResponseType} from "../api/tasksApi";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data:CommonResponseType<D>, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError("Some error occurred"))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setError(error.message ? error.message : "Some error occurred"))
    dispatch(setStatus('failed'))
}