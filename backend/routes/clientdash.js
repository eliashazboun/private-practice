const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth.js");
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js')

router.get('/', async (req,res) => {
    res.json({msg:'Hello there'})
})

router.get('/me', auth, async (req,res) => {
    //Removed temporarily to set specific client on client page
    // const {id} = req.decoded
    const id = '64d97c3fd432de6ed08e7a77'
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No such client exists" });
    }
    try{
        const client = await Client.findById(id).select("-password");

        if(!client){
            res.status(404).json({msg:'No client found'})
        }

        res.status(200).json(client)
        
    }catch(err){
        res.status(400).json(err)
    }
})


module.exports = router;