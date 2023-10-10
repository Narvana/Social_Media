const express=require('express')



const router=new express.Router();


const datacon=require('../contoller/data_con')


router.post('/signUP',datacon.signingIN)

router.post('/login',datacon.logIN)

router.get('/getUser',datacon.userData)



module.exports=router;