const jwt = require("jsonwebtoken");

// Middleware Express : vérifie le JWT et place le payload dans req.user
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "La vérification du token a échoué" });
  }
}

module.exports = { verifyToken };