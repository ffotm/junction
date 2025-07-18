'use client'
import React from 'react';
import { AlertTriangle, History, Fish, Settings, Thermometer, Droplets, Camera, Map, Activity, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MultiLineChart from '@/components/dashboard/MultiLineChart';
import MapView from '@/components/dashboard/Map';

const PondPage = ({ pondId }: { pondId: string }) => {
  // Mock data for a single pond
  const pond = {
    name: "Pond Alpha",
    location: "North Section",
    lastUpdated: "2 minutes ago",
    alerts: 3,
    temp: 24.5,
    ph: 7.2,
  };

  const chartData = [
    { name: 'Mon', Ph: 7.2, Temp: 24, Turbidity: 30, Nh3: 0.1, No2: 0.05, No3: 10, O2: 8.5 },
    { name: 'Tue', Ph: 7.1, Temp: 24.2, Turbidity: 32, Nh3: 0.12, No2: 0.06, No3: 11, O2: 8.4 },
    { name: 'Wed', Ph: 7.3, Temp: 23.9, Turbidity: 28, Nh3: 0.09, No2: 0.04, No3: 9, O2: 8.6 },
    { name: 'Thu', Ph: 7.2, Temp: 24.5, Turbidity: 35, Nh3: 0.15, No2: 0.07, No3: 12, O2: 8.2 },
    { name: 'Fri', Ph: 7.4, Temp: 24.8, Turbidity: 33, Nh3: 0.11, No2: 0.05, No3: 10.5, O2: 8.7 },
    { name: 'Sat', Ph: 7.3, Temp: 25, Turbidity: 31, Nh3: 0.1, No2: 0.06, No3: 11.5, O2: 8.5 },
    { name: 'Sun', Ph: 7.2, Temp: 24.7, Turbidity: 29, Nh3: 0.13, No2: 0.05, No3: 10, O2: 8.6 },
  ];

  const lines = [
    { key: 'Ph', color: '#3b82f6', unit: '' },
    { key: 'Temp', color: '#ef4444', unit: '°C' },
    { key: 'Turbidity', color: '#f59e0b', unit: 'NTU' },
    { key: 'Nh3', color: '#84cc16', unit: 'ppm' },
    { key: 'No2', color: '#14b8a6', unit: 'ppm' },
    { key: 'No3', color: '#a855f7', unit: 'ppm' },
    { key: 'O2', color: '#f97316', unit: 'mg/L' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Feed fish', time: 'in 2 hours' },
    { id: 2, task: 'Check water filter', time: 'in 4 hours' },
  ];

  const recentActivity = [
    { id: 1, activity: 'Cleaned pond', time: '2 hours ago' },
    { id: 2, activity: 'Added new fish', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{pond.name}</h1>
            <p className="text-gray-500 mt-1">{pond.location}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button variant="outline"><Settings className="w-4 h-4 mr-2"/>Config</Button>
            <Button variant="outline"><History className="w-4 h-4 mr-2"/>History</Button>
            <Button variant="outline"><Fish className="w-4 h-4 mr-2"/>Inventory</Button>
          </div>
        </div>

        {/* Alerts */}
        {pond.alerts > 0 && (
          <Card className="mb-6 bg-yellow-50 border-yellow-400">
            <CardHeader className="flex flex-row items-center space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <CardTitle className="text-yellow-800">You have {pond.alerts} active alerts</CardTitle>
            </CardHeader>
          </Card>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart - takes 2 columns */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Water Quality Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <MultiLineChart data={chartData} lines={lines} />
            </CardContent>
          </Card>

          {/* Camera Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Camera className="w-5 h-5 mr-2"/>Live Feed</CardTitle>
            </CardHeader>
            <CardContent className="aspect-video bg-gray-900 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Camera feed is offline</p>
            </CardContent>
          </Card>

          {/* Map View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center"><Map className="w-5 h-5 mr-2"/>Pond Location</CardTitle>
            </CardHeader>
            <CardContent className="aspect-video overflow-hidden rounded-md">
              <MapView />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Activity className="w-5 h-5 mr-2"/>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map(item => (
                  <li key={item.id} className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.activity}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Calendar className="w-5 h-5 mr-2"/>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingTasks.map(item => (
                  <li key={item.id} className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.task}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PondPage;
