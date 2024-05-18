-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(15) NOT NULL,
    `contrasena` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `fotoPerfil` BLOB NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comunidad` (
    `id_comunidad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,
    `descripcion` VARCHAR(45) NOT NULL,
    `fotoComunidad` BLOB NULL,
    `FKUsuario` INTEGER NOT NULL,

    INDEX `FK_UsuarioCreador`(`FKUsuario`),
    PRIMARY KEY (`id_comunidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publicacion` (
    `id_publicacion` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(30) NOT NULL,
    `texto` VARCHAR(100) NULL,
    `imagen` BLOB NULL,
    `link` VARCHAR(30) NULL,
    `FKUsuario` INTEGER NOT NULL,
    `FKComunidad` INTEGER NOT NULL,

    INDEX `FK_UsuarioPost`(`FKUsuario`),
    INDEX `FK_ComunidadPost`(`FKComunidad`),
    PRIMARY KEY (`id_publicacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `miembros` (
    `id_miembro` INTEGER NOT NULL AUTO_INCREMENT,
    `FKUsuario` INTEGER NOT NULL,
    `FKComunidad` INTEGER NOT NULL,

    INDEX `FK_UsuarioMiembro`(`FKUsuario`),
    INDEX `FK_ComunidadElegida`(`FKComunidad`),
    PRIMARY KEY (`id_miembro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tema` (
    `id_tema` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreTema` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_tema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interesesComunidad` (
    `id_interes` INTEGER NOT NULL AUTO_INCREMENT,
    `FKComunidad` INTEGER NOT NULL,
    `FKTema` INTEGER NOT NULL,

    INDEX `FK_InteresesComunidad`(`FKComunidad`),
    INDEX `FK_TemaComunidad`(`FKTema`),
    PRIMARY KEY (`id_interes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interesesUsuarios` (
    `id_interes` INTEGER NOT NULL AUTO_INCREMENT,
    `FKTema` INTEGER NOT NULL,
    `FKUsuario` INTEGER NOT NULL,

    INDEX `FK_TemaInteres`(`FKTema`),
    INDEX `FK_UsuarioInteresado`(`FKUsuario`),
    PRIMARY KEY (`id_interes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comunidad` ADD CONSTRAINT `FK_UsuarioCreador` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `publicacion` ADD CONSTRAINT `FK_UsuarioPost` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `publicacion` ADD CONSTRAINT `FK_ComunidadPost` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `miembros` ADD CONSTRAINT `FK_UsuarioMiembro` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `miembros` ADD CONSTRAINT `FK_ComunidadElegida` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesComunidad` ADD CONSTRAINT `FK_InteresesComunidad` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesComunidad` ADD CONSTRAINT `FK_TemaComunidad` FOREIGN KEY (`FKTema`) REFERENCES `tema`(`id_tema`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesUsuarios` ADD CONSTRAINT `FK_TemaInteres` FOREIGN KEY (`FKTema`) REFERENCES `tema`(`id_tema`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesUsuarios` ADD CONSTRAINT `FK_UsuarioInteresado` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
