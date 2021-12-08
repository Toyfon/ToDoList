import React from 'react';
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


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))

    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }


    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(todolistId, filter))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {

        dispatch(changeTodoListTitleAC(todolistId, title))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const todoListId = v1()
        dispatch(addTodoListAC(title, todoListId))
        dispatch(addArrayTaskAC(todoListId))

    }


    const todolistComponents = todoLists.map(tl => {
        let taskForRender = tasks[tl.id];
        if (tl.filter === "active") {
            taskForRender = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            taskForRender = tasks[tl.id].filter(t => t.isDone);
        }
        return (<Grid item key={tl.id}>
                <Paper elevation={2} sx={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={taskForRender}
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