-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'CANCELLED', 'EXCLUDED', 'PENDING', 'NOT_SENT');

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "invites" (
    "id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "guest_email" TEXT NOT NULL,
    "invite_status" "InviteStatus" NOT NULL DEFAULT 'NOT_SENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "invites_trip_id_guest_email_idx" ON "invites"("trip_id", "guest_email");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_guest_email_fkey" FOREIGN KEY ("guest_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
