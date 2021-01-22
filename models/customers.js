const db = require("../db")();
const COLLECTION = "customers";

module.exports = () => {
  const get = async (slug = null) => {
    console.log(" inside customers model");
    if (!slug) {
      const slugN = await db.get(COLLECTION);
      return {slug: slugN};
    }
    console.log({slug});
    const slugN = await db.get(COLLECTION, {slug});
    return {slug: slugN};
  };
  const add = async (name, slug, adress, phone, users) => {
    const customersCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION,{
      id: customersCount + 1,
      name: name,
      author: author,
      slug: slug,
      adress: adress,
      phone: phone,
      users: users,
    });
  return results.result;
  };
  return {
    get,
    add,
  };
};
