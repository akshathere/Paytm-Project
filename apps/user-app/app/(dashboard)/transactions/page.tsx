import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/auth";
async function getTransactions() {
  const session = await getServerSession(authOptions);

  const txns = await db.p2Ptrans.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.time,
    amount: t.amount,
    from: t.from,
    to: t.to,
  }));
}
export default async function () {
  const res = await getTransactions();
  if (!res.length) {
    return (
      <div>
        <div className="text-xl p-2">Transactions</div>
        <div className="flex justify-center items-center my-8">
          No Recent Transaction
        </div>
      </div>
    );
  }
  return (<div>
    <Card>
      <div className="text-xl p-2 w-96 border-b">Transactions</div>
      <div className="pt-2">
        {res.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">From  {t.from} To {t.to}</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
              <div className="flex flex-col text-green-500 justify-center">
                + Rs {t.amount / 100}
              </div>
            
          </div>
        ))}
      </div>
    </Card>
    </div>
  );
}
