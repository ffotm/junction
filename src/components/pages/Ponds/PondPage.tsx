'use client'
import React, { useState, useEffect } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  Camera,
  Settings,
  History,
  AlertTriangle,
  Fish,
  Calendar,
  FileText,
  Bell,
  Download,
  Share2,
  Plus,
  Eye,
  Zap
} from 'lucide-react';

// CountUp component for animated numbers
interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  end: number;
  duration?: number;
}
const CountUp: React.FC<CountUpProps> = ({ end, duration = 1, ...props }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    let frame = 0;
    const animate = () => {
      frame++;
      start += increment;
      if (start < end) {
        setValue(Number(start.toFixed(0)));
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };
    animate();
    // eslint-disable-next-line
  }, [end, duration]);
  return <span {...props}>{value.toLocaleString()}</span>;
};

const PondDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'pH level slightly elevated', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Feeding scheduled in 30 minutes', time: '1 hour ago' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sensorData = {
    temperature: { value: 24.5, unit: '°C', status: 'normal', trend: 'stable' },
    ph: { value: 7.8, unit: 'pH', status: 'warning', trend: 'rising' },
    oxygen: { value: 8.2, unit: 'mg/L', status: 'good', trend: 'stable' },
    turbidity: { value: 2.1, unit: 'NTU', status: 'normal', trend: 'falling' }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'danger': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'rising': return '↗️';
      case 'falling': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pond #A-001</h1>
              <p className="text-gray-600 mt-1">Tilapia Production Tank - Zone A</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {alerts.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-fade-in">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 animate-pulse" />
              <div>
                <p className="text-yellow-800 font-medium">Active Alerts ({alerts.length})</p>
                <p className="text-yellow-700 text-sm mt-1">
                  {alerts[0].message} - {alerts[0].time}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <Eye className="h-4 w-4 mr-2" />
            Dashboard
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <Settings className="h-4 w-4 mr-2" />
            Config
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <History className="h-4 w-4 mr-2" />
            History
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <Fish className="h-4 w-4 mr-2" />
            Fish Inventory
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <Calendar className="h-4 w-4 mr-2" />
            Feeding Schedule
          </button>
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-transform duration-200 transform hover:scale-105 focus:scale-95">
            <FileText className="h-4 w-4 mr-2" />
            Maintenance Log
          </button>
        </div>

        {/* Real-time Sensor Data */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Sensor Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sensorData).map(([key, data], idx) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-sm border p-6 transition-transform duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {key === 'temperature' && <Thermometer className="h-5 w-5 text-red-500 mr-2 animate-pulse" />}
                    {key === 'ph' && <Droplets className="h-5 w-5 text-blue-500 mr-2 animate-pulse" />}
                    {key === 'oxygen' && <Wind className="h-5 w-5 text-green-500 mr-2 animate-pulse" />}
                    {key === 'turbidity' && <Activity className="h-5 w-5 text-purple-500 mr-2 animate-pulse" />}
                    <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(data.status)}`}>
                    {data.status}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      <CountUp end={data.value} duration={1} />
                    </p>
                    <p className="text-sm text-gray-500">{data.unit}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg">{getTrendIcon(data.trend)}</span>
                    <p className="text-xs text-gray-500">{data.trend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats & Camera Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  <CountUp end={2450} duration={1.2} />
                </p>
                <p className="text-sm text-gray-600">Fish Count</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  <CountUp end={94} duration={1.2} />%
                </p>
                <p className="text-sm text-gray-600">Survival Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  <CountUp end={180} duration={1.2} />g
                </p>
                <p className="text-sm text-gray-600">Avg Weight</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  <CountUp end={45} duration={1.2} />
                </p>
                <p className="text-sm text-gray-600">Days Old</p>
              </div>
            </div>
          </div>

          {/* Camera Feed */}
          <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Live Camera</h3>
              <Camera className="h-5 w-5 text-gray-400" />
            </div>
            <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center animate-pulse">
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Camera feed would appear here</p>
              </div>
            </div>
            <button className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105 text-sm">
              View Full Screen
            </button>
          </div>
        </div>

        {/* Recent Activity & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm transition-opacity duration-500 hover:opacity-80">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-600">Fed 2.5kg at 08:30 AM</span>
              </div>
              <div className="flex items-center text-sm transition-opacity duration-500 hover:opacity-80">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-600">Water quality test completed</span>
              </div>
              <div className="flex items-center text-sm transition-opacity duration-500 hover:opacity-80">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-600">pH adjustment made</span>
              </div>
              <div className="flex items-center text-sm transition-opacity duration-500 hover:opacity-80">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-600">Filter system cleaned</span>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm transition-opacity duration-500 hover:opacity-80">
                <span className="text-gray-600">Next feeding</span>
                <span className="font-medium text-gray-900">2:30 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm transition-opacity duration-500 hover:opacity-80">
                <span className="text-gray-600">Water quality test</span>
                <span className="font-medium text-gray-900">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between text-sm transition-opacity duration-500 hover:opacity-80">
                <span className="text-gray-600">Equipment maintenance</span>
                <span className="font-medium text-gray-900">In 3 days</span>
              </div>
              <div className="flex items-center justify-between text-sm transition-opacity duration-500 hover:opacity-80">
                <span className="text-gray-600">Health inspection</span>
                <span className="font-medium text-gray-900">Next week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105">
            <Bell className="h-4 w-4 mr-2" />
            Alerts Settings
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default PondDashboard;