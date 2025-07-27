/*
  Warnings:

  - The primary key for the `Pdf` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Pdf` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Pdf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `College` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DOB` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Degree` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Field` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_pkey",
DROP COLUMN "ID",
ADD COLUMN     "pdfID" SERIAL NOT NULL,
ADD COLUMN     "userID" INTEGER NOT NULL,
ADD CONSTRAINT "Pdf_pkey" PRIMARY KEY ("pdfID");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "College" TEXT NOT NULL,
ADD COLUMN     "DOB" TEXT NOT NULL,
ADD COLUMN     "Degree" TEXT NOT NULL,
ADD COLUMN     "Field" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
