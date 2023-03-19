/*
  Warnings:

  - Added the required column `age` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "last_donation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "age" INTEGER NOT NULL;
