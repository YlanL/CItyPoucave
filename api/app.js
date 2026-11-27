const express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const indexRouter = require("./routes/index.js");

//déclaration des router utilisés dans les fichiers des routes

app.use("/", indexRouter);

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
