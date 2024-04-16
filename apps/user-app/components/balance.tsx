import { Card } from "@repo/ui/card";

export function Balance() {
    return <div className="col-span-1">
    <Card>
        <div className="w-full p-2 pb-3 text-xl border-b border-slate-300">Balance</div>
        <div className="w-full flex justify-between">
            <div className="p-2 border-b border-slate-300">Unlocked Balance</div>
            <div className="order-last">0 INR</div>
        </div>
        <div>
            <div className="p-2 border-b border-slate-300">Total Locked Balance</div>
        </div>
        <div>
            <div className="p-2 border-b border-slate-300">Total Balance</div>
        </div>
    </Card>
    </div>
}