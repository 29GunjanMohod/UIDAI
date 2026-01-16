import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader, RecommendationCard } from '../components/Cards';
import { 
  Truck, Shield, Users, Baby, Target, TrendingUp,
  CheckCircle, AlertCircle, ArrowRight, Download, FileText, Loader
} from 'lucide-react';

const recommendations = [
  {
    number: 1,
    title: '📍 Mobile Enrollment Deployment',
    description: 'Deploy mobile enrollment vans to 47 critical pincodes with <20% saturation. Focus on rural areas in Telangana, Jharkhand, Odisha, and Chhattisgarh where fixed centers have limited reach.',
    metrics: [
      { label: 'Investment', value: '₹15 Lakhs' },
      { label: 'Reach', value: '2.8 Lakh Citizens' },
      { label: 'Expected ROI', value: '12x' },
      { label: 'Timeline', value: '6 months' },
    ],
    priority: 'High',
    icon: <Truck size={24} />
  },
  {
    number: 2,
    title: '🚨 Real-time Fraud Prevention System',
    description: 'Implement Isolation Forest-based anomaly detection at all authentication points. Priority focus on Hyderabad cluster with 2,340 identified suspicious cases. Enable real-time device blacklisting.',
    metrics: [
      { label: 'Investment', value: '₹1.5 Crore' },
      { label: 'Prevention', value: '₹45-50 Cr/year' },
      { label: 'Expected ROI', value: '30x' },
      { label: 'Detection', value: 'Real-time' },
    ],
    priority: 'Critical',
    icon: <Shield size={24} />
  },
  {
    number: 3,
    title: '👥 ML-Powered Dynamic Staffing',
    description: 'Implement machine learning-based workforce planning using Random Forest demand forecasting. Scale staff from baseline 2,800 to 3,920 during August peak (+40%). Reduce overstaffing in off-peak months.',
    metrics: [
      { label: 'Baseline Staff', value: '2,800' },
      { label: 'Peak Requirement', value: '3,920' },
      { label: 'Cost Savings', value: '₹2.3 Cr/year' },
      { label: 'Accuracy', value: '98.83%' },
    ],
    priority: 'High',
    icon: <Users size={24} />
  },
  {
    number: 4,
    title: '👶 Birth Enrollment Campaign',
    description: 'Target 0-5 age group with 19% enrollment gap through hospital partnerships. Establish enrollment points at all major maternity hospitals. Enable Aadhaar enrollment within 7 days of birth.',
    metrics: [
      { label: 'Current Gap', value: '19%' },
      { label: 'Target Enrollment', value: '1.2 Cr Children' },
      { label: 'Coverage Goal', value: '95% by 2027' },
      { label: 'Method', value: 'Hospital-based' },
    ],
    priority: 'Medium',
    icon: <Baby size={24} />
  },
];

const roiSummary = [
  { initiative: 'Mobile Deployment', investment: 0.15, returns: 1.8, roi: '12x', priority: 'High' },
  { initiative: 'Fraud Prevention', investment: 1.5, returns: 45.0, roi: '30x', priority: 'Critical' },
  { initiative: 'Dynamic Staffing', investment: 0.5, returns: 2.3, roi: '4.6x', priority: 'High' },
  { initiative: 'Birth Campaign', investment: 2.0, returns: 15.0, roi: '7.5x', priority: 'Medium' },
];

const implementationPhases = [
  { phase: 'Phase 1 (Q1)', items: ['Deploy fraud detection system', 'Setup monitoring dashboards', 'Train regional teams'] },
  { phase: 'Phase 2 (Q2)', items: ['Launch mobile vans in 15 critical zones', 'Implement ML staffing model', 'Hospital partnership pilot'] },
  { phase: 'Phase 3 (Q3-Q4)', items: ['Scale to all 47 zones', 'National rollout of birth enrollment', 'Full system integration'] },
];

const Recommendations = () => {
  const [loading, setLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate and download report
  const handleViewReport = () => {
    setLoading(true);
    // Open full report in new tab
    const reportContent = generateReportHTML();
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportContent);
    reportWindow.document.close();
    setLoading(false);
  };

  // Download analysis as CSV/JSON
  const handleDownloadAnalysis = () => {
    setLoading(true);
    
    const analysisData = {
      generated_at: new Date().toISOString(),
      summary: {
        total_investment: '₹4.15 Cr',
        total_returns: '₹64 Cr',
        overall_roi: '15x',
        fraud_prevention: '₹45-50 Cr/year',
        critical_zones: 47,
        forecast_accuracy: '98.83%'
      },
      recommendations: recommendations.map(r => ({
        title: r.title,
        description: r.description,
        priority: r.priority,
        metrics: r.metrics
      })),
      roi_summary: roiSummary,
      implementation_phases: implementationPhases
    };

    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aadhaar_intelligence_analysis_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setLoading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Generate HTML report
  const generateReportHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Aadhaar Intelligence System - Full Report</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 40px; background: #ffffff; color: #1a1a2e; }
          h1 { color: #FF6B35; text-align: center; font-size: 32px; margin-bottom: 8px; }
          h2 { color: #D84315; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; margin-top: 40px; }
          h3 { color: #1565C0; }
          .subtitle { text-align: center; color: #4a5568; margin-bottom: 40px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
          .kpi-card { background: linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,107,53,0.05)); border: 1px solid rgba(255,107,53,0.3); border-radius: 12px; padding: 20px; text-align: center; }
          .kpi-value { font-size: 28px; font-weight: 800; color: #FF6B35; }
          .kpi-label { font-size: 12px; color: #4a5568; margin-top: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          th { background: rgba(255,107,53,0.2); color: #FF6B35; }
          .priority-critical { background: rgba(214,40,40,0.2); color: #f87171; padding: 4px 12px; border-radius: 20px; }
          .priority-high { background: rgba(255,107,53,0.2); color: #FF6B35; padding: 4px 12px; border-radius: 20px; }
          .priority-medium { background: rgba(21,101,192,0.15); color: #1565C0; padding: 4px 12px; border-radius: 20px; }
          .recommendation { background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0; }
          .rec-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
          .rec-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
          .metric { background: rgba(27,153,139,0.1); padding: 12px; border-radius: 8px; text-align: center; }
          .metric-value { font-size: 16px; font-weight: 700; color: #1B998B; }
          .metric-label { font-size: 11px; color: #4a5568; }
          .summary-box { background: linear-gradient(135deg, rgba(27,153,139,0.2), rgba(27,153,139,0.1)); border: 2px solid rgba(27,153,139,0.4); border-radius: 16px; padding: 32px; text-align: center; margin-top: 40px; }
          .total-impact { font-size: 24px; font-weight: 700; color: #0d9488; }
          @media print { body { background: #fff; color: #000; } .kpi-card, .recommendation { border: 1px solid #ddd; } }
        </style>
      </head>
      <body>
        <h1>🇮🇳 AADHAAR INTELLIGENCE SYSTEM</h1>
        <p class="subtitle">UIDAI Analytics Report | Generated: ${new Date().toLocaleDateString()}</p>
        
        <div class="kpi-grid">
          <div class="kpi-card"><div class="kpi-value">₹45-50 Cr</div><div class="kpi-label">Annual Fraud Prevention</div></div>
          <div class="kpi-card"><div class="kpi-value">47</div><div class="kpi-label">Critical Deployment Zones</div></div>
          <div class="kpi-card"><div class="kpi-value">98.83%</div><div class="kpi-label">Forecast Accuracy</div></div>
          <div class="kpi-card"><div class="kpi-value">15x</div><div class="kpi-label">Overall ROI</div></div>
        </div>

        <h2>📊 4-Lens Behavioral Intelligence Framework</h2>
        <p>Our comprehensive analytics approach analyzes Aadhaar data through four complementary lenses:</p>
        <ul>
          <li><strong>Life Event Sequences:</strong> PrefixSpan mining reveals 73% migration accuracy from Address→Mobile patterns</li>
          <li><strong>Hyper-Local Geography:</strong> 47 critical pincodes identified with &lt;20% saturation, 12x ROI on mobile van deployment</li>
          <li><strong>Fraud Detection:</strong> Isolation Forest detected 2% anomaly rate across enrollment data</li>
          <li><strong>Demand Forecasting:</strong> Random Forest model predicts demand with 98.83% accuracy</li>
        </ul>

        <h2>💡 Strategic Recommendations</h2>
        ${recommendations.map((rec, i) => `
          <div class="recommendation">
            <div class="rec-title">${rec.title}</div>
            <p>${rec.description}</p>
            <div class="rec-metrics">
              ${rec.metrics.map(m => `
                <div class="metric">
                  <div class="metric-value">${m.value}</div>
                  <div class="metric-label">${m.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <h2>💰 ROI Summary</h2>
        <table>
          <tr><th>Initiative</th><th>Investment</th><th>Returns</th><th>ROI</th><th>Priority</th></tr>
          ${roiSummary.map(r => `
            <tr>
              <td>${r.initiative}</td>
              <td>₹${r.investment} Cr</td>
              <td>₹${r.returns} Cr</td>
              <td><strong>${r.roi}</strong></td>
              <td><span class="priority-${r.priority.toLowerCase()}">${r.priority}</span></td>
            </tr>
          `).join('')}
          <tr style="border-top: 2px solid #FF6B35;">
            <td><strong>TOTAL</strong></td>
            <td><strong>₹4.15 Cr</strong></td>
            <td><strong>₹64.1 Cr</strong></td>
            <td><strong style="color: #FFB700; font-size: 18px;">15x</strong></td>
            <td></td>
          </tr>
        </table>

        <div class="summary-box">
          <h3>🎯 Executive Summary</h3>
          <p>Total Projected Impact: <span class="total-impact">₹64 Crore annually with ₹4.15 Crore investment (15x ROI)</span></p>
        </div>

        <p style="text-align: center; color: #4a5568; margin-top: 40px; font-size: 12px;">
          🇮🇳 Aadhaar Intelligence System | Unique Identification Authority of India
        </p>
      </body>
      </html>
    `;
  };

  return (
    <div>
      <PageHeader 
        title="💡 Actionable Suggestions"
        subtitle="Smart recommendations with clear benefits and easy implementation"
      />

      {/* Recommendations */}
      <div style={{ marginBottom: '32px' }}>
        {recommendations.map((rec, index) => (
          <RecommendationCard
            key={index}
            number={rec.number}
            title={rec.title}
            description={rec.description}
            metrics={rec.metrics}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* ROI Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: '32px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}
      >
        <h3 style={{ 
          fontSize: 'clamp(16px, 3vw, 18px)', 
          fontWeight: '600', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          💰 ROI Summary
        </h3>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Investment (₹ Cr)</th>
              <th>Returns (₹ Cr)</th>
              <th>ROI</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {roiSummary.map((item, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <td style={{ fontWeight: '600' }}>{item.initiative}</td>
                <td>₹{item.investment}</td>
                <td style={{ color: '#1B998B', fontWeight: '600' }}>₹{item.returns}</td>
                <td style={{ color: '#FFB700', fontWeight: '700' }}>{item.roi}</td>
                <td>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: item.priority === 'Critical' ? 'rgba(214,40,40,0.2)' : 
                               item.priority === 'High' ? 'rgba(255,107,53,0.2)' : 'rgba(0,78,137,0.2)',
                    color: item.priority === 'Critical' ? '#f87171' : 
                           item.priority === 'High' ? '#FF6B35' : '#1565C0'
                  }}>
                    {item.priority}
                  </span>
                </td>
              </motion.tr>
            ))}
            <tr style={{ borderTop: '2px solid rgba(255,107,53,0.3)' }}>
              <td style={{ fontWeight: '700', color: '#FF6B35' }}>TOTAL</td>
              <td style={{ fontWeight: '700' }}>₹4.15 Cr</td>
              <td style={{ fontWeight: '700', color: '#1B998B' }}>₹64.1 Cr</td>
              <td style={{ fontWeight: '700', color: '#FFB700', fontSize: '18px' }}>15x</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        </div>
      </motion.div>

      {/* Implementation Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: '32px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}
      >
        <h3 style={{ 
          fontSize: 'clamp(16px, 3vw, 18px)', 
          fontWeight: '600', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📅 Implementation Roadmap
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'clamp(16px, 3vw, 24px)' }}>
          {implementationPhases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: 'clamp(16px, 3vw, 20px)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                background: index === 0 ? '#D62828' : index === 1 ? '#F77F00' : '#1B998B',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: 'clamp(10px, 2vw, 12px)',
                fontWeight: '600'
              }}>
                {phase.phase}
              </div>
              <ul style={{ 
                listStyle: 'none', 
                padding: '16px 0 0 0',
                margin: 0
              }}>
                {phase.items.map((item, i) => (
                  <li key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '8px 0',
                    fontSize: 'clamp(11px, 2vw, 13px)',
                    color: '#4a5568',
                    borderBottom: i < phase.items.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}>
                    <CheckCircle size={14} color="#1B998B" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Executive Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,127,0,0.08) 100%)',
          border: '2px solid rgba(255,107,53,0.3)',
          borderRadius: '20px',
          padding: 'clamp(20px, 5vw, 32px)',
          textAlign: 'center'
        }}
      >
        <h3 style={{ 
          fontSize: 'clamp(18px, 4vw, 24px)', 
          fontWeight: '700', 
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFB700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎯 Executive Summary
        </h3>
        <p style={{ 
          fontSize: 'clamp(13px, 2.5vw, 16px)', 
          color: '#4a5568', 
          marginBottom: '24px',
          maxWidth: '800px',
          margin: '0 auto 24px'
        }}>
          The <strong style={{ color: '#1a1a2e' }}>Aadhaar Intelligence System</strong> provides a comprehensive 
          4-lens analytical framework that transforms raw enrollment data into actionable intelligence, 
          enabling data-driven decision making at every level of UIDAI operations.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'clamp(16px, 4vw, 48px)', 
          flexWrap: 'wrap',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: '800', color: '#FF6B35' }}>₹45-50 Cr</div>
            <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#4a5568' }}>Annual Fraud Prevention</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: '800', color: '#1B998B' }}>47</div>
            <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#4a5568' }}>Optimized Deployment Zones</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: '800', color: '#004E89' }}>98.83%</div>
            <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#4a5568' }}>Forecasting Accuracy</div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: '800', color: '#FFB700' }}>15x</div>
            <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#4a5568' }}>Overall ROI</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(27,153,139,0.15)',
          border: '1px solid rgba(27,153,139,0.3)',
          borderRadius: '12px',
          padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
          display: 'inline-block',
          maxWidth: '100%'
        }}>
          <span style={{ fontSize: 'clamp(12px, 2.5vw, 18px)', fontWeight: '600', color: '#138808' }}>
            ✅ Total Projected Impact: <strong>₹64 Crore annually</strong> with <strong>₹4.15 Crore investment</strong>
          </span>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <button 
          onClick={handleViewReport}
          disabled={loading}
          style={{
            background: loading ? 'rgba(255,107,53,0.5)' : 'linear-gradient(135deg, #FF6B35, #F77F00)',
            border: 'none',
            borderRadius: '12px',
            padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)',
            color: 'white',
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            fontWeight: '600',
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 30px rgba(255,107,53,0.3)',
            transition: 'all 0.3s ease',
            flex: '1 1 auto',
            maxWidth: '300px',
            justifyContent: 'center'
          }}
        >
          {loading ? <Loader size={20} className="spin" /> : <FileText size={20} />}
          View Full Report
          <ArrowRight size={20} />
        </button>
        <button 
          onClick={handleDownloadAnalysis}
          disabled={loading}
          style={{
            background: downloadSuccess ? 'rgba(27,153,139,0.3)' : 'transparent',
            border: downloadSuccess ? '2px solid rgba(27,153,139,0.8)' : '2px solid rgba(255,107,53,0.5)',
            borderRadius: '12px',
            padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)',
            color: downloadSuccess ? '#0d9488' : '#FF6B35',
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            fontWeight: '600',
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            flex: '1 1 auto',
            maxWidth: '300px',
            justifyContent: 'center'
          }}
        >
          {downloadSuccess ? <CheckCircle size={20} /> : <Download size={20} />}
          {downloadSuccess ? 'Downloaded!' : 'Download Analysis'}
        </button>
      </motion.div>
    </div>
  );
};

export default Recommendations;
