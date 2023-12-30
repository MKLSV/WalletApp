export const SET_INCOMES = 'SET_INCOMES'
export const REMOVE_INCOME = 'REMOVE_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const UPDATE_INCOME = 'UPDATE_INCOME'


const initialState = { incomes: [] }

export const storeReducer = (state = initialState, { type, payload }) => {
    var newState = state
    var incomes
    switch (type) {
        case SET_INCOMES:
            newState = { ...state, payload }
            break
        case REMOVE_INCOME:
            incomes = state.incomes.filter(income => income._id !== payload)
            newState = { ...state, incomes }
            break
        case ADD_INCOME:
            newState = { ...state, incomes: [...state.incomes, payload] }
            break
        case UPDATE_STORY:
            incomes = state.incomes.map(income => (income._id === action.story._id) ? action.story : story)
            newState = { ...state, stories }
            break
        default:
    }
    return newState
}
