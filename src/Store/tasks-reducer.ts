import {TaskStateType} from "../App";
import {taskType} from "../todolist";
import {v1} from "uuid";


export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: taskType = {
                id: v1(),
                title: action.title,// имеется ввиду title:title
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "ADD-ARRAY-TASK": {
            return {
                ...state,
                [action.todoListId]: []
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
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    isDone,
    taskId,
    todolistId
} as const)

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    title,
    taskId,
    todolistId
} as const)

export type addArrayTaskACType = ReturnType<typeof addArrayTaskAC>
export const addArrayTaskAC = (todoListId: string) => ({type: 'ADD-ARRAY-TASK', todoListId} as const)