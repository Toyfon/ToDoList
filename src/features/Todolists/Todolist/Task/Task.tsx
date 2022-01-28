import React, {ChangeEvent, FC, useCallback} from "react";
import {useTypedSelector} from "../../../../app/Redux-store";

import {Checkbox, ListItem} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {brown, grey} from "@mui/material/colors";

import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {ResponseTaskType, TaskStatuses} from "../../../../api/tasksApi";
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
                                                       removeTask,
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
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={changeTaskStatusHandler}
                      sx={{
                          color: theme === 'light' ? brown[800] : grey[50],
                          '&.Mui-checked': {
                              color: theme === 'light' ? brown[600]: grey[50],
                          },
                      }}
            />
            <EditableSpan title={task.title} callBack={changeTaskTitleHandler} theme={theme}/>
            <IconButton onClick={() => removeTask(task.id)}
                        sx={{color: theme === 'light' ? '#4a4848' : 'white'}}
                        color={"secondary"}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    </div>
})