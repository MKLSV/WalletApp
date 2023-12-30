
import { store } from './store.js'
import { dbService } from "../services/db.service.js";
import { ADD_SPEND, SET_SPENDS } from './spends.reducer.js';

// Action Creators:SET_STORIES
// export function getActionRemoveStory(storyId) {
//     return {
//         type: REMOVE_INCOME,
//         storyId
//     }
// }

export function getActionAddSpend(spend) {
    return {
        type: ADD_SPEND,
        spend
    }
}


const DB_NAME = 'Spends'

// export function getActionUpdateStory(story) {
//     return {
//         type: UPDATE_INCOME,
//         story
//     }
// }

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

// export async function removeStory(incomeId) {
//     try {
//         await dbService.remove(incomeId, 'Incomes')
//         store.dispatch(getActionRemoveStory(incomeId))
//     } catch (err) {
//         console.log('Cannot remove story', err)
//         throw err
//     }
// }

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

