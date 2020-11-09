const { createUpdateValidation , paginationValidation } = require("../request-validators/moduleValidation");
const logger = require("../services/Logger");
const ModuleService = require( "../services/ModuleService" );
const ModuleServiceInstance = new ModuleService();

module.exports = { create , findById , getAll , update , paginationViews , deleteModule , updateWithQuery};

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
        return res.status(400).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const createdModule = await ModuleServiceInstance.create( req.body );
    return res.send( createdModule );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const result = await ModuleServiceInstance.findById( req.params.id );
    return res.send( result );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const result = await ModuleServiceInstance.getAll();
    return res.send( result );
  } catch ( error ) {
    console.log(error);
    return res.status( 500 ).json( error );
  }
}

async function update ( req, res ) {
  try {
    const {error} = createUpdateValidation(req.body);
    if(error){
        return res.status(400).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const result = await ModuleServiceInstance.update( req.params.id, req.body );
    return res.send( result );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function paginationViews ( req , res ) {
  
  try {
    const {error} = paginationValidation(req.body);
    if(error){
        return res.status(400).send({ success: false, error: error.details[0].message });
    }
    const page = req.body.page ;
    const limit = req.body.limit;
    const sort = req.body.sort;
    const name = req.body.name;
    console.log(page , limit , sort ,name  );
    const result = await ModuleServiceInstance.paginationViews(page , limit , sort , name );
    return res.send( result );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deleteModule ( req , res ) {

  try {
    const result = await ModuleServiceInstance.delete( req.params.id );
    return res.send( result );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function updateWithQuery ( req, res ) {
  try {
    const {error} = createUpdateValidation(req.body);
    if(error){
        return res.status(400).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const result = await ModuleServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( result );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

