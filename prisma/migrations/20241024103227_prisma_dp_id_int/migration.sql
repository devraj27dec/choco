/*
  Warnings:

  - The primary key for the `DeliveryPerson` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DeliveryPerson" DROP CONSTRAINT "DeliveryPerson_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DeliveryPerson_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DeliveryPerson_id_seq";
