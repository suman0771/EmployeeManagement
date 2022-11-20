var Employeedb = require("../model/model");

//create and save new employee
exports.create = (req, res) => {
  //validate request
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //new employee
  // const employee = new Employeedb({
  //   name: req.body.name,
  //   email: req.body.email,
  //   gender: req.body.gender,
  //   status: req.body.status,
  // });
  const employee = new Employeedb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save employee in database
  employee
    .save(employee)
    .then((data) => {
      // res.send(data);
      // console.log("running........");
      res.redirect("/add_employee");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

//retrive and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Employeedb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found Employee with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retriving employee with id " + id });
      });
  } else {
    Employeedb.find()
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while retriving user info",
        });
      });
  }
};

//update a new identified employee by employee id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  console.log("yourr id is ; ", id);
  Employeedb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update Employee with ${id}. May be Employee not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update Employee Information" });
    });
};

//delete an employee with specified employee id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employeedb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id ${id}. May be id is wrong.`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Employee with id=" + id });
    });
};
