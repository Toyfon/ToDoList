import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../features/Todolists/task-reducer";
import {toDoReducer} from "../features/Todolists/todo-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: toDoReducer,
    app:appReducer
})


export let store = createStore(rootReducer, applyMiddleware(thunk))



//export const useThunkDispatch = () => useDispatch<typeof store.dispatch>()

export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

//type AppDispatch = typeof store.dispatch
//export const useTypedDispatch = () => useDispatch<AppDispatch>()

//@ts-ignore
window.store = store