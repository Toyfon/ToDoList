import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "4c618d05-4087-4c56-9fa2-e412fa4c037d"
    }
})

//api
export const toDoAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>(`/todo-lists`, {title})
            .then(res => res.data)
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

//types
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string []
    fieldsErrors: string []
    data: T
}

