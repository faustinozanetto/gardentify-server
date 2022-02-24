-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('DEFAULT', 'DISCORD', 'GITHUB');

-- CreateEnum
CREATE TYPE "PlantType" AS ENUM ('NONE', 'TOMATO', 'POTATO', 'CARROT', 'ONION', 'CUCUMBER', 'PEPPER', 'PEA', 'BROCCOLI', 'CABBAGE', 'CORN', 'BEAN', 'BEET', 'CELERY', 'EGGPLANT', 'GARLIC', 'GINGER', 'GREEN_BEAN', 'KALE', 'LETTUCE', 'MUSTARD');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "oauthId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "avatar" TEXT NOT NULL,
    "authProvider" "AuthProvider" NOT NULL DEFAULT E'DEFAULT',
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Plant" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "variety" TEXT NOT NULL,
    "type" "PlantType" NOT NULL,
    "requirementsUuid" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserPlant" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "type" "PlantType" NOT NULL,
    "image" TEXT,
    "plantedSeedsOn" TIMESTAMP(3),
    "seedsSproutedOn" TIMESTAMP(3),
    "plotUuid" TEXT,
    "userUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlant_pkey" PRIMARY KEY ("uuid")
);

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

-- CreateTable
CREATE TABLE "Plot" (
    "uuid" TEXT NOT NULL,
    "name" TEXT DEFAULT E'Plot',
    "description" TEXT NOT NULL DEFAULT E'',
    "sizeX" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sizeY" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dirtDepth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "image" TEXT,
    "userUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DiseasesOnPlants" (
    "plantUuid" TEXT NOT NULL,
    "diseaseUuid" TEXT NOT NULL,
    "appearedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiseasesOnPlants_pkey" PRIMARY KEY ("plantUuid","diseaseUuid")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "uuid" TEXT NOT NULL,
    "image" TEXT,
    "amountHarvested" INTEGER NOT NULL DEFAULT 0,
    "harvestWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "harvestedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plantUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Disease" (
    "uuid" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "description" TEXT DEFAULT E'',
    "image" TEXT,
    "plantUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_oauthId_key" ON "User"("oauthId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_requirementsUuid_fkey" FOREIGN KEY ("requirementsUuid") REFERENCES "PlantRequirements"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlant" ADD CONSTRAINT "UserPlant_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlant" ADD CONSTRAINT "UserPlant_plotUuid_fkey" FOREIGN KEY ("plotUuid") REFERENCES "Plot"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseasesOnPlants" ADD CONSTRAINT "DiseasesOnPlants_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "UserPlant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseasesOnPlants" ADD CONSTRAINT "DiseasesOnPlants_diseaseUuid_fkey" FOREIGN KEY ("diseaseUuid") REFERENCES "Disease"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "UserPlant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
