import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../features/Todolists/task-reducer";
import {toDoReducer} from "../features/Todolists/todo-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: toDoReducer,
    app:appReducer
})


export let store = createStore(rootReducer, applyMiddleware(thunk))


export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector;



//@ts-ignore
window.store = store