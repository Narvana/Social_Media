const express=require('express');
const app=express()
const port=process.env.PORT || 5000

require('../src/db/conn')

app.use(express.json())

const route=require('./router/route')
app.use('/api/user',route);

const blog=require('./router/blog')
app.use('/api/blog',blog);

app.listen(port,()=>{
    console.log(`connected to port ${port}`);
})