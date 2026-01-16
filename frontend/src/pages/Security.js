import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, ChartCard } from '../components/Cards';
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: <Shield size={32} />,
      title: 'Data Privacy Compliance',
      description: 'DPDP Act 2023 & IT Act 2000 compliant architecture',
      status: 'Active',
      details: [
        'PII data anonymization at source',
        'Consent-based data processing',
        'Right to erasure support',
        'Data minimization principles'
      ]
    },
    {
      icon: <Lock size={32} />,
      title: 'Encryption Standards',
      description: 'AES-256 encryption for data at rest and in transit',
      status: 'Active',
      details: [
        'TLS 1.3 for API communications',
        'HSM-based key management',
        'End-to-end encryption',
        'Secure key rotation'
      ]
    },
    {
      icon: <Eye size={32} />,
      title: 'Privacy-Preserving Analytics',
      description: 'Federated learning & differential privacy',
      status: 'Active',
      details: [
        'No raw Aadhaar numbers in analytics',
        'K-anonymity for aggregations',
        'Differential privacy noise injection',
        'Secure multi-party computation ready'
      ]
    },
    {
      icon: <Server size={32} />,
      title: 'Infrastructure Security',
      description: 'MeitY empaneled cloud infrastructure',
      status: 'Configured',
      details: [
        'Data residency in India only',
        'SOC 2 Type II certified',
        'ISO 27001 compliant',
        'CERT-In registered'
      ]
    }
  ];

  const complianceChecklist = [
    { item: 'UIDAI Authentication API Standards', status: 'compliant' },
    { item: 'Aadhaar (Authentication) Regulations 2016', status: 'compliant' },
    { item: 'Digital Personal Data Protection Act 2023', status: 'compliant' },
    { item: 'Information Technology Act 2000', status: 'compliant' },
    { item: 'MeitY Cloud Guidelines', status: 'compliant' },
    { item: 'CERT-In Security Guidelines', status: 'compliant' },
    { item: 'RBI Data Localization (if financial)', status: 'ready' },
    { item: 'UIDAI Biometric Standards', status: 'compliant' }
  ];

  const auditTrail = [
    { action: 'Data Access', user: 'Analyst_01', timestamp: '2026-01-13 10:23:45', status: 'Logged' },
    { action: 'Report Generation', user: 'Manager_02', timestamp: '2026-01-13 09:15:22', status: 'Logged' },
    { action: 'API Query', user: 'System', timestamp: '2026-01-13 08:00:00', status: 'Logged' },
    { action: 'Dashboard View', user: 'Director_01', timestamp: '2026-01-12 16:45:33', status: 'Logged' }
  ];

  return (
    <div>
      <PageHeader 
        title="🔐 Security & Data Protection"
        subtitle="Your data is safe with government-grade security measures"
      />

      {/* Security Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {securityFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1B998B 0%, #138808 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: '#1a1a2e',
                  marginBottom: '4px'
                }}>
                  {feature.title}
                </h3>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: feature.status === 'Active' 
                    ? 'rgba(27,153,139,0.2)' 
                    : 'rgba(255,183,0,0.2)',
                  color: feature.status === 'Active' ? '#1B998B' : '#D97706'
                }}>
                  {feature.status}
                </span>
              </div>
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: '#4a5568',
              marginBottom: '16px'
            }}>
              {feature.description}
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0
            }}>
              {feature.details.map((detail, i) => (
                <li key={i} style={{ 
                  fontSize: '12px', 
                  color: '#718096',
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={14} color="#1B998B" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Compliance Checklist */}
      <div className="charts-grid">
        <ChartCard title="✅ Regulatory Compliance Checklist">
          <div style={{ padding: '8px 0' }}>
            {complianceChecklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: index % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
                  borderRadius: '8px',
                  marginBottom: '4px'
                }}
              >
                <span style={{ fontSize: '13px', color: '#1a1a2e' }}>{item.item}</span>
                <span style={{
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: item.status === 'compliant' 
                    ? 'rgba(27,153,139,0.2)' 
                    : 'rgba(255,107,53,0.2)',
                  color: item.status === 'compliant' ? '#1B998B' : '#FF6B35',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="📋 Audit Trail (Last 24 Hours)">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Action</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Timestamp</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditTrail.map((log, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', color: '#1a1a2e' }}>{log.action}</td>
                    <td style={{ padding: '12px', color: '#718096' }}>{log.user}</td>
                    <td style={{ padding: '12px', color: '#718096', fontFamily: 'monospace' }}>{log.timestamp}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        background: 'rgba(27,153,139,0.2)',
                        color: '#1B998B'
                      }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '24px',
          marginTop: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}
      >
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#1a1a2e',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🏗️ Secure Architecture Overview
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '24px',
          background: 'rgba(0,0,0,0.02)',
          borderRadius: '12px'
        }}>
          {[
            { label: 'Data Source', desc: 'UIDAI APIs', icon: '📡' },
            { label: 'Encryption Layer', desc: 'AES-256 + TLS', icon: '🔐' },
            { label: 'Analytics Engine', desc: 'Privacy-Preserved', icon: '🧠' },
            { label: 'Access Control', desc: 'RBAC + MFA', icon: '👤' },
            { label: 'Dashboard', desc: 'Secure View', icon: '📊' }
          ].map((step, index) => (
            <React.Fragment key={index}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FFB700 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  margin: '0 auto 8px'
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>{step.label}</div>
                <div style={{ fontSize: '11px', color: '#718096' }}>{step.desc}</div>
              </div>
              {index < 4 && (
                <div style={{ fontSize: '24px', color: '#FF6B35' }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Key Security Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '24px'
      }}>
        {[
          { label: 'Encryption Standard', value: 'AES-256', color: '#1B998B' },
          { label: 'Uptime SLA', value: '99.99%', color: '#FF6B35' },
          { label: 'Data Residency', value: 'India Only', color: '#004E89' },
          { label: 'Audit Retention', value: '7 Years', color: '#7209B7' },
          { label: 'Access Response', value: '<24 Hours', color: '#D62828' },
          { label: 'Compliance Score', value: '100%', color: '#138808' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              color: metric.color,
              marginBottom: '4px'
            }}>
              {metric.value}
            </div>
            <div style={{ fontSize: '12px', color: '#718096' }}>{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Security;
