/**
 * Supplier-Side Data Module
 * Manages supplier portfolio, GPU lease tracking, revenue calculations, and comparisons
 */

export interface GPULease {
  id: string;
  gpuType: string;
  quantity: number;
  tier: 'A100' | 'H100' | 'V100' | 'T4';
  utilization: number; // 0-100%
  monthlyRevenue: number;
  startDate: string;
  endDate?: string;
  clientId: string;
  clientName: string;
}

export interface SupplierPortfolio {
  supplierId: string;
  supplierName: string;
  totalGPUs: number;
  activeLeases: GPULease[];
  totalMonthlyRevenue: number;
  averageUtilization: number;
  joinedDate: string;
  region: string;
}

export interface RevenueShare {
  grossRevenue: number;
  supplierShare: number; // 60%
  platformShare: number; // 40%
  supplierPercentage: number;
  platformPercentage: number;
}

export interface ComparisonMetrics {
  provider: string;
  monthlyRevenue: number;
  costs: number;
  netProfit: number;
  utilization: number;
  profitMargin: number;
}

export interface SupplierScore {
  supplierId: string;
  overallScore: number; // 0-100
  uptimeScore: number;
  utilizationScore: number;
  revenueScore: number;
  customerSatisfactionScore: number;
  rating: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

/**
 * Mock supplier portfolio data
 */
const mockSupplierPortfolio: SupplierPortfolio = {
  supplierId: 'SUP-001',
  supplierName: 'TechServe Solutions',
  totalGPUs: 48,
  activeLeases: [
    {
      id: 'LEASE-001',
      gpuType: 'NVIDIA H100',
      quantity: 16,
      tier: 'H100',
      utilization: 87.5,
      monthlyRevenue: 28800,
      startDate: '2026-06-01',
      clientId: 'CLI-001',
      clientName: 'AI Research Labs'
    },
    {
      id: 'LEASE-002',
      gpuType: 'NVIDIA A100',
      quantity: 24,
      tier: 'A100',
      utilization: 92.3,
      monthlyRevenue: 33600,
      startDate: '2026-07-15',
      clientId: 'CLI-002',
      clientName: 'DataMind Inc'
    },
    {
      id: 'LEASE-003',
      gpuType: 'NVIDIA V100',
      quantity: 8,
      tier: 'V100',
      utilization: 78.4,
      monthlyRevenue: 6400,
      startDate: '2026-08-01',
      clientId: 'CLI-003',
      clientName: 'ML Startup'
    }
  ],
  totalMonthlyRevenue: 68800,
  averageUtilization: 86.1,
  joinedDate: '2025-03-15',
  region: 'US-West'
};

/**
 * Calculate revenue share based on 60/40 split (60% supplier, 40% platform)
 */
export function calculateSupplierRevenue(grossRevenue: number): RevenueShare {
  const supplierPercentage = 60;
  const platformPercentage = 40;

  const supplierShare = (grossRevenue * supplierPercentage) / 100;
  const platformShare = (grossRevenue * platformPercentage) / 100;

  return {
    grossRevenue,
    supplierShare,
    platformShare,
    supplierPercentage,
    platformPercentage
  };
}

/**
 * Calculate GPU utilization across all leases
 */
function calculateAverageUtilization(leases: GPULease[]): number {
  if (leases.length === 0) return 0;

  const totalUtilization = leases.reduce((sum, lease) => {
    return sum + (lease.utilization * lease.quantity);
  }, 0);

  const totalGPUs = leases.reduce((sum, lease) => sum + lease.quantity, 0);

  return totalGPUs > 0 ? totalUtilization / totalGPUs : 0;
}

/**
 * Calculate total monthly revenue from all active leases
 */
function calculateTotalRevenue(leases: GPULease[]): number {
  return leases.reduce((sum, lease) => sum + lease.monthlyRevenue, 0);
}

/**
 * Get supplier portfolio data with calculated metrics
 */
export function getSupplierData(supplierId?: string): SupplierPortfolio {
  const portfolio = { ...mockSupplierPortfolio };

  // Recalculate metrics based on active leases
  portfolio.averageUtilization = calculateAverageUtilization(portfolio.activeLeases);
  portfolio.totalMonthlyRevenue = calculateTotalRevenue(portfolio.activeLeases);
  portfolio.totalGPUs = portfolio.activeLeases.reduce((sum, lease) => sum + lease.quantity, 0);

  return portfolio;
}

/**
 * Get comparison data: Self-operated vs AWS vs NeevCloud
 */
export function getComparison(): ComparisonMetrics[] {
  const gpuCount = 48;
  const utilizationRate = 86.1;

  // Self-operated data center
  const selfOperated: ComparisonMetrics = {
    provider: 'Self-Operated',
    monthlyRevenue: 0, // No revenue, only costs
    costs: 45000, // Infrastructure, power, cooling, staff
    netProfit: -45000,
    utilization: utilizationRate,
    profitMargin: -100
  };

  // AWS EC2 with GPU instances
  const aws: ComparisonMetrics = {
    provider: 'AWS',
    monthlyRevenue: 55200, // Leasing out on AWS marketplace
    costs: 42000, // AWS instance costs + management
    netProfit: 13200,
    utilization: utilizationRate,
    profitMargin: 23.9
  };

  // NeevCloud marketplace (60/40 split)
  const grossRevenue = 68800;
  const revenueShare = calculateSupplierRevenue(grossRevenue);
  const neevCloud: ComparisonMetrics = {
    provider: 'NeevCloud',
    monthlyRevenue: revenueShare.supplierShare,
    costs: 8500, // Minimal infrastructure, NeevCloud handles platform
    netProfit: revenueShare.supplierShare - 8500,
    utilization: utilizationRate,
    profitMargin: ((revenueShare.supplierShare - 8500) / revenueShare.supplierShare) * 100
  };

  return [selfOperated, aws, neevCloud];
}

/**
 * Calculate supplier performance score
 */
export function calculateSupplierScore(
  supplierId: string,
  uptimePercentage: number = 99.8,
  avgUtilization: number = 86.1,
  revenueGrowth: number = 25.5,
  customerRating: number = 4.7
): SupplierScore {
  // Weighted scoring
  const uptimeScore = (uptimePercentage / 100) * 100;
  const utilizationScore = (avgUtilization / 100) * 100;
  const revenueScore = Math.min((revenueGrowth / 50) * 100, 100); // Cap at 50% growth = 100 score
  const customerSatisfactionScore = (customerRating / 5) * 100;

  // Weighted average (30% uptime, 25% utilization, 25% revenue, 20% satisfaction)
  const overallScore = (
    uptimeScore * 0.30 +
    utilizationScore * 0.25 +
    revenueScore * 0.25 +
    customerSatisfactionScore * 0.20
  );

  let rating: 'Excellent' | 'Good' | 'Average' | 'Poor';
  if (overallScore >= 90) rating = 'Excellent';
  else if (overallScore >= 75) rating = 'Good';
  else if (overallScore >= 60) rating = 'Average';
  else rating = 'Poor';

  return {
    supplierId,
    overallScore: Math.round(overallScore * 10) / 10,
    uptimeScore: Math.round(uptimeScore * 10) / 10,
    utilizationScore: Math.round(utilizationScore * 10) / 10,
    revenueScore: Math.round(revenueScore * 10) / 10,
    customerSatisfactionScore: Math.round(customerSatisfactionScore * 10) / 10,
    rating
  };
}

/**
 * Get GPU lease breakdown by tier
 */
export function getLeasesByTier(portfolio: SupplierPortfolio): Record<string, {
  count: number;
  revenue: number;
  utilization: number;
}> {
  const tierBreakdown: Record<string, {
    count: number;
    revenue: number;
    utilization: number;
    totalGPUs: number;
  }> = {};

  portfolio.activeLeases.forEach(lease => {
    if (!tierBreakdown[lease.tier]) {
      tierBreakdown[lease.tier] = {
        count: 0,
        revenue: 0,
        utilization: 0,
        totalGPUs: 0
      };
    }

    tierBreakdown[lease.tier].count += 1;
    tierBreakdown[lease.tier].revenue += lease.monthlyRevenue;
    tierBreakdown[lease.tier].utilization += lease.utilization * lease.quantity;
    tierBreakdown[lease.tier].totalGPUs += lease.quantity;
  });

  // Calculate average utilization per tier
  const result: Record<string, { count: number; revenue: number; utilization: number }> = {};

  Object.entries(tierBreakdown).forEach(([tier, data]) => {
    result[tier] = {
      count: data.count,
      revenue: data.revenue,
      utilization: data.totalGPUs > 0 ? data.utilization / data.totalGPUs : 0
    };
  });

  return result;
}

/**
 * Get revenue projection for next N months
 */
export function getRevenueProjection(
  currentMonthlyRevenue: number,
  growthRate: number,
  months: number
): Array<{ month: string; revenue: number; supplierShare: number }> {
  const projection: Array<{ month: string; revenue: number; supplierShare: number }> = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const currentDate = new Date('2026-08-29');
  let projectedRevenue = currentMonthlyRevenue;

  for (let i = 0; i < months; i++) {
    const monthDate = new Date(currentDate);
    monthDate.setMonth(currentDate.getMonth() + i);

    const monthLabel = `${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`;
    const revenueShare = calculateSupplierRevenue(projectedRevenue);

    projection.push({
      month: monthLabel,
      revenue: Math.round(projectedRevenue),
      supplierShare: Math.round(revenueShare.supplierShare)
    });

    // Apply growth rate for next month
    projectedRevenue *= (1 + growthRate / 100);
  }

  return projection;
}
