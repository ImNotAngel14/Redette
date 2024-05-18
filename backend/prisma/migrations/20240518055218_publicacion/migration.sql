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

-- AddForeignKey
ALTER TABLE `comunidad` ADD CONSTRAINT `FK_UsuarioCreador` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `publicacion` ADD CONSTRAINT `FK_UsuarioPost` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `publicacion` ADD CONSTRAINT `FK_ComunidadPost` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;
