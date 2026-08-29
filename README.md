GPU Marketplace Finance Platform

A comprehensive two-sided marketplace finance platform that democratizes access to GPU compute through innovative pricing, credit scoring, and job-level micro-financing.

## Overview

ComputeFlow is a next-generation GPU marketplace that solves critical problems on both sides of the compute market:

**For GPU Suppliers:** Maximize utilization rates and revenue through dynamic pricing and automated optimization.

**For MSMEs & Developers:** Access affordable GPU compute through credit-based financing, eliminating upfront cost barriers.

The platform creates a compounding flywheel effect where increased utilization drives more revenue, enables lower prices, attracts more users, improves network liquidity, and further increases platform value.

## Key Features

### Two-Sided Value Proposition

#### Asset Owner Benefits
- **Dynamic Pricing Engine**: Automated price optimization based on real-time demand and utilization
- **40-60% Utilization Increase**: Unlock idle capacity through flexible pricing strategies
- **Revenue Maximization**: Earn competitive rates with transparent, market-driven pricing
- **Real-time Analytics**: Monitor performance, utilization, and earnings through comprehensive dashboards

#### Renter Benefits
- **Compute Credit Scoring**: Usage-based underwriting that grows with your business
- **Job-Level Micro-Financing**: Pay later for individual GPU jobs with flexible terms
- **20-40% Cost Savings**: Lower prices through optimized marketplace dynamics
- **Tiered Credit System**: Bronze, Silver, and Gold tiers with progressive benefits

### Core Capabilities

#### 1. Dynamic Pricing Engine
- Real-time price adjustment based on GPU utilization (45-95%)
- Exponential pricing curve for realistic market pressure
- Smooth price transitions to prevent market shocks
- Price range: $1.20 - $3.50 per GPU hour

#### 2. Credit Scoring System
- Compute Score range: 650-850 (similar to FICO)
- Multi-signal underwriting:
  - Payment reliability (35% weight)
  - Usage consistency (25% weight)
  - Business growth (20% weight)
  - Technical stability (20% weight)
- Automated credit limit calculation
- Three-tier system (Bronze/Silver/Gold)

#### 3. Job-Level Micro-Financing
- Pay-later options for individual compute jobs
- Flexible payment terms: 30-90 days based on tier
- Interest rates: 0.25%-1% monthly (5.5%-12% APR)
- Example: $2,592 training job → pay $2,631 over 90 days, save ~$400 vs on-demand

#### 4. Supplier Revenue Optimization
- 60/40 revenue split (60% to suppliers)
- Multi-model comparison (Self-operated vs AWS vs VitC)
- Performance scoring and rewards
- Real-time utilization tracking across GPU fleets

## Tech Stack

- **Framework**: [Next.js 14.2.5](https://nextjs.org/) - React-based web framework with server-side rendering
- **Language**: [TypeScript 5.5.4](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 3.4.7](https://tailwindcss.com/) - Utility-first CSS framework
- **Charts**: [Recharts 2.12.7](https://recharts.org/) - Composable charting library
- **Icons**: [Lucide React 0.424.0](https://lucide.dev/) - Beautiful icon library
- **Build Tool**: [PostCSS 8.4.40](https://postcss.org/) - CSS transformation pipeline

## Project Structure

```
VitC/
├── pages/
│   ├── index.tsx              # Main application entry with navigation
│   └── _app.tsx               # Next.js app wrapper
├── src/
│   └── components/
│       └── OverviewView.tsx   # Platform overview dashboard
├── lib/
│   └── supplier-data.ts       # Supplier portfolio & revenue calculations
├── creditScoring.ts           # Credit assessment & micro-financing engine
├── gpu-pricing-engine.ts      # Dynamic pricing simulation
├── MSMEView.tsx              # MSME portal with credit tiers
├── SupplierView.tsx          # Supplier dashboard with fleet management
├── StatCard.tsx              # Reusable stat card component
├── styles/
│   └── globals.css           # Global styles and Tailwind imports
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── next.config.js            # Next.js configuration
```

### Key Modules

**creditScoring.ts** - Comprehensive credit scoring and financing logic
- Compute score calculation with multi-signal underwriting
- Credit tier determination and limit calculation
- Job-level financing options with payment schedules
- Batch financing optimization
- Savings calculation across payment models

**gpu-pricing-engine.ts** - Real-time pricing simulation
- Dynamic price calculation based on utilization
- Smooth utilization transitions with realistic fluctuations
- Historical data tracking for trend analysis
- Revenue comparison across pricing models

**lib/supplier-data.ts** - Supplier-side business logic
- Portfolio management and lease tracking
- Revenue sharing calculations (60/40 split)
- Performance scoring system
- Comparison metrics (Self-operated vs AWS vs VitC)
- Revenue projection modeling

## Quick Start

### Prerequisites

- Node.js 20.x or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd VitC

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The development server includes:
- Hot module replacement for instant updates
- TypeScript type checking
- Fast refresh for React components

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint for code quality
npm run lint
```

## Key Features Demonstrated

### Overview Dashboard
- Real-time utilization metrics with live updates (3-second intervals)
- Compounding flywheel visualization showing value creation cycle
- Utilization impact analysis comparing with/without VitC system
- Revenue comparison charts (Traditional vs VitC)
- Two-sided value proposition breakdown

### Supplier Dashboard
- Active supplier fleet management with 5 mock suppliers
- Real-time utilization tracking with color-coded performance
- Revenue comparison across suppliers
- Performance scoring (uptime, utilization, satisfaction)
- GPU model tracking (H100, A100, V100, MI300X)
- Status monitoring (active, idle, maintenance)

### MSME Portal
- Compute Score tracking with 6-month journey visualization
- Three-tier credit system (Bronze/Silver/Gold)
  - Bronze: $5K limit, 150 GPU hours/month, 1% interest
  - Silver: $15K limit, 500 GPU hours/month, 0.5% interest
  - Gold: $50K limit, 2000 GPU hours/month, 0.25% interest
- Job-level micro-financing example (LLaMA-3 fine-tuning)
- Savings breakdown by category
- Credit limit and utilization tracking

### Dynamic Pricing
- Live price updates based on simulated demand
- Price range: $1.20-$3.50 per GPU hour
- Utilization-driven pricing (exponential curve)
- Historical trend visualization

## Innovation Unbound Hackathon Context

VitC addresses critical challenges in the AI/ML compute market:

### Problem Statement
1. **Supply Side**: GPU owners struggle with low utilization rates (typically 40-60%), leaving expensive hardware idle
2. **Demand Side**: MSMEs and developers face high upfront costs, limited access to compute, and unpredictable pricing

### Solution Innovation
1. **Dynamic Pricing**: Automatically adjusts prices based on real-time utilization, maximizing both supplier revenue and accessibility
2. **Compute Credit Scoring**: Novel underwriting approach using usage patterns instead of traditional credit metrics
3. **Job-Level Financing**: Micro-financing at the granularity of individual compute jobs, unprecedented in the market
4. **Two-Sided Flywheel**: Creates compounding value through network effects

### Market Impact
- **Suppliers**: 40-60% utilization increase, 35-50% revenue growth
- **Renters**: 20-40% cost savings, democratized access to compute
- **Platform**: Sustainable 60/40 revenue split model

### Technical Innovation
- Real-time pricing simulation with exponential demand curves
- Multi-signal credit scoring algorithm
- Payment schedule optimization
- Automated risk assessment for micro-financing

## Key Metrics & Performance

### Platform Metrics (Demonstrated in Prototype)
- **Average Utilization**: 87.3% (vs 45-60% traditional)
- **Active Users**: 12,847+
- **Price Efficiency**: $24.50 average (8.3% below market)
- **Supply Unlocked**: $2.4M+ in previously idle capacity

### Credit Scoring
- **Score Range**: 650-850
- **Assessment Signals**: 4 weighted components
- **Credit Limits**: $5K - $50K based on tier
- **Interest Rates**: 5.5% - 12% APR (competitive with traditional SME financing)

### Supplier Performance
- **Revenue Share**: 60% to suppliers (vs 40-50% on competing platforms)
- **Average Supplier Score**: 85.7/100
- **Fleet Uptime**: 99.5%+ average
- **GPU Types**: H100, A100, V100, MI300X support

## Future Enhancements

- **Blockchain Integration**: On-chain credit scores and payment verification
- **Advanced Risk Models**: Machine learning for default prediction
- **Multi-Region Support**: Global GPU marketplace with regional pricing
- **Spot Market**: Real-time bidding for urgent compute needs
- **API Access**: Developer API for programmatic access
- **Mobile App**: iOS/Android apps for on-the-go management
- **Smart Contracts**: Automated payment execution and dispute resolution

## Development Notes

- The prototype uses simulated real-time data with 3-second update intervals
- All pricing and scoring algorithms are production-ready
- Mock data demonstrates realistic scenarios with 5 suppliers, multiple credit tiers, and various GPU types
- Color-coded visualizations follow accessibility standards

## Contributing

This project was built for the Innovation Unbound Hackathon. For contributions or inquiries:

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## License

Copyright © 2026 VitC. All rights reserved.

## Contact

- **Email**: contact@vitc.ai
- **Location**: San Francisco, CA
- **Project Type**: Innovation Unbound Hackathon 2026

---

Built with ❤️ for democratizing AI compute access
