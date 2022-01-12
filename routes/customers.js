const errors = require("restify-errors");
const Customer = require("../models/customer");

const Customers = (server) => {

  // GET CUSTOMER ----READ
  server.get("/customers", async (req, res, next) => {
    try {
      const customersDB = await Customer.find({});
      res.send(customersDB);
    } catch (error) {
      return next(new errors.InvalidContentError(err));
    }
    next();
  });

  // ADD CUSTOMER ----CREATE
  server.post("/customers", async (req, res, next) => {
    if (!req.is("application/json")) {
      next(new errors.InvalidContentError("Expect 'application/json'"));
    }

    const { name, email, balance } = req.body;
    const customersDB = new Customer({ name, email, balance });

    try {
        const newCustomer = await customersDB.save();
        res.send(201)
        next();
    } catch(error) {
        return next(new errors.InternalError(error.message))
    }

    next();
  });

  // ADD CUSTOMER ----CREATE
  server.put("/customers", async (req, res, next) => {
    if (!req.is("application/json")) {
      next(new errors.InvalidContentError("Expect 'application/json'"));
    }

    const { id, name, email, balance } = req.body;
    const data = { id, name, email, balance }
    Object.keys(data).map( (item) => {
      if(!item) {
        delete data[Object.keys(data).indexOf(item)]
        console.log(data)
        if (!data.id) {
          res.send('please Input some id')
          next();
        }
      }
    })
    const customersDB = new Customer({ data });

    try {
        const newCustomer = await customersDB.save();
        res.send(201)
        next();
    } catch(error) {
        return next(new errors.InternalError(error.message))
    }

    next();
  });
  
};

module.exports = Customers;
