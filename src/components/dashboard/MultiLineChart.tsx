'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface LineData {
  key: string;
  color: string;
  unit: string;
}

interface MultiLineChartProps {
  data: DataPoint[];
  lines: LineData[];
}

interface Payload {
  name: string;
  value: number;
  color: string;
  payload: {
    unit: string;
  }
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{label}</p>
        {payload.map((pld, index) => (
          <div key={index} style={{ color: pld.color }}>
            {pld.name}: {pld.value} {pld.payload.unit}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const MultiLineChart: React.FC<MultiLineChartProps> = ({ data, lines }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {lines.map((line, index) => (
          <defs key={`defs-${index}`}>
            <linearGradient id={`color${line.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={line.color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={line.color} stopOpacity={0}/>
            </linearGradient>
          </defs>
        ))}
        {lines.map((line, index) => (
          <Area key={`area-${index}`} type="monotone" dataKey={line.key} stroke={line.color} fillOpacity={1} fill={`url(#color${line.key})`} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MultiLineChart;
