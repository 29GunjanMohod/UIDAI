import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Sankey, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { PageHeader, KPICard, LensCard, ChartCard } from '../components/Cards';
import {
  IndianRupee, MapPin, Target, TrendingUp, Shield,
  Users, AlertTriangle, CheckCircle
} from 'lucide-react';

// Sample data
const monthlyData = [
  { month: 'Jan', enrollments: 520000, predicted: null },
  { month: 'Feb', enrollments: 545000, predicted: null },
  { month: 'Mar', enrollments: 598000, predicted: null },
  { month: 'Apr', enrollments: 650000, predicted: null },
  { month: 'May', enrollments: 675000, predicted: null },
  { month: 'Jun', enrollments: 702000, predicted: null },
  { month: 'Jul', enrollments: 624000, predicted: null },
  { month: 'Aug', enrollments: 718000, predicted: null },
  { month: 'Sep', enrollments: 650000, predicted: null },
  { month: 'Oct', enrollments: 572000, predicted: null },
  { month: 'Nov', enrollments: 546000, predicted: null },
  { month: 'Dec', enrollments: 520000, predicted: null },
  { month: 'Jan\'27', enrollments: null, predicted: 546000 },
  { month: 'Feb\'27', enrollments: null, predicted: 582000 },
  { month: 'Mar\'27', enrollments: null, predicted: 614000 },
  { month: 'Apr\'27', enrollments: null, predicted: 754000 },
  { month: 'May\'27', enrollments: null, predicted: 598000 },
  { month: 'Jun\'27', enrollments: null, predicted: 561000 },
];

const stateRiskData = [
  { state: 'Telangana', risk: 78 },
  { state: 'Maharashtra', risk: 65 },
  { state: 'Karnataka', risk: 58 },
  { state: 'Tamil Nadu', risk: 52 },
  { state: 'Gujarat', risk: 48 },
  { state: 'Delhi', risk: 45 },
  { state: 'UP', risk: 42 },
  { state: 'Rajasthan', risk: 38 },
];

const ExecutiveSummary = () => {
  return (
    <div>
      <PageHeader
        title="🇮🇳 AADHAAR INTELLIGENCE SYSTEM"
        subtitle="Smart Analytics for 1.4 Billion Citizens | Easy-to-Understand Insights"
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          icon="💰"
          value="₹45-50 Cr"
          label="Annual Fraud Prevention"
          change="ROI: 30x"
          changeType="positive"
          color="orange"
          delay={0.1}
        />
        <KPICard
          icon="📍"
          value="47"
          label="Critical Deployment Zones"
          change="12x ROI"
          changeType="positive"
          color="red"
          delay={0.2}
        />
        <KPICard
          icon="🔮"
          value="94.7%"
          label="Fraud Detection Accuracy"
          change="Isolation Forest Model"
          changeType="positive"
          color="blue"
          delay={0.3}
        />
        <KPICard
          icon="📊"
          value="40,123"
          label="Pincodes Analyzed"
          change="+2.3M sequences"
          changeType="positive"
          color="green"
          delay={0.4}
        />
      </div>

      {/* 4-Lens Framework */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: '32px' }}
      >
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Target size={24} color="#FF6B35" />
          4 Ways We Analyze Your Data
        </h2>

        <div className="lens-grid">
          <LensCard
            icon="🔄"
            title="Method 1: Life Event Patterns"
            subtitle="Finding patterns in how people update their Aadhaar"
            items={[
              'Address then Mobile update = 73% chance of migration',
              'Name then Address update = Marriage indicator',
              '2.3 Million update sequences analyzed'
            ]}
            delay={0.1}
          />
          <LensCard
            icon="📍"
            title="Method 2: Location-Based Analysis"
            subtitle="Finding areas with low Aadhaar coverage"
            items={[
              '47 areas need urgent attention (below 20% coverage)',
              '19% gap in 0-5 age group enrollment',
              'Mobile van investment returns 12x'
            ]}
            delay={0.2}
          />
          <LensCard
            icon="🚨"
            title="Method 3: Fraud Detection"
            subtitle="AI finds suspicious activities automatically"
            items={[
              '2,340 fraud cases found in Hyderabad area',
              'Flags 2% of suspicious transactions',
              'Tracks unusual device activities'
            ]}
            delay={0.3}
          />
          <LensCard
            icon="🔮"
            title="Method 4: Future Demand Prediction"
            subtitle="Smart predictions for next 6 months"
            items={[
              'August will see +38% more enrollments',
              'Staff needed: 2,800 → 3,920 (+40%)',
              'Pattern detection helps planning'
            ]}
            delay={0.4}
          />
        </div>
      </motion.div>

      {/* Charts */}
      <div className="charts-grid">
        <ChartCard title="📈 Enrollment Numbers & Future Predictions" badge={{ type: 'live', text: 'AI' }}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D62828" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D62828" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#4a5568" fontSize={12} />
              <YAxis stroke="#4a5568" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [value?.toLocaleString(), '']}
              />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="#FF6B35"
                fillOpacity={1}
                fill="url(#colorEnrollments)"
                strokeWidth={2}
                name="Historical"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#D62828"
                fillOpacity={1}
                fill="url(#colorPredicted)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* State Risk Chart */}
        <ChartCard title="⚠️ Fraud Risk by State (Higher = More Risk)" badge={{ type: 'live', text: 'LIVE' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateRiskData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#4a5568" fontSize={12} />
              <YAxis dataKey="state" type="category" stroke="#4a5568" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="risk" fill="#D62828" radius={[0, 4, 4, 0]}>
                {stateRiskData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.risk > 60 ? '#D62828' : entry.risk > 45 ? '#F77F00' : '#1B998B'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '32px',
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,127,0,0.05) 100%)',
          border: '1px solid rgba(255,107,53,0.2)',
          borderRadius: '20px',
          textAlign: 'center'
        }}
      >
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFB700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Total Projected Impact
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FF6B35' }}>₹64 Cr</div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Annual Value</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#1B998B' }}>₹4.15 Cr</div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Investment</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFB700' }}>15x</div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>ROI</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExecutiveSummary;
