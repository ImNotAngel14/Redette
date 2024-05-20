/*
  Warnings:

  - You are about to drop the `interesescomunidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interesesusuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `interesescomunidad` DROP FOREIGN KEY `FK_InteresesComunidad`;

-- DropForeignKey
ALTER TABLE `interesescomunidad` DROP FOREIGN KEY `FK_TemaComunidad`;

-- DropForeignKey
ALTER TABLE `interesesusuarios` DROP FOREIGN KEY `FK_TemaInteres`;

-- DropForeignKey
ALTER TABLE `interesesusuarios` DROP FOREIGN KEY `FK_UsuarioInteresado`;

-- DropTable
DROP TABLE `interesescomunidad`;

-- DropTable
DROP TABLE `interesesusuarios`;

-- DropTable
DROP TABLE `tema`;

-- CreateTable
CREATE TABLE `likes` (
    `id_like` INTEGER NOT NULL AUTO_INCREMENT,
    `FKUsuario` INTEGER NOT NULL,
    `FKPublicacion` INTEGER NOT NULL,

    INDEX `FK_UsuarioLike`(`FKUsuario`),
    INDEX `FK_PublicacionLike`(`FKPublicacion`),
    PRIMARY KEY (`id_like`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guardados` (
    `id_guardado` INTEGER NOT NULL AUTO_INCREMENT,
    `FKUsuario` INTEGER NOT NULL,
    `FKPublicacion` INTEGER NOT NULL,

    INDEX `FK_UsuarioGuardado`(`FKUsuario`),
    INDEX `FK_PublicacionGuardado`(`FKPublicacion`),
    PRIMARY KEY (`id_guardado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `FK_UsuarioLike` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `FK_PublicacionLike` FOREIGN KEY (`FKPublicacion`) REFERENCES `publicacion`(`id_publicacion`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guardados` ADD CONSTRAINT `FK_UsuarioGuardado` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guardados` ADD CONSTRAINT `FK_PublicacionGuardado` FOREIGN KEY (`FKPublicacion`) REFERENCES `publicacion`(`id_publicacion`) ON DELETE RESTRICT ON UPDATE RESTRICT;
