/*
  Warnings:

  - You are about to drop the column `count` on the `recipe_ingredients` table. All the data in the column will be lost.
  - Added the required column `amount` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."recipe_ingredients" DROP COLUMN "count",
ADD COLUMN     "amount" INTEGER NOT NULL;
