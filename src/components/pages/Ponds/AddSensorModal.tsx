'use client'
import React, { useState } from 'react';
import { X, Plus, Server, Wifi } from 'lucide-react';

export interface NewSensor {
  name: string;
  type: string;
  dataSource: 'gateway' | 'iot';
  // Gateway specific
  gatewayId?: string;
  sensorIdOnGateway?: string;
  // IoT specific
  sensorId?: string;
  updateFrequency?: number; // in minutes
  endpoint?: string;
  token?: string;
}

interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSensor: (sensor: NewSensor) => void;
}

const AddSensorModal = ({ isOpen, onClose, onAddSensor }: AddSensorModalProps) => {
  const [sensorName, setSensorName] = useState('');
  const [sensorType, setSensorType] = useState('Temp');
  const [dataSource, setDataSource] = useState<'gateway' | 'iot'>('gateway');
  const [gatewayId, setGatewayId] = useState('');
  const [sensorIdOnGateway, setSensorIdOnGateway] = useState('');
  const [iotSensorId, setIotSensorId] = useState('');
  const [updateFrequency, setUpdateFrequency] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newSensor: NewSensor;
    if (dataSource === 'gateway') {
      newSensor = {
        name: sensorName,
        type: sensorType,
        dataSource,
        gatewayId,
        sensorIdOnGateway,
      };
    } else {
      newSensor = {
        name: sensorName,
        type: sensorType,
        dataSource,
        sensorId: iotSensorId,
        updateFrequency,
        endpoint: `https://api.example.com/sensors/${iotSensorId || sensorName.toLowerCase().replace(/\s/g, '-')}`,
        token: `token_${Math.random().toString(36).substr(2, 9)}`,
      };
    }
    onAddSensor(newSensor);
    onClose();
    // Reset form
    setSensorName('');
    setGatewayId('');
    setSensorIdOnGateway('');
    setIotSensorId('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Sensor</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Name</label>
            <input
              type="text"
              value={sensorName}
              onChange={(e) => setSensorName(e.target.value)}
              placeholder="e.g., Main pH Sensor"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Type</label>
            <select
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Temp">Temperature</option>
              <option value="Ph">pH</option>
              <option value="Turbidity">Turbidity</option>
              <option value="O2">Oxygen (O2)</option>
              <option value="Nh3">Ammonia (NH3)</option>
              <option value="No2">Nitrite (NO2)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDataSource('gateway')}
                className={`flex-1 p-4 border rounded-lg flex items-center gap-3 transition-all ${dataSource === 'gateway' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
              >
                <Server className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold">Central Gateway</p>
                  <p className="text-xs text-gray-500">Data sent from a local hub.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDataSource('iot')}
                className={`flex-1 p-4 border rounded-lg flex items-center gap-3 transition-all ${dataSource === 'iot' ? 'bg-green-50 border-green-500 ring-2 ring-green-500' : 'hover:bg-gray-50'}`}
              >
                <Wifi className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">Direct Connection</p>
                  <p className="text-xs text-gray-500">Sensor sends data via internet.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Fields */}
          {dataSource === 'gateway' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-medium text-gray-800">Gateway Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gateway ID</label>
                <input type="text" value={gatewayId} onChange={e => setGatewayId(e.target.value)} placeholder="e.g., GW-001" className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor ID on Gateway</label>
                <input type="text" value={sensorIdOnGateway} onChange={e => setSensorIdOnGateway(e.target.value)} placeholder="e.g., 4A:3F:C4" className="w-full px-3 py-2 border rounded-md" required />
              </div>
            </div>
          )}

          {dataSource === 'iot' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-medium text-gray-800">Direct Connection Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor ID (optional)</label>
                <input type="text" value={iotSensorId} onChange={e => setIotSensorId(e.target.value)} placeholder="e.g., T-101" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Update Frequency (minutes)</label>
                <input type="number" value={updateFrequency} onChange={e => setUpdateFrequency(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-md" min="1" required />
              </div>
              <div className="text-xs text-gray-600">
                An API endpoint and authentication token will be generated for this sensor upon creation.
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Sensor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorModal;
