const { loginValidation } = require("../request-validators/userValidation");
const AuthService = require( "../services/AuthService" );
const logger = require("../services/Logger");
const AuthServiceInstance = new AuthService();

module.exports = { signIn };

async function signIn ( req , res ) {
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }

  try {
    const result = await AuthServiceInstance.signIn(req.body.username , req.body.password);
    return res.send( result );
  } catch ( err ) {
    console.log(err);
    logger.error(err);
    res.status( 500 ).json( { success: false, error: 'Incorrect Credentials' } );
  }
}