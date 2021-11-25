const {
    MongoClient
} = require('mongodb');
const uri = process.env.ATLAS_URI;

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

initial = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  