'use client'
import React, { useState } from 'react';
import { Settings, Fish, Droplets, Zap, Bell, Save, Plus, Info } from 'lucide-react';
import AddSensorModal, { NewSensor } from './AddSensorModal';

// Mock data for initial state
const initialConfig = {
  pondName: "North Pond Alpha",
  location: "Sector 7, Farm Complex",
  dimensions: { length: 50, width: 25, depth: 2 },
  fishSpecies: "Tilapia",
  quantity: 500,
  stockingDate: "2023-01-15",
  sensors: {
    Temp: { enabled: true, min: 22, max: 26, optimal: 24 },
    Ph: { enabled: true, min: 6.8, max: 7.8, optimal: 7.2 },
    Turbidity: { enabled: true, min: 0, max: 50, optimal: 25 },
    O2: { enabled: true, min: 6, max: 10, optimal: 8 },
    Nh3: { enabled: false, min: 0, max: 0.2, optimal: 0.05 },
    No2: { enabled: false, min: 0, max: 0.1, optimal: 0.03 },
  },
  automation: {
    feeder: { enabled: true, schedule: "08:00, 17:00", amount: 5 },
    aeration: { enabled: true, triggerLevel: 6.5 },
  },
  notifications: {
    recipients: "admin@farm.com, manager@farm.com",
    phone: "+1234567890",
    levels: { critical: true, warning: true },
  }
};

const sensorDetails = {
  Temp: { name: 'Temperature', unit: '°C' },
  Ph: { name: 'pH Level', unit: '' },
  Turbidity: { name: 'Turbidity', unit: 'NTU' },
  O2: { name: 'Oxygen', unit: 'mg/L' },
  Nh3: { name: 'Ammonia', unit: 'ppm' },
  No2: { name: 'Nitrite', unit: 'ppm' },
};

type SensorKey = keyof typeof sensorDetails;

const PondConfig = () => {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSensors, setNewSensors] = useState<NewSensor[]>([]);

  const handleAddSensor = (sensor: NewSensor) => {
    setNewSensors(prev => [...prev, sensor]);
    // Here you would also call an API to save the sensor to the backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const keys = name.split('.');
    
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
      return newConfig;
    });
  };

  const handleSave = () => {
    setSaving(true);
    console.log("Saving config:", config);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pond Configuration</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><Settings className="w-5 h-5" /> General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pond Name</label>
            <input type="text" name="pondName" value={config.pondName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location / Zone</label>
            <input type="text" name="location" value={config.location} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Length (m)</label>
            <input type="number" name="dimensions.length" value={config.dimensions.length} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Width (m)</label>
            <input type="number" name="dimensions.width" value={config.dimensions.width} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Depth (m)</label>
            <input type="number" name="dimensions.depth" value={config.dimensions.depth} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Fish Population */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><Fish className="w-5 h-5" /> Fish Population</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fish Species</label>
            <input type="text" name="fishSpecies" value={config.fishSpecies} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" name="quantity" value={config.quantity} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stocking Date</label>
            <input type="date" name="stockingDate" value={config.stockingDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Sensor Management */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2"><Droplets className="w-5 h-5" /> Sensor Management</h2>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
            <Plus className="w-5 h-5" />
            Add New Sensor
          </button>
        </div>
        <div className="space-y-6">
          {Object.keys(config.sensors).map(key => {
            const sensorKey = key as SensorKey;
            return (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{sensorDetails[sensorKey].name}</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm font-medium">{config.sensors[sensorKey].enabled ? 'Enabled' : 'Disabled'}</span>
                    <div className="relative">
                      <input type="checkbox" name={`sensors.${key}.enabled`} checked={config.sensors[sensorKey].enabled} onChange={handleInputChange} className="sr-only" />
                      <div className={`block w-12 h-6 rounded-full ${config.sensors[sensorKey].enabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${config.sensors[sensorKey].enabled ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
                {config.sensors[sensorKey].enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-xs text-gray-600">Min Threshold</label>
                      <input type="number" name={`sensors.${key}.min`} value={config.sensors[sensorKey].min} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">Max Threshold</label>
                      <input type="number" name={`sensors.${key}.max`} value={config.sensors[sensorKey].max} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">Optimal Value</label>
                      <input type="number" name={`sensors.${key}.optimal`} value={config.sensors[sensorKey].optimal} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Newly Added Sensors */}
      {newSensors.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Newly Added Sensors</h2>
          <div className="space-y-4">
            {newSensors.map((sensor, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-bold text-gray-800">{sensor.name} ({sensor.type})</h3>
                
                {sensor.dataSource === 'gateway' && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p><strong>Data Source:</strong> Central Gateway</p>
                    <p><strong>Gateway ID:</strong> {sensor.gatewayId}</p>
                    <p><strong>Sensor ID on Gateway:</strong> {sensor.sensorIdOnGateway}</p>
                  </div>
                )}

                {sensor.dataSource === 'iot' && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p><strong>Data Source:</strong> Direct Connection</p>
                    {sensor.sensorId && <p><strong>Sensor ID:</strong> {sensor.sensorId}</p>}
                    <p><strong>Update Frequency:</strong> {sensor.updateFrequency} minutes</p>
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="font-semibold flex items-center gap-2"><Info className="w-4 h-4 text-blue-500" />Integration Details</p>
                      <p className="mt-1"><strong>Endpoint:</strong> <code className="text-xs bg-blue-100 p-1 rounded">{sensor.endpoint}</code></p>
                      <p className="mt-1"><strong>Token:</strong> <code className="text-xs bg-blue-100 p-1 rounded">{sensor.token}</code></p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Automation Rules */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><Zap className="w-5 h-5" /> Automation Rules</h2>
        {/* Feeder */}
        <div className="p-4 border rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Automatic Feeder</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium">{config.automation.feeder.enabled ? 'Enabled' : 'Disabled'}</span>
              <div className="relative">
                <input type="checkbox" name="automation.feeder.enabled" checked={config.automation.feeder.enabled} onChange={handleInputChange} className="sr-only" />
                <div className={`block w-12 h-6 rounded-full ${config.automation.feeder.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${config.automation.feeder.enabled ? 'transform translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>
          {config.automation.feeder.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-gray-600">Feeding Schedule (comma-separated times)</label>
                <input type="text" name="automation.feeder.schedule" value={config.automation.feeder.schedule} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Feed Amount (kg)</label>
                <input type="number" name="automation.feeder.amount" value={config.automation.feeder.amount} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
              </div>
            </div>
          )}
        </div>
        {/* Aeration */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Aeration System</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium">{config.automation.aeration.enabled ? 'Enabled' : 'Disabled'}</span>
              <div className="relative">
                <input type="checkbox" name="automation.aeration.enabled" checked={config.automation.aeration.enabled} onChange={handleInputChange} className="sr-only" />
                <div className={`block w-12 h-6 rounded-full ${config.automation.aeration.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${config.automation.aeration.enabled ? 'transform translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>
          {config.automation.aeration.enabled && (
            <div className="mt-4">
              <label className="block text-xs text-gray-600">Trigger when O2 level is below (mg/L)</label>
              <input type="number" name="automation.aeration.triggerLevel" value={config.automation.aeration.triggerLevel} onChange={handleInputChange} className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Alert Recipients (comma-separated emails)</label>
            <input type="text" name="notifications.recipients" value={config.notifications.recipients} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number for SMS</label>
            <input type="tel" name="notifications.phone" value={config.notifications.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Notification Levels</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="notifications.levels.critical" checked={config.notifications.levels.critical} onChange={handleInputChange} className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" />
              <span>Critical Alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="notifications.levels.warning" checked={config.notifications.levels.warning} onChange={handleInputChange} className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" />
              <span>Warning Alerts</span>
            </label>
          </div>
        </div>
      </div>
      <AddSensorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddSensor={handleAddSensor}
      />
    </div>
  );
};

export default PondConfig;
