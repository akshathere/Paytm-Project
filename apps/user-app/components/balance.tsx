import { Card } from "@repo/ui/card";
import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
async function getBalance(){
    const session = await getServerSession(authOptions);
    const res=await db.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return {
        amount:res?.amount || 0,
        locker:res?.locked || 0
    }
}
export async function Balance(){
    const res=await getBalance();

    return<Card>
        <div className="w-full p-2 pb-3 text-xl border-b border-slate-300">Balance</div>
        <div className="w-full flex justify-between">
            <div className="p-2 border-b border-slate-300">Unlocked Balance</div>
            <div className="ml-80 order-last">{(res.amount)/100} INR</div>
        </div> 
        <div className="flex">
            <div className="p-2 border-b border-slate-300">Total Locked Balance</div>
            <div className="ml-80 order-last">{(res.locker)/100} INR</div>
        </div>
        <div className="flex">
            <div className="p-2 pr-16 border-b border-slate-300">Total Balance</div>
            <div className="ml-80 pl-1 order-last">{(res.amount+res.locker)/100} INR</div>
        </div>
    </Card>
}