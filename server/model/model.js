const mongoose = require("mongoose");

//This is a Node.js module that exports a Mongoose schema for a "post" model. The module first imports the "mongoose" library. The schema is created using the "mongoose.Schema" method which takes an object as a parameter. This object defines the structure of the "post" model and its associated fields, such as "name", "title", "subheading", and "content". Each field has a type and is marked as required. The "mongoose.model" method is then used to create a new model named "postdb" with the specified schema. Finally, the "postdb" model is exported to be used by other modules in the application.//

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const postdb = mongoose.model("postdb", schema);

module.exports = postdb;
