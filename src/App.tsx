import React, {useCallback} from 'react';
import {Todolist} from "./todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import './App.css'
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    TodolistType
} from "./Redux/todo-reducer";
import {
    addArrayTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskStateType
} from "./Redux/task-reducer";
import {useTypedSelector} from "./Redux/Redux-store";
import {useDispatch} from "react-redux";


function App() {

    const todoLists = useTypedSelector<TodolistType[]>(state => state.todoLists)
    const tasks = useTypedSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
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
    const addTodolist = useCallback((title: string) => {
        const todoListId = v1()
        dispatch(addTodoListAC(title, todoListId))
        dispatch(addArrayTaskAC(todoListId))
    }, [dispatch])


    const todolistComponents = todoLists.map(tl => {

        return (<Grid item key={tl.id}>
                <Paper elevation={2} sx={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id ]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position="static" color={"secondary"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{padding: "20px 0", marginBottom: "30px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App