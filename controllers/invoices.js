const invoices = require("../models/invoices.js")();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await invoices.get());
  };
  const getByStatusInvo = async (req, res) => {
    res.json(await invoices.get(req.params.status));
  };

  const postController = async (req, res) => {
    let invoicesNumber = req.body.invoicesNumber;
    let customers = req.body.customers;
    let projects = req.body.projects;
    let amount = req.body.amount;
    let description = req.body.description;
    let title = req.body.title;
    let status = req.body.status;

    const result = await invoices.add(
      invoicesNumber,
      customers,
      projects,
      amount,
      description,
      title,
      status
    );
    res.json(result);
   
  };

  return {
    getController,
    postController,
    getByStatusInvo,
  };
};
