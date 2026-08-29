/**
 * Credit Scoring and MSME Financing Module
 *
 * Provides compute-based credit scoring for micro, small, and medium enterprises
 * using usage-based underwriting signals and job-level micro-financing logic.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface ComputeUsageData {
  totalJobsRun: number;
  totalComputeHours: number;
  avgJobDuration: number; // in hours
  jobSuccessRate: number; // 0-1
  paymentHistory: PaymentRecord[];
  accountAgeMonths: number;
  peakComputeHours: number;
  consistencyScore: number; // 0-1, measures usage regularity
}

export interface PaymentRecord {
  amount: number;
  dueDate: Date;
  paidDate: Date | null;
  status: 'paid' | 'late' | 'missed';
}

export interface UnderwritingSignals {
  paymentReliability: number; // 0-100
  usageConsistency: number; // 0-100
  businessGrowth: number; // 0-100
  technicalStability: number; // 0-100
}

export type CreditTier = 'Bronze' | 'Silver' | 'Gold';

export interface CreditTierInfo {
  tier: CreditTier;
  scoreRange: [number, number];
  maxCreditLimit: number;
  interestRate: number; // annual percentage
  paymentTermDays: number;
}

export interface CreditAssessment {
  computeScore: number;
  creditTier: CreditTier;
  creditLimit: number;
  interestRate: number;
  underwritingSignals: UnderwritingSignals;
  recommendedPaymentTerm: number;
}

export interface JobFinancingOptions {
  jobId: string;
  estimatedCost: number;
  paymentOptions: PaymentOption[];
}

export interface PaymentOption {
  type: 'on-demand' | 'reserved' | 'credit-line';
  upfrontCost: number;
  totalCost: number;
  savings: number;
  savingsPercentage: number;
  paymentSchedule?: PaymentScheduleItem[];
}

export interface PaymentScheduleItem {
  dueDate: Date;
  amount: number;
  description: string;
}

export interface SavingsCalculation {
  onDemandCost: number;
  reservedCost: number;
  creditLineCost: number;
  reservedSavings: number;
  creditLineSavings: number;
  recommendedOption: 'on-demand' | 'reserved' | 'credit-line';
}

// ============================================================================
// Constants
// ============================================================================

const SCORE_MIN = 650;
const SCORE_MAX = 850;
const SCORE_RANGE = SCORE_MAX - SCORE_MIN;

const CREDIT_TIERS: Record<CreditTier, CreditTierInfo> = {
  Bronze: {
    tier: 'Bronze',
    scoreRange: [650, 699],
    maxCreditLimit: 5000,
    interestRate: 12.0,
    paymentTermDays: 30,
  },
  Silver: {
    tier: 'Silver',
    scoreRange: [700, 774],
    maxCreditLimit: 25000,
    interestRate: 8.5,
    paymentTermDays: 60,
  },
  Gold: {
    tier: 'Gold',
    scoreRange: [775, 850],
    maxCreditLimit: 100000,
    interestRate: 5.5,
    paymentTermDays: 90,
  },
};

// Pricing multipliers
const ON_DEMAND_RATE = 1.0; // baseline
const RESERVED_DISCOUNT = 0.30; // 30% discount
const CREDIT_LINE_DISCOUNT = 0.20; // 20% discount

// ============================================================================
// Core Credit Scoring Functions
// ============================================================================

/**
 * Calculate Compute Score based on usage and payment history
 * Score range: 650-850
 */
export function calculateComputeScore(usageData: ComputeUsageData): number {
  const signals = calculateUnderwritingSignals(usageData);

  // Weighted scoring components
  const paymentWeight = 0.35;
  const consistencyWeight = 0.25;
  const growthWeight = 0.20;
  const stabilityWeight = 0.20;

  const weightedScore =
    signals.paymentReliability * paymentWeight +
    signals.usageConsistency * consistencyWeight +
    signals.businessGrowth * growthWeight +
    signals.technicalStability * stabilityWeight;

  // Map 0-100 weighted score to 650-850 range
  const computeScore = SCORE_MIN + (weightedScore / 100) * SCORE_RANGE;

  // Round to nearest integer and ensure within bounds
  return Math.round(Math.max(SCORE_MIN, Math.min(SCORE_MAX, computeScore)));
}

/**
 * Calculate underwriting signals from usage data
 */
export function calculateUnderwritingSignals(
  usageData: ComputeUsageData
): UnderwritingSignals {
  const paymentReliability = calculatePaymentReliability(usageData.paymentHistory);
  const usageConsistency = usageData.consistencyScore * 100;
  const businessGrowth = calculateBusinessGrowth(usageData);
  const technicalStability = calculateTechnicalStability(usageData);

  return {
    paymentReliability,
    usageConsistency,
    businessGrowth,
    technicalStability,
  };
}

/**
 * Calculate payment reliability score (0-100)
 */
function calculatePaymentReliability(payments: PaymentRecord[]): number {
  if (payments.length === 0) return 50; // neutral score for new accounts

  let score = 100;
  const recentPayments = payments.slice(-12); // last 12 payments

  for (const payment of recentPayments) {
    if (payment.status === 'missed') {
      score -= 15;
    } else if (payment.status === 'late') {
      const daysLate = payment.paidDate
        ? Math.floor(
            (payment.paidDate.getTime() - payment.dueDate.getTime()) /
            (1000 * 60 * 60 * 24)
          )
        : 0;

      if (daysLate > 30) {
        score -= 10;
      } else if (daysLate > 7) {
        score -= 5;
      } else {
        score -= 2;
      }
    }
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate business growth score (0-100)
 */
function calculateBusinessGrowth(usageData: ComputeUsageData): number {
  const { totalComputeHours, accountAgeMonths, totalJobsRun } = usageData;

  if (accountAgeMonths < 3) {
    // New accounts: base score on initial usage intensity
    const jobsPerMonth = totalJobsRun / Math.max(1, accountAgeMonths);
    return Math.min(100, 50 + jobsPerMonth * 2);
  }

  // Established accounts: measure growth trajectory
  const computeHoursPerMonth = totalComputeHours / accountAgeMonths;

  // Normalize: 100+ hours/month = 100 score, linear scaling
  const growthScore = Math.min(100, (computeHoursPerMonth / 100) * 100);

  return growthScore;
}

/**
 * Calculate technical stability score (0-100)
 */
function calculateTechnicalStability(usageData: ComputeUsageData): number {
  const { jobSuccessRate, avgJobDuration, peakComputeHours } = usageData;

  // Success rate component (70% weight)
  const successComponent = jobSuccessRate * 70;

  // Job duration stability component (20% weight)
  // Penalize very short jobs (possible failed attempts) and extreme outliers
  let durationScore = 100;
  if (avgJobDuration < 0.1) {
    durationScore = 50; // suspiciously short
  } else if (avgJobDuration > 24) {
    durationScore = 80; // very long jobs, slight risk
  }
  const durationComponent = (durationScore / 100) * 20;

  // Peak usage component (10% weight)
  // Reward controlled scaling
  const peakRatio = peakComputeHours / Math.max(1, avgJobDuration);
  const peakScore = Math.min(100, 100 - Math.abs(peakRatio - 5) * 5);
  const peakComponent = (peakScore / 100) * 10;

  return Math.round(successComponent + durationComponent + peakComponent);
}

/**
 * Get credit tier based on compute score
 */
export function getCreditTier(computeScore: number): CreditTier {
  if (computeScore >= CREDIT_TIERS.Gold.scoreRange[0]) {
    return 'Gold';
  } else if (computeScore >= CREDIT_TIERS.Silver.scoreRange[0]) {
    return 'Silver';
  } else {
    return 'Bronze';
  }
}

/**
 * Get full credit tier information
 */
export function getCreditTierInfo(tier: CreditTier): CreditTierInfo {
  return CREDIT_TIERS[tier];
}

/**
 * Calculate credit limit based on score and usage patterns
 */
export function calculateCreditLimit(
  computeScore: number,
  usageData: ComputeUsageData
): number {
  const tier = getCreditTier(computeScore);
  const tierInfo = CREDIT_TIERS[tier];

  // Base limit from tier
  let creditLimit = tierInfo.maxCreditLimit;

  // Adjust based on historical monthly spend
  const avgMonthlySpend =
    (usageData.totalComputeHours * 10) / Math.max(1, usageData.accountAgeMonths);

  // Limit should be 2-3x monthly spend, capped at tier max
  const usageBasedLimit = avgMonthlySpend * 2.5;

  creditLimit = Math.min(creditLimit, Math.max(1000, usageBasedLimit));

  // Round to nearest 100
  return Math.round(creditLimit / 100) * 100;
}

/**
 * Complete credit assessment
 */
export function assessCredit(usageData: ComputeUsageData): CreditAssessment {
  const computeScore = calculateComputeScore(usageData);
  const creditTier = getCreditTier(computeScore);
  const tierInfo = getCreditTierInfo(creditTier);
  const creditLimit = calculateCreditLimit(computeScore, usageData);
  const underwritingSignals = calculateUnderwritingSignals(usageData);

  return {
    computeScore,
    creditTier,
    creditLimit,
    interestRate: tierInfo.interestRate,
    underwritingSignals,
    recommendedPaymentTerm: tierInfo.paymentTermDays,
  };
}

// ============================================================================
// Savings Calculation
// ============================================================================

/**
 * Calculate savings across payment options
 */
export function calculateSavings(
  estimatedComputeCost: number,
  creditTier?: CreditTier
): SavingsCalculation {
  const onDemandCost = estimatedComputeCost * ON_DEMAND_RATE;
  const reservedCost = estimatedComputeCost * (1 - RESERVED_DISCOUNT);

  // Credit line savings depends on tier
  let creditLineMultiplier = 1 - CREDIT_LINE_DISCOUNT;
  if (creditTier) {
    const tierInfo = getCreditTierInfo(creditTier);
    // Better tiers get better rates
    const tierBonus = (850 - tierInfo.scoreRange[0]) / 2000; // 0-0.1 bonus
    creditLineMultiplier = Math.max(0.7, creditLineMultiplier - tierBonus);
  }

  const creditLineCost = estimatedComputeCost * creditLineMultiplier;

  const reservedSavings = onDemandCost - reservedCost;
  const creditLineSavings = onDemandCost - creditLineCost;

  // Recommend best option
  let recommendedOption: 'on-demand' | 'reserved' | 'credit-line';
  if (creditLineSavings > reservedSavings && creditTier) {
    recommendedOption = 'credit-line';
  } else if (reservedSavings > 0) {
    recommendedOption = 'reserved';
  } else {
    recommendedOption = 'on-demand';
  }

  return {
    onDemandCost: Math.round(onDemandCost * 100) / 100,
    reservedCost: Math.round(reservedCost * 100) / 100,
    creditLineCost: Math.round(creditLineCost * 100) / 100,
    reservedSavings: Math.round(reservedSavings * 100) / 100,
    creditLineSavings: Math.round(creditLineSavings * 100) / 100,
    recommendedOption,
  };
}

// ============================================================================
// Job-Level Micro-Financing
// ============================================================================

/**
 * Generate financing options for a specific job
 */
export function generateJobFinancingOptions(
  jobId: string,
  estimatedComputeCost: number,
  creditAssessment: CreditAssessment
): JobFinancingOptions {
  const savings = calculateSavings(estimatedComputeCost, creditAssessment.creditTier);
  const tierInfo = getCreditTierInfo(creditAssessment.creditTier);

  const paymentOptions: PaymentOption[] = [];

  // On-Demand option
  paymentOptions.push({
    type: 'on-demand',
    upfrontCost: savings.onDemandCost,
    totalCost: savings.onDemandCost,
    savings: 0,
    savingsPercentage: 0,
  });

  // Reserved option (requires upfront commitment)
  paymentOptions.push({
    type: 'reserved',
    upfrontCost: savings.reservedCost,
    totalCost: savings.reservedCost,
    savings: savings.reservedSavings,
    savingsPercentage: Math.round((savings.reservedSavings / savings.onDemandCost) * 100),
  });

  // Credit line option (if within limit)
  if (estimatedComputeCost <= creditAssessment.creditLimit) {
    const interestAmount =
      savings.creditLineCost * (tierInfo.interestRate / 100) *
      (tierInfo.paymentTermDays / 365);

    const totalCostWithInterest = savings.creditLineCost + interestAmount;

    const paymentSchedule = generatePaymentSchedule(
      totalCostWithInterest,
      tierInfo.paymentTermDays
    );

    paymentOptions.push({
      type: 'credit-line',
      upfrontCost: 0,
      totalCost: Math.round(totalCostWithInterest * 100) / 100,
      savings: Math.round((savings.onDemandCost - totalCostWithInterest) * 100) / 100,
      savingsPercentage: Math.round(
        ((savings.onDemandCost - totalCostWithInterest) / savings.onDemandCost) * 100
      ),
      paymentSchedule,
    });
  }

  return {
    jobId,
    estimatedCost: estimatedComputeCost,
    paymentOptions,
  };
}

/**
 * Generate payment schedule for credit line
 */
function generatePaymentSchedule(
  totalAmount: number,
  termDays: number
): PaymentScheduleItem[] {
  const schedule: PaymentScheduleItem[] = [];
  const today = new Date();

  // Split into equal installments based on term
  let installments = 1;
  if (termDays >= 90) {
    installments = 3; // monthly for 90 day term
  } else if (termDays >= 60) {
    installments = 2; // bi-monthly for 60 day term
  }

  const installmentAmount = totalAmount / installments;
  const daysBetweenPayments = Math.floor(termDays / installments);

  for (let i = 0; i < installments; i++) {
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + daysBetweenPayments * (i + 1));

    schedule.push({
      dueDate,
      amount: Math.round(installmentAmount * 100) / 100,
      description: `Payment ${i + 1} of ${installments}`,
    });
  }

  return schedule;
}

/**
 * Check if job can be financed under current credit line
 */
export function canFinanceJob(
  estimatedCost: number,
  creditLimit: number,
  currentUtilization: number
): { eligible: boolean; availableCredit: number; reason?: string } {
  const availableCredit = creditLimit - currentUtilization;

  if (estimatedCost > creditLimit) {
    return {
      eligible: false,
      availableCredit,
      reason: 'Job cost exceeds total credit limit',
    };
  }

  if (estimatedCost > availableCredit) {
    return {
      eligible: false,
      availableCredit,
      reason: 'Insufficient available credit',
    };
  }

  return {
    eligible: true,
    availableCredit,
  };
}

/**
 * Calculate optimal financing strategy for a batch of jobs
 */
export function optimizeBatchFinancing(
  jobs: Array<{ jobId: string; estimatedCost: number }>,
  creditAssessment: CreditAssessment
): {
  totalCost: number;
  totalSavings: number;
  jobStrategies: Array<{
    jobId: string;
    recommendedOption: 'on-demand' | 'reserved' | 'credit-line';
    savings: number;
  }>;
} {
  let totalCost = 0;
  let totalSavings = 0;
  const jobStrategies: Array<{
    jobId: string;
    recommendedOption: 'on-demand' | 'reserved' | 'credit-line';
    savings: number;
  }> = [];

  let remainingCredit = creditAssessment.creditLimit;

  for (const job of jobs) {
    const savings = calculateSavings(job.estimatedCost, creditAssessment.creditTier);

    let recommendedOption: 'on-demand' | 'reserved' | 'credit-line' = 'on-demand';
    let jobCost = savings.onDemandCost;
    let jobSavings = 0;

    // Try credit line first if available
    if (job.estimatedCost <= remainingCredit) {
      recommendedOption = 'credit-line';
      jobCost = savings.creditLineCost;
      jobSavings = savings.creditLineSavings;
      remainingCredit -= job.estimatedCost;
    }
    // Fall back to reserved
    else if (savings.reservedSavings > 0) {
      recommendedOption = 'reserved';
      jobCost = savings.reservedCost;
      jobSavings = savings.reservedSavings;
    }

    totalCost += jobCost;
    totalSavings += jobSavings;

    jobStrategies.push({
      jobId: job.jobId,
      recommendedOption,
      savings: Math.round(jobSavings * 100) / 100,
    });
  }

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    jobStrategies,
  };
}
