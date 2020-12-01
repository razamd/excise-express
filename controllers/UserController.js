const { registrationValidation, updateValidation, paginationValidation } = require("../request-validators/userValidation");
const UserService = require( "../services/UserService" );
const UserServiceInstance = new UserService();

module.exports = { createCord , findById , getAll , update , paginationViews , deleteUser , updateWithQuery , findWithPermsById};

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function createCord ( req, res ) {
  try {
    const {error} = registrationValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const createdCord = await UserServiceInstance.create( req.body );
    return res.send( createdCord );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findById ( req , res ) {

  try {
    const user = await UserServiceInstance.findById( req.params.id );
    return res.send( user );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function getAll ( req , res ) {

  try {
    const users = await UserServiceInstance.getAll();
    return res.send( users );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function update ( req, res ) {
  try {
    const {error} = updateValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const updatedUser = await UserServiceInstance.update( req.params.id, req.body );
    return res.send( updatedUser );
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
    const email = req.body.email;
    console.log(page , limit , sort ,name ,email );
    const users = await UserServiceInstance.paginationViews(page , limit , sort , name , email);
    return res.send( users );
  } catch ( err ) {
    console.log(err);
    res.status( 500 ).send( err );
  }
 
}

async function deleteUser ( req , res ) {

  try {
    const user = await UserServiceInstance.delete( req.params.id );
    return res.send( user );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function updateWithQuery ( req, res ) {
  try {
    const {error} = updateValidation(req.body);
    if(error){
        return res.status(200).send({ success: false, error: error.details[0].message });
    }
    // We only pass the body object, never the req object
    const updatedUser = await UserServiceInstance.updateWithQuery( req.params.id, req.body );
    return res.send( updatedUser );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

async function findWithPermsById ( req , res ) {

  try {
    const user = await UserServiceInstance.findByIdWithPermissions( req.params.id );
    return res.send( user );
  } catch ( err ) {
    res.status( 500 ).send( err );
  }
}

