const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const RolesSchema = new Schema(
    {
        name : {
            type: String ,
            required : true ,
            min : 6 ,
            max : 255
        },
        displayName : {
            type : String ,
            required : true ,
            min : 4 ,
            max : 255
        },
        description : {
            type : String , 
            min : 6 ,
            max : 4000
        },
        users : [
            {
                type : Schema.Types.ObjectId ,
                ref : "User"
            }
        ],
        permissions : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Permissions'
            }
        ],
        active : {
            type : Boolean ,
            default : true ,
            required : true
        }
    } , 
    {timestamps: true}
 );

 RolesSchema.plugin(aggregatePaginate);
 RolesSchema.plugin(uniqueValidator , { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('Roles' , RolesSchema);