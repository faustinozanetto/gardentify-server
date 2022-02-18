/*
  Warnings:

  - Added the required column `name` to the `UserPlant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scientificName` to the `UserPlant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserPlant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variety` to the `UserPlant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPlant" ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "scientificName" TEXT NOT NULL,
ADD COLUMN     "type" "PlantType" NOT NULL,
ADD COLUMN     "variety" TEXT NOT NULL;
