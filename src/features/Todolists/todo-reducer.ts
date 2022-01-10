import {toDoAPI, TodoType} from "../../api/todoApi";
import {ThunkDispatch} from "redux-thunk";
import {RootReducerType} from "../../app/Redux-store";
import {setStatus, SetStatusActionType} from "../../app/app-reducer";


let initialState: Array<TodoDomainType> = []

export const toDoReducer = (state = initialState, action: ActionsType): Array<TodoDomainType> => {
    switch (action.type) {
        case "TODOS/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "TODOS/ADD-TODOLIST":
            return [{...action.payload.todolist, filter:'all'},...state]
        case "TODOS/CHANGE-TODOLIST_TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "TODOS/CHANGE-TODOLIST_FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "TODOS/SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// Action Creators
export const removeTodoListAC = (id: string) => ({type: "TODOS/REMOVE-TODOLIST", payload: {id}} as const)
export const setTodoListsAC = (todos: Array<TodoType>) => ({type: "TODOS/SET-TODOS", todos} as const)
export const addTodoListAC = (todolist: TodoType) => ({
    type: "TODOS/ADD-TODOLIST",
    payload: {todolist}
} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "TODOS/CHANGE-TODOLIST_TITLE",
    payload: {
        title,
        id
    }
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "TODOS/CHANGE-TODOLIST_FILTER", payload: {
        filter,
        id
    }} as const)


//Thunk Creators
//ThunkDispatch<any, any, any>
//1. rootState type
//2. extra arguments (unknown)
//3. Action Types
export const getTodoLists = () => {
    return async (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsType | SetStatusActionType>) => {
        try {
            dispatch(setStatus('loading'))
            let {data} = await toDoAPI.getTodos()
            dispatch(setTodoListsAC(data))
            dispatch(setStatus('succeeded'))
        } catch (e: any) {
            throw new Error('ERROR')
        }
    }
}
export const deleteFetchedTodolist = (todolistId: string) => {
    return async (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsType>) => {
        try {
            let {data} = await toDoAPI.deleteTodo(todolistId)
            if (data.resultCode === 0) {
                dispatch(removeTodoListAC(todolistId))
            }
        } catch (e: any) {
            console.warn('ERROR')
        }
    }
}
export const updateFetchedTodoTitle = (todolistId: string, title: string) => {
    return async (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsType>) => {
        try {
            let {data} = await toDoAPI.updateTodoTitle(todolistId, title)
            if (data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todolistId, title))
            }
        } catch (e: any) {
            console.warn('ERROR')
        }
    }
}
export const createTodolist = (title: string) => {
    return async (dispatch:  ThunkDispatch<RootReducerType, unknown, ActionsType | SetStatusActionType>) => {
        try {
            dispatch(setStatus('loading'))
            let {data} = await toDoAPI.createTodo(title)
            dispatch(addTodoListAC(data.item))
            dispatch(setStatus('succeeded'))
        } catch (e: any) {
            console.warn('ERROR')
        }
    }
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>

export type ActionsType =
    | RemoveTodoListACType
    | AddTodoListACType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListsACType

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
}
