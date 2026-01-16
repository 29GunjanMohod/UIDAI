import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { PageHeader, KPICard, ChartCard, StatusBadge } from '../components/Cards';
import { AlertTriangle, Shield, Eye, Users } from 'lucide-react';

// Risk score distribution
const riskDistribution = Array.from({ length: 20 }, (_, i) => ({
  range: `${i * 5}-${i * 5 + 5}`,
  count: Math.floor(Math.random() * 500 + (i < 5 ? 1000 : i < 15 ? 300 : 50))
}));

// State risk data
const stateRiskData = [
  { state: 'Telangana', risk: 78, cases: 2340 },
  { state: 'Maharashtra', risk: 65, cases: 1890 },
  { state: 'Karnataka', risk: 58, cases: 1456 },
  { state: 'Tamil Nadu', risk: 52, cases: 1234 },
  { state: 'Gujarat', risk: 48, cases: 987 },
  { state: 'Delhi', risk: 45, cases: 876 },
  { state: 'UP', risk: 42, cases: 765 },
  { state: 'Rajasthan', risk: 38, cases: 654 },
];

// Failure reasons
const failureReasons = [
  { reason: 'Biometric Mismatch', count: 3500, color: '#D62828', indicator: 'High' },
  { reason: 'Image Quality', count: 3000, color: '#F77F00', indicator: 'Medium' },
  { reason: 'Timeout Error', count: 1500, color: '#FCBF49', indicator: 'Low' },
  { reason: 'Device Anomaly', count: 1000, color: '#7209B7', indicator: 'Medium' },
  { reason: 'Duplicate Attempt', count: 1000, color: '#004E89', indicator: 'High' },
];

// Fraud clusters
const fraudClusters = [
  { id: 1, location: 'Hyderabad Cluster', cases: 2340, devices: 45, avgRisk: 85, status: 'Active' },
  { id: 2, location: 'Mumbai Suburban', cases: 1245, devices: 28, avgRisk: 72, status: 'Monitoring' },
  { id: 3, location: 'Bangalore Rural', cases: 876, devices: 19, avgRisk: 68, status: 'Monitoring' },
];

// Anomaly scatter data
const anomalyData = Array.from({ length: 100 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 50 + 10,
  anomaly: Math.random() > 0.95
}));

const FraudDetection = () => {
  return (
    <div>
      <PageHeader 
        title="🚨 Fraud Detection & Suspicious Activity"
        subtitle="AI automatically finds unusual patterns and potential fraud cases"
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard 
          icon="⚠️"
          value="2.0%"
          label="Suspicious Cases Rate"
          change="Flagged for review"
          changeType="negative"
          color="red"
          delay={0.1}
        />
        <KPICard 
          icon="🔗"
          value="3"
          label="Fraud Groups Found"
          change="AI detected"
          changeType="negative"
          color="purple"
          delay={0.2}
        />
        <KPICard 
          icon="📍"
          value="2,340"
          label="Hyderabad Cases"
          change="Primary cluster"
          changeType="negative"
          color="orange"
          delay={0.3}
        />
        <KPICard 
          icon="💰"
          value="₹45-50 Cr"
          label="Prevention Value"
          change="Annual savings"
          changeType="positive"
          color="green"
          delay={0.4}
        />
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(214,40,40,0.2) 0%, rgba(214,40,40,0.1) 100%)',
          border: '1px solid rgba(214,40,40,0.4)',
          borderRadius: '12px',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <AlertTriangle size={24} color="#D62828" />
        <div>
          <div style={{ fontWeight: '600', color: '#f87171', marginBottom: '4px' }}>
            Active Fraud Alert: Hyderabad Cluster
          </div>
          <div style={{ fontSize: '13px', color: '#4a5568' }}>
            2,340 suspicious transactions detected from 45 devices in the last 30 days. 
            Recommended: Immediate investigation and device blacklisting.
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <ChartCard title="📊 Risk Score Distribution" badge={{ type: 'live', text: 'ISOLATION FOREST' }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={riskDistribution.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#4a5568" fontSize={10} />
              <YAxis stroke="#4a5568" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {riskDistribution.slice(0, 15).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index < 3 ? '#1B998B' : index < 10 ? '#FCBF49' : index < 13 ? '#F77F00' : '#D62828'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginTop: '12px',
            fontSize: '11px',
            color: '#4a5568'
          }}>
            <span>🟢 Low Risk</span>
            <span>🟡 Medium</span>
            <span>🟠 High</span>
            <span>🔴 Critical</span>
          </div>
        </ChartCard>

        <ChartCard title="⚠️ State-wise Risk Analysis">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stateRiskData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#4a5568" fontSize={12} />
              <YAxis dataKey="state" type="category" stroke="#4a5568" fontSize={11} width={80} />
              <Tooltip 
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [name === 'risk' ? `${value}` : value.toLocaleString(), name === 'risk' ? 'Risk Score' : 'Cases']}
              />
              <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
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

      {/* Failure Reasons */}
      <div className="charts-grid" style={{ marginTop: '24px' }}>
        <ChartCard title="🔍 Failure Reason Analysis">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={failureReasons}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="count"
                label={({ reason, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {failureReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginTop: '12px',
            flexWrap: 'wrap'
          }}>
            {failureReasons.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: item.color 
                }} />
                <span style={{ fontSize: '11px', color: '#4a5568' }}>{item.reason}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="🎯 Anomaly Scatter Plot" badge={{ type: 'live', text: 'ISOLATION FOREST' }}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="Feature 1" stroke="#4a5568" fontSize={12} />
              <YAxis type="number" dataKey="y" name="Feature 2" stroke="#4a5568" fontSize={12} />
              <ZAxis type="number" dataKey="z" range={[20, 200]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Scatter 
                name="Transactions" 
                data={anomalyData}
              >
                {anomalyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.anomaly ? '#D62828' : '#1B998B'}
                    opacity={entry.anomaly ? 1 : 0.5}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Fraud Clusters Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="🔗 Detected Fraud Clusters">
          <table className="data-table">
            <thead>
              <tr>
                <th>Cluster ID</th>
                <th>Location</th>
                <th>Suspicious Cases</th>
                <th>Devices Involved</th>
                <th>Avg Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fraudClusters.map((cluster, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <td style={{ fontWeight: '600', color: '#FF6B35' }}>#{cluster.id}</td>
                  <td>{cluster.location}</td>
                  <td style={{ fontWeight: '600', color: '#D62828' }}>{cluster.cases.toLocaleString()}</td>
                  <td>{cluster.devices}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '50px',
                        height: '6px',
                        background: '#e2e8f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${cluster.avgRisk}%`,
                          height: '100%',
                          background: cluster.avgRisk > 70 ? '#D62828' : '#F77F00',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span>{cluster.avgRisk}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge 
                      status={cluster.status === 'Active' ? 'critical' : 'warning'} 
                      text={cluster.status}
                    />
                  </td>
                  <td>
                    <button style={{
                      background: 'linear-gradient(135deg, #D62828, #F77F00)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Investigate
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </motion.div>

      {/* Prevention Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '24px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(27,153,139,0.1) 0%, rgba(19,136,8,0.05) 100%)',
          border: '1px solid rgba(27,153,139,0.3)',
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
          color: '#1B998B'
        }}>
          <Shield size={20} />
          Fraud Prevention Impact
        </h4>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FF6B35' }}>₹45-50 Cr</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Annual Prevention Value</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1B998B' }}>₹1.5 Cr</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>System Investment</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFB700' }}>30x</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Return on Investment</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1565C0' }}>Real-time</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Detection Speed</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FraudDetection;
