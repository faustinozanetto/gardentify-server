-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "plantedSeedsOn" DROP NOT NULL,
ALTER COLUMN "seedsSproutedOn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plot" ADD COLUMN     "plotOwnerUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_plotOwnerUuid_fkey" FOREIGN KEY ("plotOwnerUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
