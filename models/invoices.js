const db = require("../db")();
const COLLECTION = "invoices";

module.exports = () => {
  const get = async (status = null) => {
    console.log(" inside invoices model");
    if (!status) {
      const invoiceN = await db.get(COLLECTION);
      return {status: invoiceN};
    }
        const invoiceN = await db.get(COLLECTION, {status});
        return {status:invoiceN};

  };
  const add = async (
    invoicesNumber,
    customers,
    projects,
    amount,
    description,
    title,
    status
  ) => {
    const invoicesCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: invoicesCount + 1,
      invoicesNumber: invoicesNumber,
      customers: customers,
      amount: amount,
      description: description,
      title: title,
      status: status,
      projects: projects,
    });
    return results.result;
  };
  return {
    get,
    add,
  };
};
