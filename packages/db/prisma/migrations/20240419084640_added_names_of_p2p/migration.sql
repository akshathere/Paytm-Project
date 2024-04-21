/*
  Warnings:

  - Added the required column `from` to the `P2Ptrans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `P2Ptrans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2Ptrans" ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
