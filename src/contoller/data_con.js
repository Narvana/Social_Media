const smdata=require('../model/SM_Struc')
 const bcrypt=require('bcryptjs')

const signingIN=async(req,res)=>{
    // try {
    //     const signingUP=new smdata(req.body);
    //     console.log(req.body);
    //     const inserted= await signingUP.save();
    //     res.status(202).send(inserted);
    // } 
    // catch (error) {
    //     res.send(error);
    //     console.log(error);
    // }

    const {name,email,password}=req.body;
    let existingUser;
    try{
        existingUser = await smdata.findOne({email});
    }
    catch(err)
    {
        return console.log(err);
    }
    if(existingUser){
      return res.status(400).send({message:"user already exist"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user=new smdata({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });
    try{
        await user.save();
    }
    catch(err){
        return console.log(err);
    }
    return res.status(201).json({user}); 
}

const userData=async(req,res)=>{
    try {
        Users=await smdata.find()
        res.status(201).json({Users})
        console.log(Users)
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
    }

    const logIN=async(req,res)=>{
        const {email,password}=req.body;
        let existingUser;
         try {
            existingUser=await smdata.findOne({email});
         } catch (err) {
            return console.log(err);
         }
         if(!existingUser){
           return res.status(404).send({message:`Email does not exist`})
         }
         const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
         if(!isPasswordCorrect){
            return res.status(400).send({message:"incorrect password"})
         }
         return res.status(201).send({message:"login successfull"})
    }



module.exports={
    signingIN,
    userData,
    logIN
}
// module.exports=
