-- CreateEnum

CREATE TYPE "Role" AS ENUM ('DONOR', 'ADMIN');

-- CreateTable

CREATE TABLE
    "Donor" (
        "id" SERIAL NOT NULL,
        "firstname" TEXT NOT NULL,
        "lastname" TEXT NOT NULL,
        "age" INTEGER NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "is_verified" BOOLEAN NOT NULL DEFAULT false,
        "address" TEXT NOT NULL,
        "bloodgroup" TEXT NOT NULL,
        "weight" TEXT NOT NULL,
        "role" "Role" NOT NULL DEFAULT 'DONOR',
        "state" TEXT NOT NULL,
        "otp_token" TEXT NOT NULL,
        "otp_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Donation" (
        "id" SERIAL NOT NULL,
        "bloodgroup" TEXT NOT NULL,
        "donation_date" TIMESTAMP(3) NOT NULL,
        "amount" INTEGER NOT NULL,
        "last_donation" TIMESTAMP(3),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        "donor_id" INTEGER NOT NULL,
        CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex

CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- AddForeignKey

ALTER TABLE "Donation"
ADD
    CONSTRAINT "Donation_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;