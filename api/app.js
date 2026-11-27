const express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");

//déclaration des router utilisés dans les fichiers des routes

app.use("/", indexRouter);
app.use("/", userRouter);

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

