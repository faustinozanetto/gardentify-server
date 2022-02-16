-- CreateEnum
CREATE TYPE "PlantType" AS ENUM ('NONE', 'TOMATO', 'POTATO', 'CARROT', 'ONION', 'CUCUMBER', 'PEPPER', 'PEA', 'BROCCOLI', 'CABBAGE', 'CORN', 'BEAN', 'BEET', 'CELERY', 'EGGPLANT', 'GARLIC', 'GINGER', 'GREEN_BEAN', 'KALE', 'LETTUCE', 'MUSTARD');

-- CreateTable
CREATE TABLE "Plot" (
    "uuid" TEXT NOT NULL,
    "sizeX" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sizeY" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dirtDepth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Plant" (
    "uuid" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "type" "PlantType" NOT NULL,
    "image" TEXT NOT NULL,
    "plantedSeedsOn" TIMESTAMP(3) NOT NULL,
    "seedsSproutedOn" TIMESTAMP(3) NOT NULL,
    "plotUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "uuid" TEXT NOT NULL,
    "amountHarvested" INTEGER NOT NULL DEFAULT 0,
    "harvestWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "plantUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plotUuid_fkey" FOREIGN KEY ("plotUuid") REFERENCES "Plot"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
