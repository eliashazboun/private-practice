const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js')
const auth = require('../middleware/auth.js')

router.get('/',auth, async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const email = decoded.email
        const user = await Client.findOne({email:email})
        res.json({status:'ok', msg:user})

    }catch(err){
        console.log(err)
        res.json({status: 'notok', msg:err})

    }
    
    
})


module.exports = router;