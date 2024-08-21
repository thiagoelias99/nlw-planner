-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_guest_email_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_owner_email_fkey";

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_owner_email_fkey" FOREIGN KEY ("owner_email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_guest_email_fkey" FOREIGN KEY ("guest_email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
