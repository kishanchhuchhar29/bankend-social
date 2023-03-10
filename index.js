const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");
const path=require("path");
// dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connecation to mongo")
});

//middleway
app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log("heyy")
    try {
        return res.status(200).json("file upaloaded successfully");

    } catch (err) {
        console.log(err);
    }
})

app.listen(8800, () => {
    console.log("bankend Server is here")
})