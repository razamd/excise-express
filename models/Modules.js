const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const ModuleSchema = new Schema(
    {
        name : {
            type: String ,
            required : true ,
            min : 6 ,
            max : 255
        },
        description : {
            type : String , 
            min : 6 ,
            max : 4000
        },
        active : {
            type : Boolean ,
            default : true ,
            required : true
        }
    } , 
    {timestamps: true}
 );

 ModuleSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Module' , ModuleSchema);