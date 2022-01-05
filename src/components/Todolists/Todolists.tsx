import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/todolist";
import React, {useCallback, useEffect} from "react";
import {useTypedSelector} from "../../Redux/Redux-store";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    getTodoLists,
    removeTodoListAC,
    TodolistType
} from "../../Redux/todo-reducer";
import { changeTaskTitleAC, TaskStateType, updateFetchedTaskStatus} from "../../Redux/task-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../api/tasksApi";


export const TodoLists = () => {


    const todoLists = useTypedSelector<TodolistType[]>(state => state.todoLists.todos)
    const tasks = useTypedSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateFetchedTaskStatus(todolistId,taskId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])


    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(todolistId, filter))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodoListTitleAC(todolistId, title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }, [dispatch])


    useEffect(() => {
        dispatch(getTodoLists())
    }, [])



    const todolistComponents = todoLists.map(tl => {

        let tasksForRender = tasks[tl.id]
        return (<Grid item key={tl.id}>
                <Paper elevation={2} sx={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return <>
        {todolistComponents}
    </>
}