import React, {useCallback} from 'react';
import './App.css'
import {createTodolist} from "../features/Todolists/todo-reducer";
import {useDispatch} from "react-redux";
import {TodoLists} from "../features/Todolists/Todolists";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export const App = () => {

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    return (
        <div>
            <AppBar position="static" color={"secondary"}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
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
    )
}
