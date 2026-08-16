CREATE TABLE "inventory_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"condition" text NOT NULL,
	"finish" text,
	"language" text DEFAULT 'en' NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"price_cents" integer NOT NULL,
	"cost_cents" integer,
	"location" text,
	"reserved_qty" integer DEFAULT 0 NOT NULL,
	"graded" boolean DEFAULT false NOT NULL,
	"grading" jsonb,
	"channel_prices" jsonb,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_type" text NOT NULL,
	"game" text NOT NULL,
	"name" text NOT NULL,
	"set_name" text,
	"set_code" text,
	"series" text,
	"collector_number" text,
	"printed_number" text,
	"rarity" text,
	"rarity_symbol" text,
	"finishes" jsonb,
	"variant" text,
	"sealed_type" text,
	"language" text DEFAULT 'en' NOT NULL,
	"image_url" text,
	"external_ids" jsonb,
	"catalog_meta" jsonb,
	"owner_tenant_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_owner_tenant_id_tenants_id_fk" FOREIGN KEY ("owner_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "inventory_tenant_idx" ON "inventory_items" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "inventory_tenant_product_idx" ON "inventory_items" USING btree ("tenant_id","product_id");--> statement-breakpoint
CREATE INDEX "inventory_tenant_status_idx" ON "inventory_items" USING btree ("tenant_id","status");--> statement-breakpoint
CREATE INDEX "products_game_name_idx" ON "products" USING btree ("game","name");--> statement-breakpoint
CREATE INDEX "products_set_collector_idx" ON "products" USING btree ("set_code","collector_number");--> statement-breakpoint
CREATE INDEX "products_owner_tenant_idx" ON "products" USING btree ("owner_tenant_id");