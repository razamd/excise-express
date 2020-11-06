const Joi = require('@hapi/joi');
//Validation 



const updateValidation = data => {
    const schema = Joi.object({
        name : Joi.string().
        min(6)
        .required(),
        username : Joi.string().
        min(4)
        .required(),
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        password : Joi.string(),
        roleId : Joi.string()
    });
    return schema.validate(data);
}

const registrationValidation = data => {
    const schema = Joi.object({
        name : Joi.string().
        min(6)
        .required(),
        username : Joi.string()
        .min(4)
        .required(),
        email : Joi.string()
        .min(6)
        .required()
        .email(),
        password : Joi.string()
        .min(6)
        .required(),
        roleId : Joi.string()
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username : Joi.string()
        .min(4)
        .required(),
        password : Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
}

const paginationValidation = data =>{
    const schema = Joi.object({
        page : Joi.number()
        .required(),
        limit : Joi.number().integer().required(),
        sort : Joi.object(),
        name : Joi.string().allow(null, ''),
        email : Joi.string().allow(null, '')
    });
    return schema.validate(data);
}

module.exports = {
    updateValidation,
    registrationValidation,
    loginValidation,
    paginationValidation
  };

