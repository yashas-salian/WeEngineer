/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_userID_fkey";

-- AlterTable
ALTER TABLE "Pdf" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "User_ID_seq";

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
