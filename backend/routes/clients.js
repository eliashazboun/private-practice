const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Client = require('../models/clientModel.js')


router.get('/', async (req,res) => {
    try{
        const clients = await Client.find({}).sort({last_name:-1}).select('-password');
        if (clients.length === 0){
            return res.status(400).json({msg: 'No clients found'})
        }
        res.status(200).json(clients)
    }catch (err) {
        res.status(400).json({msg: 'An error has occured' + err.message})
    }

});

router.get('/:id', async (req,res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({msg: 'No such client exists'})
    }

    try{
        const client = await Client.findById(req.params.id).select('-password');
        if (!client){
            return res.status(404).json({msg: 'client not found'})
        }
        res.status(200).json(client);
    }catch (err){
        res.status(400).json({msg: "Error has occured" + err.message})
    }
    
});

router.post('/', async (req,res) => {
    
    const {first_name,last_name, birthday, phone, email, password, gender} = req.body

    try{
        const alreadyRegistered = await Client.findOne({email:email})
        if (alreadyRegistered) return res.status(400).json({msg:"Email already registered.", status:'notok'})

        const client = await Client.create({first_name,last_name, birthday, phone, email, password,gender});
        res.status(200).json({msg: "Client created", client:client.email, status: 'ok'})
    }catch(err){
        res.status(400).json({msg: "Error has occurred" + err.message, status:'notok'})
    }

})

router.delete('/:id', async (req,res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({msg: 'No such client exists'})
    }

    try{
        //TODO: Need to delete all the appointments associated with client possibly
        const client = await Client.findByIdAndDelete(req.params.id);
    
        if(!client){
            return res.status(400).json({msg:"Client not found"})
        }
        res.status(200).json({client})
    }catch (err){
        res.status(400).json({msg: 'Error has occured : '+ err.message })
    }

});

router.patch('/:id', async (req,res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({msg: 'No such client exists'})
    }
    
    const client = await Client.findOneAndUpdate({_id:req.params.id}, {
        ...req.body
    })

    if(!client){
        return res.status(400).json({msg:"Client not found"})
    }

    res.status(200).json(client);
});


module.exports = router;