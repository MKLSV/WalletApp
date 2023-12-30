
import { store } from './store.js'
import { dbService } from "../services/db.service.js";
import {SET_INCOMES, UPDATE_INCOME } from './incomes.reducer.js';

// Action Creators:SET_STORIES
// export function getActionRemoveStory(storyId) {
//     return {
//         type: REMOVE_INCOME,
//         storyId
//     }
// }

// export function getActionAddStory(story) {
//     return {
//         type: ADD_INCOME,
//         story
//     }
// }
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_INCOME,
        story
    }
}

export async function loadIncomes() {
    try {
        console.log('here')
        const incomes = await dbService.getData('Incomes')
        store.dispatch({
            type: SET_INCOMES,
            incomes
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

// export async function addStory(story) {
//     try {
//         const savedStory = await storyService.save(story)
//         console.log('Added Story', savedStory)
//         store.dispatch(getActionAddStory(savedStory))
//         return savedStory
//     } catch (err) {
//         console.log('Cannot add story', err)
//         throw err
//     }
// }

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

