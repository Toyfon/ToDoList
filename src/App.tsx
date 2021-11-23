import React, {useState} from 'react';
import {taskType, Todolist} from "./todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import './App.css'


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: taskType[]
}


function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "Css", isDone: true},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
        ]
    })

    function removeTask(taskId: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskId)// делаем копию, фильтруем ее, перезаписываем в переменную и сетаем ее
        setTasks({...tasks})
        /*setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== todolistId)})*/// можно записать так
    }

    function addTask(title: string, todolistId: string) {
        let newTask: taskType = {
            id: v1(),
            title,// имеется ввиду title:title
            isDone: false
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }


    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todoListId = v1()
        const newTodolist: TodolistType = {
            id: todoListId,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [todoListId]: []})
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


