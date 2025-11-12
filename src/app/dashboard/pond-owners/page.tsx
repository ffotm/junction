'use client'
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  MapPin,
  Calendar,
  Waves,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Settings
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockFarmers } from '@/lib/mockData';
import { Farmer } from '@/lib/types';

export default function PondOwnersPage() {
  const [currentPage, setCurrentPage] = useState('pond-owners');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);

  const handleStatusChange = (farmerId: string, newStatus: 'active' | 'suspended') => {
    setFarmers(prev => prev.map(farmer => 
      farmer.id === farmerId ? { ...farmer, status: newStatus } : farmer
    ));
  };

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = searchTerm === '' || 
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || farmer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      suspended: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Suspended' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { color: 'bg-gray-100 text-gray-800 border-gray-200', label: status };

    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  const renderFarmerDetails = () => {
    if (!selectedFarmer) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Farmer Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFarmer(null)}
            >
              ×
            </Button>
          </div>

          <div className="space-y-6">
            {/* Profile */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {selectedFarmer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{selectedFarmer.name}</h4>
              <p className="text-sm text-gray-600">{selectedFarmer.email}</p>
              <div className="mt-2">
                {getStatusBadge(selectedFarmer.status)}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedFarmer.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedFarmer.location}</span>
                </div>
              </div>
            </div>

            {/* Farm Statistics */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Farm Statistics</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedFarmer.totalZones}</div>
                  <div className="text-xs text-blue-600">Zones</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedFarmer.totalPonds}</div>
                  <div className="text-xs text-green-600">Ponds</div>
                </div>
              </div>
            </div>

            {/* Registration Info */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-3">Registration</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Registered:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(selectedFarmer.registrationDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(selectedFarmer.lastLogin).toLocaleDateString()}
                  </span>
                </div>
                {selectedFarmer.commerceRegister && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Commerce Register:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedFarmer.commerceRegister}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Farm Details
              </Button>
              
              {selectedFarmer.status === 'active' ? (
                <Button
                  onClick={() => handleStatusChange(selectedFarmer.id, 'suspended')}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              ) : (
                <Button
                  onClick={() => handleStatusChange(selectedFarmer.id, 'active')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Activate Account
                </Button>
              )}
              
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pond Owners</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all registered farmers and their operations</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Farmer
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                    <p className="text-3xl font-bold text-gray-900">{farmers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-3xl font-bold text-green-600">
                      {farmers.filter(f => f.status === 'active').length}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {farmers.filter(f => f.status === 'pending').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Ponds</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {farmers.reduce((sum, f) => sum + f.totalPonds, 0)}
                    </p>
                  </div>
                  <Waves className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Farmers List */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Farmers List ({filteredFarmers.length})
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredFarmers.map((farmer) => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => setSelectedFarmer(farmer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{farmer.name}</h4>
                          <p className="text-sm text-gray-600">{farmer.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {farmer.location}
                            </span>
                            <span className="text-xs text-gray-500">
                              {farmer.totalZones} zones • {farmer.totalPonds} ponds
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(farmer.status)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredFarmers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No farmers found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Farmer Details Sidebar */}
      {renderFarmerDetails()}
    </div>
  );
}
