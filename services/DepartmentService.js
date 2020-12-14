const MongooseService = require( "./MongooseService" ); // Data Access Layer
const Department = require( "../models/Department" ); // Database Model
const logger = require("./Logger");
const { aggregate } = require("../models/Department");

class DepartmentService {
  /**
   * @description Create an instance of Department Service
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( Department );
  }

  /**
   * @description Attempt to create a Department with the provided object
   * @param DepartmentToCreate {object} Object containing all required fields to
   * create Department
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async create ( departmentToCreate ) {
    try {
      const result = await this.MongooseServiceInstance.create( departmentToCreate );
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

  async findById( id ){
    try {
      const query = {active : true , _id : id };
      const projection = { __v : 0  , active : 0};
      
      const result = await this.MongooseServiceInstance.findOne(query , projection);
      return { success: true, body: result };
    } catch (error) {
      console.log(error);
      return { success: false, error: err };
    }
  }

  async getAll(){
    try {
      const query = {active : true };
      const projection = { __v : 0 , active : 0};
      const result = await this.MongooseServiceInstance.find(query , projection ,undefined , undefined);
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }

  async getByDepartmentname(departmentname){
    try {
      const result = await this.MongooseServiceInstance.findOne({'name' : departmentname , active : true });
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: err };
    }
  }


  async update (id , departmentToUpdate ) {
    try {
      
      const result = await this.MongooseServiceInstance.update(id , departmentToUpdate , { runValidators: true, context: 'query' });
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
    
    const myAggregate = Department.aggregate(
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
            { $match: { result: true , active : true } }
        ]

    );
    const result = await Department.aggregatePaginate(myAggregate, options);

      return { success: true, body: result };
    } catch ( err ) {
      console.log(err);
      logger.error(err);
      return { success: false, error: err };
    }
  
  }

  async updateWithQuery (id , departmentToUpdate ) {
    try {
      const query = {active : true , _id : id};
      
      const result = await this.MongooseServiceInstance.updateWithQuery(query , departmentToUpdate , { runValidators: true, context: 'query' });
      return { success: true, body: result };
    } catch ( err ) {
      return { success: false, error: err };
    }
  }

}

module.exports = DepartmentService;