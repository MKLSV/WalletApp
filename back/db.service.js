const MongoClient = require('mongodb').MongoClient

const dbURL = "mongodb+srv://kolosovmatveymk:ASTUtQ85joRxu3Mt@walletcluster.ib8jcxh.mongodb.net/?retryWrites=true&w=majority";
const dbName = "WalletDB"


module.exports = {
    getCollection,
}

var dbConn = null


async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.log('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbURL)
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err
    }
}

