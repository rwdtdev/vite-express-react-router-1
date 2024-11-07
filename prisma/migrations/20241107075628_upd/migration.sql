/*
  Warnings:

  - The `createdAt` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3);
