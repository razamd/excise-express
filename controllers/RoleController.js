const { createUpdateValidation , paginationValidation } = require("../request-validators/roleValidations");
const logger = require("../services/Logger");
const RoleService = require( "../services/RoleService" );
const RoleServiceInstance = new RoleService();

module.exports = { create , findById , getAll , update , paginationViews , deleteRole , updateWithQuery};

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
    const existedName = await RoleServiceInstance.getByName(req.body.name);
    if(existedName.body){
      return res.status(200).send({ success: false, error: 'name already exist' });
    }

    // We only pass the body object, never the req object
    const createdRole = await RoleServiceInstance.create( req.body );
    return res.send( createdRole );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const role = await RoleServiceInstance.findById( req.params.id );
    return res.send( role );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const roles = await RoleServiceInstance.getAll();
    return res.send( roles );
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
    const currentRole = await RoleServiceInstance.findById(req.params.id);
    if(currentRole.body){
      if(currentRole.body.name !== req.body.name){
        const existedName = await RoleServiceInstance.getByName(req.body.name);
        if(existedName.body){
          return res.status(200).send({ success: false, error: 'name already exist' });
        }
        // We only pass the body object, never the req object
        
      }
      const updatedRole = await RoleServiceInstance.update( req.params.id, req.body );
        return res.send( updatedRole );      
    }else{
      return res.status(200).send({ success: false, error: 'role not found' });
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
    const roles = await RoleServiceInstance.paginationViews(page , limit , sort , name );
    return res.send( roles );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deleteRole ( req , res ) {

  try {
    const role = await RoleServiceInstance.delete( req.params.id );
    return res.send( role );
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
    const updatedRole = await RoleServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( updatedRole );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

