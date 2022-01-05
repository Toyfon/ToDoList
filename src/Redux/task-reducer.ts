import {ResponseTaskType, tasksAPI, TaskStatuses, UpdateTaskModelType} from "../api/tasksApi";
import {Dispatch} from "redux";
import {setTodoListsACType} from "./todo-reducer";
import {rootReducerType} from "./Redux-store";


export type TaskStateType = {
    [key: string]: Array<ResponseTaskType>
}

export let initialState: TaskStateType = {}


export const taskReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'tasks/REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t =>
                    t.id !== action.payload.taskId)
            }
        }
        case 'tasks/ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
            }
        }

        case 'tasks/CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, status: action.payload.status}
                        : t)
            }
        }
        case 'tasks/CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case "tasks/ADD-ARRAY-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        }
        case "tasks/SET_TASKS": {
            return {
                ...state,
                [action.payload.todoListId]: action.payload.tasks
            }
        }
        case 'todos/SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}

//Action Types
export type ActionType = removeTaskACType |
    addTaskACType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    addArrayTaskACType |
    setTaskACType |
    setTodoListsACType


// Action Creators
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => (
    {
        type: 'tasks/REMOVE-TASK',
        payload: {taskId, todolistId}
    } as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: ResponseTaskType) => (
    {
        type: 'tasks/ADD-TASK',
        payload: {
            task
        }
    } as const)

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (status: TaskStatuses, taskId: string, todolistId: string) => ({
    type: 'tasks/CHANGE-TASK-STATUS',
    payload: {
        status,
        taskId,
        todolistId
    }
} as const)

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'tasks/CHANGE-TASK-TITLE',
    payload: {
        title,
        taskId,
        todolistId
    }
} as const)

export type addArrayTaskACType = ReturnType<typeof addArrayTaskAC>
export const addArrayTaskAC = (todoListId: string) => ({type: 'tasks/ADD-ARRAY-TASK', payload: {todoListId}} as const)

export type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (tasks: Array<ResponseTaskType>, todoListId: string) => ({
    type: 'tasks/SET_TASKS',
    payload: {tasks, todoListId}
} as const)


//Thunk Creators
export const getTasks = (todoListId: string) => async (dispatch: Dispatch) => {
    try {
        let data = await tasksAPI.getTasks(todoListId)
        dispatch(setTaskAC(data.items, todoListId))

    } catch (e: any) {
        console.warn(e)
    }
}

export const deleteTask = (taskId: string, todolistId: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await tasksAPI.deleteTask(todolistId, taskId)
        if (data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
        }
    } catch (e: any) {
        throw new Error('что то не так')
    }
}

export const createFetchedTask = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await tasksAPI.createTask(todolistId, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC(data.data.item))
        }
    } catch (e: any) {

    }
}


export const updateFetchedTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return async (dispatch: Dispatch, getState: () => rootReducerType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(!task) {
            console.warn("task not found in the state")
            return
        }

        const model: UpdateTaskModelType = {
            status: status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        try {
            await tasksAPI.updateTaskStatus(todolistId, taskId, model)
            dispatch(changeTaskStatusAC(status, taskId, todolistId))

        } catch (e: any) {

        }
    }
}