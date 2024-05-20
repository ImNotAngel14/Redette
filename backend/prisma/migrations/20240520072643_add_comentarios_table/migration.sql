-- CreateTable
CREATE TABLE `comentarios` (
    `id_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(255) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FKUsuario` INTEGER NOT NULL,
    `FKPublicacion` INTEGER NOT NULL,

    INDEX `FK_UsuarioComentario`(`FKUsuario`),
    INDEX `FK_PublicacionComentario`(`FKPublicacion`),
    PRIMARY KEY (`id_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `FK_UsuarioComentario` FOREIGN KEY (`FKUsuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `FK_PublicacionComentario` FOREIGN KEY (`FKPublicacion`) REFERENCES `publicacion`(`id_publicacion`) ON DELETE RESTRICT ON UPDATE RESTRICT;
