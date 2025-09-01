/*
  Warnings:

  - You are about to alter the column `electricityConsumptionKwh` on the `consumption` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,6)`.

*/
-- AlterTable
ALTER TABLE "public"."consumption" ADD COLUMN     "consumptionFileId" INTEGER,
ALTER COLUMN "electricityConsumptionKwh" SET DATA TYPE DECIMAL(12,6);

-- CreateTable
CREATE TABLE "public"."consumption_files" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    "size" INTEGER NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "description" TEXT,

    CONSTRAINT "consumption_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "consumption_consumptionFileId_idx" ON "public"."consumption"("consumptionFileId");

-- AddForeignKey
ALTER TABLE "public"."consumption" ADD CONSTRAINT "consumption_consumptionFileId_fkey" FOREIGN KEY ("consumptionFileId") REFERENCES "public"."consumption_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
