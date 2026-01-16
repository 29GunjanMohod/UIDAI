import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const KPICard = ({ icon, value, label, change, changeType, color, delay = 0 }) => {
  const colorClasses = {
    orange: 'kpi-icon orange',
    blue: 'kpi-icon blue',
    green: 'kpi-icon green',
    red: 'kpi-icon red',
    purple: 'kpi-icon purple'
  };

  return (
    <motion.div 
      className="kpi-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
    >
      <div className={colorClasses[color]}>
        {icon}
      </div>
      <motion.div 
        className="kpi-value"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      >
        {value}
      </motion.div>
      <div className="kpi-label">{label}</div>
      {change && (
        <div className={`kpi-change ${changeType}`}>
          {changeType === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </div>
      )}
    </motion.div>
  );
};

export const ChartCard = ({ title, badge, children }) => {
  return (
    <motion.div 
      className="chart-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {badge && <span className={`chart-badge ${badge.type}`}>{badge.text}</span>}
      </div>
      {children}
    </motion.div>
  );
};

export const LensCard = ({ icon, title, subtitle, items, delay = 0 }) => {
  return (
    <motion.div 
      className="lens-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 8 }}
    >
      <div className="lens-header">
        <div className="lens-icon">{icon}</div>
        <div>
          <h4 className="lens-title">{title}</h4>
          <span className="lens-subtitle">{subtitle}</span>
        </div>
      </div>
      <div className="lens-content">
        <ul>
          {items.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * index }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const RecommendationCard = ({ number, title, description, metrics, delay = 0 }) => {
  return (
    <motion.div 
      className="recommendation-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 8 }}
    >
      <div className="recommendation-header">
        <div className="recommendation-number">{number}</div>
        <h4 className="recommendation-title">{title}</h4>
      </div>
      <div className="recommendation-content">
        <p>{description}</p>
        <div className="recommendation-metrics">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const DataTable = ({ columns, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr 
              key={rowIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIndex * 0.05 }}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export const PageHeader = ({ title, subtitle }) => {
  return (
    <motion.div 
      className="page-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </motion.div>
  );
};

export const StatusBadge = ({ status, text }) => {
  return <span className={`status-badge ${status}`}>{text}</span>;
};
