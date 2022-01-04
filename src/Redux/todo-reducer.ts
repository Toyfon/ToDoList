import {Dispatch} from "redux";
import {toDoAPI} from "../api/todoApi";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


let initialState = {
    todos: [] as Array<TodolistType>
}
export type InitStateType = typeof initialState

export const toDoReducer = (state = initialState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "todos/REMOVE-TODOLIST":
            return {
                ...state,
                todos: state.todos.filter(tl => tl.id !== action.payload.id)
            }
        case "todos/ADD-TODOLIST":
            let newTodolist: TodolistType = {
                ...action.payload,
                filter: "all"
            }
            return {
                ...state,
                todos: [...state.todos, newTodolist]
            }
        case "todos/CHANGE-TODOLIST_TITLE":
            return {
                ...state,
                todos: state.todos
                    .map(s => s.id === action.payload.id
                        ?
                        {...s, title: action.payload.title}
                        : s)
            }
        case "todos/CHANGE-TODOLIST_FILTER":
            return {
                ...state,
                todos: state.todos
                    .map(s => s.id === action.payload.id
                        ?
                        {...s, filter: action.payload.filter}
                        : s)
            }
        case "todos/SET-TODOS":
            return {
                ...state, todos: action.todos.map(tl => ({
                    ...tl,
                    filter: 'all'
                }))
            }
        default:
            return state
    }
}

//Action Types
export type ActionType = removeTodoListACType |
                         addTodoListACType |
                         changeTodoListTitleACType |
                         changeTodoListFilterACType |
                         setTodoListsACType

// Action Creators
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => ({type: "todos/REMOVE-TODOLIST", payload: {id}} as const)

export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todos: Array<any>) => ({type: "todos/SET-TODOS", todos} as const)

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string, id: string) => ({
    type: "todos/ADD-TODOLIST",
    payload: {title, id}
} as const)

export type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "todos/CHANGE-TODOLIST_TITLE",
    payload: {
        title,
        id
    }
} as const)

export type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "todos/CHANGE-TODOLIST_FILTER", payload: {
        filter,
        id
    }
} as const)



//Thunk Creators
export const getTodoLists = () => async (dispatch: Dispatch) => {
    try {
        let response = await toDoAPI.getTodos()
        dispatch(setTodoListsAC(response.data))
    } catch (e: any) {
        throw new Error('ERROR')
    }
}



