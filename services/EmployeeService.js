const MongooseService = require( "./MongooseService" ); // Data Access Layer
const Employee = require( "../models/Employee" ); // Database Model
const logger = require("./Logger");

class EmployeeService {
  /**
   * @description Create an instance of Employee Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( Employee );
  }

  
  async create ( employee ) {
    try {
      
      const result = await this.MongooseServiceInstance.create( employee );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async findById( id ){
    try {
      const query = {active : true , _id : id };
      const projection = { __v : 0 , active : 0};
      const result = await this.MongooseServiceInstance.findOne(query , projection , undefined , 'departmentId');
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


  async update (id , employee ) {
    try {
     
      const result = await this.MongooseServiceInstance.update(id , employee , { runValidators: true, context: 'query' });
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
    
    const myAggregate = Employee.aggregate(
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
            ,{
              $project : { active :0 , __v :0 , result :0 }
            },
            { 
              $lookup: {
                  from: "departments",
                  localField: "departmentId",
                  foreignField: "_id",
                  as: "department",                  
              }                
            }
            
            //{ $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
        ]

    );
    const result = await Employee.aggregatePaginate(myAggregate, options);

      return { success: true, body: result };
    } catch ( err ) {
      console.log(err);
      logger.error(err);
      return { success: false, error: err };
    }
  
  }

  async updateWithQuery (id , employee ) {
    try {
      const query = {active : true , _id : id};
      
      const result = await this.MongooseServiceInstance.updateWithQuery(query , employee , { runValidators: true, context: 'query' });
      return { success: true, body: 'employee Updated Successfully' };
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

module.exports = EmployeeService;