const Joi = require('@hapi/joi');
//Validation 



const createUpdateValidation = data => {
    const schema = Joi.object({
        name : Joi.string().
        min(2)
        .required(),
        description : Joi.string().
        min(2),
        dob : Joi.date().allow(null , ""),
        salary : Joi.number().allow(null , ""),
        empNo : Joi.string().allow(null , ""),
        address : Joi.string().allow(null , ""),
        rank : Joi.string().allow(null , ""),
        departmentId : Joi.string().allow(null , "")
    });
    return schema.validate(data);
}


const paginationValidation = data =>{
    const schema = Joi.object({
        page : Joi.number()
        .required(),
        limit : Joi.number().integer().required(),
        sort : Joi.object(),
        name : Joi.string().allow(null, '')
    });
    return schema.validate(data);
}

module.exports = {
    createUpdateValidation,
    paginationValidation
  };

