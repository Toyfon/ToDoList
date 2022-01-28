import {useDispatch} from "react-redux";
import {useTypedSelector} from "../app/Redux-store";
import {Navigate} from "react-router-dom";

import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

import {loginTC} from "./auth-reducer";
import {ThemeType} from "../app/app-reducer";
import {LoginParamsType} from "../api/authApi";


export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn)
    const theme = useTypedSelector<ThemeType>(state => state.app.theme)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            // Omit убирает те поля, которые мы не хотим использовать 2-й параметр
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
             //Pick (добавляем те поля, которые хотим использовать) 2-й параметр
            //const errors: Partial<Pick<LoginParamsType, 'email' | 'password' | 'rememberMe'>> = {};
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password is required'
            } else if (values.password.length < 5) {
                errors.password = 'Must be 5 characters or more'
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel sx={{color: theme === 'light' ? 'black' : 'white'}}>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p> or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>

                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label={'email'}
                            margin={'normal'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red', textAlign: 'center'}}>{formik.errors.email}</div>}
                        <TextField
                            type={'password'}
                            label={'Password'}
                            margin={'normal'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.email && formik.errors.password && <
                            div style={{color: 'red', textAlign: 'center'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'outlined'} color={'secondary'}
                                sx={{color: theme === 'light' ? 'darkturquoise' : 'blueviolet'}}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}