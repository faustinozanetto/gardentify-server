/*
  Warnings:

  - You are about to drop the column `plotOwnerUuid` on the `Plot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plot" DROP CONSTRAINT "Plot_plotOwnerUuid_fkey";

-- AlterTable
ALTER TABLE "Plot" DROP COLUMN "plotOwnerUuid",
ADD COLUMN     "userUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
