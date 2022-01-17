import {setAppError, SetErrorActionType, setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {CommonResponseType} from "../api/tasksApi";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data:CommonResponseType<D>, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError("Something wrong! Try later"))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatus('failed'))
}