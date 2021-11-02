import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from './components/button'


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type toDoListPropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<taskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: toDoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    let TaskElement = props.tasks.map(t => {
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return <li key={t.id} className={t.isDone?"isDone": ""}>
            <input type="checkbox"
                   defaultChecked={t.isDone}
                   onChange={changeTaskStatusHandler}/>
            <span>{t.title}</span>
            <Button classes={""} name={'x'} callBack={() => onRemoveHandler(t.id)}/>
        </li>
    })


    const onRemoveHandler = (taskId: string) => {
        props.removeTask(taskId)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter" && newTaskTitle.trim()) { //проверка на пробелы и enter
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }
    const addTask = () => {
        let trimTaskTitle = newTaskTitle.trim()
        if (trimTaskTitle) { // проверяем, пустая ли строка, если да, возвращает false и пустая таска не добавляется
            props.addTask(trimTaskTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
            setNewTaskTitle("")
        }

    }
    const changeButtonFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const errorMessage = error ? <div style={{color: "darkred", outline: "none"}}>Title is required!</div> : null


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                    //событие, происходящее при нажатии кнопки enter (добавляем новую таску)
                       onKeyPress={onKeyPressHandler}/>
                {errorMessage}
                <Button classes={""} name={'+'} callBack={addTask}/>
            </div>
            <ul className="list">
                {TaskElement}
            </ul>
            <div className="btn">
                <Button classes={props.filter === 'all' ? "active-filter" : ""}
                        name={'all'} callBack={() => changeButtonFilter('all')}/>
                <Button classes={props.filter === 'active' ? "active-filter" : ""}
                        name={'active'} callBack={() => changeButtonFilter('active')}/>
                <Button classes={props.filter === 'completed' ? "active-filter" : ""}
                        name={'completed'} callBack={() => changeButtonFilter('completed')}/>
            </div>
        </div>
    )
}
