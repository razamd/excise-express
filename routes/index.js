const template = require( "./routes-template" );
const userRoute = require("./user");
const authRoute = require("./auth");
const roleRoute = require('./role');
const permissionRoute = require('./permission');
const moudleRoute = require('./modules');

const routes = app => {
  app.use( ( req, res, next ) => {
    res.setHeader( "Access-Control-Allow-Origin", "*" );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, x-access-token, authorization"
    );
    res.setHeader( "Access-Control-Allow-Credentials", true );
    res.removeHeader( "X-Powered-By" );
    next();
  } );

  app.use( "/", template );
  app.use("/user" , userRoute);
  app.use("/role" , roleRoute);
  app.use("/authenticate", authRoute);
  app.use("/permission" , permissionRoute);
  app.use("/module" , moudleRoute);
};

module.exports = routes;
