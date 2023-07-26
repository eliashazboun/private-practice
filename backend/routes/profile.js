const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Client = require("../models/clientModel.js");

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id).select("-password");
  res.status(200).json(client);
});

router.get("/", async (req, res) => {
  res.status(200);
});

router.get("/contact/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "No such client exists" });
  }

  try {
    const client = await Client.findById(req.params.id).select("-password");
    if (!client) {
      return res.status(404).json({ msg: "client not found" });
    }
    res.status(200).json(client.contact);
  } catch (err) {
    res.status(400).json({ msg: "Error has occured" + err.message });
  }
});

module.exports = router;
