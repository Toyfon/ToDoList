import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {useTypedSelector} from "./Redux-store";
import {useDispatch} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import {MaterialUISwitch} from "../components/MuiSwitch";

import './App.css'
import {initializeApp, setAppTheme, StatusType, ThemeType} from "./app-reducer";
import {logoutTC} from "../Login/auth-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {TodoLists} from "../features/Todolists/Todolists";
import {Login} from "../Login/Login";
import {Error404} from "../common/error404/Error404";




export const App = () => {

    const status = useTypedSelector<StatusType>(state => state.app.status)
    const theme = useTypedSelector<ThemeType>(state => state.app.theme)
    const isInitialized = useTypedSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])


    const changeThemeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.checked
        dispatch(setAppTheme(value ? 'dark' : 'light'))
    }

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={'secondary'}/>
        </div>
    }

    const colorTheme = theme === 'light' ? '#2d2828' : '#beb9b9'

    return (
        <BrowserRouter>
            <div className={theme === "light" ? 'light' : 'dark'}>
                <AppBar position="static" sx={{backgroundColor: theme === "light" ? '#898686' : '#262626'}}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit"
                                    aria-label="menu" sx={{mr: 2, color:colorTheme}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div"
                                    sx={{flexGrow: 1, color:colorTheme}}>
                            TodoLists
                        </Typography>
                        <MaterialUISwitch onChange={changeThemeHandler} value={theme === 'light'}/>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}
                        sx={{color: colorTheme}}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="inherit"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoLists/>}/>
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'404'} element={<Error404/>}/>
                        <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    )
}
