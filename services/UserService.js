const MongooseService = require( "./MongooseService" ); // Data Access Layer
const User = require( "../models/User" ); // Database Model
const {randomBytes} =  require("crypto");
const argon2 = require("argon2");
const logger = require("./Logger");
const { aggregate } = require("../models/User");

class UserService {
  /**
   * @description Create an instance of User Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( User );
  }

  /**
   * @description Attempt to create a user with the provided object
   * @param userToCreate {object} Object containing all required fields to
   * create user
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async create ( userToCreate ) {
    try {
      const salt = randomBytes(32);
      logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userToCreate.password, { salt });
      userToCreate.password = hashedPassword;
      const result = await this.MongooseServiceInstance.create( userToCreate );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async findById( id ){
    try {
      const query = {active : true , _id : id };
      const projection = { __v : 0 , password : 0 , active : 0};
      //const result = await this.MongooseServiceInstance.findWithActive( id , undefined,undefined , 'role');
      const result = await this.MongooseServiceInstance.findOne(query , projection ,undefined, 'roleId');
      return { success: true, body: result };
    } catch (error) {
      console.log(error);
      return { success: false, error: err };
    }
  }

  async getAll(){
    try {
      const query = {active : true };
      const projection = { __v : 0 , password : 0 , active : 0};
      const result = await this.MongooseServiceInstance.find(query , projection ,undefined , undefined , 'roleId');
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }

  async getByUsername(username){
    try {
      const result = await this.MongooseServiceInstance.findOne({'username' : username , active : true });
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }

  async update (id , userToUpdate ) {
    try {
      const salt = randomBytes(32);
      logger.silly('Hashing password');
      if(userToUpdate.password){
        const hashedPassword = await argon2.hash(userToUpdate.password, { salt });
        userToUpdate.password = hashedPassword;
      }
      const result = await this.MongooseServiceInstance.update(id , userToUpdate , { runValidators: true, context: 'query' });
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async delete (id  ) {
    try {
      const result = await this.MongooseServiceInstance.delete(id);
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }


  async paginationViews(page , limit , sort , name , email){
    try {
      /*const myAggregate = await User.aggregate(
        [
            { $addFields: 
                { result: 
                    {$and: 
                        [
                            { $regexMatch: 
                                { input: "$name", regex: name , options: "si"} 
                            } ,
                            { $regexMatch: 
                                { input: "$email", regex: email , options: "si"} 
                            }
                        ]
                    }
                }
            },
            { $match: { result: true } }
            
            //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
        ]

      );

      const options = {
        page: page,
        limit: limit ,
        sort : sort
      };

      const result = await User.aggregatePaginate(options , aggregate);*/

      const options = {
        page: page,
        limit: limit ,
        sort : sort
    };
    
    const myAggregate = User.aggregate(
        [
            { $addFields: 
                { result: 
                    {$and: 
                        [
                            { $regexMatch: 
                                { input: "$name", regex: name , options: "si"} 
                            } ,
                            { $regexMatch: 
                                { input: "$email", regex: email , options: "si"} 
                            }
                        ]
                    }
                }
            },
            { $match: { result: true , active : true } }
            
            //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
        ]

    );
    const result = await User.aggregatePaginate(myAggregate, options);

      return { success: true, body: result };
    } catch ( err ) {
      console.log(err);
      logger.error(err);
      return { success: false, error: err };
    }
  
  }

  async updateWithQuery (id , userToUpdate ) {
    try {
      const query = {active : true , _id : id};
      const salt = randomBytes(32);
      logger.silly('Hashing password');
      if(userToUpdate.password){
        const hashedPassword = await argon2.hash(userToUpdate.password, { salt });
        userToUpdate.password = hashedPassword;
      }
      const result = await this.MongooseServiceInstance.updateWithQuery(query , userToUpdate , { runValidators: true, context: 'query' });
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

}

module.exports = UserService;