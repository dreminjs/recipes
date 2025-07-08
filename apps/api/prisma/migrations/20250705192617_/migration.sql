/*
  Warnings:

  - You are about to drop the column `photo` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[];
