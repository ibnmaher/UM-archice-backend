const express = require("express");
const app = express();
const cors = require("cors");

const httpServer = require("http").createServer(app);
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandle = require("./middlewares/errorHandle");

const { refresh } = require("./middlewares/refresh");
const path = require("path");
const Auth = require("./middlewares/auth");
const fs = require("fs");
const { sendEmailNotification } = require("./middlewares/emailNoti");

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/refresh", refresh);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/admin", Auth, adminRoutes);
app.use(errorHandle);

httpServer.listen(5000);
