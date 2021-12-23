import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ModeEditOutline} from "@mui/icons-material";


type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const onEditMode = () => {
        setEditMode(true)
        if (props.title) {
            setTitle(props.title)
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        props.callBack(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }


    return (
        editMode
            ? <TextField variant={'standard'}
                         sx={{width: "130px"}}
                         value={title}
                         color={"secondary"}
                         onBlur={offEditMode}
                         autoFocus
                         onChange={onChangeTitleHandler}
                         onKeyPress={onKeyPressHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}
                <IconButton onClick={onEditMode}>
                    <ModeEditOutline fontSize={"small"}/>
                </IconButton>
        </span>
    )
})