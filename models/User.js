const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Roles = require('./Roles');
const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String ,
            required : true ,
            min : 6 ,
            max : 255
        },
        username : {
            type : String ,
            required : true ,
            min : 4 ,
            max : 255
        },
        email : {
            type : String , 
            required : true ,
            min : 6 ,
            max : 255
        },
        password : {
            type : String ,
            required : true ,
            min : 6 ,
            max : 1024
        },
        roleId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Roles"
        },
        active : {
            type : Boolean ,
            default : true ,
            required : true
        }
    } , 
    {timestamps: true}
 );

 UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('User' , UserSchema);