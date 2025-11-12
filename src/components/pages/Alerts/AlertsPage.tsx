'use client'
import React, { useState, useMemo } from 'react';
import { Bell, RefreshCw, BarChart2, AlertTriangle, ShieldAlert, BellRing, ShieldCheck, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AlertDetailsModal from './AlertDetailsModal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type AlertStatus = 'all' | 'critical' | 'warning' | 'info' | 'active' | 'resolved';
type AlertPriority = 'critical' | 'warning' | 'info';

interface Alert {
  id: string;
  title: string;
  category: string;
  description: string;
  pond: string;
  location: string;
  timestamp: Date;
  currentValue: string;
  threshold: string;
  priority: AlertPriority;
  status: 'active' | 'unacknowledged' | 'resolved';
  recommendedActions: string[];
  smartSuggestions?: string[];
}

// Mock Data
const mockAlerts: Alert[] = [
  { id: 'alert1', title: 'Low Oxygen Level', category: 'water quality', description: 'Dissolved oxygen has dropped below 4.5 mg/L', pond: 'Main Pond #1', location: 'Section A', timestamp: new Date(), currentValue: '4.2 mg/L', threshold: '5 mg/L', priority: 'critical', status: 'active', recommendedActions: ['Turn on aerator', 'Check pump system'] },
  { id: 'alert2', title: 'High Temperature', category: 'temperature', description: 'Water temperature exceeds optimal range', pond: 'Secondary Pond #2', location: 'Section B', timestamp: new Date(Date.now() - 1000 * 60 * 22), currentValue: '28.5°C', threshold: '26°C', priority: 'warning', status: 'unacknowledged', recommendedActions: ['Increase shade cover', 'Check cooling system'] },
  { id: 'alert3', title: 'Scheduled Maintenance Due', category: 'maintenance', description: 'Filter system maintenance scheduled', pond: 'Breeding Pond #3', location: 'Section C', timestamp: new Date(Date.now() - 1000 * 60 * 60), currentValue: 'N/A', threshold: 'N/A', priority: 'info', status: 'unacknowledged', recommendedActions: ['Perform filter cleaning cycle'] },
  { id: 'alert4', title: 'pH Level Spike', category: 'water quality', description: 'pH has risen to a critical level', pond: 'Main Pond #1', location: 'Section A', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), currentValue: '8.5', threshold: '7.8', priority: 'critical', status: 'resolved', recommendedActions: ['Administer pH down solution'] },
  { id: 'alert5', title: 'Low Feed Level', category: 'inventory', description: 'Automatic feeder is low on feed', pond: 'All Ponds', location: 'N/A', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), currentValue: '15%', threshold: '20%', priority: 'warning', status: 'resolved', recommendedActions: ['Refill automatic feeder'] },
  { id: 'alert6', title: 'Low Battery', category: 'sensor', description: 'Oxygen Sensor battery is critically low.', pond: 'Main Pond #1', location: 'Section A', timestamp: new Date(Date.now() - 1000 * 60 * 30), currentValue: '15%', threshold: '20%', priority: 'warning', status: 'active', recommendedActions: ['Replace battery for sensor O2-301'] },
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<AlertStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const filterMatch = filter === 'all' || alert.status === filter || alert.priority === filter;
      const searchMatch = searchTerm === '' || alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      return filterMatch && searchMatch;
    });
  }, [alerts, filter, searchTerm]);

  const stats = useMemo(() => ({
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.priority === 'critical').length,
    unacknowledged: alerts.filter(a => a.status === 'unacknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  }), [alerts]);

  const getPriorityIcon = (priority: AlertPriority) => {
    switch (priority) {
      case 'critical': return <ShieldAlert className="w-6 h-6 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'info': return <Bell className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BellRing /> Alerts & Notifications
            </h1>
            <p className="text-gray-600">Monitor all pond alerts and system notifications</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><RefreshCw className="w-5 h-5" /></Button>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Total Alerts</p><p className="text-2xl font-bold">{stats.total}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Active</p><p className="text-2xl font-bold">{stats.active}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Critical</p><p className="text-2xl font-bold">{stats.critical}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Unacknowledged</p><p className="text-2xl font-bold">{stats.unacknowledged}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-500">Resolved</p><p className="text-2xl font-bold">{stats.resolved}</p></CardContent></Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'critical', 'warning', 'info', 'active', 'resolved'] as AlertStatus[]).map(f => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)} className="capitalize">{f}</Button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search alerts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64" />
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <Card key={alert.id} className="p-4 flex items-start gap-4">
            <div className="flex-shrink-0">{getPriorityIcon(alert.priority)}</div>
            <div className="flex-grow">
              <h3 className="font-bold">{alert.title} <Badge variant="secondary">{alert.category}</Badge></h3>
              <p className="text-sm text-gray-600">{alert.description}</p>
              <p className="text-xs text-gray-500 mt-1">{alert.pond} &bull; {alert.timestamp.toLocaleTimeString()} ago &bull; {alert.currentValue}</p>
            </div>
            <div className="flex items-center gap-2">
              {alert.status !== 'resolved' && <Button size="sm">Resolve</Button>}
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(alert)}>
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </Card>
        ))}
        {filteredAlerts.length === 0 && (
          <Card className="p-12 text-center text-gray-500">
            No alerts match your criteria.
          </Card>
        )}
      </div>
      <AlertDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alert={selectedAlert}
      />
    </div>
  );
};

export default AlertsPage;
