import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

import s from "./AddItemForm.module.css";
import {ThemeType} from "../../app/app-reducer";



type AddItemFormPropsType = {
    callBack: (value: string) => void
    disabled?: boolean
    theme?: ThemeType
}

export const AddItemForm = React.memo(({callBack, disabled = false, theme = 'light'}: AddItemFormPropsType) => {

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
        <div className={theme === 'light' ? s.lightTextField : s.darkTextField}>
            <TextField
                variant={"outlined"}
                disabled={disabled}
                value={newTaskTitle}
                size={"small"}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error && "Title is required!"}
                label={'title'}
                sx={{
                    input: {
                        height: "20px",
                        border: theme === 'light' ? '1px solid #2d2828' : '1px solid white',
                        borderRadius: '4px',
                    },
                }}
            />

            <IconButton onClick={addItem} color={"secondary"}
                        sx={{color: theme === 'light' ? '#4a4848' : 'white'}}
                        disabled={disabled}>
                <AddBox color={"inherit"}/>
            </IconButton>

        </div>
    )
})