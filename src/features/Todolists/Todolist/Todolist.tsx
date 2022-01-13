import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, List, Typography} from "@mui/material";
import {
    changeTodoListFilterAC,
    deleteFetchedTodolist,
    FilterValuesType,
    updateFetchedTodoTitle
} from "../todo-reducer";
import {Task} from "./Task/Task";
import {useDispatch} from "react-redux";
import {
    createFetchedTask,
    deleteTask,
    getTasks,
    updateFetchedTaskStatus,
    updateFetchedTaskTitle
} from "../task-reducer";
import {ResponseTaskType, TaskStatuses} from "../../../api/tasksApi";


type toDoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<ResponseTaskType>
}

export const Todolist = React.memo(({id, filter, title, tasks}: toDoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(id))
    }, [])

    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask(taskId, id))
    }, [dispatch, id])

    const addTask = useCallback((newTaskTitle: string) => {
        dispatch(createFetchedTask(newTaskTitle, id))
    }, [dispatch, id])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateFetchedTaskStatus(id,taskId, status))
    }, [dispatch,id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(updateFetchedTodoTitle(id, title))
    }, [dispatch, id])

    const removeTodolist = useCallback(() => {
        dispatch(deleteFetchedTodolist(id))
    }, [dispatch, id])

    const changeButtonFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }, [dispatch, id])

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateFetchedTaskTitle(id, taskId, title))
    }, [dispatch, id])


    let taskForTodolist = tasks;

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const tasksElements = taskForTodolist.map(t => {
        return <Task changeTaskStatus={changeTaskStatus}
                     task={t}
                     changeTaskTitle={changeTaskTitle}
                     removeTask={removeTask}
                     key={t.id}/>
    })

    return (
        <div>
            <Typography variant="h6" align={'center'}>
                <EditableSpan title={title} callBack={changeTodolistTitle}/>
                <IconButton color={"secondary"} onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm callBack={addTask}/>
            <List>
                {tasksElements}
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
})

