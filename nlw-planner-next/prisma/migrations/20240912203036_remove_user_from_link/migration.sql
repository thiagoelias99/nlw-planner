/*
  Warnings:

  - You are about to drop the column `user_id` on the `links` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_user_id_fkey";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
