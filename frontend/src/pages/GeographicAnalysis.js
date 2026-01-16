import React from 'react';
import { motion } from 'framer-motion';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { PageHeader, KPICard, ChartCard, StatusBadge } from '../components/Cards';

// India map coordinates (simplified scatter representation)
const mapData = [
  { state: 'UP', lat: 26.8, lon: 80.9, saturation: 72, population: 200, category: 'High' },
  { state: 'Maharashtra', lat: 19.7, lon: 75.7, saturation: 68, population: 150, category: 'Medium' },
  { state: 'Bihar', lat: 25.1, lon: 85.3, saturation: 45, population: 120, category: 'Low' },
  { state: 'West Bengal', lat: 22.9, lon: 87.8, saturation: 58, population: 100, category: 'Medium' },
  { state: 'MP', lat: 22.9, lon: 78.7, saturation: 52, population: 90, category: 'Medium' },
  { state: 'Tamil Nadu', lat: 11.1, lon: 78.6, saturation: 78, population: 85, category: 'High' },
  { state: 'Rajasthan', lat: 27.0, lon: 74.2, saturation: 48, population: 80, category: 'Low' },
  { state: 'Karnataka', lat: 15.3, lon: 75.7, saturation: 74, population: 75, category: 'High' },
  { state: 'Gujarat', lat: 22.2, lon: 71.2, saturation: 65, population: 70, category: 'Medium' },
  { state: 'Telangana', lat: 18.1, lon: 79.0, saturation: 15, population: 45, category: 'Critical' },
  { state: 'Odisha', lat: 20.9, lon: 84.8, saturation: 38, population: 50, category: 'Low' },
  { state: 'Jharkhand', lat: 23.6, lon: 85.3, saturation: 18, population: 40, category: 'Critical' },
  { state: 'Assam', lat: 26.2, lon: 92.9, saturation: 42, population: 35, category: 'Low' },
  { state: 'Chhattisgarh', lat: 21.2, lon: 81.8, saturation: 35, population: 30, category: 'Low' },
];

const saturationData = [
  { name: 'Critical (<20%)', value: 47, color: '#D62828' },
  { name: 'Low (20-40%)', value: 892, color: '#F77F00' },
  { name: 'Medium (40-70%)', value: 2341, color: '#FCBF49' },
  { name: 'High (>70%)', value: 1720, color: '#1B998B' },
];

const criticalPincodes = [
  { pincode: '500001', state: 'Telangana', district: 'Hyderabad', saturation: 12, population: 185000, priority: 'Critical' },
  { pincode: '834001', state: 'Jharkhand', district: 'Ranchi', saturation: 15, population: 142000, priority: 'Critical' },
  { pincode: '753001', state: 'Odisha', district: 'Cuttack', saturation: 17, population: 128000, priority: 'Critical' },
  { pincode: '491001', state: 'Chhattisgarh', district: 'Durg', saturation: 18, population: 115000, priority: 'Critical' },
  { pincode: '781001', state: 'Assam', district: 'Guwahati', saturation: 19, population: 108000, priority: 'Critical' },
  { pincode: '812001', state: 'Bihar', district: 'Bhagalpur', saturation: 22, population: 95000, priority: 'High' },
  { pincode: '302001', state: 'Rajasthan', district: 'Jaipur Rural', saturation: 24, population: 88000, priority: 'High' },
  { pincode: '462001', state: 'MP', district: 'Bhopal Rural', saturation: 26, population: 82000, priority: 'High' },
];

const getColor = (saturation) => {
  if (saturation < 20) return '#D62828';
  if (saturation < 40) return '#F77F00';
  if (saturation < 70) return '#FCBF49';
  return '#1B998B';
};

const GeographicAnalysis = () => {
  return (
    <div>
      <PageHeader 
        title="📍 Location-Based Analysis"
        subtitle="Finding areas with low Aadhaar coverage and where to send mobile vans"
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard 
          icon="🗺️"
          value="5,000"
          label="Pincodes Analyzed"
          change="All India"
          changeType="positive"
          color="blue"
          delay={0.1}
        />
        <KPICard 
          icon="🔴"
          value="47"
          label="Areas Needing Attention"
          change="Below 20% coverage"
          changeType="negative"
          color="red"
          delay={0.2}
        />
        <KPICard 
          icon="📊"
          value="62.4%"
          label="Average Coverage"
          change="+3.2% vs Last Year"
          changeType="positive"
          color="green"
          delay={0.3}
        />
        <KPICard 
          icon="🚐"
          value="12x"
          label="Mobile Van ROI"
          change="Deployment"
          changeType="positive"
          color="orange"
          delay={0.4}
        />
      </div>

      {/* Map Visualization */}
      <ChartCard title="🗺️ India Saturation Map" badge={{ type: 'live', text: 'INTERACTIVE' }}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="lon" 
              name="Longitude" 
              domain={[68, 98]}
              stroke="#4a5568"
              fontSize={12}
            />
            <YAxis 
              type="number" 
              dataKey="lat" 
              name="Latitude" 
              domain={[8, 36]}
              stroke="#4a5568"
              fontSize={12}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value, name) => {
                if (name === 'saturation') return [`${value}%`, 'Saturation'];
                return [value, name];
              }}
              labelFormatter={(_, payload) => payload[0]?.payload?.state || ''}
            />
            <Scatter 
              name="States" 
              data={mapData} 
              fill="#FF6B35"
            >
              {mapData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.saturation)}
                  r={entry.population / 8}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '24px', 
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          {[
            { color: '#D62828', label: 'Critical (<20%)' },
            { color: '#F77F00', label: 'Low (20-40%)' },
            { color: '#FCBF49', label: 'Medium (40-70%)' },
            { color: '#1B998B', label: 'High (>70%)' },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: item.color 
              }} />
              <span style={{ fontSize: '12px', color: '#4a5568' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Charts Grid */}
      <div className="charts-grid" style={{ marginTop: '24px' }}>
        <ChartCard title="📊 Saturation Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={saturationData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${value}`}
              >
                {saturationData.map((entry, index) => (
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
        </ChartCard>

        <ChartCard title="📈 State-wise Saturation">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mapData.sort((a, b) => b.saturation - a.saturation).slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="state" stroke="#4a5568" fontSize={11} />
              <YAxis stroke="#4a5568" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Saturation']}
              />
              <Bar dataKey="saturation" radius={[4, 4, 0, 0]}>
                {mapData.sort((a, b) => b.saturation - a.saturation).slice(0, 8).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.saturation)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Critical Pincodes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '24px' }}
      >
        <ChartCard title="🔴 Top Critical Deployment Zones">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pincode</th>
                <th>State</th>
                <th>District</th>
                <th>Saturation</th>
                <th>Population</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {criticalPincodes.map((pin, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <td style={{ fontWeight: '600', color: '#FF6B35' }}>{pin.pincode}</td>
                  <td>{pin.state}</td>
                  <td>{pin.district}</td>
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
                          width: `${pin.saturation}%`,
                          height: '100%',
                          background: getColor(pin.saturation),
                          borderRadius: '3px'
                        }} />
                      </div>
                      <span style={{ color: getColor(pin.saturation) }}>{pin.saturation}%</span>
                    </div>
                  </td>
                  <td>{pin.population.toLocaleString()}</td>
                  <td>
                    <StatusBadge 
                      status={pin.priority === 'Critical' ? 'critical' : 'warning'} 
                      text={pin.priority}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ChartCard>
      </motion.div>

      {/* ROI Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: '24px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,127,0,0.05) 100%)',
          border: '1px solid rgba(255,107,53,0.3)',
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
          color: '#FF6B35'
        }}>
          🚐 Mobile Deployment ROI
        </h4>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1B998B' }}>₹15 Lakhs</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Investment (5 vans × ₹3L)</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFB700' }}>2.8 Lakh</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Citizens Reached</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FF6B35' }}>₹1.8 Cr</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Value Generated</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#1565C0' }}>12x ROI</div>
            <div style={{ fontSize: '12px', color: '#4a5568' }}>Return on Investment</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GeographicAnalysis;
