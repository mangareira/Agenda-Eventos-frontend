'use client'
import { transactionsData } from "@/app/utils/transactionsData"
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const Chart = () => {
    
    return (
        <div className="h-[450px] bg-green_admin p-5 rounded-[10px] text-white">
            <h2 className="font-extralight text-gray-300 mb-5">Weekly Recap</h2>
            <ResponsiveContainer width="100%" height="90%"style={{accentColor: "#fff"}}>
                
                <LineChart
                width={500}
                height={300}
                data={transactionsData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{background:"#40A578", border:"none", borderRadius: "10px"}}/>
                <Legend />
                <Line type="monotone" dataKey="visit" stroke="#ffffff" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="click" stroke="#000000" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}