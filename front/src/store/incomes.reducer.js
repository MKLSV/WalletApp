export const SET_INCOMES = 'SET_INCOMES'
export const UPDATE_INCOME = 'UPDATE_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const REMOVE_INCOME = 'REMOVE_INCOME'


const initialState = {
    incomes: [],
}

export function incomesReducer(state = initialState, action) {
    var newState = state
    var incomes
    switch (action.type) {
        case SET_INCOMES:
            newState = { ...state, incomes: action.incomes }
            break
        case UPDATE_INCOME:
            incomes = state.incomes.map(income => (income._id === action.income._id) ? action.income : income)
            newState = { ...state, incomes }
            break
        case ADD_INCOME:
            newState = { ...state, incomes: [...state.incomes, action.income] }
            break
        case REMOVE_INCOME:
            incomes = state.incomes.filter(income => income._id !== action.incomeId)
            newState = { ...state, incomes }
            break
        default:
    }
    return newState
}
