/*
  Warnings:

  - Added the required column `size` to the `Pdf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_name` to the `Pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "subject_name" TEXT NOT NULL;
