import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./todolist";



 export type taskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active"| "completed"


function App() {


     const [tasks, setTasks] = useState<Array<taskType>>([
         {id: 1, title: "HTML", isDone: false},
         {id: 2, title: "Css", isDone: true},
         {id: 3, title: "React", isDone: false},
         {id: 4, title: "Graph QL", isDone: true}
     ]);


    function removeTask (id:number) {
       let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }



    const [filter, setFilter] = useState<FilterValuesType>("all")

    let taskForRender = tasks;

     if (filter === "active") {
         taskForRender = tasks.filter(t=> !t.isDone);
     }

     if (filter === "completed") {
         taskForRender = tasks.filter(t=> t.isDone);
     }

     function changeFilter (value:FilterValuesType) {
        setFilter(value)
     }


    return (
        <div className="App">
            <Todolist title = {"What to learn"}
                      tasks = {taskForRender}
                      removeTask = {removeTask}
                      changeFilter = {changeFilter}
            />

        </div>
    );
}






export default App;


