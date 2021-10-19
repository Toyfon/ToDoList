import React, {useState} from "react";
import { FilterValuesType} from "./App";



export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type todolistPropsType = {
    title: string
    tasks: Array<taskType>
    removeTask: (id:string)=> void
    changeFilter: (value:FilterValuesType) => void
    addTask: (title:string) => void
}

 export const Todolist: React.FC <todolistPropsType> =  (props) => {



    const [newTaskTitle, setNewTaskTitle] = useState("")



    let TaskElement = props.tasks.map(t=> <li key={t.id}><input type="checkbox" defaultChecked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={ ()=> {props.removeTask(t.id)}}>x</button>
    </li>)



    return (
        <div className= "todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={(e)=> {
                    setNewTaskTitle(e.currentTarget.value)}}/>
                <button onClick={()=> {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle("")
                }}>+</button>
            </div>

            <ul>
                {TaskElement}
            </ul>
            <div className="btn">
                <button onClick={(e) => {props.changeFilter("all")}}>All</button>
                <button onClick={(e) => {props.changeFilter("active")}}>Active</button>
                <button onClick={(e) => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}