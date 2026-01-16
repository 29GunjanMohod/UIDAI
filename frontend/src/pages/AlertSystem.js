import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 🔔 REAL-TIME ALERT SYSTEM
 * UNIQUE INNOVATION: Live fraud alerts with push notifications
 * SMS/Email simulation for operational alerts
 */

const AlertSystem = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    warning: 0,
    info: 0,
    resolved: 0
  });
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Simulated real-time alerts
  useEffect(() => {
    if (!isLive) return;

    const alertTypes = [
      {
        type: 'critical',
        icon: '🚨',
        title: 'Fraud Pattern Detected',
        messages: [
          'Unusual enrollment spike in pincode 560001',
          'Multiple registrations from same biometric',
          'Duplicate identity pattern found',
          'Anomalous transaction from location 400001'
        ],
        color: '#ef4444'
      },
      {
        type: 'warning',
        icon: '⚠️',
        title: 'Capacity Warning',
        messages: [
          'High demand predicted for Bangalore North',
          'Staff shortage at enrollment center EC-4521',
          'Queue time exceeding 2 hours at Mumbai Central',
          'Mobile van required in rural Rajasthan'
        ],
        color: '#f59e0b'
      },
      {
        type: 'info',
        icon: '📊',
        title: 'System Update',
        messages: [
          'Enrollment target achieved for Karnataka',
          'New ML model deployed successfully',
          'Weekly report generated',
          'Database backup completed'
        ],
        color: '#3b82f6'
      },
      {
        type: 'success',
        icon: '✅',
        title: 'Resolution',
        messages: [
          'Fraud case #4521 resolved',
          'Staff deployed to high-demand area',
          'System performance optimized',
          'Pending updates processed'
        ],
        color: '#10b981'
      }
    ];

    const generateAlert = () => {
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const message = alertType.messages[Math.floor(Math.random() * alertType.messages.length)];
      
      const newAlert = {
        id: Date.now(),
        type: alertType.type,
        icon: alertType.icon,
        title: alertType.title,
        message: message,
        color: alertType.color,
        timestamp: new Date(),
        status: 'new',
        pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
        confidence: Math.floor(Math.random() * 30) + 70,
        source: ['ML Model', 'Manual Report', 'System Monitor', 'Field Agent'][Math.floor(Math.random() * 4)]
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 49)]);
      setStats(prev => ({
        total: prev.total + 1,
        critical: prev.critical + (alertType.type === 'critical' ? 1 : 0),
        warning: prev.warning + (alertType.type === 'warning' ? 1 : 0),
        info: prev.info + (alertType.type === 'info' ? 1 : 0),
        resolved: prev.resolved + (alertType.type === 'success' ? 1 : 0)
      }));

      // Browser notification
      if (alertType.type === 'critical' && Notification.permission === 'granted') {
        new Notification('🚨 UIDAI Alert', {
          body: message,
          icon: '/logo.png'
        });
      }
    };

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Generate initial alerts
    for (let i = 0; i < 5; i++) {
      setTimeout(generateAlert, i * 200);
    }

    // Generate periodic alerts
    const interval = setInterval(generateAlert, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter);

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status: 'acknowledged' } : a
    ));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, status: 'resolved' } : a
    ));
    setStats(prev => ({ ...prev, resolved: prev.resolved + 1 }));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div 
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 style={styles.title}>🔔 Live Alert System</h1>
          <p style={styles.subtitle}>Live updates • Fraud warnings • Important notifications</p>
        </div>
        <div style={styles.headerControls}>
          <button
            style={{
              ...styles.liveBtn,
              ...(isLive ? styles.liveBtnActive : {})
            }}
            onClick={() => setIsLive(!isLive)}
          >
            <span style={{
              ...styles.liveDot,
              ...(isLive ? styles.liveDotActive : {})
            }}></span>
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statValue}>{stats.total}</span>
          <span style={styles.statLabel}>Total Alerts</span>
        </div>
        <div style={{...styles.statItem, borderLeft: '3px solid #ef4444'}}>
          <span style={{...styles.statValue, color: '#ef4444'}}>{stats.critical}</span>
          <span style={styles.statLabel}>Critical</span>
        </div>
        <div style={{...styles.statItem, borderLeft: '3px solid #f59e0b'}}>
          <span style={{...styles.statValue, color: '#f59e0b'}}>{stats.warning}</span>
          <span style={styles.statLabel}>Warnings</span>
        </div>
        <div style={{...styles.statItem, borderLeft: '3px solid #3b82f6'}}>
          <span style={{...styles.statValue, color: '#3b82f6'}}>{stats.info}</span>
          <span style={styles.statLabel}>Info</span>
        </div>
        <div style={{...styles.statItem, borderLeft: '3px solid #10b981'}}>
          <span style={{...styles.statValue, color: '#10b981'}}>{stats.resolved}</span>
          <span style={styles.statLabel}>Resolved</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterBar}>
        {['all', 'critical', 'warning', 'info', 'success'].map(f => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {})
            }}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? '📋 All' : 
             f === 'critical' ? '🚨 Critical' :
             f === 'warning' ? '⚠️ Warning' :
             f === 'info' ? '📊 Info' : '✅ Resolved'}
          </button>
        ))}
      </div>

      <div style={styles.mainContent}>
        {/* Alerts List */}
        <div style={styles.alertsList}>
          <AnimatePresence>
            {filteredAlerts.map(alert => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                style={{
                  ...styles.alertCard,
                  borderLeftColor: alert.color,
                  ...(alert.status === 'new' ? styles.alertNew : {}),
                  ...(alert.status === 'resolved' ? styles.alertResolved : {})
                }}
                onClick={() => setSelectedAlert(alert)}
              >
                <div style={styles.alertHeader}>
                  <span style={styles.alertIcon}>{alert.icon}</span>
                  <div style={styles.alertTitleArea}>
                    <span style={styles.alertTitle}>{alert.title}</span>
                    <span style={styles.alertTime}>
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    background: alert.status === 'new' ? '#fee2e2' :
                               alert.status === 'acknowledged' ? '#fef3c7' : '#dcfce7',
                    color: alert.status === 'new' ? '#dc2626' :
                          alert.status === 'acknowledged' ? '#d97706' : '#16a34a'
                  }}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                <div style={styles.alertMessage}>{alert.message}</div>
                <div style={styles.alertMeta}>
                  <span>📍 Pincode: {alert.pincode}</span>
                  <span>🎯 Confidence: {alert.confidence}%</span>
                  <span>📡 Source: {alert.source}</span>
                </div>
                {alert.status !== 'resolved' && (
                  <div style={styles.alertActions}>
                    {alert.status === 'new' && (
                      <button
                        style={styles.ackBtn}
                        onClick={(e) => { e.stopPropagation(); acknowledgeAlert(alert.id); }}
                      >
                        👁️ Acknowledge
                      </button>
                    )}
                    <button
                      style={styles.resolveBtn}
                      onClick={(e) => { e.stopPropagation(); resolveAlert(alert.id); }}
                    >
                      ✅ Resolve
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Panel */}
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            style={styles.detailPanel}
          >
            <div style={styles.detailHeader}>
              <span style={styles.detailIcon}>{selectedAlert.icon}</span>
              <div>
                <h3 style={styles.detailTitle}>{selectedAlert.title}</h3>
                <p style={styles.detailTime}>
                  {selectedAlert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div style={{
              ...styles.detailStatus,
              background: selectedAlert.color + '20',
              borderColor: selectedAlert.color
            }}>
              {selectedAlert.message}
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.sectionTitle}>📋 Alert Details</h4>
              <div style={styles.detailRow}>
                <span>Alert ID</span>
                <strong>#{selectedAlert.id}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Type</span>
                <strong style={{ color: selectedAlert.color }}>
                  {selectedAlert.type.toUpperCase()}
                </strong>
              </div>
              <div style={styles.detailRow}>
                <span>Pincode</span>
                <strong>{selectedAlert.pincode}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Confidence</span>
                <strong>{selectedAlert.confidence}%</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Source</span>
                <strong>{selectedAlert.source}</strong>
              </div>
              <div style={styles.detailRow}>
                <span>Status</span>
                <strong>{selectedAlert.status}</strong>
              </div>
            </div>

            <div style={styles.detailSection}>
              <h4 style={styles.sectionTitle}>🔧 Actions</h4>
              <div style={styles.actionBtns}>
                <button style={styles.actionBtn}>📧 Send Email</button>
                <button style={styles.actionBtn}>📱 Send SMS</button>
                <button style={styles.actionBtn}>👤 Assign Agent</button>
                <button style={styles.actionBtn}>📋 Create Ticket</button>
              </div>
            </div>

            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '24px',
    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    borderRadius: '16px',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
  },
  subtitle: {
    margin: '8px 0 0',
    opacity: 0.9,
    fontSize: '14px',
  },
  headerControls: {
    display: 'flex',
    gap: '12px',
  },
  liveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },
  liveBtnActive: {
    background: 'rgba(16, 185, 129, 0.3)',
  },
  liveDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#94a3b8',
  },
  liveDotActive: {
    background: '#10b981',
    animation: 'pulse 2s infinite',
  },
  statsBar: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  statItem: {
    flex: 1,
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  statValue: {
    display: 'block',
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: '13px',
    color: '#64748b',
  },
  filterBar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    padding: '8px',
    background: 'white',
    borderRadius: '12px',
  },
  filterBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: '#f1f5f9',
    fontWeight: '600',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '20px',
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: 'calc(100vh - 360px)',
    overflowY: 'auto',
  },
  alertCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px 20px',
    borderLeft: '4px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  alertNew: {
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)',
  },
  alertResolved: {
    opacity: 0.6,
  },
  alertHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  alertIcon: {
    fontSize: '24px',
  },
  alertTitleArea: {
    flex: 1,
  },
  alertTitle: {
    display: 'block',
    fontWeight: '600',
    color: '#1e293b',
  },
  alertTime: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: '600',
  },
  alertMessage: {
    fontSize: '14px',
    color: '#475569',
    marginBottom: '12px',
    lineHeight: 1.5,
  },
  alertMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '12px',
  },
  alertActions: {
    display: 'flex',
    gap: '8px',
  },
  ackBtn: {
    padding: '8px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    background: 'white',
    fontSize: '12px',
    cursor: 'pointer',
  },
  resolveBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    background: '#10b981',
    color: 'white',
    fontSize: '12px',
    cursor: 'pointer',
  },
  detailPanel: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: '20px',
  },
  detailHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  detailIcon: {
    fontSize: '48px',
  },
  detailTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  detailTime: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#64748b',
  },
  detailStatus: {
    padding: '16px',
    borderRadius: '12px',
    borderLeft: '4px solid',
    marginBottom: '20px',
    fontSize: '14px',
    lineHeight: 1.6,
  },
  detailSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    margin: '0 0 12px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '13px',
  },
  actionBtns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  actionBtn: {
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    background: 'white',
    fontSize: '12px',
    cursor: 'pointer',
  },
  closeBtn: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    background: '#f1f5f9',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(styleSheet);

export default AlertSystem;
