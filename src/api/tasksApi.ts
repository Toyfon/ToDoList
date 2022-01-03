import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})


export const tasksAPI = {
    getTasks(todolistId:string) {
        return instance.get<Array<TaskType>>(`/todo-lists/${todolistId}/tasks`).then(res => res.data)
    },
    createTask(todolistId:string,title:string) {
        return instance.post<CommonResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTaskTitle(todolistId:string, taskId:string, title:string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`,{title})
    },
    deleteTask (todolistId:string, taskId:string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}



type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}

type TaskType = {
    description:string
    title: string
    completed:boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

