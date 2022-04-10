const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  serverID: { type: String, require: true, unique: true },
  channelDel: { type: String, require: true },
  msgDel: { type: String, require: true }

});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;