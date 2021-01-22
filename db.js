const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "cloud";
const MONGO_OPTIONS = {useUnifiedTopology: true, useNewUrlParser: true};

module.exports = () => {
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };
  const get = (collectionName,project={}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        console.log(err);
        const db = client.db(DB_NAME);
        
        const collection = db.collection(collectionName);
        collection.find(project).toArray((err, docs) => {
          console.log(err);
          console.log(docs);
          resolve(docs);
          client.close();
        });
      });
    });
  };
  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          resolve(result);
        });
      });
    });
  };
  return {
    count,
    get,
    add,
  };
};
