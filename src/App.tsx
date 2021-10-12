import React from 'react';
import './App.css';
import {Todolist} from "./todolist";



 export type taskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {

    const task_1: Array<taskType> =[
        {id: 1, title: "HTML", isDone: false},
        {id: 2, title: "Css", isDone: false},
        {id: 3, title: "React", isDone: false}
    ]


    return (
        <div className="App">
            <Todolist title = {"What to learn"} tasks = {task_1} />
            <Todolist title = {"Songs"} tasks = {task_1} />
        </div>
    );
}






export default App;


