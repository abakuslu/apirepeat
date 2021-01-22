const customers = require("../models/customers.js")();

module.exports = () => {
  const getController = async (req, res) => {
    const {slug} = await customers.get();

  
    res.json(slug);
  };

 
   const getBySlug = async (req, res) => {
     console.log('try by slup');
     const {slug} = await customers.get(req.params.slug);
  
     res.json(slug);
   };


 const postController = async (req, res) => {
   let name = req.body.name;
   let slug = req.body.slug;
   let adress = req.body.adress;
   let phone = req.body.phone;
   let users = req.body.users;
   const result= await customers.add(name, slug, adress, phone, users);
   
  res.json(result);
 };

  return {
    getController,
    postController,
    getBySlug,
  };
};
