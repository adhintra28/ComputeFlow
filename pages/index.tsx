import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Activity, TrendingUp, Users, DollarSign, Server, CreditCard, Zap, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ViewType = 'overview' | 'supplier' | 'msme';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [mounted, setMounted] = useState(false);
  const [gpuUtilization, setGpuUtilization] = useState(85);
  const [dynamicPrice, setDynamicPrice] = useState(2.49);
  const [activeUsers, setActiveUsers] = useState(342);
  const [standbyUsers, setStandbyUsers] = useState(8742);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setGpuUtilization(prev => Math.min(95, Math.max(75, prev + (Math.random() - 0.5) * 3)));
      setDynamicPrice(prev => Math.min(3.50, Math.max(1.80, prev + (Math.random() - 0.5) * 0.10)));
      setActiveUsers(prev => Math.min(500, Math.max(300, Math.floor(prev + (Math.random() - 0.5) * 15))));
      setStandbyUsers(prev => Math.min(10000, Math.max(8000, Math.floor(prev + (Math.random() - 0.5) * 100))));
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <>
      <Head>
        <title>NeevCloud GPU Marketplace Finance</title>
        <meta name="description" content="Two-sided GPU marketplace finance platform" />
      </Head>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)' }}>
        {/* Header */}
        <header style={{ backgroundColor: '#1a2332', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>NeevCloud GPU Marketplace</h1>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Two-Sided Finance Platform</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {(['overview', 'supplier', 'msme'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    style={{
                      padding: '0.625rem 1.25rem',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: currentView === view ? '#14b8a6' : '#334e68',
                      color: 'white',
                      transition: 'all 0.2s'
                    }}
                  >
                    {view === 'overview' ? 'Overview' : view === 'supplier' ? 'Supplier Dashboard' : 'MSME Portal'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
          {currentView === 'overview' && (
            <OverviewView
              utilization={gpuUtilization}
              price={dynamicPrice}
              active={activeUsers}
              standby={standbyUsers}
            />
          )}
          {currentView === 'supplier' && <SupplierView utilization={gpuUtilization} />}
          {currentView === 'msme' && <MSMEView price={dynamicPrice} />}
        </main>
      </div>
    </>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
  const colorMap: Record<string, { bg: string, text: string }> = {
    teal: { bg: '#f0fdfa', text: '#14b8a6' },
    blue: { bg: '#eff6ff', text: '#3b82f6' },
    green: { bg: '#f0fdf4', text: '#10b981' },
    purple: { bg: '#faf5ff', text: '#a855f7' },
    yellow: { bg: '#fefce8', text: '#eab308' },
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: colorMap[color].bg, color: colorMap[color].text, width: 'fit-content' }}>
        {icon}
      </div>
      <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.75rem', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b', margin: '0.25rem 0' }}>{value}</p>
      <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>{trend}</p>
    </div>
  );
}

function OverviewView({ utilization, price, active, standby }: { utilization: number, price: number, active: number, standby: number }) {
  const utilizationData = [
    { month: 'Jan', without: 52, with: 78 },
    { month: 'Feb', without: 48, with: 82 },
    { month: 'Mar', without: 55, with: 85 },
    { month: 'Apr', without: 50, with: 87 },
    { month: 'May', without: 53, with: 89 },
    { month: 'Jun', without: 51, with: 91 },
  ];

  const revenueData = [
    { category: 'Traditional', revenue: 108 },
    { category: 'Dynamic Pricing', revenue: 156 },
    { category: 'With Credit Line', revenue: 184 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <StatCard icon={<Activity size={24} />} label="GPU Utilization" value={`${utilization.toFixed(1)}%`} trend="+12.3% vs baseline" color="teal" />
        <StatCard icon={<DollarSign size={24} />} label="Dynamic Price (H200)" value={`$${price.toFixed(2)}/hr`} trend="Real-time pricing" color="blue" />
        <StatCard icon={<Users size={24} />} label="Active Users" value={active.toString()} trend={`${standby} on standby`} color="green" />
        <StatCard icon={<TrendingUp size={24} />} label="Supply Unlocked" value="847 GPUs" trend="+340% vs Q1" color="purple" />
      </div>

      {/* Value Prop */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #14b8a6' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>The Two-Sided Solution</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={16} color="#3b82f6" />
              </div>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Supply Side: GPU Providers</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Dynamic pricing proves 85% utilization → suppliers lease more GPUs on revenue-share terms, no upfront capital required
                </p>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={16} color="#10b981" />
              </div>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Demand Side: MSMEs</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Usage-based credit line converts 10,000 standby users → active revenue → compounds utilization proof
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Utilization Impact</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="without" stroke="#94a3b8" strokeWidth={2} name="Without System" />
              <Line type="monotone" dataKey="with" stroke="#14b8a6" strokeWidth={2} name="With System" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Revenue Comparison ($k/month, 100 GPUs)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flywheel */}
      <div style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)', borderRadius: '0.75rem', padding: '2rem', color: 'white' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>The Compounding Flywheel</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          {[
            'More MSMEs use credit',
            'Higher GPU utilization',
            'Better pricing data',
            'Lower credit risk',
            'Suppliers trust more',
            'More GPU supply'
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ backgroundColor: '#14b8a6', borderRadius: '0.5rem', padding: '1rem', minWidth: '140px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{step}</p>
              </div>
              {i < 5 && <div style={{ fontSize: '1.5rem' }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupplierView({ utilization }: { utilization: number }) {
  const supplierData = [
    { id: 'SUP-001', name: 'DataVault Colocation', gpus: 48, utilization: 87.3, revenue: 52140, tier: 'Gold' },
    { id: 'SUP-002', name: 'CloudBridge DC', gpus: 32, utilization: 82.1, revenue: 34560, tier: 'Silver' },
    { id: 'SUP-003', name: 'TechHub Infrastructure', gpus: 24, utilization: 91.2, revenue: 28800, tier: 'Gold' },
  ];

  const comparisonData = [
    { model: 'Self-operated (40%)', monthly: 720 },
    { model: 'AWS Lease (80%)', monthly: 1440 },
    { model: 'NeevCloud (85%)', monthly: 1530 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <StatCard icon={<Activity size={24} />} label="Your Avg Utilization" value="85.2%" trend="+18% vs self-op" color="teal" />
        <StatCard icon={<DollarSign size={24} />} label="Monthly Revenue" value="$115.5k" trend="$10.8k above AWS" color="green" />
        <StatCard icon={<Server size={24} />} label="Revenue Share" value="60%" trend="Dynamic split" color="blue" />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Active Suppliers</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Supplier</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>GPUs</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Utilization</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Revenue</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Tier</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier) => (
                <tr key={supplier.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: '500' }}>{supplier.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{supplier.id}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{supplier.gpus}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f0fdfa', color: '#14b8a6', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '600' }}>
                      {supplier.utilization}%
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>${supplier.revenue.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: supplier.tier === 'Gold' ? '#fef3c7' : '#e2e8f0',
                      color: supplier.tier === 'Gold' ? '#92400e' : '#475569',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {supplier.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Revenue Comparison ($/GPU/month)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="model" width={150} />
            <Tooltip />
            <Bar dataKey="monthly" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem', textAlign: 'center' }}>
          NeevCloud earns you <span style={{ fontWeight: 'bold', color: '#14b8a6' }}>$10,800 more per GPU per year</span> than AWS lease rates
        </p>
      </div>
    </div>
  );
}

function MSMEView({ price }: { price: number }) {
  const creditHistory = [
    { month: 'Month 1', score: 650 },
    { month: 'Month 2', score: 680 },
    { month: 'Month 3', score: 720 },
    { month: 'Month 4', score: 760 },
  ];

  const savingsData = [
    { tier: 'On-Demand', monthly: 398 },
    { tier: 'Reserved (prepay)', monthly: 240 },
    { tier: 'Credit Line', monthly: 240 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <StatCard icon={<Award size={24} />} label="Compute Score" value="760" trend="Gold Tier" color="yellow" />
        <StatCard icon={<CreditCard size={24} />} label="Credit Limit" value="$2,400" trend="$480/mo available" color="green" />
        <StatCard icon={<Activity size={24} />} label="GPU Hours Used" value="280 hrs" trend="This month" color="blue" />
        <StatCard icon={<TrendingUp size={24} />} label="Savings" value="$158/mo" trend="40% vs on-demand" color="purple" />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Your Compute Score Journey</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={creditHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[600, 800]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#14b8a6" strokeWidth={3} name="Compute Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Your Savings (200 hrs/month H200)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tier" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="monthly" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0fdfa', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#115e59', margin: 0 }}>
            <span style={{ fontWeight: 'bold' }}>You save $158/month (40%)</span> vs on-demand pricing. That's $1,896/year back in your business.
          </p>
        </div>
      </div>
    </div>
  );
}
