-- AlterTable
ALTER TABLE "Harvest" ADD COLUMN     "harvestedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Disease" (
    "uuid" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "plantUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_plantUuid_fkey" FOREIGN KEY ("plantUuid") REFERENCES "Plant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
