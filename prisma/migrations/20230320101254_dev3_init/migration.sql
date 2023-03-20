/*
  Warnings:

  - You are about to drop the column `blood_group` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `blood_group` on the `Donor` table. All the data in the column will be lost.
  - Added the required column `bloodgroup` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodgroup` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "blood_group",
ADD COLUMN     "bloodgroup" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "blood_group",
ADD COLUMN     "bloodgroup" TEXT NOT NULL;
