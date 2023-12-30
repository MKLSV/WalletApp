const MongoClient = require('mongodb').MongoClient

const dbURL = "mongodb+srv://matvey:451221@wallet.ah3oqwi.mongodb.net/?retryWrites=true&w=majority"; 
const dbName = "Wallet"


module.exports = {
    getCollection,
    updateCollection
}

var dbConn = null


async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        console.log(collection,'COLL')
        return collection
    } catch (err) {
        console.log('Failed to get Mongo collection', err)
        throw err
    }
}

async function updateCollection(collectionName, data) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        const result = await collection.update(data);
        return result
    } catch (err) {
        console.log('Failed to update Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbURL)
        // const db = client.db(dbName)
        // dbConn = db
        console.log(client)
        // return db
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err
    }
}



connect()
