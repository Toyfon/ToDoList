import {instance} from "./instance";


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

