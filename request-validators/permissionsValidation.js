const Joi = require('@hapi/joi');
//Validation 



const createUpdateValidation = data => {
    const schema = Joi.object({
        name : Joi.string().
        min(2)
        .required(),
        action : Joi.string().
        min(2)
        .required(),
       
        url : Joi.string(),
        moduleId : Joi.string().allow(null, '')

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

