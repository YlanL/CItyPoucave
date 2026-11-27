const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../database/pool");

const router = express.Router();

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Identifiants aainvalides" });
    }

    const get_user_text = "SELECT * FROM utilisateur WHERE email = $1";
    const get_user_values = [email.trim().toLowerCase()];

    const get_user_result = await pool.query(get_user_text, get_user_values);
    const user = get_user_result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Identifiants invalides" });
    }

    const valid_password = await bcrypt.compare(password, user.password_hash);

    if (!valid_password) {
      return res.status(400).json({ error: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { userId: user.id_utilisateur },
      process.env.SECRET_KEY,
      { expiresIn: "2h" },
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur de connexion à la base" });
  }
});

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, address, postcode, city, password } =
      req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const text =
      "INSERT INTO utilisateur (nom, prenom, email, ad, cp, ville, password_hash, role_utilisateur) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING nom, prenom, email, ad, cp, ville, role_utilisateur";
    const values = [
      lastName,
      firstName,
      email.trim().toLowerCase(),
      address,
      postcode,
      city,
      password_hash,
      "user", // user par défaut, modif plus tard
    ];

    const result = await pool.query(text, values);

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      utilisateur: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    console.error(error);
    return res.status(500).json({ error: "Erreur de connexion à la base" });
  }
});

module.exports = router;