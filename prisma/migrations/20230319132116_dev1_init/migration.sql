/*
  Warnings:

  - Added the required column `blood_group` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "blood_group" TEXT NOT NULL;
