/*
  Warnings:

  - Added the required column `audio` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audio_key` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "audio" TEXT NOT NULL,
ADD COLUMN     "audio_key" TEXT NOT NULL;
