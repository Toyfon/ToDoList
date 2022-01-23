import React, {ChangeEvent, useCallback, useEffect} from 'react';
import './App.css'
import {TodoLists} from "../features/Todolists/Todolists";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress, Switch,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {useTypedSelector} from "./Redux-store";
import {initializeApp, setAppTheme, StatusType, ThemeType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {useDispatch} from "react-redux";
import {logoutTC} from "../Login/auth-reducer";


export const App = () => {

    const status = useTypedSelector<StatusType>(state => state.app.status)
    const theme = useTypedSelector<ThemeType>(state => state.app.theme)
    const isInitialized = useTypedSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    const changeThemeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.checked
        dispatch(setAppTheme(value ? 'dark' : 'light'))
    }

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={'secondary'}/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className={theme === "light" ? 'light' : 'dark'}>
                <AppBar position="static" sx={{backgroundColor: theme === "light" ? '#4a4848' : '#e3e3e3'}}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit"
                                    aria-label="menu" sx={{mr: 2, color:theme === "light" ? 'white' : '#2d2828'}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div"
                                    sx={{flexGrow: 1, color: theme === "light" ? 'white' : '#2d2828'}}>
                            TodoLists
                        </Typography>
                        <Typography sx={{color: theme === "light" ? 'white' : '#2d2828'}}>
                            {theme === 'light' ? 'Dark theme' : 'Light theme'}
                        </Typography>
                        <Switch onChange={changeThemeHandler} value={theme === 'light'}/>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}
                        sx={{color: theme === "light" ? 'white' : '#2d2828'}}>Log out</Button>}
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
