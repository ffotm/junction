'use client'
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  Check, 
  X, 
  Clock, 
  Search,
  Filter,
  MoreHorizontal,
  User,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAdminRequests } from '@/lib/mockData';
import { AdminRequest } from '@/lib/types';

export default function AdminRequestsPage() {
  const [currentPage, setCurrentPage] = useState('admin-requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(null);
  const [requests, setRequests] = useState<AdminRequest[]>(mockAdminRequests);

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'admin-1' }
        : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected', reviewedAt: new Date().toISOString(), reviewedBy: 'admin-1' }
        : req
    ));
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter(request =>
    searchTerm === '' || 
    request.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { color: 'bg-gray-100 text-gray-800 border-gray-200', label: status };

    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  const getDocumentTypeLabel = (type: string) => {
    const typeLabels = {
      commerce_register: 'Commerce Register',
      license: 'Business License',
      permit: 'Operating Permit'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const renderRequestDetails = () => {
    if (!selectedRequest) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRequest(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Farmer Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Farmer Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{selectedRequest.farmerName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedRequest.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedRequest.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Submitted: {new Date(selectedRequest.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Document Information</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {getDocumentTypeLabel(selectedRequest.documentType)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>
            </div>

            {/* Document Preview */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Document</h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {getDocumentTypeLabel(selectedRequest.documentType)}.pdf
                    </p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedRequest.status === 'pending' && (
              <div className="space-y-3">
                <Button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Request
                </Button>
                <Button
                  onClick={() => handleReject(selectedRequest.id)}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
              </div>
            )}

            {/* Review Info */}
            {selectedRequest.reviewedAt && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Review Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reviewed by:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedRequest.reviewedBy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reviewed at:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedRequest.reviewedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Requests</h1>
              <p className="text-gray-600 mt-1">Manage farmer registration and document validation requests</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Requests List */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Requests List ({filteredRequests.length})
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{request.farmerName}</h4>
                          <p className="text-sm text-gray-600">{request.email}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {getDocumentTypeLabel(request.documentType)} • 
                            Submitted {new Date(request.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(request.status)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No requests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Request Details Sidebar */}
      {renderRequestDetails()}
    </div>
  );
}
