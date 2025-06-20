/*
  Warnings:

  - Added the required column `college_name` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "college_name" TEXT NOT NULL;
