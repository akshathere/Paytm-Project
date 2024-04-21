-- CreateTable
CREATE TABLE "P2Ptrans" (
    "userId" SERIAL NOT NULL,
    "fromuserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "P2Ptrans_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "P2Ptrans" ADD CONSTRAINT "P2Ptrans_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2Ptrans" ADD CONSTRAINT "P2Ptrans_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
