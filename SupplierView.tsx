import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Server, DollarSign, TrendingUp, Zap, Shield, Globe, Clock, Award } from 'lucide-react';

// Types
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

interface Supplier {
  id: string;
  name: string;
  gpuModel: string;
  utilization: number;
  revenue: number;
  uptime: number;
  status: 'active' | 'idle' | 'maintenance';
}

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Mock data
const suppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'TechNode GPU Farm',
    gpuModel: 'NVIDIA H100',
    utilization: 94,
    revenue: 12450,
    uptime: 99.8,
    status: 'active'
  },
  {
    id: 'SUP-002',
    name: 'CloudScale Systems',
    gpuModel: 'NVIDIA A100',
    utilization: 87,
    revenue: 8920,
    uptime: 99.5,
    status: 'active'
  },
  {
    id: 'SUP-003',
    name: 'Quantum Compute',
    gpuModel: 'NVIDIA H100',
    utilization: 76,
    revenue: 9830,
    uptime: 98.9,
    status: 'active'
  },
  {
    id: 'SUP-004',
    name: 'DataCore Solutions',
    gpuModel: 'AMD MI300X',
    utilization: 91,
    revenue: 11200,
    uptime: 99.9,
    status: 'active'
  },
  {
    id: 'SUP-005',
    name: 'Edge Compute Labs',
    gpuModel: 'NVIDIA A100',
    utilization: 68,
    revenue: 6540,
    uptime: 97.2,
    status: 'idle'
  }
];

const revenueComparisonData = [
  { name: 'TechNode GPU Farm', revenue: 12450, color: '#3b82f6' },
  { name: 'DataCore Solutions', revenue: 11200, color: '#8b5cf6' },
  { name: 'Quantum Compute', revenue: 9830, color: '#10b981' },
  { name: 'CloudScale Systems', revenue: 8920, color: '#f59e0b' },
  { name: 'Edge Compute Labs', revenue: 6540, color: '#6b7280' }
];

const valueProps: ValueProp[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Maximize Revenue',
    description: 'Earn competitive rates on idle GPU capacity with transparent pricing'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Deployment',
    description: 'Connect your infrastructure in minutes with zero-config integration'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance with SOC2 and ISO27001 standards'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Network',
    description: 'Access worldwide demand from Fortune 500 and AI research labs'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Monitoring',
    description: 'Real-time performance tracking with automated health checks'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Performance Rewards',
    description: 'Bonus incentives for high uptime and consistent service quality'
  }
];

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <p className={`text-sm font-medium flex items-center gap-1 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

const ValuePropCard: React.FC<ValueProp> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-blue-600 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const getStatusBadge = (status: Supplier['status']) => {
  const styles = {
    active: 'bg-green-100 text-green-800',
    idle: 'bg-yellow-100 text-yellow-800',
    maintenance: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getUtilizationColor = (utilization: number): string => {
  if (utilization >= 90) return 'text-green-600';
  if (utilization >= 70) return 'text-blue-600';
  if (utilization >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

// Main Component
export default function SupplierView() {
  const totalUtilization = Math.round(
    suppliers.reduce((sum, s) => sum + s.utilization, 0) / suppliers.length
  );

  const totalRevenue = suppliers.reduce((sum, s) => sum + s.revenue, 0);

  const avgRevenueShare = Math.round(
    (totalRevenue / (suppliers.length * 15000)) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Dashboard</h1>
          <p className="text-gray-600">Monitor your GPU infrastructure performance and earnings</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Average Utilization"
            value={`${totalUtilization}%`}
            change="5.2% from last month"
            icon={<Server className="w-6 h-6" />}
            trend="up"
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="$2,340 from last month"
            icon={<DollarSign className="w-6 h-6" />}
            trend="up"
          />
          <StatCard
            title="Revenue Share"
            value={`${avgRevenueShare}%`}
            change="3.1% from last month"
            icon={<TrendingUp className="w-6 h-6" />}
            trend="up"
          />
        </div>

        {/* Why Lease to NeevCloud */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Lease to NeevCloud?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {valueProps.map((prop, index) => (
              <ValuePropCard key={index} {...prop} />
            ))}
          </div>
        </div>

        {/* Active Suppliers Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Active Suppliers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPU Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {supplier.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.gpuModel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${supplier.utilization}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${getUtilizationColor(supplier.utilization)}`}>
                          {supplier.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${supplier.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {supplier.uptime}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(supplier.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Comparison Chart */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueComparisonData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#6b7280"
                width={110}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {revenueComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Real-time Utilization Tracking */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Real-Time Utilization Tracking</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2 truncate">{supplier.name}</p>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-2xl font-bold ${getUtilizationColor(supplier.utilization)}`}>
                      {supplier.utilization}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: `${supplier.utilization}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all ${
                        supplier.utilization >= 90 ? 'bg-green-500' :
                        supplier.utilization >= 70 ? 'bg-blue-500' :
                        supplier.utilization >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{supplier.gpuModel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
