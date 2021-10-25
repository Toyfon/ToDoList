import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./todolist";
import {v1} from "uuid";
import "antd/dist/antd.css";


export type FilterValuesType = "all" | "active"| "completed"



function App() {


     const [tasks, setTasks] = useState([
         {id: v1(), title: "HTML", isDone: false},
         {id: v1(), title: "Css", isDone: true},
         {id: v1(), title: "React", isDone: false},
         {id: v1(), title: "Graph QL", isDone: true}
     ]);

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask (id:string) {
       let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    function addTask (title:string) {
        let newTask: taskType = {
            id: v1(),
            title,// имеется ввиду title:title
            isDone: false
        }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }



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
                      addTask ={addTask}

            />

        </div>
    );
}






export default App;


