
import { store } from './store.js'
import { dbService } from "../services/db.service.js";
import { ADD_INCOME, SET_INCOMES, UPDATE_INCOME } from './incomes.reducer.js';

// Action Creators:SET_STORIES
// export function getActionRemoveStory(storyId) {
//     return {
//         type: REMOVE_INCOME,
//         storyId
//     }
// }
const DB_NAME = 'Incomes'

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

export function getActionUpdateStory(story) {
    return {
        type: UPDATE_INCOME,
        story
    }
}


// export async function removeStory(incomeId) {
//     try {
//         await dbService.remove(incomeId, 'Incomes')
//         store.dispatch(getActionRemoveStory(incomeId))
//     } catch (err) {
//         console.log('Cannot remove story', err)
//         throw err
//     }
// }

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

export function updateStory(story) {
    // return storyService.save(story)
    //     .then(savedStory => {
    //         console.log('Updated Story:', savedStory)
    //         store.dispatch(getActionUpdateStory(savedStory))
    //         return savedStory
    //     })
    //     .catch(err => {
    //         console.log('Cannot save story', err)
    //         throw err
    //     })
}

