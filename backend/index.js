const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const PDFParser = require('pdf-parse');
require("dotenv").config();
const router = express.Router();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('static'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose
mongoose.connect(
  // "mongodb+srv://doadmin:Jg6b280hEY4r59l3@michele-google-map-db-86d40752.mongo.ondigitalocean.com/admin",
  "mongodb://localhost:27017/adrian",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'))
})

// PDF file upload
let fileN;
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    fileN = fileName;
    cb(null, "IMAGE-" + fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("pdf");

const obj = (req, res) => {
  upload(req, res, () => {
    res.send({ fileId: "IMAGE-" + fileN });
  });
}

// Process PDF file
const processPDF = (req, res) => {
  const pdfPath = './public/' + req.body.fileId;

  fs.readFile(pdfPath, (err, data) => {
    if (err) throw err;

    PDFParser(data).then((pdf) => {
      const pdfText = pdf.text;

      res.send({
        text: pdfText.split(/[\.\?!]\s+/),
        wholeText: pdfText
      })
    });
  });
}

app.use("/users", require("./routes/userRouter"));
app.use("/upload", router.post("/", obj));
// app.use("/processPDF", processPDF);
app.use("/processPDF", require("./routes/pdfRouter"));
