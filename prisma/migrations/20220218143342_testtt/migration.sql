/*
  Warnings:

  - Added the required column `requirementsUuid` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "requirementsUuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlantRequirements" (
    "uuid" TEXT NOT NULL,
    "soil" TEXT NOT NULL,
    "light" TEXT NOT NULL,
    "water" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlantRequirements_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_requirementsUuid_fkey" FOREIGN KEY ("requirementsUuid") REFERENCES "PlantRequirements"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
