const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js')

router.get('/', async (req,res) => {
    
    res.json({msg:'Hello there'})


    
    
})


module.exports = router;