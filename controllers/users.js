const users = require("../models/users.js")();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await users.get());
  };

 const getByEmail = async (req, res) => {
   res.json(await users.get(req.params.email));
   
 };

  const postController = async (req, res) => {
    let email = req.body.email;
    let usertype = req.body.usertype;
   const result = await users.add(email, usertype);
    res.json(result);
  };
  return {
    getController,
    postController,
    getByEmail,
  };
};
