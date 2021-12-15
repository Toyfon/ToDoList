import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox, List, ListItem, Typography} from "@mui/material";
import {FilterValuesType} from "./Redux/todo-reducer";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type toDoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<taskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = ({
                             id, filter,
                             title, tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: toDoListPropsType) => {


    let TaskElement = tasks.map(t => {
        debugger
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, id)
        }
        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(t.id, title, id)
        }
        return <ListItem
            disableGutters
            divider
            sx={{paddingTop: "0px,3px", display: "flex", justifyContent: "space-between"}}
            key={t.id}
            className={t.isDone ? "isDone" : ""}>
            <Checkbox checked={t.isDone} color={'secondary'} onChange={changeTaskStatusHandler}/>
            <EditableSpan title={t.title} callBack={changeTaskTitleHandler}/>
            <IconButton onClick={() => onRemoveHandler(t.id)} color={"secondary"}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    })


    const onRemoveHandler = (taskId: string) => removeTask(taskId, id)
    const changeButtonFilter = (filter: FilterValuesType) => changeFilter(filter, id)
    const removeTodolistHandler = (todolistId: string) => removeTodolist(todolistId)
    const callBackHandlerForAddTask = (newTaskTitle: string) => addTask(newTaskTitle, id)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, id)



    return (
        <div>
            <Typography variant="h6" align={'center'}>
                <EditableSpan title={title} callBack={changeTodolistTitleHandler}/>
                <IconButton color={"secondary"} onClick={() => removeTodolistHandler(id)}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm callBack={callBackHandlerForAddTask}/>
            <List>
                {TaskElement}
            </List>
            <div>
                <Button variant={filter === 'all' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('all')}>all</Button>
                <Button variant={filter === 'active' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('active')}>active </Button>
                <Button variant={filter === 'completed' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('completed')}> completed</Button>
            </div>
        </div>
    )
}
