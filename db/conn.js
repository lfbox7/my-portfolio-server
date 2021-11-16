const {
    MongoClient
} = require('mongodb');
const uri = 'mongodb+srv://lbox01:Hellou2y!@cluster0.a8tut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    connectToServer: (callback) => {
        client.connect((e, db) => {
            if (db) {
                _db = db.db('myFirstDatabase');
                console.log('Successfully connected to MongoDB Atlas');
            }
            return callback(e);
        });
    },
    getDb: () => {
        return _db
    },
};