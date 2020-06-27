const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const uuid = require("uuid/v4")
const multerS3 = require("multer-s3");
const Property = require("./models/Property");
var path = require("path");
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
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const Users = require("./routers/Users");

app.use("/users", Users.users);
app.use("/refresh-tokens", Users.refreshToken);

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "3s9SdIPgXWUvTu6uYTiUcHFi6nFPp9CeWRkJtFaC",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIAIEQXDQHU5PK6S3VA",
  region: "eu-north-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET || "test-bucket-10325",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/upload-property", upload.array("files[]", 10), (req, res) => {
  if (req.body === null && req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const today = new Date();
  const propertyData = {
    typeProperty: req.body.typeProperty,
    Street: req.body.Street,
    House: req.body.House,
    Apartaments: req.body.Apartaments,
    fulladdres: `${req.body.Street} ${req.body.House} ${req.body.Apartaments}`,
    countApartment: req.body.countApartment,
    Space: req.body.Space,
    Place: req.body.Place,
    Title: req.body.Title,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    img_url: req.body.img_url,
    phone: req.body.phone,
    sketch3D: req.body.sketch3D,
    video: req.body.video,
    uploadedFile: req.files,
    userId: req.body.userId,
    status: "Продается",
    created: today,
  };
  Property.create(propertyData);

  return res.send("lol");
});

app.get("/getProperty", (req, res) => {
  if (req.query.propertyType == "Прочее") {
    Property.find({
      typeProperty: {
        $in: ["Торговое помещение", "Складское помещение", "Готовый бизнес"],
      },
    }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else if (req.query.propertyType == "Офис") {
    Property.find({ typeProperty: "Офисное помещение" }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else if (req.query.propertyType == "Дом") {
    Property.find({
      typeProperty: { $in: ["Дом", "Часть Дома", "Таунхаус", "Дуплекс"] },
    }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
        return res.send(resdata);
      } else return console.log("there is no such user ");
    });
  } else
    Property.find({ typeProperty: req.query.propertyType }).then((resdata) => {
      if (resdata) {
        console.log(resdata);
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
