import {v1} from "uuid";

import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, TodolistType,
    toDoReducer
} from "./todo-reducer";


test('correct todolist should be removed', () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    const startState: TodolistType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoReducer(startState, removeTodoListAC(todoListId_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
});

test('correct todolist should be added', () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoReducer(startState,addTodoListAC(newTodolistTitle,v1()))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoReducer(startState,changeTodoListTitleAC(todoListId_2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct todolist should change its filter value', () => {

    let todoListId_1 = v1()
    let todoListId_2 = v1()


    const startState: TodolistType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoReducer(startState,changeTodoListFilterAC(todoListId_2,'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe("completed")
})