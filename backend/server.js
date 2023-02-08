const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const dotenv = require("dotenv");
const path = __dirname + "/build/";

dotenv.config();


// MongoDB
mongoose
  .connect("mongodb+srv://Aniket2971:Aniket@2971@cluster0.hbosghe.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/project", require("./routes/projectRoutes"));
app.use("/application", require("./routes/applicationRoutes"));


app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

app.get("/*", function (req, res) {
  res.sendFile(path + "index.html");
});
