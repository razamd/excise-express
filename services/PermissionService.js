const MongooseService = require( "./MongooseService" ); // Data Access Layer
const Permission = require( "../models/Permissions" ); // Database Model
const logger = require("./Logger");

class PermissionService {
  /**
   * @description Create an instance of Permission Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( Permission );
  }

  
  async create ( permission ) {
    try {
      
      const result = await this.MongooseServiceInstance.create( permission );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async findById( id ){
    try {
      const query = {active : true , _id : id };
      const projection = { __v : 0 , active : 0};
      const result = await this.MongooseServiceInstance.findOne(query , projection);
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


  async update (id , permission ) {
    try {
     
      const result = await this.MongooseServiceInstance.update(id , permission , { runValidators: true, context: 'query' });
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
    
    const myAggregate = Permission.aggregate(
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
    const result = await Permission.aggregatePaginate(myAggregate, options);

      return { success: true, body: result };
    } catch ( err ) {
      console.log(err);
      logger.error(err);
      return { success: false, error: err };
    }
  
  }

  async updateWithQuery (id , permission ) {
    try {
      const query = {active : true , _id : id};
      
      const result = await this.MongooseServiceInstance.updateWithQuery(query , permission , { runValidators: true, context: 'query' });
      return { success: true, body: 'Permission Updated Successfully' };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

}

module.exports = PermissionService;