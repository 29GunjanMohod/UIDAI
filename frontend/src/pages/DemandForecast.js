import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart
} from 'recharts';
import { PageHeader, KPICard, ChartCard, StatusBadge } from '../components/Cards';
import { TrendingUp, Users, Calendar, Cpu } from 'lucide-react';

// Historical + Forecast data
const forecastData = [
  { month: 'Jan 26', actual: 520000, predicted: null, type: 'historical' },
  { month: 'Feb', actual: 545000, predicted: null, type: 'historical' },
  { month: 'Mar', actual: 598000, predicted: null, type: 'historical' },
  { month: 'Apr', actual: 650000, predicted: null, type: 'historical' },
  { month: 'May', actual: 675000, predicted: null, type: 'historical' },
  { month: 'Jun', actual: 702000, predicted: null, type: 'historical' },
  { month: 'Jul', actual: 624000, predicted: null, type: 'historical' },
  { month: 'Aug', actual: 718000, predicted: null, type: 'historical' },
  { month: 'Sep', actual: 650000, predicted: null, type: 'historical' },
  { month: 'Oct', actual: 572000, predicted: null, type: 'historical' },
  { month: 'Nov', actual: 546000, predicted: null, type: 'historical' },
  { month: 'Dec', actual: 520000, predicted: null, type: 'historical' },
  { month: 'Jan 27', actual: null, predicted: 546000, upper: 600600, lower: 491400, type: 'forecast' },
  { month: 'Feb', actual: null, predicted: 582000, upper: 640200, lower: 523800, type: 'forecast' },
  { month: 'Mar', actual: null, predicted: 614000, upper: 675400, lower: 552600, type: 'forecast' },
  { month: 'Apr', actual: null, predicted: 754000, upper: 829400, lower: 678600, type: 'forecast' },
  { month: 'May', actual: null, predicted: 598000, upper: 657800, lower: 538200, type: 'forecast' },
  { month: 'Jun', actual: null, predicted: 561000, upper: 617100, lower: 504900, type: 'forecast' },
];

// Staffing data
const staffingData = [
  { month: 'Jan 27', predicted: 546000, staff: 2650, change: -150 },
  { month: 'Feb', predicted: 582000, staff: 2820, change: 20 },
  { month: 'Mar', predicted: 614000, staff: 2970, change: 170 },
  { month: 'Apr (Peak)', predicted: 754000, staff: 3920, change: 1120 },
  { month: 'May', predicted: 598000, staff: 2900, change: 100 },
  { month: 'Jun', predicted: 561000, staff: 2720, change: -80 },
];

// Model metrics (honest/realistic)
const modelMetrics = [
  { metric: 'Pattern Detection', value: '91.3%', description: 'Silhouette clustering score' },
  { metric: 'Estimators', value: '100', description: 'Number of decision trees' },
  { metric: 'Features', value: '7', description: 'Input features used' },
  { metric: 'Validation', value: 'TimeSeriesSplit', description: 'Temporal cross-validation' },
];

// Seasonal pattern
const seasonalData = [
  { month: 'Jan', factor: 1.0 },
  { month: 'Feb', factor: 1.05 },
  { month: 'Mar', factor: 1.15 },
  { month: 'Apr', factor: 1.25 },
  { month: 'May', factor: 1.30 },
  { month: 'Jun', factor: 1.35 },
  { month: 'Jul', factor: 1.20 },
  { month: 'Aug', factor: 1.38 },
  { month: 'Sep', factor: 1.25 },
  { month: 'Oct', factor: 1.10 },
  { month: 'Nov', factor: 1.05 },
  { month: 'Dec', factor: 1.0 },
];

const DemandForecast = () => {
  const BASE_STAFF = 2800;

  return (
    <div>
      <PageHeader
        title="🔮 Future Demand Prediction"
        subtitle="Smart AI predicts enrollment demand for next 6 months to help plan staff and resources"
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          icon="🎯"
          value="91.3%"
          label="Pattern Detection"
          change="K-Means Clustering"
          changeType="positive"
          color="green"
          delay={0.1}
        />
        <KPICard
          icon="📈"
          value="+38%"
          label="Peak Surge (April)"
          change="Predicted"
          changeType="positive"
          color="orange"
          delay={0.2}
        />
        <KPICard
          icon="👥"
          value="3,920"
          label="Peak Staff Required"
          change="+40% from baseline"
          changeType="positive"
          color="blue"
          delay={0.3}
        />
        <KPICard
          icon="📊"
          value="8.3%"
          label="MAPE Score"
          change="Low error rate"
          changeType="positive"
          color="purple"
          delay={0.4}
        />
      </div>

      {/* Main Forecast Chart */}
      <ChartCard title="📈 Enrollment Forecast (6 Months)" badge={{ type: 'live', text: 'RANDOM FOREST' }}>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={forecastData}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#004E89" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#004E89" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
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
              formatter={(value) => value ? [value.toLocaleString(), ''] : ['-', '']}
            />
            <Legend />

            {/* Confidence Band */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="rgba(255,107,53,0.1)"
              name="Upper Bound"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#ffffff"
              name="Lower Bound"
            />

            {/* Historical Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#004E89"
              strokeWidth={3}
              dot={{ fill: '#004E89', r: 4 }}
              name="Historical"
            />

            {/* Forecast Line */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#FF6B35"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#FF6B35', r: 6 }}
              name="Forecast"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Charts Grid */}
      <div className="charts-grid" style={{ marginTop: '24px' }}>
        {/* Staffing Chart */}
        <ChartCard title="👥 Dynamic Staffing Plan">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={staffingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#4a5568" fontSize={11} />
              <YAxis stroke="#4a5568" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="staff" radius={[4, 4, 0, 0]} name="Staff Required">
                {staffingData.map((entry, index) => (
                  <motion.rect
                    key={`bar-${index}`}
                    fill={entry.staff > BASE_STAFF ? '#FF6B35' : '#1B998B'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '12px',
            padding: '8px',
            background: 'rgba(0,0,0,0.03)',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '3px',
              height: '20px',
              background: '#4a5568',
              borderRadius: '2px'
            }} />
            <span style={{ fontSize: '12px', color: '#4a5568' }}>
              Baseline: {BASE_STAFF.toLocaleString()} staff
            </span>
          </div>
        </ChartCard>

        {/* Seasonal Pattern */}
        <ChartCard title="📅 Seasonal Pattern">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={seasonalData}>
              <defs>
                <linearGradient id="colorSeasonal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7209B7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7209B7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#4a5568" fontSize={12} />
              <YAxis stroke="#4a5568" fontSize={12} domain={[0.9, 1.5]} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${((value - 1) * 100).toFixed(0)}%`, 'Seasonal Factor']}
              />
              <Area
                type="monotone"
                dataKey="factor"
                stroke="#7209B7"
                strokeWidth={2}
                fill="url(#colorSeasonal)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '12px',
            fontSize: '12px'
          }}>
            <span style={{ color: '#D62828' }}>📈 Peak: August (+38%)</span>
            <span style={{ color: '#1B998B' }}>📉 Low: Jan/Dec (baseline)</span>
          </div>
        </ChartCard>
      </div>

      {/* Model Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="🧠 Random Forest Model Performance">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            {modelMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: index === 0 ? '#1B998B' : index === 1 ? '#FF6B35' : index === 2 ? '#1565C0' : '#7209B7',
                  marginBottom: '8px'
                }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>
                  {item.metric}
                </div>
                <div style={{ fontSize: '11px', color: '#4a5568' }}>
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      {/* Staffing Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="📋 Detailed Staffing Forecast">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Predicted Enrollments</th>
                <th>Staff Required</th>
                <th>Change from Baseline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffingData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <td style={{ fontWeight: '600', color: item.month.includes('Peak') ? '#FF6B35' : '#fff' }}>
                    {item.month}
                  </td>
                  <td>{item.predicted.toLocaleString()}</td>
                  <td style={{ fontWeight: '600' }}>{item.staff.toLocaleString()}</td>
                  <td>
                    <span style={{
                      color: item.change > 0 ? '#FF6B35' : '#1B998B',
                      fontWeight: '600'
                    }}>
                      {item.change > 0 ? '+' : ''}{item.change}
                    </span>
                  </td>
                  <td>
                    <StatusBadge
                      status={item.change > 500 ? 'critical' : item.change > 0 ? 'warning' : 'success'}
                      text={item.change > 500 ? 'Scale Up' : item.change > 0 ? 'Increase' : 'Optimize'}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </motion.div>

      {/* Architecture Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          marginTop: '24px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(114,9,183,0.1) 0%, rgba(157,78,221,0.05) 100%)',
          border: '1px solid rgba(114,9,183,0.3)',
          borderRadius: '16px'
        }}
      >
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#a78bfa'
        }}>
          <Cpu size={20} />
          Random Forest Architecture
        </h4>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['Input (6 features)', 'Bootstrap Sampling', '100 Decision Trees', 'Aggregation', 'Prediction'].map((layer, index) => (
            <React.Fragment key={index}>
              <div style={{
                background: '#e2e8f0',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#fff'
              }}>
                {layer}
              </div>
              {index < 4 && <span style={{ color: '#a78bfa', fontSize: '20px' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DemandForecast;
