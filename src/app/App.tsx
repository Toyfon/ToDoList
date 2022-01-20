import React from 'react';
import './App.css'
import {TodoLists} from "../features/Todolists/Todolists";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {useTypedSelector} from "./Redux-store";
import {StatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";


export const App = () => {
    const status = useTypedSelector<StatusType>(state => state.app.status)

    return (
        <BrowserRouter>
        <div>
            <AppBar position="static" color={"secondary"}>
                <ErrorSnackbar/>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="inherit"/> }
            </AppBar>
            <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoLists/>}/>
                        <Route path={'login'} element={<Login/>}/>
                    </Routes>
            </Container>
        </div>
        </BrowserRouter>
    )
}
