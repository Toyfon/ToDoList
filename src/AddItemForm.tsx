import React, {useState} from "react";
import {Button} from './components/button'
import {Input} from "./components/Input";


type AddItemFormPropsType = {
    callBack: (value:string) => void
}

export const AddItemForm = ({
                                callBack,
                                ...props
                            }: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)


    const errorMessage = error ? <div style={{color: "darkred", outline: "none"}}>Title is required!</div> : null

    const addItem = (newTaskTitle:string) => {
        if (newTaskTitle.trim()) {
            callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }

    return (

        <div>
            <Input error={error} setError={setError}
                   newTaskTitle={newTaskTitle}
                   setNewTaskTitle={setNewTaskTitle}
                   callback={addItem}/>
            {errorMessage}
            <Button name={'+'} callBack={()=>addItem(newTaskTitle)}/>
        </div>
    )
}