/*
  Warnings:

  - You are about to drop the column `specialty` on the `doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "specialty",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "specialties" TEXT[];

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3);
