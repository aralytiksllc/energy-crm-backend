-- CreateTable
CREATE TABLE "public"."documents" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    "size" INTEGER NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "documentType" VARCHAR(64),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "documents_customerId_idx" ON "public"."documents"("customerId");

-- CreateIndex
CREATE INDEX "documents_documentType_idx" ON "public"."documents"("documentType");

-- AddForeignKey
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
