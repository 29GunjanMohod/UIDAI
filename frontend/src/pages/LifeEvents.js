import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sankey, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts';
import { PageHeader, KPICard, ChartCard, DataTable, StatusBadge } from '../components/Cards';

// Sankey data for update flows
const sankeyData = {
  nodes: [
    { name: 'Address' },
    { name: 'Mobile' },
    { name: 'Name' },
    { name: 'DOB' },
    { name: 'Photo' },
    { name: 'Email' },
  ],
  links: [
    { source: 0, target: 1, value: 4500 },
    { source: 0, target: 2, value: 1200 },
    { source: 0, target: 5, value: 800 },
    { source: 1, target: 0, value: 3200 },
    { source: 1, target: 5, value: 1500 },
    { source: 2, target: 0, value: 2800 },
    { source: 2, target: 1, value: 1800 },
    { source: 2, target: 4, value: 900 },
    { source: 4, target: 0, value: 1100 },
    { source: 3, target: 2, value: 400 },
  ]
};

// Pattern data
const patternData = [
  { pattern: 'Address → Mobile', count: 15234, confidence: 73, event: 'Migration' },
  { pattern: 'Name → Address', count: 8921, confidence: 68, event: 'Marriage' },
  { pattern: 'Address → Email', count: 5673, confidence: 61, event: 'Job Change' },
  { pattern: 'Photo → Address', count: 3421, confidence: 82, event: 'Decennial Update' },
  { pattern: 'Name → DOB', count: 1892, confidence: 89, event: 'Correction' },
];

const flowData = [
  { from: 'Address', to: 'Mobile', count: 4500 },
  { from: 'Mobile', to: 'Address', count: 3200 },
  { from: 'Name', to: 'Address', count: 2800 },
  { from: 'Name', to: 'Mobile', count: 1800 },
  { from: 'Mobile', to: 'Email', count: 1500 },
  { from: 'Address', to: 'Name', count: 1200 },
  { from: 'Photo', to: 'Address', count: 1100 },
];

const LifeEvents = () => {
  return (
    <div>
      <PageHeader 
        title="🔄 Life Event Pattern Analysis"
        subtitle="Finding patterns in how people update their Aadhaar (address changes, mobile updates, etc.)"
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard 
          icon="📊"
          value="2.3M"
          label="Sequences Analyzed"
          change="+15% YoY"
          changeType="positive"
          color="blue"
          delay={0.1}
        />
        <KPICard 
          icon="🎯"
          value="73%"
          label="Migration Detection"
          change="Accuracy"
          changeType="positive"
          color="green"
          delay={0.2}
        />
        <KPICard 
          icon="⏱️"
          value="15 days"
          label="Avg Update Gap"
          change="Addr→Mobile"
          changeType="positive"
          color="orange"
          delay={0.3}
        />
        <KPICard 
          icon="🔗"
          value="5"
          label="Key Patterns Found"
          change="Life Events"
          changeType="positive"
          color="purple"
          delay={0.4}
        />
      </div>

      {/* Flow Visualization */}
      <ChartCard title="🌊 Update Flow Patterns (How Updates Connect)" badge={{ type: 'live', text: 'FLOW' }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px',
          padding: '20px 0'
        }}>
          {flowData.map((flow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,127,0,0.05) 100%)',
                border: '1px solid rgba(255,107,53,0.2)',
                borderRadius: '12px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ 
                background: 'linear-gradient(135deg, #FF6B35, #F77F00)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {flow.from}
              </span>
              <span style={{ color: '#FF6B35', fontSize: '20px' }}>→</span>
              <span style={{ 
                background: 'linear-gradient(135deg, #004E89, #0066B3)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {flow.to}
              </span>
              <span style={{ 
                color: '#FFB700',
                fontWeight: '700',
                fontSize: '16px',
                marginLeft: '8px'
              }}>
                {flow.count.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </ChartCard>

      {/* Pattern Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="🎯 Detected Life Event Patterns">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patternData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#4a5568" fontSize={12} />
              <YAxis 
                dataKey="pattern" 
                type="category" 
                stroke="#4a5568" 
                fontSize={12} 
                width={150}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [value.toLocaleString(), name === 'count' ? 'Cases' : 'Confidence']}
              />
              <Bar dataKey="count" fill="#FF6B35" radius={[0, 4, 4, 0]}>
                {patternData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`rgba(255,107,53,${0.4 + (entry.confidence/100) * 0.6})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>

      {/* Patterns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="📋 Pattern Details">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Life Event</th>
                <th>Detected Cases</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patternData.map((pattern, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <td style={{ fontWeight: '600', color: '#FF6B35' }}>{pattern.pattern}</td>
                  <td>
                    <span style={{
                      background: 'rgba(0,78,137,0.2)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#1565C0'
                    }}>
                      {pattern.event}
                    </span>
                  </td>
                  <td>{pattern.count.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '60px',
                        height: '6px',
                        background: '#e2e8f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${pattern.confidence}%`,
                          height: '100%',
                          background: pattern.confidence > 70 ? '#1B998B' : '#F77F00',
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span>{pattern.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge 
                      status={pattern.confidence > 70 ? 'success' : 'warning'} 
                      text={pattern.confidence > 70 ? 'High Confidence' : 'Medium'}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </motion.div>

      {/* Insight Box */}
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
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#1B998B'
        }}>
          💡 Key Insight
        </h4>
        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
          <strong style={{ color: '#fff' }}>Address → Mobile update within 15 days</strong> is a 
          <strong style={{ color: '#1B998B' }}> 73% accurate migration indicator</strong>. 
          This pattern can be used to proactively offer services in new locations and update 
          regional resource allocation for enrollment centers.
        </p>
      </motion.div>
    </div>
  );
};

export default LifeEvents;
