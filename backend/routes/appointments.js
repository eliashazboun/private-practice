const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const Client = require('../models/clientModel.js')



router.get('/', async (req,res) => {
        
    try{
        const appointments = await Appointment.find({}).sort({createdAt: -1});
        res.status(200).json(appointments);
    }catch (err) {
        res.status(400).json({error: err.message})
    }
});

router.get('/:id', async (req,res) => {
    try{
        const appointments = await Appointment.find({client_id: req.params.id}).sort({createdAt: -1});

        if (appointments.length === 0){
            return res.status(404).json({msg: 'No appointments for this client.'})
        }

        res.status(200).json(appointments);
        
    }catch (err) {
        res.status(400).json({error: err.message})
    }
});

router.get('/:startTime/:endTime/:date', async (req,res) => {

    const appointments = await Appointment.find({date: req.params.date});

    let flag = false

    if(appointments.length === 0){
        console.log('Hi I just Ran')
        return res.status(404).json({msg: 'No appointments on this day'})
    }

    let incomingStartTime = formatTime(req.params.startTime)
    let incomingEndTime = formatTime(req.params.endTime)
    
    
    appointments.forEach(appointment => {

        const currStartTime = formatTime(appointment.start_time)
        const currEndTime = formatTime(appointment.end_time)

        if (incomingStartTime < currEndTime && incomingEndTime > currStartTime){
            flag = true;
        }
        console.log(currStartTime,currEndTime,incomingStartTime, incomingEndTime)

    });

    if (flag){
        res.status(400).json({msg: 'OVERLAP'})
    }else{
        res.status(200).json({msg: 'No appointment in that timeframe'})
    }
});

router.post('/', async (req,res) => {
    const {title, date, start_time, end_time, client_id } = req.body
    //Creating appointment and linking the appointment id with the Client
    try{
        const appointment = await Appointment.create({title,date,start_time,end_time,client_id})

        const client = await Client.findById(client_id);
        client.appointments.push(appointment._id);

        await client.save();

        res.status(200).json(appointment)
    }catch(err){
        res.status(400).json({error: err.message})
    }
});

router.delete('/:id', async(req,res) => {
    

    const appointment = await Appointment.findOneAndDelete({_id: req.params.id});

    if (!appointment){
        return res.status(404).json({error: 'No appointment found with that id'})
    }
    res.status(200).json(appointment);
});

router.patch('/:id', (req,res) => {
    res.json({msg: 'PATH APPT WITH ID OF : ' + req.params.id})
});

function formatTime(input){
    const [time, modifier] = input.split(' ')

    let [hours, minutes] = time.split(':')

    if(hours==='12'){
        hours='00'
    }

    if (modifier === 'PM'){
        hours = parseInt(hours,10)+12
    }
    return Number(`${hours}${minutes}`);
}


module.exports = router;