-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pincode" VARCHAR(6);

-- AlterTable
ALTER TABLE "Warehouse" ALTER COLUMN "pincode" DROP NOT NULL;
