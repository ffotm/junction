'use client'
import React, { useState } from 'react';
import { Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const PondsPage = () => {
  const params = useParams();
  const [ponds, setPonds] = useState([
    {
      id: 1,
      name: "Pond Alpha",
      status: "ok",
      sensorsOnline: 8,
    },
    {
      id: 2,
      name: "Pond Beta",
      status: "warning",
      sensorsOnline: 6,
    },
    {
      id: 3,
      name: "Pond Gamma",
      status: "critical",
      sensorsOnline: 4,
    },
    {
      id: 4,
      name: "Pond Delta",
      status: "ok",
      sensorsOnline: 9,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle className="w-5 h-5 mr-2" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 mr-2" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 mr-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
5      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ponds</h1>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
            <Plus className="w-5 h-5 mr-2" />
            Add Pond
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow border-2 border-blue-200">
          <ul className="divide-y divide-gray-200">
            {ponds.map((pond) => (
              <Link key={pond.id} href={`/framer/${params.farmer}/${params.zone}/p${pond.id}`}>
                <li className="p-6 flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                  <span className="font-semibold text-lg text-gray-800">{pond.name}</span>
                  <div className={`flex items-center font-bold text-md ${getStatusColor(pond.status)}`}>
                    {getStatusIcon(pond.status)}
                    {pond.status.charAt(0).toUpperCase() + pond.status.slice(1)}
                  </div>
                  <span className="text-gray-500 font-medium">{pond.sensorsOnline} sensors online</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PondsPage;
