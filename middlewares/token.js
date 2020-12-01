const Messages = require( "../config/messages" );
const resUtil = require( "./response" );
const jwt = require("jsonwebtoken");

module.exports = { validateToken };

/**
 * @description Validates that the application token was provided in the request
 * @param req {object} Express object
 * @param res {object} Express object
 * @param next {function} Express MW
 * @returns {*}
 */
function validateToken ( req, res, next ) {
  //Define service paths where token is not required
  let nonSecurePaths = [
    '/' , 
    '/authenticate/auth'
  ]

  if ( nonSecurePaths.includes(req.path) ) return next();

  const token = ( req.headers && req.headers.authorization !== undefined )
    ? req.headers.authorization.slice( 7 )
    : req.query.appToken || req.params.appToken || req.body.appToken;

  if ( token ) {
    try {
      const verified = jwt.verify(token , process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
        return res.status(401).send( resUtil.sendError( Messages.responses.appTokenIsInvalid ) );
    }
  } else {
    return res.status( 400 ).send( resUtil.sendError( Messages.responses.appTokenNotProvided ) );
  }
}
