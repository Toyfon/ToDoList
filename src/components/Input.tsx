import React, {ChangeEvent, KeyboardEvent} from "react";


type InputType = {
    error?: boolean
    newTaskTitle: string
    callback: (value:string) => void
    setNewTaskTitle: (title: string) => void
    setError: (value: boolean) => void
}


export const Input = ({error, newTaskTitle, setNewTaskTitle, setError, callback}: InputType) => {

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter" && newTaskTitle.trim()) { //проверка на пробелы и enter
            callback(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }

    return <>
        <input className={error ? "error" : ""}
               value={newTaskTitle}
               placeholder= 'Enter title... '
               onChange={onChangeTitleHandler}
            //событие, происходящее при нажатии кнопки enter (добавляем новую таску)
               onKeyPress={onKeyPressHandler}/>
    </>
}