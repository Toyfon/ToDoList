import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})

//api
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`).then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: ResponseTaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    updateTaskTitle(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

//types
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}
export type ResponseTasksType = {
    totalCount: number
    error: string
    items: ResponseTaskType []
}
export type ResponseTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export type  UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

