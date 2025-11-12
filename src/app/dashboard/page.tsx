'use client'
import React, { useState } from 'react';
import { Users, Waves, Activity, Bell, User } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import SimpleChart from '@/components/dashboard/SimpleChart';
import DataTable from '@/components/dashboard/DataTable';
import { mockDashboardStats, mockPondReports } from '@/lib/mockData';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Sample data for charts
  const farmerGrowthData = [800, 950, 1100, 1250, 1400, 1520, 1650, 1750, 1850, 1900, 1950, 2000];
  const pondGrowthData = [8000, 9500, 11000, 12500, 14000, 15200, 16500, 17000, 17500, 17800, 17900, 18000];

  // Table columns for reports
  const reportColumns = [
    { key: 'pondId', label: 'Pond ID', sortable: true },
    { key: 'pondName', label: 'Name', sortable: true },
    { key: 'farmerName', label: 'Farmer', sortable: true },
    { key: 'issue', label: 'Issue', sortable: false },
    { key: 'severity', label: 'Severity', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const renderDashboardContent = () => {
    switch (currentPage) {
      case 'pond-owners':
        return <div className="p-8"><h1 className="text-2xl font-bold">Pond Owners Management</h1></div>;
      case 'admin-requests':
        return <div className="p-8"><h1 className="text-2xl font-bold">Admin Requests</h1></div>;
      default:
        return (
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Connors</span>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Pond Owners"
                value={mockDashboardStats.totalFarmers}
                icon={Users}
                trend={{
                  value: mockDashboardStats.farmerGrowth.percentage,
                  isPositive: true
                }}
                chart={<SimpleChart data={farmerGrowthData.slice(-6)} color="#3b82f6" />}
              />

              <StatCard
                title="Ponds"
                value={mockDashboardStats.totalPonds}
                icon={Waves}
                trend={{
                  value: mockDashboardStats.pondGrowth.percentage,
                  isPositive: true
                }}
                chart={<SimpleChart data={pondGrowthData.slice(-6)} color="#10b981" />}
              />

              <StatCard
                title="Sensors"
                value={mockDashboardStats.totalSensors}
                icon={Activity}
                trend={{
                  value: 95.0,
                  isPositive: true
                }}
                chart={<SimpleChart data={[32000, 33000, 34000, 35000, 35500, 36000]} color="#f59e0b" />}
              />

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Pond Status</h3>
                </div>
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(mockDashboardStats.healthyPonds / mockDashboardStats.totalPonds) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round((mockDashboardStats.healthyPonds / mockDashboardStats.totalPonds) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Critical</span>
                    </div>
                    <span className="font-medium">{mockDashboardStats.criticalPonds}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Healthy</span>
                    </div>
                    <span className="font-medium">{mockDashboardStats.healthyPonds}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Warning</span>
                    </div>
                    <span className="font-medium">{mockDashboardStats.warningPonds}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Table */}
            <DataTable
              title="Reports"
              columns={reportColumns}
              data={mockPondReports}
              searchable={true}
              filterable={true}
              exportable={true}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        {renderDashboardContent()}
      </div>
    </div>
  );
}