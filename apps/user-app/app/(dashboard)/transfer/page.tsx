import { AddMoney } from "../../../components/AddMoney";
import { Balance } from "../../../components/balance";

export default function() {
    return <div>
        <div className="col-span-2 text-[#6a51a6] text-3xl font-bold py-10">
            TRANSFER
        </div>
        <div className="grid grid-col-2 grid-flow-col ">
        <div className="col-span-1">
        
        <AddMoney></AddMoney>
        </div>
        <div className="w-full" >
            <Balance></Balance>
        </div>
    </div>
    </div>
}