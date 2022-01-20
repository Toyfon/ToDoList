import {Grid, Paper} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useTypedSelector} from "../../app/Redux-store";
import {createTodolist, getTodoLists, TodoDomainType} from "./todo-reducer";
import {TaskStateType} from "./task-reducer";
import {useDispatch} from "react-redux";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";


export const TodoLists = () => {

    const todoLists = useTypedSelector<TodoDomainType[]>(state => state.todoLists)
    const tasks = useTypedSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodoLists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

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

    return (<>
    <Grid container sx={{padding: "20px 0", marginBottom: "30px"}}>
        <AddItemForm callBack={addTodolist}/>
    </Grid>
    <Grid container spacing={4}>
        {todolistComponents}
    </Grid>
        </>
)
}