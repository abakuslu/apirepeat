const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
     const getByKey = async (key) => {
       if (!key) {
         console.log(" Missing key");
         return null;
       }
       const users = await db.get(COLLECTION, {key});
       console.log(key);
       console.log(users);
       if (users.length !== 1) {
         console.log(" wrong key");
         return null;
       }
       return users[0];
     };
  const get = async (email = null) => {
    console.log(" inside users model");
    if (!email) {
      const userN = await db.get(COLLECTION);
      return {email: userN};
    }
    const userN = await db.get(COLLECTION, {email});
    return {email: userN};
  };
  const add = async (email,usertype) => {
    const usersCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: usersCount + 1,
      email: email,
      usertype:usertype,
    });
    return results.result;
  };
  return {
    get,
    add,
    getByKey,
  };
};
