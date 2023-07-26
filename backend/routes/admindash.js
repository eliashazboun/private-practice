const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js')
const auth = require('../middleware/auth.js')

router.get('/',auth, async (req,res) => {
    const user = req.decoded
    res.status(200).json({user: user})
    
})


module.exports = router;