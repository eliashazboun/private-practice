const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js');

router.get('/:id', async (req,res) => {

    const client = await Client.findById(req.params.id);
    res.status(200).json(client)
})

router.get('/', async (req,res) => {
    res.status(200)
})

module.exports = router;

