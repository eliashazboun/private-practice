const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken')

router.get('/', (req,res) => {
    res.json({message : "Hello I am the login page"})
})

router.post('/', async (req,res) => {

    const user = await Client.findOne({
        username:req.body.email,
        password:req.body.password
    })
    if (user){
        const token = jwt.sign({
            name: user.first_name,
            id: user._id,
            isAdmin:user.isAdmin

        },process.env.JWT_SECRET)
        return res.json({token:token})
    }else{
        return res.status(400).json({msg:'User not found, please check credentials',status:'notok'})
    }
})

module.exports = router;