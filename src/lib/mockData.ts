import { Farmer, AdminRequest, Zone, Pond, DashboardStats, PondReport, ChartData } from './types';

// Mock Farmers Data
export const mockFarmers: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 123 456 7890',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2025-01-17',
    totalZones: 3,
    totalPonds: 12,
    location: 'Cairo, Egypt',
    commerceRegister: 'CR-2024-001'
  },
  {
    id: 'farmer-2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+52 555 123 4567',
    status: 'active',
    registrationDate: '2024-02-20',
    lastLogin: '2025-01-16',
    totalZones: 2,
    totalPonds: 8,
    location: 'Guadalajara, Mexico',
    commerceRegister: 'CR-2024-002'
  },
  {
    id: 'farmer-3',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 555 987 6543',
    status: 'pending',
    registrationDate: '2025-01-10',
    lastLogin: '2025-01-15',
    totalZones: 0,
    totalPonds: 0,
    location: 'Texas, USA',
    commerceRegister: 'CR-2025-001'
  },
  {
    id: 'farmer-4',
    name: 'Chen Wei',
    email: 'chen.wei@email.com',
    phone: '+86 138 0013 8000',
    status: 'active',
    registrationDate: '2024-03-10',
    lastLogin: '2025-01-17',
    totalZones: 4,
    totalPonds: 16,
    location: 'Guangzhou, China',
    commerceRegister: 'CR-2024-003'
  },
  {
    id: 'farmer-5',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    status: 'suspended',
    registrationDate: '2024-04-05',
    lastLogin: '2025-01-10',
    totalZones: 1,
    totalPonds: 4,
    location: 'Mumbai, India',
    commerceRegister: 'CR-2024-004'
  }
];

// Mock Admin Requests
export const mockAdminRequests: AdminRequest[] = [
  {
    id: 'req-1',
    farmerId: 'farmer-3',
    farmerName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 555 987 6543',
    documentUrl: '/documents/commerce-register-001.pdf',
    documentType: 'commerce_register',
    status: 'pending',
    submittedAt: '2025-01-10T10:30:00Z'
  },
  {
    id: 'req-2',
    farmerId: 'farmer-6',
    farmerName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+44 20 7946 0958',
    documentUrl: '/documents/license-002.pdf',
    documentType: 'license',
    status: 'pending',
    submittedAt: '2025-01-12T14:15:00Z'
  },
  {
    id: 'req-3',
    farmerId: 'farmer-7',
    farmerName: 'Mohammed Al-Rashid',
    email: 'mohammed.rashid@email.com',
    phone: '+971 50 123 4567',
    documentUrl: '/documents/permit-003.pdf',
    documentType: 'permit',
    status: 'approved',
    submittedAt: '2025-01-08T09:20:00Z',
    reviewedAt: '2025-01-09T11:45:00Z',
    reviewedBy: 'admin-1'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalFarmers: 2000,
  activeFarmers: 1850,
  pendingRequests: 15,
  totalPonds: 18000,
  healthyPonds: 15300,
  warningPonds: 2200,
  criticalPonds: 500,
  totalSensors: 36000,
  activeSensors: 34200,
  farmerGrowth: {
    current: 2000,
    previous: 1210,
    percentage: 65.3
  },
  pondGrowth: {
    current: 18000,
    previous: 10588,
    percentage: 70.0
  }
};

// Mock Pond Reports
export const mockPondReports: PondReport[] = [
  {
    pondId: '0123',
    pondName: 'Pond A-12',
    farmerId: 'farmer-1',
    farmerName: 'Ahmed Hassan',
    issue: "Sensors don't work",
    severity: 'high',
    reportedAt: '2025-01-17T08:30:00Z',
    status: 'open'
  },
  {
    pondId: '0124',
    pondName: 'Pond B-05',
    farmerId: 'farmer-2',
    farmerName: 'Maria Rodriguez',
    issue: "Temperature sensor malfunction",
    severity: 'medium',
    reportedAt: '2025-01-16T15:20:00Z',
    status: 'investigating'
  },
  {
    pondId: '0125',
    pondName: 'Pond C-08',
    farmerId: 'farmer-4',
    farmerName: 'Chen Wei',
    issue: "pH levels critical",
    severity: 'critical',
    reportedAt: '2025-01-17T12:45:00Z',
    status: 'open'
  }
];

// Mock Chart Data
export const mockFarmerGrowthChart: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Farmers',
    data: [800, 950, 1100, 1250, 1400, 1520, 1650, 1750, 1850, 1900, 1950, 2000],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true
  }]
};

export const mockPondGrowthChart: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Ponds',
    data: [8000, 9500, 11000, 12500, 14000, 15200, 16500, 17000, 17500, 17800, 17900, 18000],
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    fill: true
  }]
};
