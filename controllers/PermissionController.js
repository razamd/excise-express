const { createUpdateValidation , paginationValidation } = require("../request-validators/permissionsValidation");
const logger = require("../services/Logger");
const PermissionService = require( "../services/PermissionService" );
const PermissionServiceInstance = new PermissionService();

module.exports = { create , findById , getAll , update , paginationViews , deletePermission , updateWithQuery};

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
    const createdPermission = await PermissionServiceInstance.create( req.body );
    return res.send( createdPermission );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const permission = await PermissionServiceInstance.findById( req.params.id );
    return res.send( permission );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const permissions = await PermissionServiceInstance.getAll();
    return res.send( permissions );
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
    // We only pass the body object, never the req object
    const result = await PermissionServiceInstance.update( req.params.id, req.body );
    return res.send( result );
  } catch ( err ) {
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
    const result = await PermissionServiceInstance.paginationViews(page , limit , sort , name );
    return res.send( result );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deletePermission ( req , res ) {

  try {
    const result = await PermissionServiceInstance.delete( req.params.id );
    return res.send( result );
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
    const result = await PermissionServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( result );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

