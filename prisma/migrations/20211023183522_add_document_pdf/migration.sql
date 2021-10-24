/*
  Warnings:

  - Added the required column `pdf` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "pdf" TEXT NOT NULL;
