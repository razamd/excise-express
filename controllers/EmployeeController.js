const { createUpdateValidation , paginationValidation } = require("../request-validators/employeeValidation");
const EmployeeService = require( "../services/EmployeeService" );
const EmployeeServiceInstance = new EmployeeService();

module.exports = { create , findById , getAll , update , paginationViews , deleteEmployee , updateWithQuery};

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function create ( req, res ) {
  try {
    const {error} = createUpdateValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }

    // We only pass the body object, never the req object
    const createdEmployee = await EmployeeServiceInstance.create( req.body );
    return res.send( createdEmployee );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const employee = await EmployeeServiceInstance.findById( req.params.id );
    return res.send( employee );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const employees = await EmployeeServiceInstance.getAll();
    return res.send( employees );
  } catch ( error ) {
    console.log(error);
    return res.status( 500 ).json( error );
  }
}

async function update ( req, res ) {
  try {
    const {error} = createUpdateValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    const currentEmployee = await EmployeeServiceInstance.findById(req.params.id);
    if(currentEmployee.body){
      if(currentEmployee.body.name !== req.body.name){
        const existedName = await EmployeeServiceInstance.getByName(req.body.name);
        if(existedName.body){
          return res.status(200).send({ success: false, error: 'name already exist' });
        }
        // We only pass the body object, never the req object
        
      }
      const updatedEmployee = await EmployeeServiceInstance.update( req.params.id, req.body );
        return res.send( updatedEmployee );      
    }else{
      return res.status(200).send({ success: false, error: 'employee not found' });
    }
    
    
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
}

async function paginationViews ( req , res ) {
  
  try {
    const {error} = paginationValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    const page = req.body.page ;
    const limit = req.body.limit;
    const sort = req.body.sort;
    const name = req.body.name;
    console.log(page , limit , sort ,name  );
    const employees = await EmployeeServiceInstance.paginationViews(page , limit , sort , name );
    return res.send( employees );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deleteEmployee ( req , res ) {

  try {
    const employee = await EmployeeServiceInstance.delete( req.params.id );
    return res.send( employee );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function updateWithQuery ( req, res ) {
  try {
    const {error} = createUpdateValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const updatedEmployee = await EmployeeServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( updatedEmployee );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

