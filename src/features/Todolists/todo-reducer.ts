import {toDoAPI, TodoType} from "../../api/todoApi";
import {ThunkDispatch} from "redux-thunk";
import {RootReducerType} from "../../app/Redux-store";


let initialState: Array<TodoDomainType> = []

export const toDoReducer = (state = initialState, action: ActionsType): Array<TodoDomainType> => {
    switch (action.type) {
        case "todos/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "todos/ADD-TODOLIST":
            return [{...action.payload.todolist, filter:'all'},...state]
        case "todos/CHANGE-TODOLIST_TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "todos/CHANGE-TODOLIST_FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "todos/SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// Action Creators
export const removeTodoListAC = (id: string) => ({type: "todos/REMOVE-TODOLIST", payload: {id}} as const)
export const setTodoListsAC = (todos: Array<TodoType>) => ({type: "todos/SET-TODOS", todos} as const)
export const addTodoListAC = (todolist: TodoType) => ({
    type: "todos/ADD-TODOLIST",
    payload: {todolist}
} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "todos/CHANGE-TODOLIST_TITLE",
    payload: {
        title,
        id
    }
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "todos/CHANGE-TODOLIST_FILTER", payload: {
        filter,
        id
    }} as const)


//Thunk Creators
//ThunkDispatch<any, any, any>
//1. rootState type
//2. extra arguments (unknown)
//3. Action Types
export const getTodoLists = () => async (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsType>) => {
    try {
        let {data} = await toDoAPI.getTodos()
        dispatch(setTodoListsAC(data))
    } catch (e: any) {
        throw new Error('ERROR')
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
    return async (dispatch:  ThunkDispatch<RootReducerType, unknown, ActionsType>) => {
        try {
            let {data} = await toDoAPI.createTodo(title)
            dispatch(addTodoListAC(data.item))

        } catch (e: any) {
            console.warn('ERROR')
        }
    }
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export type ActionsType =
    | removeTodoListACType
    | addTodoListACType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | setTodoListsACType

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
}
