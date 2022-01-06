import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/todolist";
import React, {useEffect} from "react";
import {useTypedSelector} from "../../Redux/Redux-store";
import {getTodoLists, TodoDomainType} from "../../Redux/todo-reducer";
import {TaskStateType} from "../../Redux/task-reducer";
import {useDispatch} from "react-redux";


export const TodoLists = () => {


    const todoLists = useTypedSelector<TodoDomainType[]>(state => state.todoLists)
    const tasks = useTypedSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

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
                    />
                </Paper>
            </Grid>
        )
    })

    return <>
        {todolistComponents}
    </>
}