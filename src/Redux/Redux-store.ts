import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {toDoReducer} from "./todo-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


let rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: toDoReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>


export let store = createStore(rootReducer)
export type AppStoreType= typeof store


export const useTypedSelector: TypedUseSelectorHook<rootReducerType> = useSelector;