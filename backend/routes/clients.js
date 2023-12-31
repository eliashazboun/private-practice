const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Client = require("../models/clientModel.js");
const auth = require("../middleware/auth.js");

//Get all clients.
router.get("/", auth, async (req, res) => {
  console.log('sup')
  try {
    const clients = await Client.find({}).sort({ last_name: -1 }).select("-password");
    if (clients.length === 0) {
      return res.status(400).json({ msg: "No clients found" });
    }
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ msg: "An error has occured" + err.message });
  }
});

//Get single client by ID.
router.get("/:id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }


  try {
    const client = await Client.findById(req.params.id).select("-password");
    if (!client) {
      return res.status(404).json({ msg: "client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ msg: "Error has occured" + err.message });
  }
});

//Creates new client.
router.post("/", async (req, res) => {
  const { first_name, last_name, birthday, username, password, gender, phone, email } = req.body;

  try {
    const alreadyRegistered = await Client.findOne({ username: username });
    if (alreadyRegistered) return res.status(400).json({ msg: "Email already registered.", status: "notok" });

    const client = await Client.create({
      first_name,
      last_name,
      birthday,
      username,
      password,
      gender,
      phone,
      email,
    });
    res.status(200).json({ msg: "Client created", client: client.email, status: "ok" });
  } catch (err) {
    res.status(400).json({ msg: "Error has occurred" + err.message, status: "notok" });
  }
});

//Add new contact info (email, phone) to client account.
router.post("/addContact/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  try {
    const field = Object.keys(req.body)[0];
    const value = Object.values(req.body)[0];

    const present = await Client.findOne({
      _id: req.params.id,
      [field]: value,
    });

    if (present) {
      return res.status(400).json({ error: "Phone number already on record." });
    } else {
      const client = await Client.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: req.body }, 
        { returnDocument: "after" }, 
        { upsert: true });

      res.status(200).json(client);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/addEmergency/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  const data = req.body

  const client = await Client.findOneAndUpdate(
    { _id: req.params.id }, 
    { $push: data }, 
    { returnDocument: "after" },
    {upsert:true},
    );

  res.status(200).json(client);
});
router.post("/editEmergency/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  
  // const data = {emergency:{firstName: 'Adam', lastName:'Johnson', relationship:'Father', contact:'2524331928'}}

  // const client = await Client.findOneAndUpdate(
  //   { _id: req.params.id }, 
  //   { $push: data }, 
  //   { returnDocument: "after" },
  //   {upsert:true},
  //   );

  res.status(200).json(req.body);
});

//Edit contact info (email, phone) on client account
router.post("/editContact/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  
  const oldValue = Object.values(req.body.prev)[0];
  const field = Object.keys(req.body.prev)[0];

  try{
  const client = await Client.findOneAndUpdate(
      {_id:req.params.id, [field]:oldValue},
      {$set:req.body.updated},
      { returnDocument: "after" })
  res.status(200).json(client)

  }catch(err){
    res.status(400).json(err)

  }
 
  
});


//Remove a contact info (email, phone) from client account.
router.delete("/removeContact/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id }, 
      { $pull: req.body }, 
      { returnDocument: "after" });

    res.status(200).json(client);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Remove Emergency Contact
router.delete("/removeEmergency/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id }, 
      { $pull: req.body }, 
      { returnDocument: "after" });

    res.status(200).json(client);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a client account.
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }

  try {
    //TODO: Need to delete all the appointments associated with client possibly
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(400).json({ msg: "Client not found" });
    }
    res.status(200).json( client );
  } catch (err) {
    res.status(400).json({ msg: "Error has occured : " + err.message });
  }
});

router.patch("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }

  const client = await Client.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

  if (!client) {
    return res.status(400).json({ msg: "Client not found" });
  }

  res.status(200).json(client);
});

module.exports = router;
