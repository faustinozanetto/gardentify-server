/*
  Warnings:

  - A unique constraint covering the columns `[oauthId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oauthId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('DEFAULT', 'DISCORD', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT E'DEFAULT',
ADD COLUMN     "oauthId" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_oauthId_key" ON "User"("oauthId");
