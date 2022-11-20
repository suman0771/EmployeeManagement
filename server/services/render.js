//allow to render different files

const axios = require("axios");

exports.homeRoutes = (req, res) => {
  //make a get request to /api/employee
  axios
    .get("http://localhost:3000/api/employee")
    .then(function (response) {
      // console.log(response.data);
      res.render("index", { employee: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_employee = (req, res) => {
  res.render("add_employee");
};

exports.update_employee = (req, res) => {
  axios
    .get("http://localhost:3000/api/employee", {
      params: { id: req.query.id },
    })
    .then(function (employeedata) {
      res.render("update_employee", { employee: employeedata.data });
    })
    .catch((err) => {
      res.send(err);
    });
  // res.render("update_employee");
};
