const mongoose=require('mongoose');

const smSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}]
})

const smdata = new mongoose.model('smdata',smSchema)
module.exports=smdata
