import React, {ChangeEvent, FC, useCallback} from "react";
import {Checkbox, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {taskType} from "../../todolist";


type TaskPropsType ={
    task:taskType
    changeTaskTitleCallback: (taskId: string, title: string) => void
    changeTaskStatusCallback: (taskId: string, isDone: boolean) => void
    onRemoveHandler :(taskId: string) => void
}

export const Task:FC<TaskPropsType> = React.memo(({task,changeTaskTitleCallback,changeTaskStatusCallback,onRemoveHandler}) => {

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.checked
        changeTaskStatusCallback(task.id,value)
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitleCallback(task.id, title)
    },[changeTaskTitleCallback, task.id])


    return <div>
    <ListItem
        disableGutters
        divider
        sx={{paddingTop: "0px,3px", display: "flex", justifyContent: "space-between"}}
        key={task.id}
        className={task.isDone ? "isDone" : ""}>
        <Checkbox checked={task.isDone} color={'secondary'} onChange={changeTaskStatusHandler}/>
        <EditableSpan title={task.title} callBack={changeTaskTitleHandler}/>
        <IconButton onClick={() => onRemoveHandler(task.id)} color={"secondary"}>
            <DeleteIcon/>
        </IconButton>
    </ListItem>
</div>

})