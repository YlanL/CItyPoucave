import { pool } from "../services/pool";

export async function POST(request: Request) {
  try {
    const bcrypt = require("bcryptjs");

    const { firstName, lastName, email, address, postcode, city, password } =
      await request.json();
    const password_hash = await bcrypt.hash(password, 10);
    const text =
      "INSERT INTO utilisateur (nom, prenom, email, ad, cp, ville, password_hash, role_utilisateur) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING nom, prenom, email, ad, cp, ville, role_utilisateur";
    const values = [
      lastName,
      firstName,
      email,
      address,
      postcode,
      city,
      password_hash,
      "user", //user par defaut modif plus tard
    ];
    const result = await pool.query(text, values);
    return Response.json(
      { message: "Utilisateur créé avec succès", utilisateur: result.rows[0] },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "23505") {
      return Response.json({ error: "Email déjà utilisé" }, { status: 409 });
    }

    return Response.json(
      { error: "Erreur de connexion à la base" },
      { status: 500 },
    );
  }
}
