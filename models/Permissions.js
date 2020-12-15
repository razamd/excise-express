const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const PermissionsSchema = new Schema(
    {
        name : {
            type: String ,
            required : true ,
            unique : true ,
            min : 2 ,
            max : 255
        },
        action : {
            type : String ,
            required : true ,
            min : 2 ,
            max : 255
        },
        url : {
            type : String , 
            min : 2 ,
            max : 4000
        },
        moduleId : {
            type : Schema.Types.ObjectId,
            ref : 'Module'
        },
        
        active : {
            type : Boolean ,
            default : true ,
            required : true
        }
    } , 
    {timestamps: true}
 );

 PermissionsSchema.plugin(aggregatePaginate);
 PermissionsSchema.plugin(uniqueValidator , { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('Permissions' , PermissionsSchema);