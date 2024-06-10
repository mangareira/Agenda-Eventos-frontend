import { Card } from "@/app/components/DashBoard/Card";
import { Chart } from "@/app/components/DashBoard/Chart";
import { Transactions } from "@/app/components/DashBoard/transactions";

export default function dashboard() {
    return (
        <div className="flex gap-5 mt-5">
            <div className="flex-[3] flex flex-col gap-5">
                <div className="flex gap-5 justify-between">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <Transactions/>
                <Chart />
            </div>
        </div>
    )
}