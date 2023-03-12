const Mongoose = require("mongoose")
const employeeSchema = new Mongoose.Schema(
    
 {
 name:String,
 location:String,
 position:String,
 salary:Number
}
    
)

const employeeModel = Mongoose.model(
    "employees", employeeSchema
)

module.exports = employeeModel;