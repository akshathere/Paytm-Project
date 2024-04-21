"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { p2pTranfer } from "../../lib/actions/p2pTranfer";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh] w-[80vh]">
      <div className="w-80 ml-96 mt-48 ">
        <Card>
          <div className="text-xl border-b pb-1">Send</div>
          <div className="min-w-72 pt-2">
            <label>Number</label>
            <input
              className="border border-slate-200 shadow-lg p-2 my-4 bg-[#E8E9EB] w-full rounded-md h-9"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              placeholder="Number"
            ></input>
            <label>Amount</label>
            <input
              className="border border-slate-200 shadow-lg p-2 my-4 bg-[#E8E9EB] w-full rounded-md h-9"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              placeholder="Amount"
            ></input>
            <div className="pt-4 flex justify-center">
              <Button onClick={()=>{
                p2pTranfer(number,Number(amount)*100)}}>Send</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
