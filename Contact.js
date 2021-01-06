const mongoose = require("mongoose");
const { Schema,model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: "string",
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: "string",
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: "string",
    required: true,
    trim: true,
    minLength: 9,
    maxLength: 16,
  },
});
const Contact = model("Contact", contactSchema);

module.exports = Contact;
