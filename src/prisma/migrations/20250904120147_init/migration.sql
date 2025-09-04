-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "user_first_name" VARCHAR(255) NOT NULL,
    "user_last_name" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_is_active" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL,
    "department_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(100) NOT NULL,
    "role_description" VARCHAR(255),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "permission_id" SERIAL NOT NULL,
    "permission_action" VARCHAR(100) NOT NULL,
    "permission_subject" VARCHAR(100) NOT NULL,
    "permission_conditions" JSONB,
    "permission_description" VARCHAR(255),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "department_id" SERIAL NOT NULL,
    "department_name" VARCHAR(100) NOT NULL,
    "department_code" VARCHAR(50),
    "department_is_active" BOOLEAN NOT NULL DEFAULT true,
    "department_description" VARCHAR(255),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "public"."password_resets" (
    "password_reset_id" SERIAL NOT NULL,
    "password_reset_token" TEXT NOT NULL,
    "password_reset_expires_at" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("password_reset_id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "customer_id" SERIAL NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "registered_address" VARCHAR(255),
    "legal_notice_email" VARCHAR(255),
    "phone" VARCHAR(50),
    "default_operational_email" VARCHAR(255),
    "default_escalation_email" VARCHAR(255),
    "registration_number" VARCHAR(50) NOT NULL,
    "business_type" VARCHAR(100),
    "registration_date" DATE,
    "registered_capital" DECIMAL(15,2),
    "company_status" VARCHAR(50),
    "main_activity" VARCHAR(255),
    "legal_id" VARCHAR(255),
    "legal_status" VARCHAR(255),
    "company_code" VARCHAR(50),
    "company_type" VARCHAR(50),
    "company_description" VARCHAR(255),
    "city_region" VARCHAR(255),
    "authorized_representative" VARCHAR(255),
    "company_role" VARCHAR(50),
    "sector_primary" VARCHAR(255),
    "sector_secondary" VARCHAR(255),
    "preferred_communication_language" VARCHAR(50),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "public"."contacts" (
    "contact_id" SERIAL NOT NULL,
    "contact_name" VARCHAR(255) NOT NULL,
    "contact_type" VARCHAR(50),
    "company_department_of_contact" VARCHAR(50),
    "contact_role" VARCHAR(50),
    "contact_phone" VARCHAR(50),
    "contact_email" VARCHAR(255),
    "contact_status" VARCHAR(50),
    "preferred_communication_language" VARCHAR(50),
    "branch_name" VARCHAR(255),
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "public"."branches" (
    "branch_id" SERIAL NOT NULL,
    "branch_name" VARCHAR(512) NOT NULL,
    "branch_address" VARCHAR(512),
    "branch_city_region" VARCHAR(512),
    "operational_status" VARCHAR(40),
    "customer_id" INTEGER NOT NULL,
    "contact_id" INTEGER,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "public"."documents" (
    "document_id" SERIAL NOT NULL,
    "document_name" VARCHAR(255) NOT NULL,
    "document_original_name" VARCHAR(255) NOT NULL,
    "document_mime_type" VARCHAR(100) NOT NULL,
    "document_size" INTEGER NOT NULL,
    "document_path" VARCHAR(500) NOT NULL,
    "document_description" TEXT,
    "document_type" VARCHAR(64),
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "public"."metering_points" (
    "metering_point_id" SERIAL NOT NULL,
    "delivery_address" TEXT,
    "location_address" VARCHAR(150),
    "city_or_locality" VARCHAR(150),
    "country" VARCHAR(100),
    "tariff_group" VARCHAR(100),
    "technical_contact_name" VARCHAR(255),
    "technical_contact_title" VARCHAR(120),
    "technical_contact_phone" VARCHAR(50),
    "technical_contact_email" VARCHAR(255),
    "contracted_capacity_value" DECIMAL(12,3),
    "contracted_capacity_unit" VARCHAR(10),
    "voltage_level" VARCHAR(20),
    "meter_type" VARCHAR(120),
    "connection_specs" TEXT,
    "agreed_max_demand_kw" DECIMAL(12,3),
    "notes" TEXT,
    "meetering_point_status" VARCHAR(50),
    "utility_provider" VARCHAR(255),
    "gps_coordinates" JSONB,
    "registered_address" VARCHAR(255),
    "operational_status" TEXT,
    "installation_date" DATE,
    "contract_end_date" DATE,
    "connection_type" TEXT,
    "branch_id" INTEGER NOT NULL,
    "contact_id" INTEGER,

    CONSTRAINT "metering_points_pkey" PRIMARY KEY ("metering_point_id")
);

-- CreateTable
CREATE TABLE "public"."consumption_files" (
    "consumption_file_id" SERIAL NOT NULL,
    "consumption_file_name" VARCHAR(255) NOT NULL,
    "consumption_file_original_name" VARCHAR(255) NOT NULL,
    "consumption_file_mime_type" VARCHAR(100) NOT NULL,
    "consumption_file_size" INTEGER NOT NULL,
    "consumption_file_path" VARCHAR(500) NOT NULL,
    "consumption_file_description" TEXT,
    "metering_point_id" INTEGER NOT NULL,

    CONSTRAINT "consumption_files_pkey" PRIMARY KEY ("consumption_file_id")
);

-- CreateTable
CREATE TABLE "public"."consumptions" (
    "dt_reporting" DATE NOT NULL,
    "tm_reporting" TIME(0) NOT NULL,
    "electricity_consumption_kwh" DECIMAL(10,2),
    "submitted_at" TIMESTAMPTZ(6) NOT NULL,
    "metering_point_id" INTEGER NOT NULL,
    "consumption_file_id" INTEGER NOT NULL,

    CONSTRAINT "consumptions_pkey" PRIMARY KEY ("metering_point_id","dt_reporting","tm_reporting")
);

-- CreateTable
CREATE TABLE "public"."contracts" (
    "contract_number" SERIAL NOT NULL,
    "effective_date" DATE,
    "supply_start_date" DATE,
    "initial_term_years" INTEGER,
    "maturity_date" DATE,
    "renewal_term_years" INTEGER,
    "contract_quantity" VARCHAR(100),
    "price_per_mwh" DECIMAL(10,2),
    "includes_network_tariffs" BOOLEAN,
    "includes_vat" BOOLEAN,
    "payment_terms_days" INTEGER,
    "security_deposit_amount" DECIMAL(15,2),
    "termination_notice_days" INTEGER,
    "early_termination_fee" VARCHAR(100),
    "dispute_resolution_method" TEXT,
    "forecast_deadline_days_before_month" INTEGER,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("contract_number")
);

-- CreateTable
CREATE TABLE "public"."forecast_consumptions" (
    "dt_reporting" DATE NOT NULL,
    "tm_reporting" TIME(0) NOT NULL,
    "electricity_consumption_kwh" DECIMAL(10,2),
    "submitted_at" TIMESTAMPTZ(6) NOT NULL,
    "submitted_by" VARCHAR(120),
    "metering_point_id" INTEGER NOT NULL,

    CONSTRAINT "forecast_consumptions_pkey" PRIMARY KEY ("metering_point_id","dt_reporting","tm_reporting")
);

-- CreateTable
CREATE TABLE "public"."ml_forecast_consumptions" (
    "dt_forecasting" DATE NOT NULL,
    "tm_forecasting" TIME(0) NOT NULL,
    "electricity_consumption_kwh_pred" DECIMAL(10,2),
    "dt_tm_reporting" TIMESTAMP(6) NOT NULL,
    "pred_lo_95" DECIMAL(10,2),
    "pred_hi_95" DECIMAL(10,2),
    "metering_point_id" INTEGER NOT NULL,

    CONSTRAINT "ml_forecast_consumptions_pkey" PRIMARY KEY ("metering_point_id","dt_forecasting","tm_forecasting")
);

-- CreateTable
CREATE TABLE "public"."weather_data" (
    "location_id" VARCHAR(64) NOT NULL,
    "dt_reporting" DATE NOT NULL,
    "tm_reporting" TIME(0) NOT NULL,
    "source_name" VARCHAR(128) NOT NULL,
    "location_name" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(8,5) NOT NULL,
    "longitude" DECIMAL(8,5) NOT NULL,
    "season_name" VARCHAR(16),
    "day_type" VARCHAR(16),
    "temperature_c" DECIMAL(5,2),
    "rel_humidity_pct" DECIMAL(5,2),
    "precipitation_mm" DECIMAL(6,2),
    "rain_mm" DECIMAL(6,2),
    "snowfall_mm" DECIMAL(6,2),
    "cloud_cover_pct" DECIMAL(5,2),
    "wind_speed_mps" DECIMAL(5,2),
    "wind_dir_deg" DECIMAL(5,1),
    "pressure_msl_hpa" DECIMAL(7,2),
    "dt_created" TIMESTAMP(6) NOT NULL,
    "dt_updated" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "weather_data_pkey" PRIMARY KEY ("location_id","dt_reporting","tm_reporting")
);

-- CreateTable
CREATE TABLE "public"."_PermissionToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "public"."users"("user_email");

-- CreateIndex
CREATE INDEX "users_role_id_idx" ON "public"."users"("role_id");

-- CreateIndex
CREATE INDEX "users_department_id_idx" ON "public"."users"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "public"."roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_name_key" ON "public"."departments"("department_name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_code_key" ON "public"."departments"("department_code");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_password_reset_token_key" ON "public"."password_resets"("password_reset_token");

-- CreateIndex
CREATE INDEX "password_resets_user_id_idx" ON "public"."password_resets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_company_name_key" ON "public"."customers"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_registration_number_key" ON "public"."customers"("registration_number");

-- CreateIndex
CREATE INDEX "contacts_customer_id_idx" ON "public"."contacts"("customer_id");

-- CreateIndex
CREATE INDEX "branches_customer_id_idx" ON "public"."branches"("customer_id");

-- CreateIndex
CREATE INDEX "documents_customer_id_idx" ON "public"."documents"("customer_id");

-- CreateIndex
CREATE INDEX "documents_document_type_idx" ON "public"."documents"("document_type");

-- CreateIndex
CREATE INDEX "metering_points_branch_id_idx" ON "public"."metering_points"("branch_id");

-- CreateIndex
CREATE INDEX "consumption_files_metering_point_id_idx" ON "public"."consumption_files"("metering_point_id");

-- CreateIndex
CREATE INDEX "contracts_customer_id_idx" ON "public"."contracts"("customer_id");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "public"."_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."password_resets" ADD CONSTRAINT "password_resets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."branches" ADD CONSTRAINT "branches_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metering_points" ADD CONSTRAINT "metering_points_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."metering_points" ADD CONSTRAINT "metering_points_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consumption_files" ADD CONSTRAINT "consumption_files_metering_point_id_fkey" FOREIGN KEY ("metering_point_id") REFERENCES "public"."metering_points"("metering_point_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consumptions" ADD CONSTRAINT "consumptions_metering_point_id_fkey" FOREIGN KEY ("metering_point_id") REFERENCES "public"."metering_points"("metering_point_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consumptions" ADD CONSTRAINT "consumptions_consumption_file_id_fkey" FOREIGN KEY ("consumption_file_id") REFERENCES "public"."consumption_files"("consumption_file_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contracts" ADD CONSTRAINT "contracts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."forecast_consumptions" ADD CONSTRAINT "forecast_consumptions_metering_point_id_fkey" FOREIGN KEY ("metering_point_id") REFERENCES "public"."metering_points"("metering_point_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ml_forecast_consumptions" ADD CONSTRAINT "ml_forecast_consumptions_metering_point_id_fkey" FOREIGN KEY ("metering_point_id") REFERENCES "public"."metering_points"("metering_point_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."permissions"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
