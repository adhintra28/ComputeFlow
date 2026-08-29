/**
 * GPU Pricing Engine Simulation Module
 * Simulates real-time GPU utilization, dynamic pricing, and revenue metrics
 */

export interface PricingData {
  currentPrice: number;
  utilization: number;
  activeUsers: number;
  standbyQueue: number;
  timestamp: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface UtilizationDataPoint {
  timestamp: number;
  utilization: number;
  price: number;
  activeUsers: number;
}

export interface RevenueComparison {
  traditional: {
    model: string;
    hourlyRate: number;
    monthlyRevenue: number;
    utilization: number;
  };
  dynamic: {
    model: string;
    averageRate: number;
    monthlyRevenue: number;
    utilization: number;
    peakRate: number;
  };
  creditLine: {
    model: string;
    averageRate: number;
    monthlyRevenue: number;
    utilization: number;
    creditMultiplier: number;
  };
}

// Configuration constants
const PRICE_MIN = 1.20;
const PRICE_MAX = 3.50;
const UTILIZATION_MIN = 45;
const UTILIZATION_MAX = 95;
const ACTIVE_USERS_MIN = 250;
const ACTIVE_USERS_MAX = 500;
const STANDBY_QUEUE_MIN = 8000;
const STANDBY_QUEUE_MAX = 10000;
const HISTORY_POINTS = 50;

// Simulation state
let utilizationHistory: UtilizationDataPoint[] = [];
let lastUpdateTime = Date.now();
let currentUtilization = 70;
let currentActiveUsers = 375;

/**
 * Generate a random number within a range
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Smooth transition for utilization changes
 */
function smoothTransition(current: number, target: number, smoothing: number = 0.3): number {
  return current + (target - current) * smoothing;
}

/**
 * Calculate dynamic price based on GPU utilization
 * Uses exponential curve for more realistic pricing pressure
 */
function calculateDynamicPrice(utilization: number): number {
  const normalized = (utilization - UTILIZATION_MIN) / (UTILIZATION_MAX - UTILIZATION_MIN);
  const exponentialFactor = Math.pow(normalized, 1.8);
  const price = PRICE_MIN + (PRICE_MAX - PRICE_MIN) * exponentialFactor;
  return Math.round(price * 100) / 100;
}

/**
 * Simulate GPU utilization with realistic fluctuations
 */
function simulateUtilization(): number {
  const targetUtilization = randomInRange(UTILIZATION_MIN, UTILIZATION_MAX);
  currentUtilization = smoothTransition(currentUtilization, targetUtilization, 0.2);

  // Add small random noise
  const noise = randomInRange(-2, 2);
  currentUtilization = Math.max(UTILIZATION_MIN, Math.min(UTILIZATION_MAX, currentUtilization + noise));

  return Math.round(currentUtilization * 10) / 10;
}

/**
 * Simulate active user count based on utilization
 */
function simulateActiveUsers(utilization: number): number {
  const baseTarget = ACTIVE_USERS_MIN + (ACTIVE_USERS_MAX - ACTIVE_USERS_MIN) *
    ((utilization - UTILIZATION_MIN) / (UTILIZATION_MAX - UTILIZATION_MIN));

  currentActiveUsers = Math.round(smoothTransition(currentActiveUsers, baseTarget, 0.15));

  return Math.max(ACTIVE_USERS_MIN, Math.min(ACTIVE_USERS_MAX, currentActiveUsers));
}

/**
 * Simulate standby queue count
 */
function simulateStandbyQueue(): number {
  return Math.round(randomInRange(STANDBY_QUEUE_MIN, STANDBY_QUEUE_MAX));
}

/**
 * Update utilization history with new data point
 */
function updateHistory(dataPoint: UtilizationDataPoint): void {
  utilizationHistory.push(dataPoint);

  // Keep only the last HISTORY_POINTS
  if (utilizationHistory.length > HISTORY_POINTS) {
    utilizationHistory.shift();
  }
}

/**
 * Initialize history with some data points
 */
function initializeHistory(): void {
  if (utilizationHistory.length === 0) {
    const now = Date.now();
    const interval = 60000; // 1 minute intervals

    for (let i = HISTORY_POINTS - 1; i >= 0; i--) {
      const timestamp = now - (i * interval);
      const utilization = randomInRange(UTILIZATION_MIN, UTILIZATION_MAX);
      const price = calculateDynamicPrice(utilization);
      const activeUsers = Math.round(randomInRange(ACTIVE_USERS_MIN, ACTIVE_USERS_MAX));

      utilizationHistory.push({
        timestamp,
        utilization: Math.round(utilization * 10) / 10,
        price,
        activeUsers,
      });
    }
  }
}

/**
 * Get current pricing data
 * Returns real-time simulation of GPU pricing metrics
 */
export function getPricingData(): PricingData {
  const now = Date.now();
  const utilization = simulateUtilization();
  const price = calculateDynamicPrice(utilization);
  const activeUsers = simulateActiveUsers(utilization);
  const standbyQueue = simulateStandbyQueue();

  // Update history
  updateHistory({
    timestamp: now,
    utilization,
    price,
    activeUsers,
  });

  lastUpdateTime = now;

  return {
    currentPrice: price,
    utilization,
    activeUsers,
    standbyQueue,
    timestamp: now,
    priceRange: {
      min: PRICE_MIN,
      max: PRICE_MAX,
    },
  };
}

/**
 * Get utilization history data
 * Returns time-series data for visualization
 */
export function getUtilizationData(): UtilizationDataPoint[] {
  initializeHistory();
  return [...utilizationHistory];
}

/**
 * Get revenue comparison between pricing models
 * Calculates and compares traditional, dynamic, and credit line models
 */
export function getRevenueComparison(): RevenueComparison {
  initializeHistory();

  // Calculate average utilization and price from history
  const avgUtilization = utilizationHistory.reduce((sum, point) => sum + point.utilization, 0) / utilizationHistory.length;
  const avgPrice = utilizationHistory.reduce((sum, point) => sum + point.price, 0) / utilizationHistory.length;
  const peakPrice = Math.max(...utilizationHistory.map(point => point.price));

  // Assumptions for calculations
  const hoursPerMonth = 730;
  const avgActiveUsers = 375;

  // Traditional fixed pricing (single tier)
  const traditionalRate = 2.00;
  const traditionalUtilization = 65; // Lower utilization due to fixed pricing
  const traditionalMonthlyRevenue = traditionalRate * hoursPerMonth * avgActiveUsers * (traditionalUtilization / 100);

  // Dynamic pricing model
  const dynamicUtilization = avgUtilization;
  const dynamicMonthlyRevenue = avgPrice * hoursPerMonth * avgActiveUsers * (dynamicUtilization / 100);

  // Credit line model (higher utilization, slightly lower effective rate)
  const creditMultiplier = 1.15; // 15% boost from credit-enabled users
  const creditUtilization = Math.min(dynamicUtilization * 1.08, 95); // 8% higher utilization
  const creditEffectiveRate = avgPrice * 0.95; // Slightly lower rate due to credits
  const creditMonthlyRevenue = creditEffectiveRate * hoursPerMonth * avgActiveUsers * creditMultiplier * (creditUtilization / 100);

  return {
    traditional: {
      model: "Fixed Tier Pricing",
      hourlyRate: Math.round(traditionalRate * 100) / 100,
      monthlyRevenue: Math.round(traditionalMonthlyRevenue),
      utilization: Math.round(traditionalUtilization * 10) / 10,
    },
    dynamic: {
      model: "Dynamic Load-Based",
      averageRate: Math.round(avgPrice * 100) / 100,
      monthlyRevenue: Math.round(dynamicMonthlyRevenue),
      utilization: Math.round(dynamicUtilization * 10) / 10,
      peakRate: Math.round(peakPrice * 100) / 100,
    },
    creditLine: {
      model: "Credit Line Enhanced",
      averageRate: Math.round(creditEffectiveRate * 100) / 100,
      monthlyRevenue: Math.round(creditMonthlyRevenue),
      utilization: Math.round(creditUtilization * 10) / 10,
      creditMultiplier: Math.round(creditMultiplier * 100) / 100,
    },
  };
}

/**
 * Reset simulation state (useful for testing)
 */
export function resetSimulation(): void {
  utilizationHistory = [];
  lastUpdateTime = Date.now();
  currentUtilization = 70;
  currentActiveUsers = 375;
}

/**
 * Get simulation statistics
 */
export function getSimulationStats() {
  return {
    historyLength: utilizationHistory.length,
    lastUpdate: lastUpdateTime,
    currentUtilization,
    currentActiveUsers,
    config: {
      priceRange: { min: PRICE_MIN, max: PRICE_MAX },
      utilizationRange: { min: UTILIZATION_MIN, max: UTILIZATION_MAX },
      userRange: { min: ACTIVE_USERS_MIN, max: ACTIVE_USERS_MAX },
      queueRange: { min: STANDBY_QUEUE_MIN, max: STANDBY_QUEUE_MAX },
    },
  };
}
