const express = require("express");
const multer = require("multer");
const Property = require("./models/Property");
var path = require('path')
const app = express();
const PORT = process.env.PORT || 4000;
var bodyParser = require("body-parser");

const cors = require("cors");


app.use(express.static(__dirname));
app.use(express.static("../public"));
app.use(express.static("../build"));

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const Users = require("./routers/Users");

app.use("/users", Users.users);
app.use("/refresh-tokens", Users.refreshToken);

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './server/uploads')
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() +'-' +file.originalname)
  }
})
 


app.put("/upload",multer({storage}).array('files[]', 4), (req, res) => {
    if(req.files === null){
        return res.status(400).json({msg: "No file uploaded"})
    }
      return res.send(req.files)
});

app.post("/upload-property",multer({storage}).array('files[]', 4), (req, res) => {
  if(req.body === null && req.files ===null){
      return res.status(400).json({msg: "No file uploaded"})
  }
  const today = new Date();
  const propertyData = {
    typeProperty: req.body.typeProperty,
    Street: req.body.Street,
    House: req.body.House,
    Apartaments: req.body.Apartaments,
    countApartment: req.body.countApartment,
    Space: req.body.Space,
    Place: req.body.Place,
    Title: req.body.Title,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    img_url: req.body.img_url,
    phone: req.body.phone,
    sketch3D:req.body.sketch3D,
    uploadedFile: req.files,
    created: today
  };
  console.log(propertyData)

  Property.create(propertyData)
    
    return res.send("lol")
});

app.get("/getProperty", (req, res) => {
  Property.find().then(resdata => {
    if (resdata) {
      return res.send(resdata);
    } else return console.log("there is no such user ");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.listen(PORT, () => {
  return console.log("Server has been started...");
});
