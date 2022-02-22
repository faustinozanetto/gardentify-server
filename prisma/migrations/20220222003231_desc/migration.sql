/*
  Warnings:

  - Added the required column `description` to the `Plot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plot" ADD COLUMN     "description" TEXT NOT NULL;
