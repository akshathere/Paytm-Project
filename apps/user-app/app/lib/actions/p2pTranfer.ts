"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTranfer(number:string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    console.log("im here buddy")
    const user2=await prisma.user.findFirst({
        where:{
            number
        }
    })
    if(!user2){
        return{
            msg:"User with number not found"
        }
    }
    console.log(session?.user,"user1")
    console.log(user2,"user2")
    
    try{

    
    await prisma.$transaction(async (tx :any)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user?.id)} FOR UPDATE`;
        const user1_bal=await prisma.balance.findFirst({
            where:{
                userId:Number(session.user.id)
            }
        })
        const bal=user1_bal || 0
        if(Number(bal)<Number(amount)){
        return {
            msg:"not enough balance baby"
        }
        }
        await tx.balance.update({
        where:{
            userId:Number(session?.user?.id)
        },
        data:{
           amount:{
            decrement:Number(amount)
           }
           }
        }),
        await tx.balance.update({
            where:{
                userId:user2.id
            },
            data:{
                amount:{
                    increment:Number(amount)
                }
            }
        })
        await tx.p2Ptrans.create({
            data:{
                toUserId:user2.id,
                fromUserId:Number(session?.user?.id),
                amount:Number(amount),
                time: new Date(),
                from:String(session?.user?.name),
                to:String(user2.name)
            }
        })

    })

    }catch(e){
        console.error(e);
        return {
            msg: "transaction failed"
        }
    }

    return {
        message: "Done"
    }
}