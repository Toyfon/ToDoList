import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {toDoReducer} from "./todo-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import thunk from "redux-thunk";


let rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: toDoReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>



export let store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStoreType = typeof store


export const useTypedSelector: TypedUseSelectorHook<rootReducerType> = useSelector;

//@ts-ignore
window.store = store