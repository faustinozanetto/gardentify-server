-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('DEFAULT', 'DISCORD', 'GITHUB');

-- CreateEnum
CREATE TYPE "PlantType" AS ENUM ('NONE', 'TOMATO', 'POTATO', 'CARROT', 'ONION', 'CUCUMBER', 'PEPPER', 'PEA', 'BROCCOLI', 'CABBAGE', 'CORN', 'BEAN', 'BEET', 'CELERY', 'EGGPLANT', 'GARLIC', 'GINGER', 'GREEN_BEAN', 'KALE', 'LETTUCE', 'MUSTARD');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "oauthId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT NOT NULL,
    "authProvider" "AuthProvider" NOT NULL DEFAULT E'DEFAULT',
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Plot" (
    "uuid" TEXT NOT NULL,
    "sizeX" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sizeY" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dirtDepth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userUuid" TEXT,
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
    "image" TEXT,
    "plantedSeedsOn" TIMESTAMP(3),
    "seedsSproutedOn" TIMESTAMP(3),
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

-- CreateIndex
CREATE UNIQUE INDEX "User_oauthId_key" ON "User"("oauthId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plotUuid_fkey" FOREIGN KEY ("plotUuid") REFERENCES "Plot"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
