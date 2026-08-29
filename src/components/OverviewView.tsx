import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Unlock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        {icon}
      </div>
      <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

interface UtilizationDataPoint {
  time: string;
  withSystem: number;
  withoutSystem: number;
}

interface RevenueDataPoint {
  month: string;
  traditional: number;
  withVitC: number;
}

const generateUtilizationData = (): UtilizationDataPoint[] => {
  const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
  return hours.map(time => ({
    time,
    withSystem: Math.floor(Math.random() * 30) + 65,
    withoutSystem: Math.floor(Math.random() * 20) + 35
  }));
};

const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', traditional: 45000, withVitC: 68000 },
  { month: 'Feb', traditional: 48000, withVitC: 72000 },
  { month: 'Mar', traditional: 52000, withVitC: 79000 },
  { month: 'Apr', traditional: 49000, withVitC: 84000 },
  { month: 'May', traditional: 55000, withVitC: 91000 },
  { month: 'Jun', traditional: 58000, withVitC: 98000 }
];

interface FlywheelStep {
  number: number;
  title: string;
  description: string;
}

const flywheelSteps: FlywheelStep[] = [
  { number: 1, title: 'Increased Utilization', description: 'Higher asset usage rates' },
  { number: 2, title: 'More Revenue', description: 'Greater income per asset' },
  { number: 3, title: 'Lower Prices', description: 'Competitive pricing advantage' },
  { number: 4, title: 'More Users', description: 'Growing customer base' },
  { number: 5, title: 'Better Network', description: 'Enhanced market liquidity' },
  { number: 6, title: 'Higher Value', description: 'Increased platform value' }
];

const FlywheelVisualization: React.FC = () => (
  <div className="relative w-full h-96 flex items-center justify-center">
    <div className="absolute w-64 h-64 border-4 border-blue-200 rounded-full"></div>
    <div className="absolute w-56 h-56 border-4 border-blue-300 rounded-full"></div>
    <div className="absolute w-48 h-48 border-4 border-blue-400 rounded-full"></div>

    <div className="absolute inset-0">
      {flywheelSteps.map((step, index) => {
        const angle = (index * 60 - 90) * (Math.PI / 180);
        const radius = 140;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={step.number}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`
            }}
          >
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              {step.number}
            </div>
            <div className="mt-2 text-center w-32 -ml-10">
              <p className="font-semibold text-sm text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="absolute bg-white border-4 border-blue-600 rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
      <TrendingUp className="w-10 h-10 text-blue-600" />
    </div>
  </div>
);

export default function OverviewView() {
  const [stats, setStats] = useState({
    utilization: { value: '87.3%', change: '+12.5%', trend: 'up' as const },
    price: { value: '$24.50', change: '-8.3%', trend: 'down' as const },
    activeUsers: { value: '12,847', change: '+23.1%', trend: 'up' as const },
    supplyUnlocked: { value: '$2.4M', change: '+18.7%', trend: 'up' as const }
  });

  const [utilizationData, setUtilizationData] = useState<UtilizationDataPoint[]>(generateUtilizationData());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats
      setStats({
        utilization: {
          value: `${(Math.random() * 10 + 82).toFixed(1)}%`,
          change: `+${(Math.random() * 5 + 10).toFixed(1)}%`,
          trend: 'up'
        },
        price: {
          value: `$${(Math.random() * 5 + 22).toFixed(2)}`,
          change: `-${(Math.random() * 3 + 6).toFixed(1)}%`,
          trend: 'down'
        },
        activeUsers: {
          value: `${(Math.floor(Math.random() * 2000 + 12000)).toLocaleString()}`,
          change: `+${(Math.random() * 10 + 18).toFixed(1)}%`,
          trend: 'up'
        },
        supplyUnlocked: {
          value: `$${(Math.random() * 0.5 + 2.2).toFixed(1)}M`,
          change: `+${(Math.random() * 5 + 16).toFixed(1)}%`,
          trend: 'up'
        }
      });

      // Update utilization data
      setUtilizationData(generateUtilizationData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Overview Dashboard</h1>
          <p className="text-gray-600">Real-time insights into your VitC marketplace performance</p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilization Rate"
            value={stats.utilization.value}
            change={stats.utilization.change}
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            trend={stats.utilization.trend}
          />
          <StatCard
            title="Average Price"
            value={stats.price.value}
            change={stats.price.change}
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            trend={stats.price.trend}
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.value}
            change={stats.activeUsers.change}
            icon={<Users className="w-6 h-6 text-blue-600" />}
            trend={stats.activeUsers.trend}
          />
          <StatCard
            title="Supply Unlocked"
            value={stats.supplyUnlocked.value}
            change={stats.supplyUnlocked.change}
            icon={<Unlock className="w-6 h-6 text-blue-600" />}
            trend={stats.supplyUnlocked.trend}
          />
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Two-Sided Value Proposition</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Asset Owners</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Maximize revenue through dynamic pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Increase utilization rates by 40-60%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Automated pricing optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Real-time demand insights</span>
                </li>
              </ul>
            </div>
            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Renters</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Access assets at lower prices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Greater availability and selection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Transparent, fair pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Seamless booking experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Utilization Impact Chart */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Utilization Impact Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line
                type="monotone"
                dataKey="withSystem"
                stroke="#2563eb"
                strokeWidth={3}
                name="With VitC System"
                dot={{ fill: '#2563eb', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="withoutSystem"
                stroke="#dc2626"
                strokeWidth={3}
                name="Without System"
                dot={{ fill: '#dc2626', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Comparison Chart */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Comparison</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar
                dataKey="traditional"
                fill="#94a3b8"
                name="Traditional Model"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="withVitC"
                fill="#2563eb"
                name="With VitC"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compounding Flywheel */}
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compounding Flywheel Effect</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Each improvement in the system drives the next, creating a self-reinforcing cycle of growth and value creation
          </p>
          <FlywheelVisualization />
        </div>
      </div>
    </div>
  );
}
