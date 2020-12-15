const { createUpdateValidation , paginationValidation } = require("../request-validators/departmentValidation");
const DepartmentService = require( "../services/DepartmentService" );
const DepartmentServiceInstance = new DepartmentService();

module.exports = { create , findById , getAll , update , paginationViews , deleteDepartment , updateWithQuery};

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
    const existedName = await DepartmentServiceInstance.getByDepartmentname(req.body.name);
    if(existedName.body){
      return res.status(200).send({ success: false, error: 'name already exist' });
    }
    // We only pass the body object, never the req object
    const createdDepartment = await DepartmentServiceInstance.create( req.body );
    return res.send( createdDepartment );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const department = await DepartmentServiceInstance.findById( req.params.id );
    return res.send( department );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const departments = await DepartmentServiceInstance.getAll();
    return res.send( departments );
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
    const currentDepartment = await DepartmentServiceInstance.findById(req.params.id);
    if(currentDepartment.body){
      if(currentDepartment.body.name !== req.body.name){
        const existedName = await DepartmentServiceInstance.getByDepartmentname(req.body.name);
        if(existedName.body){
          return res.status(200).send({ success: false, error: 'name already exist' });
        }
        // We only pass the body object, never the req object
        
      }
      const updatedDepartment = await DepartmentServiceInstance.update( req.params.id, req.body );
        return res.send( updatedDepartment );      
    }else{
      return res.status(200).send({ success: false, error: 'department not found' });
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
    const departments = await DepartmentServiceInstance.paginationViews(page , limit , sort , name );
    return res.send( departments );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deleteDepartment ( req , res ) {

  try {
    const department = await DepartmentServiceInstance.delete( req.params.id );
    return res.send( department );
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
    const updatedDepartment = await DepartmentServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( updatedDepartment );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

