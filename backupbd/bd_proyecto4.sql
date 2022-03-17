-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2022 a las 19:54:58
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_proyecto4`
--
CREATE DATABASE IF NOT EXISTS `bd_proyecto4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_proyecto4`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_etiquetas`
--

CREATE TABLE `tbl_etiquetas` (
  `id` int(11) NOT NULL,
  `nom_etiqueta` varchar(45) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_localizacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_etiquetas`
--

INSERT INTO `tbl_etiquetas` (`id`, `nom_etiqueta`, `id_user`, `id_localizacion`) VALUES
(1, 'buenisimo', 2, 1),
(2, 'malisimo', 2, 2),
(3, 'malisimo', 2, 3),
(4, 'regular', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_favoritos`
--

CREATE TABLE `tbl_favoritos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_localizacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_favoritos`
--

INSERT INTO `tbl_favoritos` (`id`, `id_user`, `id_localizacion`) VALUES
(3, 2, 3),
(6, 2, 2),
(7, 2, 1),
(8, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_icono`
--

CREATE TABLE `tbl_icono` (
  `id` int(11) NOT NULL,
  `nombre_icono` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_icono`
--

INSERT INTO `tbl_icono` (`id`, `nombre_icono`) VALUES
(1, 'icono/metro.png'),
(2, 'icono/hotel.png'),
(3, 'icono/mercado.png'),
(4, 'icono/monumento.png'),
(5, 'icono/museo.png'),
(6, 'icono/restaurante.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_juego`
--

CREATE TABLE `tbl_juego` (
  `id` int(11) NOT NULL,
  `pista1` varchar(100) DEFAULT NULL,
  `pista2` varchar(100) DEFAULT NULL,
  `pista3` varchar(100) DEFAULT NULL,
  `verificacion1` varchar(45) DEFAULT NULL,
  `verificacion2` varchar(45) DEFAULT NULL,
  `verificacion3` varchar(45) DEFAULT NULL,
  `num_pregunta` varchar(45) DEFAULT NULL,
  `loc1` varchar(100) DEFAULT NULL,
  `loc2` varchar(100) DEFAULT NULL,
  `loc3` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_juego`
--

INSERT INTO `tbl_juego` (`id`, `pista1`, `pista2`, `pista3`, `verificacion1`, `verificacion2`, `verificacion3`, `num_pregunta`, `loc1`, `loc2`, `loc3`) VALUES
(1, 'EL nombre empieza por K pero sin llevarla, muy emblematico.', 'Donde se compran bocas', 'Palabra que dicen los mexicanos', '0', '0', '0', '1', 'Pla de la Seu, s/n, 08002 Barcelona', 'La Rambla, 91, 08001 Barcelona', 'Carrer Nou de la Rambla, 3-5, 08001 Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_localizaciones`
--

CREATE TABLE `tbl_localizaciones` (
  `id` int(11) NOT NULL,
  `nom_loc` varchar(45) DEFAULT NULL,
  `direccion_loc` varchar(100) DEFAULT NULL,
  `foto_loc` varchar(100) DEFAULT NULL,
  `id_icono` int(11) DEFAULT NULL,
  `descripcion_loc` varchar(200) DEFAULT NULL,
  `tipo_loc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_localizaciones`
--

INSERT INTO `tbl_localizaciones` (`id`, `nom_loc`, `direccion_loc`, `foto_loc`, `id_icono`, `descripcion_loc`, `tipo_loc`) VALUES
(1, 'Drassanes', '08001 Barcelona', 'foto/UnnZduB8Uqkdb16oRQeTC3fJJr4nEMtel39KuVhT.jpg', 1, 'Metro de Drassanes', 'Metro'),
(2, '100 Montaditos Raval', 'Rambla del Raval, 41, 08001 Barcelona', 'foto/pYGj15mxzlHFoJVh1FEBQBH7YJgXCQYtrgz04Nxe.jpg', 6, 'Bar de tapas 100 montaditos situado en la rambla del Raval en Barcelona', 'Restaurante'),
(3, 'Mercado de La Boqueria', 'Carrer la Rambla 91, 08002, El Raval, Barcelona, Catalunya', 'foto/Sk5xvTDn6zTTGg48ILTJcpl7ijRlLIv5LdzXoNQg.jpg', 3, 'Concurrido mercado municipal cubierto muy popular, por sus puestos de carne , verduras, queso y otros alimentos.', 'Mercado'),
(4, 'Carrefour Market', 'Rambla dels Estudis, 113, 08002 Barcelona', 'foto/w8z4i5z4j3qe76UiRsDf2SsZunTUrSJkY2qC79DR.jpg', 3, 'Supermercado de la cadena Carrefour', 'Mercado'),
(5, 'Museu d\'Art Contemporani de Barcelona', 'Plaça dels Àngels, 1, 08001 Barcelona', 'foto/RResJFc1hlKgODcbwgqyuTeu1ixcee6UVQ41d6bK.jpg', 5, 'Información sobre Museu d', 'Museo'),
(6, 'Catedral de Barcelona', 'Pla de la Seu, s/n, 08002 Barcelona', 'foto/UuH7YPic0Jq9jCSbwAm9rskBcD3xsk1W1i3YDAu1.png', 4, 'Información sobre Catedral de BarcelonaImponente catedral gótica con vistas a la ciudad y visitas guiadas; en uno de sus claustros viven ocas.', 'Monumento'),
(7, 'Hotel Quatre Nacions', 'La Rambla, 40, 08002 Barcelona', 'foto/MlSs9o5XD4CxdkvGjxWKIgOejFhQLbxqdYfDjZRA.jpg', 2, 'Este hotel económico se encuentra en el bullicioso paseo de La Rambla, a 3 minutos a pie de la estación de metro de Liceu', 'Hotel'),
(10, 'Hotel Ronda House', 'Carrer de Sant Erasme, 19, 08001 Barcelona', 'foto/viKifrTNXA16sim7LYaiUacn8xXJl4psu3LAA4Vc.jpg', 2, 'Este hotel se encuentra a 2 minutos a pie de la estación de metro más cercana, a 4 del Museo de Arte Contemporáneo de Barcelona y a 14 de la céntrica e imponente plaza de Cataluña.', 'Hotel'),
(11, 'Hotel Ohla Barcelona', 'Via Laietana, 49, 08003 Barcelona', 'foto/OWIsZrVBRUdw2SFAgHov0iYFKq3uPa7yk3PHvnZQ.jpg', 2, 'Este exclusivo hotel, que ocupa un edificio de estilo neoclásico, se encuentra a 2 minutos a pie de la estación de metro de Urquinaona y a 3 km de la Sagrada Familia, la famosa basílica inacabada.', 'Hotel'),
(14, 'Estatua de Colón', 'Plaça Portal de la Pau, s/n, 08001 Barcelona', 'foto/ADyszYtqY1J0vB39kiohOsZUkm2iYqZ6aijTgKcR.jpg', 4, 'Monumento con una estatua de Colón y vistas a la ciudad en la parte superior de una columna corintia de 1888.', 'Monumento'),
(15, 'El Bombón Salsa', '08002, Carrer de la Mercè, 13, 08002 Barcelona', 'foto/lDNaYi3sy7hgiyxAHz6ewhSrl2zlt0JMTYcVAT1U.jpg', 6, 'Bar animado, que sirve mojitos y micheladas, en el que se baila salsa clásica y éxitos modernos de música latina.', 'Restaurante'),
(16, 'Museo Marítimo de Barcelona', 'Av. de les Drassanes, s/n, 08001 Barcelona', 'foto/oZemIJ6hrN2Zpm79xlrVIc6umo7boSaTfkdw8J4e.jpg', 5, 'Puerto medieval con importante museo marítimo que cuenta con la réplica de un galeón, arte, mapas y modelos.', 'Museo'),
(17, 'Antiguo monasterio de San Pau del Campo', 'Carrer de Sant Pau, 99, 08001 Barcelona', 'foto/nZtbMUY0AwonAc0Q7SIW0u6BTGXBRYTcxVOY2Hrv.jpg', 4, 'Monasterio románico con planta en forma de cruz famoso por sus pequeños claustros de elegantes arcos moriscos.', 'Monumento'),
(18, 'Cera 23', 'C. de la Cera, 23, 08001 Barcelona', 'foto/6aOgTLjaROvYL757KnOFY7XmnerwqIF4Vih9Bacq.png', 6, 'Local de estilo rústico que sirve platos españoles creativos con emplatados muy cuidados, como volcán de arroz negro.', 'Restaurante'),
(19, 'Mercer Hotel Barcelona', 'Carrer dels Lledó, 7, 08002 Barcelona', 'foto/uu7NMMWeXwZSYFzeVn2pnk7wKVKxqmTpklzhH3rz.jpg', 2, 'Este exclusivo hotel, que ocupa un edificio histórico, se encuentra en el barrio Gótico, a 3 minutos a pie de la estación de metro de Jaume I y a 500 m del Museo Picasso.', 'Hotel'),
(20, 'Jaume I', '08002 Barcelona', 'foto/eFo1Si7dvi23OIqU6pABQE0pmZ1IddjmyeGB1re8.jpg', 1, 'Metro de Jaume', 'Metro'),
(21, 'St Christopher\'s Inn', 'Carrer de Bergara, 3, 08002 Barcelona', 'foto/XFN4uFelrbJHR1X4T8MaRmMStHfYjQFFAOSu3LMI.jpg', 2, 'Este albergue de moda está situado a 3 minutos a pie de la estación de metro de Catalunya, a 4 minutos a pie de la Plaça de Catalunya', 'Hotel'),
(22, 'Restaurante KFC', 'Pl. de Catalunya, 8, 08007 Barcelona', 'foto/IAQwJ6K5OVAPzxASmjZLoOmKsuHRxUPXTY6Ep3mY.jpg', 6, 'Cadena de restaurantes conocida por los cubos de pollo frito, las alitas y los complementos.', 'Restaurante'),
(23, 'Basílica de la Mercè', 'Carrer de la Mercè, 1, 08002 Barcelona', 'foto/UMS6O7qQ6NTDVkSBzobbFcL265AGGCCI9FLZk9QC.jpg', 4, 'Iglesia del s. XVIII coronada con interiores rococó de lujo y una estatua dedicada a la patrona de la ciudad.', 'Monumento'),
(24, 'Supermarket 24 hour', 'Carrer de la Boqueria, 7, 08002 Barcelona', 'foto/HptYc2kR0aGNeNIvrqI0tYY64GP1dciYB22i8VMm.jpg', 3, 'Tienda de ultramarinos', 'Mercado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_perfiles`
--

CREATE TABLE `tbl_perfiles` (
  `id` int(11) NOT NULL,
  `tipo_perfil` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_perfiles`
--

INSERT INTO `tbl_perfiles` (`id`, `tipo_perfil`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_sala`
--

CREATE TABLE `tbl_sala` (
  `id` int(11) NOT NULL,
  `nom_sala` varchar(45) DEFAULT NULL,
  `contra_sala` varchar(45) DEFAULT NULL,
  `id_creador` int(11) DEFAULT NULL,
  `id_jug2` int(11) DEFAULT NULL,
  `id_jug3` int(11) DEFAULT NULL,
  `estado_sala` varchar(45) DEFAULT NULL,
  `jugadores_sala` varchar(45) DEFAULT NULL,
  `id_juego` int(11) DEFAULT NULL,
  `verificacion1` varchar(45) DEFAULT NULL,
  `verificacion2` varchar(45) DEFAULT NULL,
  `verificacion3` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `mail_usu` varchar(45) DEFAULT NULL,
  `contra_usu` varchar(45) DEFAULT NULL,
  `id_perfil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `mail_usu`, `contra_usu`, `id_perfil`) VALUES
(1, 'Admin@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 1),
(2, 'User@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(3, 'User2@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(4, 'User3@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(5, 'User4@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(6, 'ignasi@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(7, 'danny@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2),
(8, 'sergio@gmail.com', '1fa3356b1eb65f144a367ff8560cb406', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_etiquetas`
--
ALTER TABLE `tbl_etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etiqueta_loc_idx` (`id_localizacion`),
  ADD KEY `etiqueta_user_idx` (`id_user`);

--
-- Indices de la tabla `tbl_favoritos`
--
ALTER TABLE `tbl_favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fav_users_idx` (`id_user`),
  ADD KEY `fav_locali_idx` (`id_localizacion`);

--
-- Indices de la tabla `tbl_icono`
--
ALTER TABLE `tbl_icono`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_juego`
--
ALTER TABLE `tbl_juego`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_localizaciones`
--
ALTER TABLE `tbl_localizaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loc_icono_idx` (`id_icono`);

--
-- Indices de la tabla `tbl_perfiles`
--
ALTER TABLE `tbl_perfiles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sala_host_idx` (`id_creador`),
  ADD KEY `sala_jg2_idx` (`id_jug2`),
  ADD KEY `sala_jg3_idx` (`id_jug3`),
  ADD KEY `sala_juegp_idx` (`id_juego`);

--
-- Indices de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_perfil_idx` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_etiquetas`
--
ALTER TABLE `tbl_etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_favoritos`
--
ALTER TABLE `tbl_favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbl_icono`
--
ALTER TABLE `tbl_icono`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_juego`
--
ALTER TABLE `tbl_juego`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_localizaciones`
--
ALTER TABLE `tbl_localizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tbl_perfiles`
--
ALTER TABLE `tbl_perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_etiquetas`
--
ALTER TABLE `tbl_etiquetas`
  ADD CONSTRAINT `etiqueta_loc` FOREIGN KEY (`id_localizacion`) REFERENCES `tbl_localizaciones` (`id`),
  ADD CONSTRAINT `etiqueta_user` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id`);

--
-- Filtros para la tabla `tbl_favoritos`
--
ALTER TABLE `tbl_favoritos`
  ADD CONSTRAINT `fav_locali` FOREIGN KEY (`id_localizacion`) REFERENCES `tbl_localizaciones` (`id`),
  ADD CONSTRAINT `fav_users` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id`);

--
-- Filtros para la tabla `tbl_localizaciones`
--
ALTER TABLE `tbl_localizaciones`
  ADD CONSTRAINT `loc_icono` FOREIGN KEY (`id_icono`) REFERENCES `tbl_icono` (`id`);

--
-- Filtros para la tabla `tbl_sala`
--
ALTER TABLE `tbl_sala`
  ADD CONSTRAINT `sala_host` FOREIGN KEY (`id_creador`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `sala_jg2` FOREIGN KEY (`id_jug2`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `sala_jg3` FOREIGN KEY (`id_jug3`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `sala_juegp` FOREIGN KEY (`id_juego`) REFERENCES `tbl_juego` (`id`);

--
-- Filtros para la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `users_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `tbl_perfiles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
