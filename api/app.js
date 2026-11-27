const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

app.use(express.json()); // avant les routers
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");

//déclaration des router utilisés dans les fichiers des routes

app.use("/", indexRouter);
app.use("/", userRouter);

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});