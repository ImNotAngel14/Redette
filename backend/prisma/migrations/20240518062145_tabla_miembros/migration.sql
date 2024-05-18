-- CreateTable
CREATE TABLE `miembros` (
    `id_miembro` INTEGER NOT NULL AUTO_INCREMENT,
    `FKUsuario` INTEGER NOT NULL,
    `FKComunidad` INTEGER NOT NULL,

    INDEX `FK_UsuarioMiembro`(`FKUsuario`),
    INDEX `FK_ComunidadElegida`(`FKComunidad`),
    PRIMARY KEY (`id_miembro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `miembros` ADD CONSTRAINT `FK_UsuarioMiembro` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `miembros` ADD CONSTRAINT `FK_ComunidadElegida` FOREIGN KEY (`FKComunidad`) REFERENCES `comunidad`(`id_comunidad`) ON DELETE RESTRICT ON UPDATE RESTRICT;
