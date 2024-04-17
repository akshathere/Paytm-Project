"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTranfer(number:string, amount: string) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
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
