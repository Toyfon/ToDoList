import {v1} from "uuid";




export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
// export const todoListId_1 = v1()
// export const todoListId_2 = v1()


let initialState: Array<TodolistType> = [
    // {id: todoListId_1, title: 'What to learn', filter: 'all'},
    // {id: todoListId_2, title: 'What to buy', filter: 'all'}
]


export const toDoReducer = (state = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            console.log("REMOVE-TODOLIST")
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            console.log("ADD-TODOLIST")
            let newTodolist: TodolistType = {
                ...action.payload,
                filter: "all"
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST_TITLE":
            console.log("CHANGE-TODOLIST_TITLE")
            return [...state
                .map(s => s.id === action.payload.id
                    ?
                    {...s, title: action.payload.title}
                    : s)
            ]
        case "CHANGE-TODOLIST_FILTER":
            console.log("CHANGE-TODOLIST_FILTER")
            return [...state
                .map(s => s.id === action.payload.id
                    ?
                    {...s, filter: action.payload.filter}
                    : s)
            ]

        default:
            return state
    }
}


export type ActionType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC>


export const removeTodoListAC = (id: string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
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
