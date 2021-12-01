import {calculator, sum} from "./reducer";


test('sum', () => {
    //1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2. Выполнение тестируемого кода
    const result = sum(num1,num2)

    //3.Сравнение с ожидаемым результатом
    expect(result).toBe(22)

})

test('sum of calculator', () => {
    //1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2. Выполнение тестируемого кода
    const result = calculator(num1, {type:"SUM",number:num2})

    //3.Сравнение с ожидаемым результатом
    expect(result).toBe(22)

})

test('mult of calculator', () => {
    //1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2. Выполнение тестируемого кода
    const result = calculator(num1, {type:"MULT",number:num2})

    //3.Сравнение с ожидаемым результатом
    expect(result).toBe(120)

})

test('sub of calculator', () => {
    //1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2. Выполнение тестируемого кода
    const result = calculator(num1, {type:"SUB",number:num2})

    //3.Сравнение с ожидаемым результатом
    expect(result).toBe(-2)

})

test('div of calculator', () => {
    //1.Тестовые данные
    const num1 = 20
    const num2 = 10

    //2. Выполнение тестируемого кода
    const result = calculator(num1, {type:"DIV",number:num2})

    //3.Сравнение с ожидаемым результатом
    expect(result).toBe(2)

})