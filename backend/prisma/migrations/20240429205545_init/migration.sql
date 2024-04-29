-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(15) NOT NULL,
    `contrasena` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `fechaNac` DATETIME(3) NOT NULL,
    `fotoPerfil` TINYBLOB NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
