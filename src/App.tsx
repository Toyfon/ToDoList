import React, {useCallback} from 'react';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import './App.css'
import {addTodoListAC} from "./Redux/todo-reducer";
import {addArrayTaskAC} from "./Redux/task-reducer";
import {useDispatch} from "react-redux";
import {TodoLists} from "./components/Todolists/Todolists";


function App() {

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        const todoListId = v1()
        dispatch(addTodoListAC(title, todoListId))
        dispatch(addArrayTaskAC(todoListId))
    }, [dispatch])


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
                    <TodoLists/>
                </Grid>
            </Container>
        </div>
    );
}

export default App