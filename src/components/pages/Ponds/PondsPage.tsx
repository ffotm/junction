'use client'
import React, { useState} from 'react';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Fish, 
  MapPin, 
  Search, 
  Filter, 
  Plus,
  Grid3X3,
  List,
  Eye,
  Settings,
  BarChart3
} from 'lucide-react';

const PondsOverview = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [ponds, setPonds] = useState([
    {
      id: 1,
      name: "Pond Alpha",
      location: "North Section",
      status: "healthy",
      temperature: 24.5,
      ph: 7.2,
      oxygen: 8.5,
      fishCount: 2500,
      lastFed: "2 hours ago",
      alerts: 0,
      size: "Large",
      species: "Tilapia",
      harvestDate: "2024-09-15",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Pond Beta",
      location: "East Section",
      status: "warning",
      temperature: 28.2,
      ph: 6.8,
      oxygen: 6.2,
      fishCount: 1800,
      lastFed: "4 hours ago",
      alerts: 2,
      size: "Medium",
      species: "Catfish",
      harvestDate: "2024-08-22",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Pond Gamma",
      location: "South Section",
      status: "critical",
      temperature: 31.1,
      ph: 8.9,
      oxygen: 4.1,
      fishCount: 3200,
      lastFed: "6 hours ago",
      alerts: 4,
      size: "Large",
      species: "Bass",
      harvestDate: "2024-10-05",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Pond Delta",
      location: "West Section",
      status: "healthy",
      temperature: 25.8,
      ph: 7.5,
      oxygen: 9.2,
      fishCount: 1200,
      lastFed: "1 hour ago",
      alerts: 0,
      size: "Small",
      species: "Trout",
      harvestDate: "2024-11-12",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Pond Echo",
      location: "Central Section",
      status: "maintenance",
      temperature: 0,
      ph: 0,
      oxygen: 0,
      fishCount: 0,
      lastFed: "N/A",
      alerts: 1,
      size: "Medium",
      species: "N/A",
      harvestDate: "N/A",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "Pond Zeta",
      location: "North Section",
      status: "healthy",
      temperature: 26.3,
      ph: 7.1,
      oxygen: 8.8,
      fishCount: 2100,
      lastFed: "3 hours ago",
      alerts: 0,
      size: "Large",
      species: "Salmon",
      harvestDate: "2024-12-20",
      image: "/api/placeholder/300/200"
    }
  ]);

  const [stats, setStats] = useState({
    totalPonds: 6,
    activePonds: 5,
    totalFish: 10800,
    criticalAlerts: 4,
    averageTemp: 25.2,
    averagePh: 7.3
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const filteredPonds = ponds.filter(pond => {
    const matchesSearch = pond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pond.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pond.species.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pond.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePondClick = (pondId) => {
    // Navigate to /ponds/{id}
    console.log(`Navigate to /ponds/${pondId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Pond Management</h1>
              <p className="text-gray-600">Monitor and manage all your aquaculture ponds</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Pond
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Ponds</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalPonds}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Ponds</p>
                  <p className="text-3xl font-bold text-green-600">{stats.activePonds}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Fish</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalFish.toLocaleString()}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Fish className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Critical Alerts</p>
                  <p className="text-3xl font-bold text-red-600">{stats.criticalAlerts}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Temp</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.averageTemp}°C</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg pH</p>
                  <p className="text-3xl font-bold text-teal-600">{stats.averagePh}</p>
                </div>
                <div className="bg-teal-100 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search ponds by name, location, or species..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ponds Grid/List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPonds.map((pond) => (
              <div 
                key={pond.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105 overflow-hidden"
                onClick={() => handlePondClick(pond.id)}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(pond.status)} backdrop-blur-sm`}>
                      {getStatusIcon(pond.status)}
                      {pond.status.charAt(0).toUpperCase() + pond.status.slice(1)}
                    </div>
                    {pond.alerts > 0 && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {pond.alerts} Alert{pond.alerts > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{pond.name}</h3>
                    <p className="text-blue-100 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {pond.location}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{pond.fishCount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Fish Count</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{pond.size}</div>
                      <div className="text-xs text-gray-500">Size</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Species:</span>
                      <span className="font-medium">{pond.species}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Fed:</span>
                      <span className="font-medium">{pond.lastFed}</span>
                    </div>
                  </div>
                  
                  {pond.status !== 'maintenance' && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-orange-600">{pond.temperature}°C</div>
                        <div className="text-xs text-gray-500">Temp</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-purple-600">{pond.ph}</div>
                        <div className="text-xs text-gray-500">pH</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-teal-600">{pond.oxygen}</div>
                        <div className="text-xs text-gray-500">O₂</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-xl hover:bg-gray-200 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-xl hover:bg-gray-200 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Pond</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Fish Count</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Temperature</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">pH</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Oxygen</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Last Fed</th>
                    <th className="text-right px-6 py-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPonds.map((pond) => (
                    <tr key={pond.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handlePondClick(pond.id)}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{pond.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {pond.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pond.status)}`}>
                          {getStatusIcon(pond.status)}
                          {pond.status.charAt(0).toUpperCase() + pond.status.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{pond.fishCount.toLocaleString()}</td>
                      <td className="px-6 py-4 font-semibold text-orange-600">{pond.temperature}°C</td>
                      <td className="px-6 py-4 font-semibold text-purple-600">{pond.ph}</td>
                      <td className="px-6 py-4 font-semibold text-teal-600">{pond.oxygen}</td>
                      <td className="px-6 py-4 text-gray-600">{pond.lastFed}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredPonds.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No ponds found</div>
            <div className="text-gray-400">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PondsOverview;