// Platform Owner Dashboard Types

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'pending';
  registrationDate: string;
  lastLogin: string;
  totalZones: number;
  totalPonds: number;
  avatar?: string;
  commerceRegister?: string;
  location: string;
}

export interface AdminRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  email: string;
  phone: string;
  documentUrl: string;
  documentType: 'commerce_register' | 'license' | 'permit';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface Zone {
  id: string;
  farmerId: string;
  name: string;
  location: string;
  area: number; // in square meters
  totalPonds: number;
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: string;
}

export interface Pond {
  id: string;
  zoneId: string;
  farmerId: string;
  name: string;
  capacity: number; // in liters
  fishType: string;
  fishCount: number;
  status: 'healthy' | 'warning' | 'critical';
  waterQuality: {
    ph: number;
    temperature: number;
    oxygen: number;
    ammonia: number;
  };
  lastMaintenance: string;
  createdAt: string;
}

export interface DashboardStats {
  totalFarmers: number;
  activeFarmers: number;
  pendingRequests: number;
  totalPonds: number;
  healthyPonds: number;
  warningPonds: number;
  criticalPonds: number;
  totalSensors: number;
  activeSensors: number;
  farmerGrowth: {
    current: number;
    previous: number;
    percentage: number;
  };
  pondGrowth: {
    current: number;
    previous: number;
    percentage: number;
  };
}

export interface PondReport {
  pondId: string;
  pondName: string;
  farmerId: string;
  farmerName: string;
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}
