const template = require( "./routes-template" );
const userRoute = require("./user");
const authRoute = require("./auth");
const roleRoute = require('./role');
const permissionRoute = require('./permission');
const moudleRoute = require('./modules');
const departmentRoute = require('./department');
const employeeRoute = require('./employee');
const cors = require('cors');
const { validateToken } = require("../middlewares/token");

const routes = app => {

  //Apply validation on all paths

  

  
  app.use(cors());

  app.all("*" , validateToken);

  app.use( "/", template );
  app.use("/user" , userRoute);
  app.use("/role" , roleRoute);
  app.use("/authenticate", authRoute);
  app.use("/permission" , permissionRoute);
  app.use("/module" , moudleRoute);
  app.use("/department" , departmentRoute);
  app.use("/employee" , employeeRoute);

};

module.exports = routes;
