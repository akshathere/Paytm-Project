"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select"
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];
export function AddMoney() {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    
    return <Card>
        <div className="text-lg pb-2 border-b-2 border-[#D8D9DE]">
            Add money
        </div>
        <div className="pt-4 pr-4">
            <label>Amount</label>
            <input className="border border-slate-200 shadow-lg p-2 my-4 bg-[#E8E9EB] w-full rounded-md h-9" onChange={(e)=>{
                setValue(Number(e.target.value))
            }} placeholder="Amount"></input>
            <label>Bank</label>
            <Select onSelect={(val:any) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === val)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(x => x.name === val)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        </div>
        <div className="mt-3">
            
            <Button onClick={async () => {
                await createOnRampTransaction(provider, value)
                window.location.href = redirectUrl || "";
            }}>Add Money</Button>
        </div>
    </Card>
}