import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    callBack: (value: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({callBack,disabled = false}: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (newTaskTitle.trim()) {
            callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError('Title is required')
        }
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null)
            setError(null)
        if (e.key === "Enter" && newTaskTitle.trim()) {
            callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField variant={"outlined"}
                       disabled={disabled}
                       value={newTaskTitle}
                       size={"small"}
                       color={'secondary'}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error && "Title is required!"}
                       label={'title'}
                       sx={{
                           input: {
                               height: "20px"
                           }
                       }}
            />

            <IconButton onClick={addItem} color={"secondary"} disabled={disabled}>
                <AddBox color={"inherit"}/>
            </IconButton>

        </div>
    )
})