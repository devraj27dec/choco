-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0;
