/*
  Warnings:

  - You are about to drop the column `fechaNac` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `fechaNac`,
    MODIFY `fotoPerfil` BLOB NULL;
