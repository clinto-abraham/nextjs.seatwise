
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';

type DonationChartProps = {
    data: {
        eventLabel: string;
        amount: number;
    }[];
};

export function DonationChart({ data }: DonationChartProps) {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        type="number" 
                        tickFormatter={(value) => `INR ${(value as number).toLocaleString('en-IN')}`}
                    />
                    <YAxis 
                        dataKey="eventLabel" 
                        type="category" 
                        width={150}
                        tick={{ fontSize: 12, width: 200 }}
                        interval={0}
                    />
                    <Tooltip
                        formatter={(value) => [`INR ${(value as number).toLocaleString('en-IN')}`, "Amount Spent"]}
                        wrapperStyle={{ zIndex: 10 }}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" name="Amount Spent (INR)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
