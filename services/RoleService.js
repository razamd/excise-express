const MongooseService = require( "./MongooseService" ); // Data Access Layer
const Role = require( "../models/Roles" ); // Database Model
const logger = require("./Logger");

class RoleService {
  /**
   * @description Create an instance of role Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( Role );
  }

  
  async create ( role ) {
    try {
      
      const result = await this.MongooseServiceInstance.create( role );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async findById( id ){
    try {
      const query = {active : true , _id : id };
      const projection = { __v : 0 , active : 0};
      //const result = await this.MongooseServiceInstance.findWithActive( id , undefined,undefined , 'role');
      const result = await this.MongooseServiceInstance.findOne(query , projection , undefined , 'permissions');
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }

  async getAll(){
    try {
      const query = {active : true };
      const projection = { __v : 0 , active : 0 , users : 0};
      const result = await this.MongooseServiceInstance.find(query , projection);
      return { success: true, body: result };
    } catch (error) {
      console.log(error);
      return { success: false, error: err };
    }
  }


  async update (id , role ) {
    try {
     
      const result = await this.MongooseServiceInstance.update(id , role , { runValidators: true, context: 'query' });
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


  async paginationViews(page , limit , sort , name ){
    try {

      const options = {
        page: page,
        limit: limit ,
        sort : sort
    };
    
    const myAggregate = Role.aggregate(
        [
            { $addFields: 
                { result: 
                    {$and: 
                        [
                            { $regexMatch: 
                                { input: "$name", regex: name , options: "si"} 
                            }
                        ]
                    }
                }
            },
            { $match: { result: true  , active : true } }
            
            //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
        ]

    );
    const result = await Role.aggregatePaginate(myAggregate, options);

      return { success: true, body: result };
    } catch ( err ) {
      console.log(err);
      logger.error(err);
      return { success: false, error: err };
    }
  
  }

  async updateWithQuery (id , role ) {
    try {
      const query = {active : true , _id : id};
      
      const result = await this.MongooseServiceInstance.updateWithQuery(query , role , { runValidators: true, context: 'query' });
      return { success: true, body: 'Role Updated Successfully' };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async getByName(name){
    try {
      const result = await this.MongooseServiceInstance.findOne({'name' : name , active : true });
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }

}

module.exports = RoleService;