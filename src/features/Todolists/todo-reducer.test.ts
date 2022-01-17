import {v1} from "uuid";

import {
    addTodoListAC, changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodoDomainType,
    toDoReducer
} from "./todo-reducer";
import {TodoType} from "../../api/todoApi";
import {StatusType} from "../../app/app-reducer";

let todoListId_1: string
let todoListId_2: string
let startState: TodoDomainType[]

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()

    startState = [
        {id: todoListId_1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todoListId_2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {

    const endState = toDoReducer(startState, removeTodoListAC(todoListId_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
});

test('correct todolist should be added', () => {

    let todolist: TodoType = {
        title: "New Todolist",
        order: 0,
        addedDate: "",
        id: 'any id'
    }

    const endState = toDoReducer(startState, addTodoListAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = toDoReducer(startState, changeTodoListTitleAC(todoListId_2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct todolist should change its filter value', () => {

    let newFilter: FilterValuesType = 'completed'

    const action = changeTodoListFilterAC(todoListId_2, newFilter)

    const endState = toDoReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be added', () => {

    const action = setTodoListsAC(startState)

    const endState = toDoReducer([],action)

    expect(endState.length).toBe(2)
})

test('correct todolist should change its entity status', () => {

    let newEntityStatus: StatusType = 'loading'

    const action = changeTodoListEntityStatusAC(todoListId_2, newEntityStatus)

    const endState = toDoReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newEntityStatus)
})