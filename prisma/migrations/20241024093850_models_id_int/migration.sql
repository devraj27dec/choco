/*
  Warnings:

  - The `warehouseId` column on the `DeliveryPerson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `orderId` column on the `DeliveryPerson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `orderId` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `productId` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Warehouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[externalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `warehouseId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "DeliveryPerson" DROP CONSTRAINT "DeliveryPerson_orderId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryPerson" DROP CONSTRAINT "DeliveryPerson_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "DeliveryPerson" DROP COLUMN "warehouseId",
ADD COLUMN     "warehouseId" INTEGER,
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER,
DROP COLUMN "warehouseId",
ADD COLUMN     "warehouseId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_orderId_key" ON "Inventory"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPerson" ADD CONSTRAINT "DeliveryPerson_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPerson" ADD CONSTRAINT "DeliveryPerson_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
