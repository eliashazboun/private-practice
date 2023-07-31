const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Appointment = require("../models/appointmentModel");
const Client = require("../models/clientModel.js");

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      client_id: req.params.id,
    }).sort({ createdAt: -1 });

    if (appointments.length === 0) {
      return res.status(404).json({ msg: "No appointments for this client." });
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, date, start_time, end_time, client_id } = req.body;
  try {
    const appointments = await Appointment.find({ date: date });

    let flag = false;
    const incomingStartTime = formatTime(start_time);
    const incomingEndTime = formatTime(end_time);

    if (appointments.length !== 0) {
      appointments.forEach((appointment) => {
        const currStartTime = formatTime(appointment.start_time);
        const currEndTime = formatTime(appointment.end_time);
        if (
          incomingStartTime < currEndTime &&
          incomingEndTime > currStartTime
        ) {
          flag = true;
        }
      });
    }

    if (flag) {
      res.status(400).json({ msg: "overlap" });
    } else {
      const appointment = await Appointment.create({
        title,
        date,
        start_time,
        end_time,
        client_id,
      });

      const client = await Client.findById(client_id);
      client.appointments.push(appointment._id);

      await client.save();

      res.status(200).json(appointment);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: req.params.id,
  });

  if (!appointment) {
    return res.status(404).json({ error: "No appointment found with that id" });
  }
  res.status(200).json(appointment);
});

router.patch("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such appointment exists" });
  }
  const {start_time,end_time,date} = req.body
 
  try{
    const appointments = await Appointment.find({ date: date, _id: {$ne:req.params.id} });
    console.log(appointments)

    let flag = false;

    const incomingStartTime = formatTime(start_time);
    const incomingEndTime = formatTime(end_time);

    if (appointments.length !== 0) {
      appointments.forEach((appointment) => {
        if (appointment._id === req.params.id){
          return;
        }
        const currStartTime = formatTime(appointment.start_time);
        const currEndTime = formatTime(appointment.end_time);
        if (
          incomingStartTime < currEndTime &&
          incomingEndTime > currStartTime
        ) {
          flag = true;
        }
      });
    }

    if (flag) {
      res.status(400).json({ msg: "overlap" });
    }else{
      const updatedAppointment = await Appointment.findOneAndUpdate(
        {_id:req.params.id},
        {$set:req.body},
        {returnDocument:'after'})
      res.status(200).json(updatedAppointment)

    }

  
  }catch(err){
    res.status(400)
  }
});

function formatTime(input) {
  const [time, modifier] = input.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }
  return Number(`${hours}${minutes}`);
}



module.exports = router;
