const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = 'mongodb+srv://mijanur:WtxUCNGh7Ib1Orf7@mytestingcluster.n7v1t.mongodb.net/shop?retryWrites=true&w=majority';

let _db;
const initDatabase = (callback) => {
    if (_db) {
        console.log('Database is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
        .then(client => {
            _db = client;
            // for mongo pool
            // _db = client.db();
            return callback(null, _db);
        })
        .catch(error => {
            callback(error);
        });
}

const getDatabase = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
}

module.exports = {
    initDatabase,
    getDatabase
};