import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

/**
 * Enhanced SimpleChart using Recharts
 * - Consistent axes for all metrics with dynamic domain
 * - Responsive container
 * - Grid, axes labels, tooltips, and legend
 * - Smooth lines and distinct colors
 */
const SimpleChart = ({ data, lines }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(lines.map(l => l.key));

  const toggleMetric = key => {
    setSelectedMetrics(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // calculate combined min and max across selected metrics
  const combinedValues = selectedMetrics.flatMap(key => data.map(d => d[key]));
  const combinedMin = Math.min(...combinedValues);
  const combinedMax = Math.max(...combinedValues);

  return (
    <div className="space-y-4">
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2">
        {lines.map(line => (
          <button
            key={line.key}
            onClick={() => toggleMetric(line.key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all border-2
              ${selectedMetrics.includes(line.key)
                ? 'bg-blue-100 text-blue-700 border-blue-200'
                : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              {line.name}
            </div>
          </button>
        ))}
      </div>

      {/* Improved Line Chart */}
      <div className="h-64 bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[combinedMin * 0.9, combinedMax * 1.1]}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {lines.map(line =>
              selectedMetrics.includes(line.key) && (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleChart;
