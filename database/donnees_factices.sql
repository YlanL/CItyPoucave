-- Données factices CityPoucave (PostgreSQL)
-- À exécuter UNE fois, après schema.sql, sur une base aux tables VIDES.
-- En cas d'erreur, rien n'est enregistré (BEGIN ... COMMIT).
-- Les mots de passe sont bidons : ces comptes ne permettent pas de se connecter.
BEGIN;

INSERT INTO utilisateur (id_utilisateur, nom, prenom, email, ad, cp, ville, password_hash, role_utilisateur)
SELECT i,
  (ARRAY['Martin','Bernard','Dubois','Thomas','Robert','Petit','Durand','Leroy','Moreau','Simon'])[1 + (i-1) % 10],
  (ARRAY['Emma','Lucas','Chloé','Hugo','Léa','Nathan','Manon','Théo','Sarah','Louis','Inès'])[1 + (i-1) % 11],
  'user' || i || '@example.com',
  i || ' rue des Exemples', '20250', 'Corte', 'hash_factice',
  CASE WHEN i <= 2 THEN 'admin' ELSE 'utilisateur' END
FROM generate_series(1, 30) AS i;

INSERT INTO type_anomalie (id_tp_ano, lib_tp_ano) VALUES
 (1,'Nid-de-poule'),(2,'Lampadaire en panne'),(3,'Dépôt sauvage'),
 (4,'Panneau endommagé'),(5,'Fuite d''eau'),(6,'Arbre tombé');

INSERT INTO categorie_intervenant (id_categorie_intervenant, lib_categorie_intervenant) VALUES
 (1,'Voirie'),(2,'Éclairage public'),(3,'Propreté'),(4,'Eau'),(5,'Espaces verts');

INSERT INTO intervenant (id_intervenant, lib_int, ad_int, cp_int, email_int, ville_int, password_hash, id_categorie_intervenant)
SELECT i, 'Service factice ' || i, i || ' avenue des Tests', '20250',
  'intervenant' || i || '@example.com', 'Corte', 'hash_factice', 1 + (i-1) % 5
FROM generate_series(1, 10) AS i;

INSERT INTO secteur (id_secteur, lib_secteur) VALUES
 (1,'Centre'),(2,'Nord'),(3,'Sud'),(4,'Est'),(5,'Ouest');

INSERT INTO itineraire_usuel (id_iti, date_ajout, date_dernier_util, rempli_par_user, id_utilisateur)
SELECT i, now() - interval '60 days', now() - random() * interval '30 days', i % 2 = 0, i + 2
FROM generate_series(1, 20) AS i;

-- 5 points par itinéraire
INSERT INTO point_gps (id_pt_gps, lat_pt_gps, long_pt_gps, id_iti)
SELECT i,
  round((42.30 + random() * 0.02)::numeric, 6),
  round((9.14 + random() * 0.02)::numeric, 6),
  1 + (i-1) / 5
FROM generate_series(1, 100) AS i;

-- 50 anomalies, dont 30 affectées à un intervenant
INSERT INTO anomalie (id_anomalie, latitude, longitude, nb_downvote, nb_upvote, date_ajout, date_affectation, id_tp_ano, id_intervenant)
SELECT i,
  round((42.30 + random() * 0.02)::numeric, 6),
  round((9.14 + random() * 0.02)::numeric, 6),
  floor(random() * 5)::int, floor(random() * 20)::int,
  now() - interval '10 days' - random() * interval '30 days',
  CASE WHEN i <= 30 THEN now() - interval '8 days' END,
  1 + (i-1) % 6,
  CASE WHEN i <= 30 THEN 1 + (i-1) % 10 END
FROM generate_series(1, 50) AS i;

-- qui a signalé chaque anomalie
INSERT INTO renseigner (id_utilisateur, id_anomalie, image_path, remarque, date_ajout)
SELECT 3 + (id_anomalie % 28), id_anomalie, 'images/anomalie_' || id_anomalie || '.jpg',
  'Signalement de test', date_ajout
FROM anomalie;

INSERT INTO moderation_admin (id_moderation, id_utilisateur_admin, id_anomalie, remarque_inter)
SELECT i, 1 + i % 2, i * 5, 'Vérification de test'
FROM generate_series(1, 10) AS i;

-- 15 anomalies résolues, par l'intervenant qui leur est affecté
INSERT INTO resoudre (id_resoudre, id_anomalie, id_intervenant, rq_resolution, date_resolution, image_resolution)
SELECT id_anomalie, id_anomalie, id_intervenant, 'Réparation effectuée',
  now() - random() * interval '7 days', 'images/resolution_' || id_anomalie || '.jpg'
FROM anomalie WHERE id_anomalie <= 15;

INSERT INTO intervenir (id_intervenant, id_secteur)
SELECT i, 1 + (i-1) % 5 FROM generate_series(1, 10) AS i;

-- 4 points par secteur
INSERT INTO constituer (id_secteur, id_pt_gps)
SELECT 1 + (i-1) / 4, i FROM generate_series(1, 20) AS i;

-- remet les compteurs d'identifiants à la bonne valeur pour l'appli
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT table_name, column_name FROM information_schema.columns
           WHERE table_schema = current_schema() AND is_identity = 'YES'
             AND table_name IN ('utilisateur','type_anomalie','categorie_intervenant','intervenant','secteur',
                                'itineraire_usuel','point_gps','anomalie','moderation_admin','resoudre')
  LOOP
    EXECUTE format('SELECT setval(pg_get_serial_sequence(%L, %L), (SELECT max(%I) FROM %I))',
                   r.table_name, r.column_name, r.column_name, r.table_name);
  END LOOP;
END $$;

COMMIT;
