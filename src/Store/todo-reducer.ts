import {FilterValuesType, TodolistType} from "../App";



export const toDoReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST_TITLE":
            return [...state
                .map(s => s.id === action.id
                    ?
                    {...s, title: action.title}
                    : s)
            ]
        case "CHANGE-TODOLIST_FILTER":
            return [...state
                .map(s => s.id === action.id
                    ?
                    {...s, filter: action.filter}
                    : s)
            ]

        default:
            return state
    }
}


export type ActionType = RemoveTodoListACType |
                         AddTodoListACType |
                         ChangeTodoListTitleACType |
                         ChangeTodoListFilterACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodolistTitle: string, id:string) => ({type: "ADD-TODOLIST", title: newTodolistTitle, id} as const)


export type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST_TITLE",
    title,
    id
} as const)


export type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST_FILTER",
    filter,
    id
} as const)