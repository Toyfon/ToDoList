import React, {useCallback, useEffect} from 'react';
import './App.css'
import {TodoLists} from "../features/Todolists/Todolists";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {useTypedSelector} from "./Redux-store";
import {initializeApp, StatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {useDispatch} from "react-redux";
import {logoutTC} from "../Login/auth-reducer";


export const App = () => {

    const status = useTypedSelector<StatusType>(state => state.app.status)
    const isInitialized = useTypedSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={'secondary'}/>
        </div>
    }

    return (
        <BrowserRouter>
            <div>
                <AppBar position="static" color={"secondary"}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="inherit"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoLists/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    )
}
