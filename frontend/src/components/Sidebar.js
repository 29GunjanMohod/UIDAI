import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  MapPin,
  Shield,
  TrendingUp,
  Lightbulb,
  Target,
  Zap,
  Wifi,
  WifiOff,
  Lock,
  Map,
  Calculator
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, apiStatus = {}, language = 'en', onToggleLanguage }) => {
  const navItems = [
    { id: 'executive', icon: <LayoutDashboard size={20} />, label: 'Home Dashboard', emoji: '🏠' },
    { id: 'indiaMap', icon: <Map size={20} />, label: 'India Map', emoji: '🗺️', isNew: true },
    { id: 'roiCalculator', icon: <Calculator size={20} />, label: 'ROI Calculator', emoji: '💰', isNew: true },
    { id: 'dataAnalysis', icon: <Target size={20} />, label: 'Data Analysis', emoji: '📊' },
    { id: 'lifeEvents', icon: <Activity size={20} />, label: 'Life Events', emoji: '🔄' },
    { id: 'geographic', icon: <MapPin size={20} />, label: 'Location Analysis', emoji: '📍' },
    { id: 'fraud', icon: <Shield size={20} />, label: 'Fraud Detection', emoji: '🚨' },
    { id: 'forecast', icon: <TrendingUp size={20} />, label: 'Future Predictions', emoji: '🔮' },
    { id: 'recommendations', icon: <Lightbulb size={20} />, label: 'Suggestions', emoji: '💡' },
    { id: 'security', icon: <Lock size={20} />, label: 'Security', emoji: '🔐' },
    { id: 'livePrediction', icon: <Zap size={20} />, label: 'Live Predictions', emoji: '🧠' },
    { id: 'alertSystem', icon: <Zap size={20} />, label: 'Live Alerts', emoji: '🔔' },
  ];

  const quickStats = [
    { label: 'Problem Areas', value: '47' },
    { label: 'Fraud Detection', value: '94.7%' },
    { label: 'Fraud Saved', value: '₹45 Cr' },
    { label: 'Returns', value: '30x' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <motion.div
          className="logo-icon"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          🇮🇳
        </motion.div>
        <div className="logo-text">
          <h1>AADHAAR AI</h1>
          <span>Intelligence System</span>
        </div>
      </div>

      {/* API Connection Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="api-status-badge"
        style={{
          background: apiStatus.connected
            ? 'linear-gradient(135deg, rgba(27,153,139,0.15) 0%, rgba(27,153,139,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(156,163,175,0.15) 0%, rgba(156,163,175,0.05) 100%)',
          border: apiStatus.connected
            ? '1px solid rgba(27,153,139,0.3)'
            : '1px solid rgba(156,163,175,0.3)',
          borderRadius: '8px',
          padding: '10px 12px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        {apiStatus.connected ? (
          <Wifi size={16} color="#1B998B" />
        ) : (
          <WifiOff size={16} color="#9ca3af" />
        )}
        <div className="api-status-text">
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            color: apiStatus.connected ? '#1B998B' : '#9ca3af'
          }}>
            {apiStatus.connected ? 'API CONNECTED' : 'OFFLINE MODE'}
          </div>
          <div style={{ fontSize: '9px', color: '#718096' }}>
            {apiStatus.isRealData ? '✅ Live Data' : '📊 Ready'}
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="nav-section">
        <span className="nav-section-title">Analytics</span>
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="nav-item-icon">
              {item.emoji}
            </div>
            <span className="nav-item-text">{item.label}</span>
          </motion.div>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Zap size={16} color="#FFB700" />
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#FFB700' }}>QUICK STATS</span>
        </div>
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="quick-stat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <span className="quick-stat-label">{stat.label}</span>
            <span className="quick-stat-value">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
