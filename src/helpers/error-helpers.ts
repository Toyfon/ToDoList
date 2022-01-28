import {Dispatch} from "redux";

import {setAppError, SetErrorActionType, setAppStatus, SetStatusActionType} from "../app/app-reducer";
import {CommonResponseType} from "../api/tasksApi";



export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: ErrorHelpersDispatchType) => {
    dispatch(setAppError(data.messages.length ? data.messages[0]: "Something wrong. Try later!"))
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorHelpersDispatchType) => {
    dispatch(setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatus('failed'))
}


type ErrorHelpersDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>