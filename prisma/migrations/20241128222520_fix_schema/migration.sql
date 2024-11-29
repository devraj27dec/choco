/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Made the column `productId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Rating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_productId_userId_key" ON "Rating"("productId", "userId");
