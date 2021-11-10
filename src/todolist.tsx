import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from './components/button'
import {Input} from "./components/Input";


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
}

export const Todolist = ({id,filter,
                             title,tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist}: toDoListPropsType) => {


    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    let TaskElement = tasks.map(t => {
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, id)
        }
        return <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <input type="checkbox"
                   defaultChecked={t.isDone}
                   onChange={changeTaskStatusHandler}/>
            <span>{t.title}</span>
            <Button  name={'x'} callBack={() => onRemoveHandler(t.id)}/>
        </li>
    })


    const onRemoveHandler = (taskId: string) => {
        removeTask(taskId, id)
    }

    const changeButtonFilter = (filter: FilterValuesType) => {
        changeFilter(filter, id)
    }
    const errorMessage = error ? <div style={{color: "darkred", outline: "none"}}>Title is required!</div> : null

    const removeTodolistHandler = (todolistId: string) => {
        removeTodolist(todolistId)
    }
    const callBackHandlerForAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, id)
            setNewTaskTitle("")
        }
    }

    return (
        <div className="todolist">
            <h3>{title}
                <Button callBack={() => removeTodolistHandler(id)} name={'x'}/>
            </h3>
            <div>
                <Input error={error} setError={setError}
                       newTaskTitle={newTaskTitle}
                       setNewTaskTitle={setNewTaskTitle}
                       callback={callBackHandlerForAddTask}/>
                {errorMessage}
                <Button  name={'+'} callBack={callBackHandlerForAddTask}/>
            </div>
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
