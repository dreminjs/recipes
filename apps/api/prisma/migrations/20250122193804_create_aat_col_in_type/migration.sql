/*
  Warnings:

  - You are about to drop the column `recipeId` on the `FavoriteRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `FavoriteRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `Holiday` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `NationalCuisine` table. All the data in the column will be lost.
  - You are about to drop the column `holidayId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `nationalCuisineId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `recipeCommentId` on the `RecipeComment` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `RecipeComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RecipeComment` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `RecipeIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `isVisible` on the `Type` table. All the data in the column will be lost.
  - You are about to drop the column `hashPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActived` on the `User` table. All the data in the column will be lost.
  - Added the required column `recipe_id` to the `FavoriteRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `FavoriteRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holiday_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `national_cuisine_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `RecipeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hass_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_actived` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_holidayId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_nationalCuisineId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeComment" DROP CONSTRAINT "RecipeComment_recipeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeComment" DROP CONSTRAINT "RecipeComment_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeComment" DROP CONSTRAINT "RecipeComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- AlterTable
ALTER TABLE "FavoriteRecipe" DROP COLUMN "recipeId",
DROP COLUMN "userId",
ADD COLUMN     "recipe_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "isVisible",
ADD COLUMN     "is_visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "NationalCuisine" DROP COLUMN "isVisible",
ADD COLUMN     "is_visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "holidayId",
DROP COLUMN "nationalCuisineId",
DROP COLUMN "typeId",
DROP COLUMN "userId",
ADD COLUMN     "holiday_id" TEXT NOT NULL,
ADD COLUMN     "national_cuisine_id" TEXT NOT NULL,
ADD COLUMN     "type_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeComment" DROP COLUMN "recipeCommentId",
DROP COLUMN "recipeId",
DROP COLUMN "userId",
ADD COLUMN     "recipe_comment_id" TEXT,
ADD COLUMN     "recipe_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "isVisible",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashPassword",
DROP COLUMN "isActived",
ADD COLUMN     "hass_password" TEXT NOT NULL,
ADD COLUMN     "is_actived" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_national_cuisine_id_fkey" FOREIGN KEY ("national_cuisine_id") REFERENCES "NationalCuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_holiday_id_fkey" FOREIGN KEY ("holiday_id") REFERENCES "Holiday"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD CONSTRAINT "RecipeComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD CONSTRAINT "RecipeComment_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeComment" ADD CONSTRAINT "RecipeComment_recipe_comment_id_fkey" FOREIGN KEY ("recipe_comment_id") REFERENCES "RecipeComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
