import { pool } from "../services/pool";
const jwt = require("jsonwebtoken");
export async function POST(request: Request) {
  try {
    const bcrypt = require("bcryptjs");

    const { email, password } = await request.json();

    const get_user_text = "SELECT * FROM utilisateur WHERE email = $1";
    const get_user_values = [email];

    const get_user_result = await pool.query(get_user_text, get_user_values);
    const user = get_user_result.rows[0];

    if (!user) {
      return Response.json(
        { error: "Identifiants invalides" },
        { status: 400 },
      );
    }

    const valid_password = await bcrypt.compare(password, user.password_hash);

    if (!valid_password) {
      return Response.json(
        { error: "Identifiants invalides" },
        { status: 400 },
      );
    }

    const token = jwt.sign(
      { userId: user.id_utilisateur },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      },
    );
    return Response.json({ token });
  } catch (error: any) {
    return Response.json(
      { error: "Erreur de connexion à la base" },
      { status: 500 },
    );
  }
}

export function verifyToken(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return Response.json({ error: "Token manquant" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    return Response.json(
      { error: "La vérification du token a échoué" },
      { status: 401 },
    );
  }
}
