'use client'
import React, { useState, useEffect } from 'react';
import { AlertTriangle, History, Fish, Settings, Thermometer, Droplets, Camera, Map, Activity, Calendar, Clock, CheckCircle, Zap, Wind, Sun, Bell, Download, RefreshCw, TrendingUp, TrendingDown, Minus, AlertCircle, Play } from 'lucide-react';
import SimpleChart from '@/components/dashboard/SimpleChart';

// Mock Data
const pond = {
  name: "North Pond Alpha",
  location: "Sector 7, Farm Complex",
  lastUpdated: "2 minutes ago",
  status: "Online"
};

const chartData = [
  { name: 'Mon', Ph: 7.2, Temp: 24, Turbidity: 30, Nh3: 0.1, No2: 0.05, No3: 10, O2: 8.5 },
  { name: 'Tue', Ph: 7.1, Temp: 24.2, Turbidity: 32, Nh3: 0.12, No2: 0.06, No3: 11, O2: 8.4 },
  { name: 'Wed', Ph: 7.3, Temp: 23.9, Turbidity: 28, Nh3: 0.09, No2: 0.04, No3: 9, O2: 8.6 },
  { name: 'Thu', Ph: 7.2, Temp: 24.5, Turbidity: 35, Nh3: 0.15, No2: 0.07, No3: 12, O2: 8.2 },
  { name: 'Fri', Ph: 7.4, Temp: 24.8, Turbidity: 33, Nh3: 0.11, No2: 0.05, No3: 10.5, O2: 8.7 },
  { name: 'Sat', Ph: 7.3, Temp: 25, Turbidity: 31, Nh3: 0.1, No2: 0.06, No3: 11.5, O2: 8.5 },
  { name: 'Sun', Ph: 8.1, Temp: 28, Turbidity: 29, Nh3: 0.13, No2: 0.05, No3: 10, O2: 8.6 },
];

const lines = [
  { key: 'Ph', name: 'pH', color: '#3b82f6', unit: '' },
  { key: 'Temp', name: 'Temperature', color: '#ef4444', unit: '°C' },
  { key: 'Turbidity', name: 'Turbidity', color: '#f59e0b', unit: 'NTU' },
  { key: 'Nh3', name: 'Ammonia (NH3)', color: '#84cc16', unit: 'ppm' },
  { key: 'No2', name: 'Nitrite (NO2)', color: '#14b8a6', unit: 'ppm' },
  { key: 'No3', name: 'Nitrate (NO3)', color: '#a855f7', unit: 'ppm' },
  { key: 'O2', name: 'Oxygen (O2)', color: '#f97316', unit: 'mg/L' },
];

const thresholds = {
  Temp: { min: 22, max: 26, name: 'Temperature', optimal: 24 },
  Ph: { min: 6.8, max: 7.8, name: 'pH Level', optimal: 7.2 },
  Turbidity: { min: 0, max: 50, name: 'Turbidity', optimal: 25 },
  Nh3: { min: 0, max: 0.2, name: 'Ammonia', optimal: 0.05 },
  No2: { min: 0, max: 0.1, name: 'Nitrite', optimal: 0.03 },
  O2: { min: 6, max: 10, name: 'Oxygen', optimal: 8 },
};

const recentActivity = [
  { time: '14:30', action: 'Automatic feeding completed', type: 'success' },
  { time: '12:15', action: 'pH levels adjusted', type: 'info' },
  { time: '09:45', action: 'Water quality test performed', type: 'info' },
  { time: '08:20', action: 'Temperature spike detected', type: 'warning' },
];

const upcomingTasks = [
  { time: '16:00', task: 'Evening feeding cycle', priority: 'high' },
  { time: '18:30', task: 'Water quality check', priority: 'medium' },
  { time: '20:00', task: 'Filter maintenance', priority: 'low' },
  { time: '22:00', task: 'Night camera check', priority: 'medium' },
];

const latestData = chartData[chartData.length - 1];
const previousData = chartData[chartData.length - 2];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('general dashboard');
  
  return (
    <div className="w-64 bg-gray-800 h-screen p-6 border-r border-gray-700 flex flex-col">
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('general dashboard')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'general dashboard' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          general dashboard
        </button>
        
        <button
          onClick={() => setActiveSection('real time values')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
            activeSection === 'real time values' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          real time values
        </button>
      </div>
    </div>
  );
};

const PondPage = ({ pondId = "pond-1" }) => {
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    const newAlerts = [];
    for (const key in thresholds) {
      const threshold = thresholds[key];
      const value = latestData[key];
      const line = lines.find(l => l.key === key);
      
      if (typeof value === 'number') {
        if (value < threshold.min) {
          newAlerts.push({
            type: 'critical',
            message: `${threshold.name} is critically low: ${value}${line?.unit}`,
            recommendation: `Should be above ${threshold.min}${line?.unit}`
          });
        } else if (value > threshold.max) {
          newAlerts.push({
            type: 'critical', 
            message: `${threshold.name} is critically high: ${value}${line?.unit}`,
            recommendation: `Should be below ${threshold.max}${line?.unit}`
          });
        } else if (Math.abs(value - threshold.optimal) > (threshold.max - threshold.min) * 0.3) {
          newAlerts.push({
            type: 'warning',
            message: `${threshold.name} is outside optimal range: ${value}${line?.unit}`,
            recommendation: `Optimal level is ${threshold.optimal}${line?.unit}`
          });
        }
      }
    }
    setAlerts(newAlerts);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTrend = (current, previous) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-green-500', text: 'trending up' };
    if (current < previous) return { icon: TrendingDown, color: 'text-red-500', text: 'trending down' };
    return { icon: Minus, color: 'text-gray-500', text: 'stable' };
  };

  const getStatusColor = (key, value) => {
    const threshold = thresholds[key];
    if (!threshold) return 'bg-gray-100 text-gray-800';
    
    if (value < threshold.min || value > threshold.max) {
      return 'bg-red-50 text-red-800 border-red-200';
    }
    if (Math.abs(value - threshold.optimal) > (threshold.max - threshold.min) * 0.3) {
      return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    }
    return 'bg-green-50 text-green-800 border-green-200';
  };

  const statusCards = [
    { icon: Thermometer, key: 'Temp', name: 'Temperature', color: 'text-red-500', bgColor: 'bg-red-50' },
    { icon: Droplets, key: 'Ph', name: 'pH Level', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { icon: Wind, key: 'O2', name: 'Oxygen', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { icon: Sun, key: 'Turbidity', name: 'Turbidity', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  ];

  const criticalAlerts = alerts.filter(a => a.type === 'critical');
  const warningAlerts = alerts.filter(a => a.type === 'warning');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{pond.name}</h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-600">{pond.location}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-500">{pond.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Last updated: {pond.lastUpdated}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Alerts */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  System Status
                </h2>
                {alerts.length === 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">All systems normal</span>
                  </div>
                )}
              </div>
            </div>
            
            {alerts.length > 0 && (
              <div className="p-6 space-y-4">
                {criticalAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-red-900">{alert.message}</p>
                      <p className="text-sm text-red-700 mt-1">{alert.recommendation}</p>
                    </div>
                  </div>
                ))}
                
                {warningAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-yellow-900">{alert.message}</p>
                      <p className="text-sm text-yellow-700 mt-1">{alert.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Config, History, Fish Inventory Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl shadow-md border border-gray-200 transition-colors">
              <Settings className="w-4 h-4" />
              config
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl shadow-md border border-gray-200 transition-colors">
              <History className="w-4 h-4" />
              history
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl shadow-md border border-gray-200 transition-colors">
              <Fish className="w-4 h-4" />
              fish inventory
            </button>
          </div>

          {/* Real Time Values Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statusCards.map(card => {
              const line = lines.find(l => l.key === card.key);
              const value = latestData[card.key];
              const prevValue = previousData[card.key];
              const trend = getTrend(value, prevValue);
              const statusColor = getStatusColor(card.key, value);
              
              return (
                <div key={card.key} className={`bg-white rounded-2xl shadow-lg border border-slate-200 p-6 ${statusColor}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <trend.icon className={`w-4 h-4 ${trend.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{card.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {value}{line?.unit}
                    </p>
                    <p className={`text-sm ${trend.color}`}>
                      {trend.text} from {prevValue}{line?.unit}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Charts */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Water Quality Trends</h2>
              <p className="text-gray-600">Monitor key parameters over the past week</p>
            </div>
            <SimpleChart data={chartData} lines={lines} />
          </div>

          {/* Bottom Grid: live camera, map, recent activity, upcoming tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Camera */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                live camera
              </h2>
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300">Camera offline</p>
                  <p className="text-sm text-slate-500">Reconnecting...</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                map
              </h2>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map view</p>
                  <p className="text-sm text-gray-500">GPS: 40.7128° N, 74.0060° W</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                recent activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 text-sm mt-1 w-12">{activity.time}</div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium">{activity.action}</p>
                      <div className={`inline-block w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                upcoming tasks
              </h2>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 text-sm mt-1 w-12">{task.time}</div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium">{task.task}</p>
                      <div className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {task.priority}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PondPage;
