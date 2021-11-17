import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from './components/button'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type toDoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<taskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = ({
                             id, filter,
                             title, tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle}: toDoListPropsType) => {


    let TaskElement = tasks.map(t => {
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, id)
        }
        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(t.id, title, id)
        }
        return <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <input type="checkbox"
                   defaultChecked={t.isDone}
                   onChange={changeTaskStatusHandler}/>
            <EditableSpan title={t.title} callBack={changeTaskTitleHandler}/>
            <Button name={'x'} callBack={() => onRemoveHandler(t.id)}/>
        </li>
    })


    const onRemoveHandler = (taskId: string) => removeTask(taskId, id)
    const changeButtonFilter = (filter: FilterValuesType) => changeFilter(filter, id)
    const removeTodolistHandler = (todolistId: string) => removeTodolist(todolistId)
    const callBackHandlerForAddTask = (newTaskTitle: string) => addTask(newTaskTitle, id)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title,id)



    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={title} callBack={changeTodolistTitleHandler}/>
                <Button callBack={() => removeTodolistHandler(id)} name={'x'}/>
            </h3>
            <AddItemForm callBack={callBackHandlerForAddTask}/>
            <ul className="list">
                {TaskElement}
            </ul>
            <div className="btn">
                <Button classes={filter === 'all' ? "active-filter" : ""}
                        name={'all'} callBack={() => changeButtonFilter('all')}/>
                <Button classes={filter === 'active' ? "active-filter" : ""}
                        name={'active'} callBack={() => changeButtonFilter('active')}/>
                <Button classes={filter === 'completed' ? "active-filter" : ""}
                        name={'completed'} callBack={() => changeButtonFilter('completed')}/>
            </div>
        </div>
    )
}
