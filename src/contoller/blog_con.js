const mongoose = require('mongoose');
const Blog=require('../model/SM_blog');
const smdata = require('../model/SM_Struc');

const getBlogs=async(req,res)=>{
   let blogs;
   try {
    blogs= await Blog.find();
   } catch (error) {
    return console.log(error);
   }
   if(!blogs){
    return res.status(404).send({message:"no blog found"})
   }
   return res.status(200).send({blogs});
}

const getBlogsID=async(req,res)=>{
    const id=req.params.id;
    let blog;
    try {
        blog=await Blog.findById(id);
    } catch (error) {
        return console.log(err);
    }
    if(!blog)
    {
        return res.status(400).send({message:"No blog Found"})
    }
    return res.status(201).send({blog})
}

const addBlogs=async(req,res)=>{ 
    const {title,description,image,user}=req.body;
    let existingUser;
    try{

        existingUser=await smdata.findById(user);
    }catch(error)    
    {
        console.log(error);
    }
    if(!existingUser){
        return res.status(500).json({message:"unable to find the USER by this ID"})
    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    });
    // try {
    //     blog.save()
    // } catch (error) {
    //     return res.status(400).send(error)
    // }
    try {
       const session= await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog); 
       await existingUser.save({session})
       await session.commitTransaction();
    } catch (error) {
       console.log(error);
       return res.status(500).json({message: error});
    }
    return res.status(201).send({blog});
   }
   
   const UpdateBlog=async(req,res)=>{
   const {title,description}=req.body
   const blogID=req.params.id;
   let blog
   try {
      blog=await Blog.findByIdAndUpdate(blogID,{
           title,
           description  
       })
    } catch (error) {
        return console.log(error)
    } 
    if(!blog){
        return res.status(500).json({message:"unable to update the Blog"})
    }
    return res.status(201).json({blog})
    }

    const DeleteBlog=async(req,res)=>{
        const id=req.params.id;
        let blog;
        try {
              blog=await Blog.findByIdAndRemove(id)          
        } catch (error) {
            console.log(error)
        }
        if(!blog){
            return res.status(500).json({message:"unable to delete the Blog"})
        }
        return res.status(201).json({message:"Deleted Successfully deleted"}) 
    }
module.exports={
    getBlogs,
    getBlogsID,
    addBlogs,
    UpdateBlog,
    DeleteBlog
}



