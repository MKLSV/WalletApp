
import { store } from './store.js'
import { storyService } from "../services/story.service.js";
import { ADD_INCOME, REMOVE_INCOME, UPDATE_INCOME } from './store.reducer.js';

// Action Creators:SET_STORIES
export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_INCOME,
        storyId
    }
}

export function getActionAddStory(story) {
    return {
        type: ADD_INCOME,
        story
    }
}
export function getActionUpdateStory(story) {
    return {
        type: UPDATE_INCOME,
        story
    }
}

export async function loadStories() {
    try {
        const stories = await storyService.query()
        console.log(stories)
        store.dispatch({
            type: SET_STORIES,
            stories
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }

}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export function updateStory(story) {
    return storyService.save(story)
        .then(savedStory => {
            console.log('Updated Story:', savedStory)
            store.dispatch(getActionUpdateStory(savedStory))
            return savedStory
        })
        .catch(err => {
            console.log('Cannot save story', err)
            throw err
        })
}

