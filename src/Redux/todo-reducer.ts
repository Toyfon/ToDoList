import {Dispatch} from "redux";
import {toDoAPI, TodoType} from "../api/todoApi";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoDomainType = TodoType & {
    filter: FilterValuesType
}

let initialState: Array<TodoDomainType> = []


export const toDoReducer = (state = initialState, action: ActionType): Array<TodoDomainType> => {
    switch (action.type) {
        case "todos/REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "todos/ADD-TODOLIST":
            const newTodolist:TodoDomainType = {...action.payload.todolist, filter:'all'}
            return [newTodolist,...state]
        case "todos/CHANGE-TODOLIST_TITLE":
            return {
                ...state.map(s => s.id === action.payload.id
                        ?
                        {...s, title: action.payload.title}
                        : s)
            }
        case "todos/CHANGE-TODOLIST_FILTER":
            return {
                ...state.map(s => s.id === action.payload.id
                        ?
                        {...s, filter: action.payload.filter}
                        : s)
            }
        case "todos/SET-TODOS":
            return action.todos.map(tl => ({
                    ...tl,
                    filter: 'all'
                }))
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
export const setTodoListsAC = (todos: Array<TodoType>) => ({type: "todos/SET-TODOS", todos} as const)

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todolist: TodoType) => ({
    type: "todos/ADD-TODOLIST",
    payload: {todolist}
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
        let {data} = await toDoAPI.getTodos()
        dispatch(setTodoListsAC(data))
    } catch (e: any) {
        throw new Error('ERROR')
    }
}

export const deleteFetchedTodolist = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await toDoAPI.deleteTodo(todolistId)
        if (data.resultCode === 0) {
            dispatch(removeTodoListAC(todolistId))
        }
    } catch (e: any) {
        console.warn('ERROR')
    }
}

export const updateFetchedTodoTitle = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await toDoAPI.updateTodoTitle(todolistId, title)
        if (data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todolistId, title))
        }
    } catch (e: any) {
        console.warn('ERROR')
    }
}

export const createTodolist = (title: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await toDoAPI.createTodo(title)
        dispatch(addTodoListAC(data.item))

    } catch (e: any) {
        console.warn('ERROR')
    }
}



