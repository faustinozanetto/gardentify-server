/*
  Warnings:

  - The primary key for the `AuthAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthAccount` table. All the data in the column will be lost.
  - The primary key for the `AuthSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthSession` table. All the data in the column will be lost.
  - The primary key for the `AuthVerificationRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthVerificationRequest` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `AuthAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `AuthSession` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `AuthVerificationRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "AuthAccount" DROP CONSTRAINT "AuthAccount_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AuthAccount_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "AuthSession" DROP CONSTRAINT "AuthSession_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "AuthVerificationRequest" DROP CONSTRAINT "AuthVerificationRequest_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "AuthVerificationRequest_pkey" PRIMARY KEY ("uuid");
