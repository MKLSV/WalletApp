
import { store } from './store.js'
import { dbService } from "../services/db.service.js";
import { ADD_INCOME, SET_INCOMES, UPDATE_INCOME, REMOVE_INCOME } from './incomes.reducer.js';

// Action Creators:SET_STORIES
const DB_NAME = 'Incomes'


export function getActionRemove(incomeID) {
    return {
        type: REMOVE_INCOME,
        incomeID
    }
}

export async function loadIncomes() {
    try {
        const incomes = await dbService.getData(DB_NAME)
        store.dispatch({
            type: SET_INCOMES,
            incomes
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }

}

export function getActionAddIncome(income) {
    return {
        type: ADD_INCOME,
        income
    }
}

export function getActionUpdate(income) {
    return {
        type: UPDATE_INCOME,
        income
    }
}


export async function removeIncome(incomeId) {
    try {
        await dbService.removeData(incomeId, DB_NAME)
        store.dispatch(getActionRemove(incomeId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addIncome(income) {
    try {
        const savedIncome = await dbService.addData(DB_NAME, income)
        console.log('Added income', savedIncome)
        store.dispatch(getActionAddIncome(savedIncome))
        return savedIncome
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateIncome(income) {
    try {
        await dbService.updateData(income, DB_NAME)
        console.log('Updated Story:', income)
        store.dispatch(getActionUpdate(income))
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

