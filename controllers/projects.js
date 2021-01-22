const projects = require("../models/projects.js")();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await projects.get());
  };
  const getByStatus = async (req, res) => {
     res.json(await projects.get(req.params.status));
  };

  const postController = async (req, res) => {
    let name = req.body.name;
    let slug = req.body.slug;
    let description = req.body.description;
    let status = req.body.status;
    let startdate = req.body.startdate;
    let endDate = req.body.endDate;
    let users = req.body.users;
    let customers = req.body.customers;
   const result = await projects.add(
     name,
     slug,
     description,
     status,
     startdate,
     endDate,
     users,
     customers
   );
   res.json(result);
    
  };

  return {
    getController,
    postController,
    getByStatus,
  };
};
