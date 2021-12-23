import {taskType} from "../todolist";
import {v1} from "uuid";



export type TaskStateType = {
    [key: string]: taskType[]
}


export let initialState: TaskStateType = {
    // [todoListId_1]: [
    //     {id: v1(), title: "HTML", isDone: false},
    //     {id: v1(), title: "Css", isDone: true},
    // ],
    // [todoListId_2]: [
    //     {id: v1(), title: "Meat", isDone: false},
    //     {id: v1(), title: "Beer", isDone: true},
    // ]
}

export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t =>
                    t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: taskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone}
                        : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case "ADD-ARRAY-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        }
        default:
            return state
    }
}


export type ActionType = removeTaskACType |
                         addTaskACType |
                         changeTaskStatusACType |
                         changeTaskTitleACType |
                         addArrayTaskACType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => (
    {
        type: 'REMOVE-TASK',
        payload: {taskId, todolistId}
    } as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => (
    {
        type: 'ADD-TASK',
        payload: {
            title, todolistId
        }
    } as const)

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        isDone,
        taskId,
        todolistId
    }
} as const)

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        title,
        taskId,
        todolistId
    }
} as const)

export type addArrayTaskACType = ReturnType<typeof addArrayTaskAC>
export const addArrayTaskAC = (todoListId: string) => ({type: 'ADD-ARRAY-TASK', payload: {todoListId}} as const)


