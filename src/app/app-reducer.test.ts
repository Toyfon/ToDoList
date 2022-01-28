import {appReducer, InitStateType, setAppError, setAppStatus} from "./app-reducer";

let startState: InitStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized:false,
        theme:'light'
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError('some error'))

    expect(endState.error).toBe('some error')
})


test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})