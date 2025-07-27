import { Migration } from '@mikro-orm/migrations';

export class Migration20250727145652 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "histories" ("id" serial primary key, "action" smallint not null, "entity_id" int not null, "entity_name" varchar(255) not null, "entity_data" jsonb not null);`);

    this.addSql(`create table "users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "date_of_birth" date null, "date_of_joining" date null, "settings" jsonb null, "notes" text null, "is_active" boolean not null default true);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "password_resets" ("id" serial primary key, "token" varchar(255) not null, "expires_at" timestamptz not null, "user_id" int not null);`);

    this.addSql(`alter table "password_resets" add constraint "password_resets_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "password_resets" drop constraint "password_resets_user_id_foreign";`);

    this.addSql(`drop table if exists "histories" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "password_resets" cascade;`);
  }

}
