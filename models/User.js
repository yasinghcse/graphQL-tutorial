const { model, Schema } = require("mongoose");

const userSchmea = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model("User", userSchmea);
