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
ALTER TABLE `interesesComunidad` ADD CONSTRAINT `FK_InteresesComunidad` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesComunidad` ADD CONSTRAINT `FK_TemaComunidad` FOREIGN KEY (`FKTema`) REFERENCES `tema`(`id_tema`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesUsuarios` ADD CONSTRAINT `FK_TemaInteres` FOREIGN KEY (`FKTema`) REFERENCES `tema`(`id_tema`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `interesesUsuarios` ADD CONSTRAINT `FK_UsuarioInteresado` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
