const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: process.env.PGHOST || '127.0.0.1',
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE || 'Projet_SAE',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD,
    connectionTimeoutMillis: 5000,
  });
  let connected = false;

  try {
    await client.connect();
    connected = true;

    const { rows: connectionRows } = await client.query(
      'SELECT current_database() AS database, current_user AS user'
    );
    console.log('Connexion réussie :', connectionRows[0]);

    const { rows: users } = await client.query(
      'SELECT * FROM utilisateur LIMIT 20'
    );
    console.log(`Utilisateurs récupérés : ${users.length}`);
    console.table(users);
  } catch (error) {
    console.error('Échec de la connexion ou de la récupération PostgreSQL :', error.message);
    process.exitCode = 1;
  } finally {
    if (connected) {
      await client.end();
    }
  }
}

main().catch((error) => {
  console.error('Erreur lors de la fermeture PostgreSQL :', error.message);
  process.exitCode = 1;
});