import {applyMiddleware, combineReducers, createStore} from "redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import thunk, {ThunkAction} from "redux-thunk";

import {TaskActionsType, taskReducer} from "../features/Todolists/task-reducer";
import {TodoActionsType, toDoReducer} from "../features/Todolists/todo-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionType, authReducer} from "../Login/auth-reducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: toDoReducer,
    app:appReducer,
    auth: authReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))


export type RootAppActions = TodoActionsType | AppActionsType | TaskActionsType | AuthActionType
//export type RootAppActions = ReturnType<typeof store.dispatch>

//ThunkAction<any,any, any, any>
//1. what returned function (void)
//2. rootState type
//3. extra arguments (unknown)
//4. Action Types
export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, RootAppActions>

export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector;



//@ts-ignore
window.store = store