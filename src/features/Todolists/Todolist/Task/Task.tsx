import React, {ChangeEvent, FC, useCallback} from "react";
import {Checkbox, ListItem} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ResponseTaskType, TaskStatuses} from "../../../../api/tasksApi";
import {useTypedSelector} from "../../../../app/Redux-store";
import {ThemeType} from "../../../../app/app-reducer";


type TaskPropsType = {
    task: ResponseTaskType
    changeTaskTitle: (taskId: string, title: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    removeTask: (taskId: string) => void
    todolistId:string
}

export const Task: FC<TaskPropsType> = React.memo(({
                                                       task,
                                                       changeTaskTitle,
                                                       changeTaskStatus,
                                                       removeTask,todolistId
                                                   }) => {

    const theme = useTypedSelector<ThemeType>(state => state.app.theme)

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.checked
        changeTaskStatus(task.id, value ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title)
    }, [changeTaskTitle, task.id])

    return <div>
        <ListItem
            disableGutters
            divider
            sx={{paddingTop: "0px,3px", display: "flex", justifyContent: "space-between"}}
            key={task.id}
            className={task.status === TaskStatuses.Completed ? "isDone" : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color={'secondary'}
                      onChange={changeTaskStatusHandler}/>
            <EditableSpan title={task.title} callBack={changeTaskTitleHandler} theme={theme}/>
            <IconButton onClick={() => removeTask(task.id)}
                        sx={{color: theme === 'light' ? '#4a4848' : 'white'}}
                        color={"secondary"}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    </div>
})