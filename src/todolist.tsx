import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button, Input} from "antd";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type todolistPropsType = {
    title: string
    tasks: Array<taskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<todolistPropsType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    let TaskElement = props.tasks.map(t => {
        const onRemoveHandler = () => {
            props.removeTask(t.id)
        }
        return <li key={t.id}><input type="checkbox" defaultChecked={t.isDone}/>
            <span>{t.title}</span>
            <Button type="primary" shape="circle" size="small" danger ghost
                    className="btnRemove" onClick={onRemoveHandler}>x</Button>
        </li>
    })


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskTitle.trim()) { //проверка на пробелы и enter
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        let trimTaskTitle = newTaskTitle.trim()
        if (trimTaskTitle) { // проверяем, пустая ли строка, если да, возвращает false и пустая таска не добавляется
            props.addTask(trimTaskTitle)}
            setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <Input className="addInput" size="middle"
                       value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                    //событие, происходящее при нажатии кнопки enter (добавляем новую таску)
                       onKeyPress={onKeyPressHandler}/>
                <Button className="btnAdd" type="ghost" size="middle" onClick={addTask}>+</Button>
            </div>
            <ul className="list">
                {TaskElement}
            </ul>
            <div className="btn">
                <Button type="ghost" onClick={onAllClickHandler}>All</Button>
                <Button type="ghost" onClick={onActiveClickHandler}>Active</Button>
                <Button type="ghost" onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
