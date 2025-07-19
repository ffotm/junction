'use client'
import React from 'react';
import { MapPin, Plus, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for zones
const zonesData = [
  { id: 'z1', name: 'Sector 7', pondCount: 5, status: 'normal', farmerId: 'f1' },
  { id: 'z2', name: 'Northern Ridge', pondCount: 3, status: 'warning', farmerId: 'f1' },
  { id: 'z3', name: 'West Valley', pondCount: 8, status: 'normal', farmerId: 'f1' },
  { id: 'z4', name: 'East Delta', pondCount: 4, status: 'critical', farmerId: 'f1' },
];

interface ZonesPageProps {
  params: {
    farmer: string;
  }
}

const ZonesPage = ({ params }: ZonesPageProps) => {
  const { farmer } = params;

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'normal':
        return {
          indicator: 'bg-green-500',
          text: 'text-green-800',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'warning':
        return {
          indicator: 'bg-yellow-500',
          text: 'text-yellow-800',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
        };
      case 'critical':
        return {
          indicator: 'bg-red-500',
          text: 'text-red-800',
          bg: 'bg-red-50',
          border: 'border-red-200',
        };
      default:
        return {
          indicator: 'bg-gray-500',
          text: 'text-gray-800',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Zones</h1>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add New Zone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zonesData.map(zone => {
          const statusStyles = getStatusStyles(zone.status);
          return (
            <Card key={zone.id} className={`shadow-lg border ${statusStyles.border} hover:shadow-xl transition-shadow`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  {zone.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{zone.pondCount} Ponds</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusStyles.indicator}`} />
                  <span className={`font-medium ${statusStyles.text}`}>
                    {zone.status === 'normal' ? 'All Systems Normal' : 
                     zone.status === 'warning' ? 'Warnings Active' : 'Critical Alerts'}
                  </span>
                </div>
                <Link href={`/framer/${farmer}/${zone.id}/ponds`}>
                  <Button className="w-full mt-2">
                    View Ponds
                    <ChevronsRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ZonesPage;
