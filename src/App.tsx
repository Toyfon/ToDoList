import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from "./todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: taskType[]
}


function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Graph QL", isDone: true}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true}
        ]
    })

    function removeTask(taskId: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskId)// делаем копию, фильтруем ее, перезаписываем в переменную и сетаем ее
        setTasks({...tasks})
        /*setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== todolistId)})*/// можно записать так
    }
    function addTask(title: string, todolistId: string) {
        let newTask: taskType = {
            id: v1(),
            title,// имеется ввиду title:title
            isDone: false
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }
    const changeTaskTitle =(taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }


    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const changeTodolistTitle = (title:string, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))}
    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todoListId = v1()
        const newTodolist: TodolistType = {
            id: todoListId,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [todoListId]: []})
    }



    const todolistComponents = todoLists.map(tl => {
        let taskForRender = tasks[tl.id];
        if (tl.filter === "active") {
            taskForRender = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            taskForRender = tasks[tl.id].filter(t => t.isDone);
        }
        return (<div>
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={taskForRender}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            </div>
        )
    })

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {todolistComponents}
        </div>
    );
}


export default App


