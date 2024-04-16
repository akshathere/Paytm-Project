"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export function AddMoney() {
    return <Card>
        <div className="text-lg border-t-2 border-[#D8D9DE]">
            Add money
        </div>
        <div className="pt-4 pr-4">
            <label>Amount</label>
            <input className="border border-slate-200 shadow-lg p-2 my-4 bg-[#E8E9EB] w-full rounded-md h-9" placeholder="Amount"></input>
            <label>Bank</label>
            <select id="amount" className="border border-slate-200 shadow-lg p-2 my-4 bg-[#E8E9EB] w-full rounded-md h-9">
                <option value="HDFC">HDFC Bank</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
                <option value="Union">Union Bank</option>
                <option value="Capital">Capital Small Finance Bank</option>
                <option value="SBI">SBI Bank</option>
            </select>
        </div>
        <div>
            
            <Button onClick={()=>{console.log("hi there")}}>Add Money</Button>
        </div>
    </Card>
}