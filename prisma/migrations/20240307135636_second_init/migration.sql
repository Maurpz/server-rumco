-- CreateTable
CREATE TABLE "InfoRedirect" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "redirect" BOOLEAN NOT NULL DEFAULT false,
    "registerdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfoRedirect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoRedirect_email_key" ON "InfoRedirect"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InfoRedirect_phoneNumber_key" ON "InfoRedirect"("phoneNumber");
