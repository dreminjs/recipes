/*
  Warnings:

  - Added the required column `count` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Measure" AS ENUM ('ML', 'L', 'KG', 'G', 'N');

-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "measure" "Measure" NOT NULL;
