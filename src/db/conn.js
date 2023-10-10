const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Api_SocialMedia")
.then(()=>{
    console.log('connection successful');
})
.catch(()=>{
    console.log('no connection')
})

module.exports=mongoose;