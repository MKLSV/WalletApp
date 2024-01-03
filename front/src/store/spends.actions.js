
import { store } from './store.js'
import { dbService } from "../services/db.service.js";
import { ADD_SPEND, REMOVE_SPEND, SET_SPENDS, UPDATE_SPEND } from './spends.reducer.js';

const DB_NAME = 'Spends'


export function getActionRemoveSpend(spendID) {
    return {
        type: REMOVE_SPEND,
        spendID
    }
}

export function getActionAddSpend(spend) {
    return {
        type: ADD_SPEND,
        spend
    }
}



export function getActionUpdateSpend(spend) {
    return {
        type: UPDATE_SPEND,
        spend
    }
}

export async function loadSpends() {
    try {
        const spends = await dbService.getData(DB_NAME)
        store.dispatch({
            type: SET_SPENDS,
            spends
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }

}

export async function removeSpend(spendID) {
    try {
        await dbService.removeData(spendID, DB_NAME)
        store.dispatch(getActionRemoveSpend(spendID))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addSpend(spend) {
    try {
        const savedSpend = await dbService.addData(DB_NAME, spend)
        console.log('Added spend', savedSpend)
        store.dispatch(getActionAddSpend(savedSpend))
        return savedSpend
    } catch (err) {
        console.log('Cannot add spend', err)
        throw err
    }
}

export async function updateSpend(spend) {
    try {
        await dbService.updateData(spend, DB_NAME)
        console.log('Updated Story:', spend)
        store.dispatch(getActionUpdateSpend(spend))
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

