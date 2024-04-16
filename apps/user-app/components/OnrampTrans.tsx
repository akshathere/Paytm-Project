import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import db from "@repo/db/client"
async function getTransactions(){
    const session = await getServerSession(authOptions);
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    console.log(String(session?.user?.onRampTransaction))
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
export async function OnRampTransaction(){
    const res=await getTransactions();
    console.log(res[0]?.status=='failure',"cec")
    if(!res.length){
        return <div>
            <div className="text-xl p-2">
                Transactions
            </div>
        <div className="flex justify-center items-center my-8">
        No Recent Transaction
    </div>
    </div>
    }
    return <Card>
        <div className="text-xl p-2">
                Transactions
            </div>
    <div className="pt-2">
        {res.map(t => <div className="flex justify-between">
            <div>
                <div className="text-sm">
                    Received INR
                </div>
                <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                </div>
            </div>
            {t.status=='success'? <div className="flex flex-col text-green-500 justify-center">
                + Rs {t.amount / 100}
            </div>: <div className="flex flex-col text-red-600 justify-center">
                + Rs {t.amount / 100}
            </div>}
            

        </div>)}
    </div>
</Card>
}