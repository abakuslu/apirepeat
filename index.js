const express = require("express");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const usersController = require("./controllers/users")();
const customersController = require("./controllers/customers")();
const projectsController = require("./controllers/projects")();
const invoicesController = require("./controllers/invoices")();

const users = require("./models/users")();

const app = (module.exports = express());
app.use((req, res, next) => {
  // Display log for requests
  console.log("[%s] %s -- %s", new Date(), req.method, req.url);
  next();
});
app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
    error: "Failed Authentication",
    message: "Go away!",
    code: "xxx", // Some useful error code
  };
  const suppliedKey = req.headers["x-api-key"];
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // Check Pre-shared key
  if (!suppliedKey) {
    console.log(
      " [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = "01";
    return res.status(401).json(FailedAuthMessage);
  }
  const user = await users.getByKey(suppliedKey);
  if (!user) {
    console.log(
      " [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied",
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = "02";
    return res.status(401).json(FailedAuthMessage);
  }
  next();
});

app.use(bodyParser.json());

app.get("/users", usersController.getController);
app.post("/users", usersController.getController);
app.get("/users/:email", usersController.getByEmail);

app.get("/customers", customersController.getController);
app.post("/customers", customersController.postController);
app.get("/customers/:slug", customersController.getBySlug);

app.get("/projects", projectsController.getController);
app.post("/projects", projectsController.postController);
app.get("/projects/:status", projectsController.getByStatus);

app.get("/invoices", invoicesController.getController);
app.post("/invoices", invoicesController.postController);
app.get("/invoices/:status", invoicesController.getByStatusInvo);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// 404
app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: "Route not found",
  });
});
