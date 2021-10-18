import React from "react";
import { FilterValuesType, taskType} from "./App";



type todolistPropsType = {
    title: string
    tasks: Array<taskType>
    removeTask: (id:number)=> void
    changeFilter: (value:FilterValuesType) => void
}

 export const Todolist: React.FC <todolistPropsType> =  (props) => {


    let TaskElement = props.tasks.map(t=> <li key={t.id}><input type="checkbox" defaultChecked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={ ()=> {props.removeTask(t.id)}}>x</button>
    </li>)

    return (
        <div className= "todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {TaskElement}
            </ul>
            <div className="btn">
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}