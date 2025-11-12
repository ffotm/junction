'use client'
import React from 'react';
import Link from 'next/link';
import { X, CheckCircle, Lightbulb, Zap, Wrench, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSmartSuggestions } from '@/lib/suggestions';
import { Badge } from '@/components/ui/badge';

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
  priority: 'critical' | 'warning' | 'info';
  status: 'active' | 'unacknowledged' | 'resolved';
  recommendedActions: string[];
  smartSuggestions?: string[];
}

interface AlertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: Alert | null;
}

const AlertDetailsModal = ({ isOpen, onClose, alert }: AlertDetailsModalProps) => {
  if (!isOpen || !alert) return null;

  const smartSuggestions = getSmartSuggestions(alert);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 font-bold';
      case 'warning': return 'text-yellow-600 font-bold';
      default: return 'text-blue-600 font-bold';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{alert.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="text-gray-500">Pond</p>
              <p className="font-medium">{alert.pond}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{alert.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Priority</p>
              <p className={getPriorityStyles(alert.priority)}>{alert.priority.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <Badge variant={alert.status === 'resolved' ? 'default' : 'destructive'}>{alert.status}</Badge>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-6">
            <p className="text-gray-500 text-sm">Description</p>
            <p className="font-medium">{alert.description}</p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="text-gray-500">Current Value</p>
              <p className="font-medium text-lg">{alert.currentValue}</p>
            </div>
            <div>
              <p className="text-gray-500">Threshold</p>
              <p className="font-medium text-lg">{alert.threshold}</p>
            </div>
          </div>

          {/* Timestamp */}
          <div>
            <p className="text-gray-500 text-sm">Timestamp</p>
            <p className="font-medium">{alert.timestamp.toLocaleString()}</p>
          </div>

          {/* Recommended Actions */}
          <div className="border-t pt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Recommended Actions</h3>
            <ul className="space-y-2">
              {alert.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Smart Suggestions */}
          {smartSuggestions.length > 0 && (
            <div className="border-t pt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Smart Suggestions
              </h3>
              <div className="space-y-4">
                {smartSuggestions.map((suggestion, index) => {
                  const priorityStyles = {
                    Immediate: 'border-red-500 bg-red-50',
                    Recommended: 'border-yellow-500 bg-yellow-50',
                    Optional: 'border-gray-300 bg-white',
                  };
                  const priorityIcon = {
                    Immediate: <Zap className="w-5 h-5 text-red-500" />,
                    Recommended: <Wrench className="w-5 h-5 text-yellow-500" />,
                    Optional: <Thermometer className="w-5 h-5 text-gray-500" />,
                  };

                  return (
                    <div key={index} className={`p-3 border-l-4 rounded-r-lg ${priorityStyles[suggestion.priority]}`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{priorityIcon[suggestion.priority]}</div>
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">{suggestion.text}</p>
                          {suggestion.action && (
                            <div className="mt-2">
                              {suggestion.action.type === 'link' ? (
                                <Link href={suggestion.action.target}>
                                  <Button variant="link" className="p-0 h-auto">{suggestion.action.label}</Button>
                                </Link>
                              ) : (
                                <Button size="sm">{suggestion.action.label}</Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t flex justify-end gap-4 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {alert.status !== 'resolved' && <Button>Resolve Alert</Button>}
        </div>
      </div>
    </div>
  );
};

export default AlertDetailsModal;
