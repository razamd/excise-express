const MongooseService = require( "./MongooseService" ); // Data Access Layer
const User = require( "../models/User" ); // Database Model
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const logger = require( "../services/Logger" );
const argon2 = require("argon2");

class AuthService {
  /**
   * @description Create an instance of User Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( User );
  }

  async signIn(username, password) {
    const userRecord = await this.MongooseServiceInstance.findOne({'username' : username});
    console.log(userRecord);

    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    try {

        const validPassword = await argon2.verify(userRecord.password, password);
        //const validPassword = userRecord.password === password;
        if (validPassword) {
        logger.info('Password is valid!');
        logger.info('Generating JWT');
        const token = await this.generateToken(userRecord);
        const user = userRecord;
        user.password = undefined;
        return { user, token };
        } else {
            return { success: false, error: 'Invalid Password' };
        //throw new Error('Invalid Password');
        }
        
    } catch (error) {
        console.log(error);
        return { success: false, error: 'Invalid Password' };
    }
    
  }

  async generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 1);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    logger.info(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.tokenSecret
    );
  }
}

module.exports = AuthService;