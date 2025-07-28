/*
  Warnings:

  - The primary key for the `Pdf` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_pkey",
ALTER COLUMN "pdfID" DROP DEFAULT,
ALTER COLUMN "pdfID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pdf_pkey" PRIMARY KEY ("pdfID");
DROP SEQUENCE "Pdf_pdfID_seq";
