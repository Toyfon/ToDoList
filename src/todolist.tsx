import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, List, Typography} from "@mui/material";
import {FilterValuesType} from "./Redux/todo-reducer";
import {Task} from "./components/Task/Task";
import {useDispatch} from "react-redux";
import {getTasks} from "./Redux/task-reducer";
import {ResponseTaskType, TaskStatuses} from "./api/tasksApi";


type toDoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<ResponseTaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo(({
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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(id))
    }, [])

    const onRemoveHandler = useCallback((taskId: string) => removeTask(taskId, id), [removeTask, id])
    const changeButtonFilter = useCallback((filter: FilterValuesType) => changeFilter(filter, id), [changeFilter, id])
    const removeTodolistHandler = useCallback(() => {
        removeTodolist(id)
    }, [removeTodolist, id])
    const callBackHandlerForAddTask = useCallback((newTaskTitle: string) => {
        addTask(newTaskTitle, id)
    }, [addTask, id])
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(title, id)
    }, [changeTodolistTitle, id])

    const changeTaskStatusCallback = useCallback((taskId: string, value: boolean) => {
        changeTaskStatus(taskId, value, id)
    }, [changeTaskStatus, id])

    const changeTaskTitleCallback = useCallback((taskId: string, title: string) => {
        changeTaskTitle(taskId, title, id)
    }, [changeTaskTitle, id])


    let taskForTodolist = tasks;

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const tasksElements = taskForTodolist.map(t => {
        return <Task changeTaskStatusCallback={changeTaskStatusCallback}
                     task={t}
                     changeTaskTitleCallback={changeTaskTitleCallback}
                     onRemoveHandler={onRemoveHandler}
                     key={t.id}/>
    })


    return (
        <div>
            <Typography variant="h6" align={'center'}>
                <EditableSpan title={title} callBack={changeTodolistTitleHandler}/>
                <IconButton color={"secondary"} onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm callBack={callBackHandlerForAddTask}/>
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
