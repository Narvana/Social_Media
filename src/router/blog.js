const express=require('express');

const blogRouter=express.Router();

const blog=require('../contoller/blog_con')

blogRouter.get("/ViewBlogs",blog.getBlogs)
blogRouter.get("/ViewBlogs/:id",blog.getBlogsID)
blogRouter.post("/AddBlogs",blog.addBlogs)
blogRouter.put("/UpdateBlog/:id",blog.UpdateBlog)
blogRouter.delete("/DeleteBlog/:id",blog.DeleteBlog)
module.exports=blogRouter