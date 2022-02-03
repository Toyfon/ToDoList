import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../app/Redux-store";

import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, List, Typography} from "@mui/material";

import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import { changeTodoListFilterAC, deleteFetchedTodolist,
         FilterValuesType, TodoDomainType, updateFetchedTodoTitle} from "../todo-reducer";
import { createFetchedTask, deleteTask, updateFetchedTaskStatus,
         updateFetchedTaskTitle} from "../task-reducer";
import {ThemeType} from "../../../app/app-reducer";
import {ResponseTaskType, TaskStatuses} from "../../../api/tasksApi";
import {Task} from "./Task/Task";




type TodoListPropsType = {
    todolist: TodoDomainType
    tasks: Array<ResponseTaskType>
}

export const Todolist = React.memo(({todolist, tasks}: TodoListPropsType) => {
    const {id, filter, entityStatus, title,} = todolist
    const theme = useTypedSelector<ThemeType>(state => state.app.theme)
    const dispatch = useDispatch()


    const removeTask = useCallback((taskId: string) => {
        dispatch(deleteTask(taskId, id))
    }, [dispatch, id])

    const addTask = useCallback((newTaskTitle: string) => {
        dispatch(createFetchedTask(newTaskTitle, id))
    }, [dispatch, id])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateFetchedTaskStatus(id, taskId, status))
    }, [dispatch, id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(updateFetchedTodoTitle(id, title))
    }, [dispatch, id])

    const removeTodolist = useCallback(() => {
        dispatch(deleteFetchedTodolist(id))
    }, [dispatch, id])

    const changeButtonFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }, [dispatch, id])

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateFetchedTaskTitle(id, taskId, title))
    }, [dispatch, id])


    let taskForTodolist = tasks;

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const tasksElements = taskForTodolist.map(t => {
        return <Task changeTaskStatus={changeTaskStatus}
                     todolistId={id}
                     task={t}
                     changeTaskTitle={changeTaskTitle}
                     removeTask={removeTask}
                     key={t.id}/>
    })

    return (
        <div>
            <Typography variant="h6" align={'center'}>
                <EditableSpan title={title} callBack={changeTodolistTitle} theme={theme}/>
                <IconButton color={"secondary"} onClick={removeTodolist}
                            disabled={entityStatus === 'loading'}
                            sx={{color: theme === 'light' ? '#4a4848' : 'white'}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm callBack={addTask}
                         theme={theme}
                         disabled={entityStatus === 'loading'}/>
            <List>
                {tasksElements}
            </List>
            <div>
                <Button variant={filter === 'all' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('all')}>all</Button>
                <Button variant={filter === 'active' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('active')}>active </Button>
                <Button variant={filter === 'completed' ? "contained" : "text"} color={"secondary"}
                        onClick={() => changeButtonFilter('completed')}> completed</Button>
            </div>
        </div>
    )
})

