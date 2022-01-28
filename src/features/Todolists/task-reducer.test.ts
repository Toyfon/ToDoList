import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    initialState,
    removeTaskAC,
    taskReducer
} from "./task-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasksApi";


let startState: typeof initialState

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "2", title: "milk", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2', addedDate: '', description: '', deadline: '', order: 0
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId1', addedDate: '', description: '', deadline: '', order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2', addedDate: '', description: '', deadline: '', order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, startDate: '', priority: TaskPriorities.Low,
                todoListId: 'todolistId2', addedDate: '', description: '', deadline: '', order: 0
            }
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        title: 'Hello World',
        order: 0,
        addedDate: '',
        startDate: '',
        status: TaskStatuses.New,
        description: '',
        deadline: '',
        id: '4',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId2'
    });

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('Hello World');
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC(TaskStatuses.InProgress, '2', "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.InProgress);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("beer", "2", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe('JS');
});
