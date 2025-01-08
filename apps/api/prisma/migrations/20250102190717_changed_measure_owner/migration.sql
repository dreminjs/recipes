/*
  Warnings:

  - You are about to drop the column `measure` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `measure` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "measure" "Measure" NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "measure";
