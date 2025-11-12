'use client'
import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import { addDays, format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import DataTable from '@/components/dashboard/DataTable';
import MultiLineChart from '@/components/dashboard/MultiLineChart';

// Generate more extensive mock data
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      name: format(date, 'MMM d'),
      date: date.toISOString(),
      Temp: 24 + Math.sin(i / 10) * 2 + Math.random() * 0.5,
      Ph: 7.2 + Math.cos(i / 15) * 0.3 + Math.random() * 0.1,
      O2: 8.5 - Math.sin(i / 5) * 1 + Math.random() * 0.2,
      Turbidity: 30 + Math.cos(i / 8) * 5 + Math.random() * 2,
    });
  }
  return data;
};

const allHistoryData = generateMockData();

const lines = [
  { key: 'Temp', name: 'Temperature', color: '#ef4444', unit: '°C' },
  { key: 'Ph', name: 'pH', color: '#3b82f6', unit: '' },
  { key: 'O2', name: 'Oxygen', color: '#f97316', unit: 'mg/L' },
  { key: 'Turbidity', name: 'Turbidity', color: '#f59e0b', unit: 'NTU' },
];

const historyTableColumns = [
    { key: 'date', label: 'Timestamp', sortable: true, render: (date: string) => format(new Date(date), 'yyyy-MM-dd HH:mm') },
    { key: 'Temp', label: 'Temp (°C)', sortable: true, render: (val: number) => val.toFixed(2) },
    { key: 'Ph', label: 'pH', sortable: true, render: (val: number) => val.toFixed(2) },
    { key: 'O2', label: 'Oxygen (mg/L)', sortable: true, render: (val: number) => val.toFixed(2) },
    { key: 'Turbidity', label: 'Turbidity (NTU)', sortable: true, render: (val: number) => val.toFixed(2) },
];

const HistoryPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  const [selectedMetrics, setSelectedMetrics] = useState(['Temp', 'Ph']);

  const toggleMetric = (key: string) => {
    setSelectedMetrics(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const filteredData = useMemo(() => {
    if (!date?.from || !date?.to) return [];
    return allHistoryData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= date.from! && itemDate <= date.to!;
    });
  }, [date]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Pond History</h1>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Interactive Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sensor Trends</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {lines.map(line => (
            <button
              key={line.key}
              onClick={() => toggleMetric(line.key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all border-2 ${
                selectedMetrics.includes(line.key)
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                {line.name}
              </div>
            </button>
          ))}
        </div>
        <div className="h-96">
          <MultiLineChart
            data={filteredData}
            lines={lines.filter(l => selectedMetrics.includes(l.key))}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Detailed Sensor Log"
        columns={historyTableColumns}
        data={filteredData}
      />
    </div>
  );
};

export default HistoryPage;
