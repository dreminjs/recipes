/*
  Warnings:

  - Added the required column `index` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."steps" ADD COLUMN     "index" INTEGER NOT NULL;
