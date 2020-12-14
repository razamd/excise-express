const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema(
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
        dob : {
            type : Date 
        },
        salary : {
            type : Number 
        },
        empNo : {
            type : String 
        },
        address : {
            type : String , 
            min : 6 ,
            max : 4000
        },
        rank : {
            type : String , 
            min : 6 ,
            max : 4000
        },
        departmentId : {
            type : Schema.Types.ObjectId,
            ref : 'Department'
        },
        active : {
            type : Boolean ,
            default : true ,
            required : true
        }
        
    } , 
    {timestamps: true}
 );

 EmployeeSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Employee' , EmployeeSchema);