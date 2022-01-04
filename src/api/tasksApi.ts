import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`).then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: ResponseTaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
    // updateTaskTitle(todolistId:string, taskId:string, title:string) {
    //     return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,{title})
    // },
}


type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}

export type ResponseTasksType = {
    totalCount: string
    error: string
    items: ResponseTaskType []
}


export type ResponseTaskType = {
    description: string
    title: string
    completed: boolean
    status: number
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
