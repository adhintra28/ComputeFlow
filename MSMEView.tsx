import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, CreditCard, Clock, PiggyBank, CheckCircle, Zap, Award } from 'lucide-react';

// Types
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
}

interface TierCardProps {
  tier: string;
  color: string;
  creditLimit: string;
  gpuHours: string;
  features: string[];
  isActive?: boolean;
}

// Sample Data
const computeScoreData = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 680 },
  { month: 'Mar', score: 700 },
  { month: 'Apr', score: 730 },
  { month: 'May', score: 760 },
  { month: 'Jun', score: 785 },
];

const savingsData = [
  { category: 'On-Demand vs Credit', savings: 2400 },
  { category: 'Spot Instance Optimization', savings: 1800 },
  { category: 'Reserved Capacity', savings: 1500 },
  { category: 'Auto-Scaling Efficiency', savings: 900 },
];

// Components
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtext, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}
    </div>
  </div>
);

const TierCard: React.FC<TierCardProps> = ({ tier, color, creditLimit, gpuHours, features, isActive }) => (
  <div className={`rounded-lg p-6 border-2 ${isActive ? `border-${color}-500 bg-${color}-50` : 'border-gray-200 bg-white'} hover:shadow-lg transition-all`}>
    <div className="flex items-center gap-2 mb-4">
      <Award className={`w-6 h-6 text-${color}-600`} />
      <h3 className={`text-xl font-bold text-${color}-700`}>{tier}</h3>
      {isActive && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">ACTIVE</span>}
    </div>
    <div className="space-y-3 mb-4">
      <div>
        <div className="text-sm text-gray-600">Credit Limit</div>
        <div className="text-2xl font-bold text-gray-900">{creditLimit}</div>
      </div>
      <div>
        <div className="text-sm text-gray-600">GPU Hours/Month</div>
        <div className="text-lg font-semibold text-gray-800">{gpuHours}</div>
      </div>
    </div>
    <div className="border-t pt-4 space-y-2">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const HowItWorksStep: React.FC<{ number: number; icon: React.ReactNode; title: string; description: string }> = ({ number, icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 relative">
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      {icon}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const MicroFinancingExample: React.FC = () => (
  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <Zap className="w-5 h-5 text-purple-600" />
      Job-Level Micro-Financing Example
    </h3>
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Training Job Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-medium">LLaMA-3 70B Fine-tune</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GPU Type:</span>
              <span className="font-medium">8x A100 80GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">72 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">On-Demand Cost:</span>
              <span className="font-medium text-red-600">$2,592</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Credit Terms</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Credit Applied:</span>
              <span className="font-medium text-green-600">$2,592</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-medium">0.5% monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Repayment Period:</span>
              <span className="font-medium">90 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Repayment:</span>
              <span className="font-medium">$2,631</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-900 font-semibold">Your Savings:</span>
              <span className="font-bold text-green-600">~$400</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Pro Tip:</strong> Combine with spot instances for an additional 40-60% savings on top of credit terms!
        </p>
      </div>
    </div>
  </div>
);

export default function MSMEView() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MSME Compute Credit Portal</h1>
          <p className="text-lg text-gray-600">Empowering small businesses with accessible AI compute financing</p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Compute Score"
            value="785"
            subtext="Excellent"
            trend="+25"
          />
          <StatCard
            icon={<CreditCard className="w-5 h-5" />}
            label="Credit Limit"
            value="$15,000"
            subtext="Silver Tier"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="GPU Hours Used"
            value="324"
            subtext="of 500 this month"
          />
          <StatCard
            icon={<PiggyBank className="w-5 h-5" />}
            label="Total Savings"
            value="$6,600"
            subtext="vs. on-demand pricing"
            trend="$1,200 this month"
          />
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <HowItWorksStep
              number={1}
              icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
              title="Build Your Score"
              description="Complete jobs successfully, pay on time, and grow your compute usage history to improve your credit score."
            />
            <HowItWorksStep
              number={2}
              icon={<CreditCard className="w-8 h-8 text-blue-600" />}
              title="Access Credit"
              description="Use your credit limit to run GPU workloads now and pay later with flexible terms tailored for MSMEs."
            />
            <HowItWorksStep
              number={3}
              icon={<Award className="w-8 h-8 text-blue-600" />}
              title="Unlock Tiers"
              description="Progress through Bronze, Silver, and Gold tiers to access higher limits and better rates."
            />
          </div>
        </div>

        {/* Tier Progression Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TierCard
              tier="Bronze"
              color="amber"
              creditLimit="$5,000"
              gpuHours="150"
              features={[
                'Up to 4x A100 GPUs',
                '30-day payment terms',
                '1% monthly interest',
                'Email support',
              ]}
            />
            <TierCard
              tier="Silver"
              color="gray"
              creditLimit="$15,000"
              gpuHours="500"
              features={[
                'Up to 8x A100 GPUs',
                '60-day payment terms',
                '0.5% monthly interest',
                'Priority support',
                'Spot instance access',
              ]}
              isActive={true}
            />
            <TierCard
              tier="Gold"
              color="yellow"
              creditLimit="$50,000"
              gpuHours="2000"
              features={[
                'Up to 16x A100/H100 GPUs',
                '90-day payment terms',
                '0.25% monthly interest',
                '24/7 dedicated support',
                'Reserved capacity',
                'Custom contracts',
              ]}
            />
          </div>
        </div>

        {/* Compute Score Journey */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Compute Score Journey</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={computeScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                domain={[600, 800]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>Score increased by <strong className="text-green-600">135 points</strong> over 6 months</span>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Savings Breakdown (This Month)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="category"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                label={{ value: 'Savings ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`$${value}`, 'Savings']}
              />
              <Bar
                dataKey="savings"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center text-sm text-gray-600">
            Total monthly savings: <strong className="text-green-600 text-lg">$6,600</strong>
          </div>
        </div>

        {/* Micro-Financing Example */}
        <MicroFinancingExample />

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-3">Ready to Scale Your AI Projects?</h2>
          <p className="text-lg mb-6 opacity-90">Apply for higher credit limits and unlock premium features</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
            Apply for Gold Tier
          </button>
        </div>
      </div>
    </div>
  );
}
