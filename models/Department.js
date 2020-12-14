const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const DepartmentSchema = new Schema(
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
        },
        employees : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Employee'
            }
        ]
    } , 
    {timestamps: true}
 );

 DepartmentSchema.plugin(aggregatePaginate);
 //DepartmentSchema.plugin(uniqueValidator , { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('Department' , DepartmentSchema);