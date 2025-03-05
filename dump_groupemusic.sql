-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 05 mars 2025 à 11:13
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupemusic`
--

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250303015356', '2025-03-03 01:54:26', 26),
('DoctrineMigrations\\Version20250303130308', '2025-03-03 13:06:09', 126),
('DoctrineMigrations\\Version20250303132917', '2025-03-03 13:29:25', 40),
('DoctrineMigrations\\Version20250303141040', '2025-03-03 14:10:48', 34),
('DoctrineMigrations\\Version20250303154458', '2025-03-03 15:45:18', 31),
('DoctrineMigrations\\Version20250303175006', '2025-03-03 17:50:17', 192),
('DoctrineMigrations\\Version20250303192025', '2025-03-03 19:20:32', 135),
('DoctrineMigrations\\Version20250303192059', '2025-03-03 19:21:06', 31),
('DoctrineMigrations\\Version20250303192305', '2025-03-03 19:23:15', 27),
('DoctrineMigrations\\Version20250304144651', '2025-03-04 14:47:06', 104),
('DoctrineMigrations\\Version20250304151041', '2025-03-04 15:11:03', 22),
('DoctrineMigrations\\Version20250304155359', '2025-03-04 15:54:11', 61);

-- --------------------------------------------------------

--
-- Structure de la table `groupe_music`
--

CREATE TABLE `groupe_music` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `origine` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `annee_debut` int(11) NOT NULL,
  `annee_separation` int(11) DEFAULT NULL,
  `fondateurs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`fondateurs`)),
  `membres` int(11) DEFAULT NULL,
  `courant_musical` varchar(255) DEFAULT NULL,
  `presentation` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `groupe_music`
--

INSERT INTO `groupe_music` (`id`, `nom`, `origine`, `ville`, `annee_debut`, `annee_separation`, `fondateurs`, `membres`, `courant_musical`, `presentation`) VALUES
(1, 'The Beatles', 'Royaume-Uni ', 'Liverpool', 1960, 1970, '[\"John Lennon\"]', 4, NULL, 'The Beatles [ðə ˈbiːtəlz] est un quatuor musical britannique originaire de Liverpool, en Angleterre. Le noyau du groupe se forme avec les Quarrymen fondés ...'),
(2, 'Indochine', 'France', 'paris', 1981, NULL, '[\"Nicola Sirkis et Dominique Nicolas\"]', 5, 'pop rock', 'Indochine est un groupe de pop rock français originaire de Paris, formé par Nicola Sirkis et Dominique Nicolas en 1981. Le groupe est issu du courant new wave'),
(3, 'Noir Désir', 'France', 'bordeaux', 1980, 2010, '[\"Bertrand Cantat\"]', 4, 'rock', 'Noir Désir est un groupe de rock français, originaire de Bordeaux, en Gironde. Formé dans les années 1980, et dissout en 2010, il se compose de Bertrand Cantat, Denis Barthe, Serge Teyssot-Gay et Frédéric Vidalenc remplacé par Jean-Paul Roy à partir de 1996'),
(4, 'Nirvana', 'Etats-unis', 'Aberdeen', 1987, 1994, '[\"Kurt Cobain\"]', 3, 'grunge', 'Nirvana est un groupe de grunge américain, originaire d\'Aberdeen, dans l\'État de Washington, formé en 1987 par le chanteur-guitariste Kurt Cobain et le bassiste Krist Novoselic'),
(5, 'Led Zeppelin', 'Royaume-Uni ', 'Londres', 1968, 1980, '[\"Jimmy Page\"]', NULL, 'rock', 'Led Zeppelin [lɛd ˈzɛpələn] est un groupe britannique de rock, originaire de Londres, en Angleterre. Il est fondé en 1968 par Jimmy Page, avec Robert Plant, John Paul Jones et John Bonham, et dissout à la suite de la mort de ce dernier, en 1980'),
(6, 'Depeche Mode', 'Royaume-Uni ', 'Basildon', 1980, NULL, NULL, 3, 'rock', 'Depeche Mode est un groupe britannique de new wave et rock alternatif, originaire de Basildon, dans l\'Essex, en Angleterre. Formé en 1980, le groupe apparait au sein du courant de la synthpop et devient rapidement influent et populaire sur la scène internationale. Son nom provient d\'un magazine français, Dépêche Mode'),
(7, 'Téléphone', 'France', 'Paris', 1976, 1986, NULL, 4, 'rock', 'Téléphone est un groupe de rock français. Il est formé le 12 novembre 1976 et séparé le 21 avril 1986. Composé de Jean-Louis Aubert, Louis Bertignac, Corine Marienneau et Richard Kolinka, il connaît un énorme succès dès ses débuts avec plusieurs tubes et des tournées très populaires'),
(8, 'Massive Attack', 'Royaume-Uni ', 'bristol', 1987, NULL, NULL, NULL, 'Trip hop', 'Massive Attack est un groupe musical britannique, originaire de Bristol, précurseur de la musique trip hop. Il se compose, à l\'origine, de Robert Del Naja, Grant Marshall et Andrew Vowles'),
(9, 'Pink Floyd', 'Royaume-Uni ', 'Londres', 1964, 2014, '[\"Syd Barrett,\"]', 3, 'rock', 'Pink Floyd [pɪŋk flɔɪd] est un groupe britannique de rock originaire de Londres. Le groupe débute avec un premier album de musique psychédélique pour ensuite bifurquer vers le rock progressif. Formé en 1965, il est considéré comme un pionnier et représentant majeur de ces styles musicaux.');

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

CREATE TABLE `salle` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `capacite` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `salle`
--

INSERT INTO `salle` (`id`, `numero`, `capacite`, `description`) VALUES
(35, 45, 50, 'Une salle cosy avec des murs en bois clair et des éclairages tamisés, parfaite pour des concerts acoustique'),
(36, 22, 150, 'Un espace majestueux, avec des rideaux en velours rouge, un plafond haut orné de moulures complexes et des fauteuils en velours confortables'),
(37, 35, 200, 'Avec des lignes épurées, des matériaux comme le béton et le verre, et des éclairages LED dynamiques,'),
(38, 15, 250, 'Une scène en plein air entourée de sièges en gradins, avec un toit rétractable pour s’adapter aux conditions météorologiques'),
(39, 25, 140, 'Un espace lumineux avec des miroirs sur les murs et un parquet en bois clair, conçu pour accueillir des spectacles de danse contemporaine.'),
(40, 90, 210, 'La salle de cabaret allie une atmosphère chaleureuse et feutrée avec des petites tables rondes, des fauteuils confortables et des rideaux en velours.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `groupe_music`
--
ALTER TABLE `groupe_music`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `groupe_music`
--
ALTER TABLE `groupe_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `salle`
--
ALTER TABLE `salle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
