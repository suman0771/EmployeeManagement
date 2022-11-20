const express = require("express");
// const app=express();
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

/**
 * @description Root Route
 * @method GET/
 */

route.get("/", services.homeRoutes);

// route.get("/", (req, res) => {
//   // res.send("Crud application");
//   res.render("index");
// });

/**
 * @description add employee
 * @method GET/ add_employee
 */

route.get("/add_employee", services.add_employee);

/**
 * @description update employee
 * @method GET/ update_employee
 */

route.get("/update_employee", services.update_employee);

//API
route.post("/api/employee", controller.create);
route.get("/api/employee", controller.find);
route.put("/api/employee/:id", controller.update);
route.delete("/api/employee/:id", controller.delete);

module.exports = route;
