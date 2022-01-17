import {Grid, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {useTypedSelector} from "../../app/Redux-store";
import {getTodoLists, TodoDomainType} from "./todo-reducer";
import {TaskStateType} from "./task-reducer";
import {useDispatch} from "react-redux";
import {Todolist} from "./Todolist/Todolist";



export const TodoLists = () => {

    const todoLists = useTypedSelector<TodoDomainType[]>(state => state.todoLists)
    const tasks = useTypedSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodoLists())
    }, [])


    const todolistComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={2} sx={{padding: "10px"}}>
                    <Todolist
                        todolist={tl}
                        key={tl.id}
                        tasks={tasksForRender}
                    />
                </Paper>
            </Grid>
        )
    })

    return <>
        {todolistComponents}
    </>
}