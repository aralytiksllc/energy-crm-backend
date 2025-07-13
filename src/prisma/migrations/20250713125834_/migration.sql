-- CreateEnum
CREATE TYPE "HistoryAction" AS ENUM ('create', 'update', 'delete');

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "action" "HistoryAction" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityData" JSONB NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
