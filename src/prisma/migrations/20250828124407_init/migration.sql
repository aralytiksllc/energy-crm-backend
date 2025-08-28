-- CreateEnum
CREATE TYPE "public"."ContactStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "roleId" INTEGER NOT NULL,
    "departmentId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "conditions" JSONB,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."password_resets" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ(6),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "registeredAddress" TEXT,
    "legalNoticeEmail" VARCHAR(255),
    "phone" VARCHAR(50),
    "defaultOperationalEmail" VARCHAR(255),
    "defaultEscalationEmail" VARCHAR(255),
    "registrationNumber" VARCHAR(50),
    "businessType" VARCHAR(100),
    "registrationDate" DATE,
    "registeredCapital" DOUBLE PRECISION,
    "companyStatus" VARCHAR(50),
    "mainActivity" VARCHAR(255),
    "legalId" VARCHAR(255),
    "legalStatus" VARCHAR(255),
    "companyCode" VARCHAR(50),
    "companyType" VARCHAR(50),
    "companyDescription" VARCHAR(255),
    "cityRegion" VARCHAR(255),
    "authorizedRepresentative" VARCHAR(255),
    "companyRole" VARCHAR(50),
    "sectorPrimary" VARCHAR(255),
    "sectorSecondary" VARCHAR(255),
    "clientStatus" VARCHAR(50),
    "preferredCommunicationLanguage" VARCHAR(50),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."branches" (
    "id" SERIAL NOT NULL,
    "branchName" VARCHAR(512) NOT NULL,
    "peakLoadKw" DOUBLE PRECISION,
    "weatherDataLinkage" VARCHAR(50),
    "customerId" INTEGER,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."metering_points" (
    "id" SERIAL NOT NULL,
    "deliveryAddress" TEXT,
    "locationAddress" VARCHAR(255),
    "cityOrLocality" VARCHAR(150),
    "country" VARCHAR(100),
    "tariffGroup" VARCHAR(100),
    "technicalContactName" VARCHAR(255),
    "technicalContactTitle" VARCHAR(120),
    "technicalContactPhone" VARCHAR(50),
    "technicalContactEmail" VARCHAR(255),
    "contractedCapacityValue" DOUBLE PRECISION,
    "contractedCapacityUnit" VARCHAR(10),
    "voltageLevel" VARCHAR(20),
    "meterType" VARCHAR(120),
    "connectionSpecs" TEXT,
    "agreedMaxDemandKw" DOUBLE PRECISION,
    "notes" TEXT,
    "meteringPointStatus" VARCHAR(50),
    "utilityProvider" VARCHAR(255),
    "gpsCoordinates" TEXT,
    "registeredAddress" VARCHAR(255),
    "operationalStatus" TEXT,
    "installationDate" DATE,
    "contractEndDate" DATE,
    "branchId" INTEGER,

    CONSTRAINT "metering_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contracts" (
    "id" SERIAL NOT NULL,
    "contractNumber" VARCHAR(512) NOT NULL,
    "effectiveDate" DATE,
    "supplyStartDate" DATE,
    "initialTermYears" INTEGER,
    "maturityDate" DATE,
    "renewalTermYears" INTEGER,
    "contractQuantity" VARCHAR(100),
    "pricePerMwh" DOUBLE PRECISION,
    "includesNetworkTariffs" BOOLEAN,
    "includesVat" BOOLEAN,
    "paymentTermsDays" INTEGER,
    "securityDepositAmount" DOUBLE PRECISION,
    "terminationNoticeDays" INTEGER,
    "earlyTerminationFee" VARCHAR(100),
    "disputeResolutionMethod" TEXT,
    "forecastDeadlineDaysBeforeMonth" INTEGER,
    "customerId" INTEGER,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."consumption" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL,
    "timeframe" VARCHAR(50) NOT NULL,
    "electricityConsumptionKwh" DOUBLE PRECISION,
    "meteringPointId" INTEGER NOT NULL,
    "contractId" INTEGER,

    CONSTRAINT "consumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "status" "public"."ContactStatus" NOT NULL DEFAULT 'ACTIVE',
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PermissionToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "public"."users"("roleId");

-- CreateIndex
CREATE INDEX "users_departmentId_idx" ON "public"."users"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "public"."departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "public"."departments"("code");

-- CreateIndex
CREATE INDEX "password_resets_userId_idx" ON "public"."password_resets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_token_key" ON "public"."password_resets"("token");

-- CreateIndex
CREATE INDEX "branches_customerId_idx" ON "public"."branches"("customerId");

-- CreateIndex
CREATE INDEX "metering_points_branchId_idx" ON "public"."metering_points"("branchId");

-- CreateIndex
CREATE INDEX "contracts_customerId_idx" ON "public"."contracts"("customerId");

-- CreateIndex
CREATE INDEX "consumption_contractId_idx" ON "public"."consumption"("contractId");

-- CreateIndex
CREATE UNIQUE INDEX "consumption_meteringPointId_timestamp_timeframe_key" ON "public"."consumption"("meteringPointId", "timestamp", "timeframe");

-- CreateIndex
CREATE INDEX "Contact_customerId_idx" ON "public"."Contact"("customerId");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "public"."_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."password_resets" ADD CONSTRAINT "password_resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metering_points" ADD CONSTRAINT "metering_points_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contracts" ADD CONSTRAINT "contracts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consumption" ADD CONSTRAINT "consumption_meteringPointId_fkey" FOREIGN KEY ("meteringPointId") REFERENCES "public"."metering_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consumption" ADD CONSTRAINT "consumption_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
