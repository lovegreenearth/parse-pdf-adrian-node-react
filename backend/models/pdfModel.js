const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  bookRef: { 
    type: String, 
    required: true
  },
  content: { 
    type: String 
  },
});

module.exports = Pdf = mongoose.model("pdf", pdfSchema);