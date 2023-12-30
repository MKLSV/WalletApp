const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId


async function getData(DB_NAME) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const data = await collection.find().toArray()

        return data
    } catch (err) {
        console.error('cannot find stories', err)
        throw err
    }
}
// async function getDataById(storyId) {
//     try {
//         // const criteria = _buildCriteria(filterBy)
//         const collection = await dbService.getCollection(DB_NAME)
//         const story = await collection.findOne({ _id: ObjectId(storyId) })

//         return story
//     } catch (err) {
//         logger.error('cannot find story', err)
//         throw err
//     }
// }

async function add(DB_NAME, data) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const newData = await collection.insertOne(data)
        return data

    } catch (err) {
        console.error('cannot insert story', err)
        throw err
    }
}

async function update(DB_NAME, data) {
    try {
        const updatedData = { ...data }
        delete updatedData._id
        const collection = await dbService.getCollection(DB_NAME)
        await collection.updateOne({ _id: ObjectId(data._id || req.params.id) }, { $set: updatedData })
        return story
    } catch (err) {
        console.error(`cannot update story ${data._id}`, err)
        throw err
    }
}


async function remove(DB_NAME, dataID) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.deleteOne({ _id: ObjectId(dataID || req.params.id) })
        return dataID
    } catch (err) {
        console.error(`cannot remove story ${dataID}`, err)
        throw err
    }
}


module.exports = {
    getData,
    add,
    update,
    remove
}

