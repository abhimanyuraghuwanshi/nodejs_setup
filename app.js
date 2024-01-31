const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userroutes = require("./routes/userrouter");
const adminroutes = require("./routes/adminrouter");
const morganBody = require("morgan-body");
const rfs = require("rotating-file-stream");
const path = require("path");

const app = express();
const apiRouter = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const loggerStream = rfs.createStream("access_.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logrecords"),
});
morganBody(app, { noColors: true, stream: loggerStream });

app.get("/", function (req, res) {
  res.send("node is running");
});

apiRouter.use("/user", userroutes);
apiRouter.use("/authadmin", adminroutes);
app.use("/version1", apiRouter);

if (module === require.main) {
  let server = app.listen(process.env.PORT || 5029, function (err) {
    if (!err) {
      const port = server.address().port;
      console.log("Server is Successfully Running on ", port);
    } else {
      console.log("Error occurred, server can't start", err);
    }
  });
}
