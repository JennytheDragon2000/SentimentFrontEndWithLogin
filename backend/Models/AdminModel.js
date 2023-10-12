import mongoose from 'mongoose'

const AdminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:String,
    lastName:String,
    image:String
},
    {timestamps:true}
)

const AdminModel = mongoose.model('Admin', AdminSchema)
export default AdminModel