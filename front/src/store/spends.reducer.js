export const SET_SPENDS = 'SET_SPENDS'
export const UPDATE_SPEND = 'UPDATE_SPEND'
export const ADD_SPEND = 'ADD_SPEND'
export const REMOVE_SPEND = 'REMOVE_SPEND'


const initialState = {
    spends: [],
}

export function spendsReducer(state = initialState, action) {
    var newState = state
    var spends
    switch (action.type) {
        case SET_SPENDS:
            newState = { ...state, spends: action.spends }
            break
        case UPDATE_SPEND:
            spends = state.incomes.map(spend => (spend._id === action.spend._id) ? action.spend : spend)
            newState = { ...state, spends }
            break
        case ADD_SPEND:
            newState = { ...state, spends: [...state.spends, action.spend] }
            break
        case REMOVE_SPEND:
            spends = state.spends.filter(spend => spend._id !== action.spendId)
            newState = { ...state, spends }
            break
        default:
    }
    return newState
}
