const db = require("../db")();
const COLLECTION = "projects";

module.exports = () => {
  const get = async (status = null) => {
    console.log(" inside projects model");
    if (!status) {
      const projectN = await db.get(COLLECTION);
      return {status: projectN};
    }
    const projectN = await db.get(COLLECTION, {status});
    return {status: projectN};
  };
  const add = async (
    name,
    slug,
    description,
    status,
    startdate,
    endDate,
    users,
    customers
  ) => {
    const bookCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: bookCount + 1,
      name: name,
      description: description,
      slug: slug,
      status: status,
      startdate: startdate,
      endDate: endDate,
      users: users,
      customers: customers,
    });
    return results.result;
  };
  return {
    get,
    add,
  };
};
