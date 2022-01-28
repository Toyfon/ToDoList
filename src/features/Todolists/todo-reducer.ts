import {RootThunkType} from "../../app/Redux-store";

import {toDoAPI, TodoType} from "../../api/todoApi";
import {setAppStatus, StatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../helpers/error-helpers";
import {ResponseStatusCodes} from "../../helpers/enum";


let initialState: Array<TodoDomainType> = []

export const toDoReducer = (state = initialState, action: TodoActionsType): Array<TodoDomainType> => {
    switch (action.type) {
        case "TODOS/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "TODOS/ADD-TODOLIST":
            return [{...action.payload.todolist, filter:'all',entityStatus:'idle'},...state]
        case "TODOS/CHANGE-TODOLIST_ENTITY_STATUS":
            return state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.entityStatus} : tl)
        case "TODOS/CHANGE-TODOLIST_TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "TODOS/CHANGE-TODOLIST_FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "TODOS/SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}))
        default:
            return state
    }
}

// Action Creators
export const removeTodoListAC = (id: string) => ({type: "TODOS/REMOVE-TODOLIST", payload: {id}} as const)
export const setTodoListsAC = (todos: Array<TodoType>) => ({type: "TODOS/SET-TODOS", todos} as const)
export const addTodoListAC = (todolist: TodoType) => ({type: "TODOS/ADD-TODOLIST", payload: {todolist}} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "TODOS/CHANGE-TODOLIST_TITLE", payload: {title, id}} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "TODOS/CHANGE-TODOLIST_FILTER", payload: {filter, id}} as const)
export const changeTodoListEntityStatusAC = (id: string, entityStatus: StatusType) => ({
    type: "TODOS/CHANGE-TODOLIST_ENTITY_STATUS", payload: {entityStatus, id}} as const)


//Thunk Creators
export const getTodoLists = ():RootThunkType => async dispatch => {
        try {
            dispatch(setAppStatus('loading'))
            let {data} = await toDoAPI.getTodos()
            dispatch(setTodoListsAC(data))
            dispatch(setAppStatus('succeeded'))
        } catch (error: any) {
            handleServerNetworkError(error,dispatch)
        }
}
export const deleteFetchedTodolist = (todolistId: string):RootThunkType => async dispatch => {
        try {
            dispatch(setAppStatus('loading'))
            dispatch(changeTodoListEntityStatusAC(todolistId,'loading'))
            let {data} = await toDoAPI.deleteTodo(todolistId)
            if (data.resultCode === ResponseStatusCodes.success) {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(data,dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error,dispatch)
        }
}
export const updateFetchedTodoTitle = (todolistId: string, title: string):RootThunkType => async dispatch => {
        try {
            dispatch(setAppStatus('loading'))
            let {data} = await toDoAPI.updateTodoTitle(todolistId, title)
            if (data.resultCode === ResponseStatusCodes.success) {
                dispatch(changeTodoListTitleAC(todolistId, title))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(data,dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error,dispatch)
        }
}
export const createTodolist = (title: string):RootThunkType => async dispatch => {
        try {
            dispatch(setAppStatus('loading'))
            let data = await toDoAPI.createTodo(title)
            if (data.resultCode === ResponseStatusCodes.success) {
                dispatch(addTodoListAC(data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error,dispatch)
        }
}

// types
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

export type TodoActionsType =
    | RemoveTodoListACType
    | AddTodoListACType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | SetTodoListsACType

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
    entityStatus : StatusType
}
export type FilterValuesType = "all" | "active" | "completed"