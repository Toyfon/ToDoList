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
        case "REMOVE-TODOLIST":
            return {
                ...state,
                todos: state.todos.filter(tl => tl.id !== action.payload.id)
            }
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {
                ...action.payload,
                filter: "all"
            }
            return {
                ...state,
                todos: [...state.todos, newTodolist]
            }
        case "CHANGE-TODOLIST_TITLE":
            return {
                ...state,
                todos: state.todos
                    .map(s => s.id === action.payload.id
                        ?
                        {...s, title: action.payload.title}
                        : s)
            }
        case "CHANGE-TODOLIST_FILTER":
            return {
                ...state,
                todos: state.todos
                    .map(s => s.id === action.payload.id
                        ?
                        {...s, filter: action.payload.filter}
                        : s)
            }
        case "SET-TODOS":
            return {
                ...state, todos: action.todos
            }
        default:
            return state
    }
}


export type ActionType = ReturnType<typeof removeTodoListAC> |
                         ReturnType<typeof addTodoListAC> |
                         ReturnType<typeof changeTodoListTitleAC> |
                         ReturnType<typeof changeTodoListFilterAC> |
                         ReturnType<typeof setTodoListsAC>


export const removeTodoListAC = (id: string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const setTodoListsAC = (todos: Array<any>) => ({type: "SET-TODOS", todos} as const)
export const addTodoListAC = (title: string, id: string) => ({type: "ADD-TODOLIST", payload: {title, id}} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST_TITLE",
    payload: {
        title,
        id
    }
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST_FILTER", payload: {
        filter,
        id
    }
} as const)


export const getTodoLists = () => async (dispatch: Dispatch) => {
    try {
        let response = await toDoAPI.getTodos()
        dispatch(setTodoListsAC(response.data))
    } catch (e:any) {
    throw new Error ('ERROR')
    }
}













//
// export const createTodolist = (title:string, id:string) => async (dispatch:Dispatch) => {
//     let data = await toDoAPI.createTodo(title)
//     dispatch(addTodoListAC(data.data.item.title, id))
// }
//
//
// export const deleteTodoList = (todolistId:string) => async (dispatch:Dispatch) => {
//     let response = await toDoAPI.deleteTodo(todolistId)
// }


