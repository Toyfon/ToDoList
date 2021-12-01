import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    callBack: (value: string) => void
}

export const AddItemForm = ({
                                callBack,
                                ...props
                            }: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)



    const addItem = (newTaskTitle: string) => {
        if (newTaskTitle.trim()) {
            callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter" && newTaskTitle.trim()) { //проверка на пробелы и enter
            callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <TextField variant={"outlined"}
                       value={newTaskTitle}
                       size={"small"}
                       color={'secondary'}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}
                       helperText={error && "Title is required!"}
                       label={'title'}
                       sx={{
                           input: {
                               height: "20px"
                           }
                       }}
            />

            <IconButton onClick={() => addItem(newTaskTitle)} color={"secondary"}>
                <AddBox color={"inherit"}/>
            </IconButton>

        </div>
    )
}