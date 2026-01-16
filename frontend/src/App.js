import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ExecutiveSummary from './pages/ExecutiveSummary';
import LifeEvents from './pages/LifeEvents';
import GeographicAnalysis from './pages/GeographicAnalysis';
import FraudDetection from './pages/FraudDetection';
import DemandForecast from './pages/DemandForecast';
import Recommendations from './pages/Recommendations';
import Security from './pages/Security';
import DataAnalysis from './pages/DataAnalysis';
import LivePrediction from './pages/LivePrediction';
import AlertSystem from './pages/AlertSystem';
import ApiService from './services/api';
// NEW WOW Components
import IndiaMapHeatmap from './components/IndiaMapHeatmap';
import ROICalculator from './components/ROICalculator';
import { LanguageProvider, LanguageToggle } from './context/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [apiStatus, setApiStatus] = useState({ connected: false, isRealData: false });

  // Check API connection on mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const status = await ApiService.getStatus();
        if (status) {
          setApiStatus({
            connected: true,
            isRealData: status.is_real_data,
            message: status.source_message
          });
        }
      } catch (error) {
        console.log('API not connected, using static data');
      }
    };
    checkApiStatus();
  }, []);

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    const pages = {
      executive: <ExecutiveSummary apiConnected={apiStatus.connected} />,
      lifeEvents: <LifeEvents apiConnected={apiStatus.connected} />,
      geographic: <GeographicAnalysis apiConnected={apiStatus.connected} />,
      fraud: <FraudDetection apiConnected={apiStatus.connected} />,
      forecast: <DemandForecast apiConnected={apiStatus.connected} />,
      recommendations: <Recommendations apiConnected={apiStatus.connected} />,
      security: <Security />,
      dataAnalysis: <DataAnalysis />,
      livePrediction: <LivePrediction />,
      alertSystem: <AlertSystem />,
      indiaMap: <IndiaMapHeatmap />,
      roiCalculator: <ROICalculator />
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {pages[activeTab]}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="app-container">
      {/* Indian Tricolor Bar */}
      <div className="tricolor-bar" />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiStatus={apiStatus}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* API Status Banner */}
        {apiStatus.connected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: apiStatus.isRealData
                ? 'linear-gradient(135deg, rgba(27,153,139,0.2) 0%, rgba(27,153,139,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.1) 100%)',
              border: apiStatus.isRealData
                ? '1px solid rgba(27,153,139,0.4)'
                : '1px solid rgba(59,130,246,0.4)',
              borderRadius: '8px',
              padding: '8px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}
          >
            <span style={{ fontSize: '16px' }}>{apiStatus.isRealData ? '✅' : '🔗'}</span>
            <span style={{ color: apiStatus.isRealData ? '#1B998B' : '#1565C0' }}>
              {apiStatus.isRealData ? 'Connected to Live Data' : 'API Connected'}
            </span>
          </motion.div>
        )}

        {renderPage()}

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            🇮🇳 <span>Aadhaar Intelligence System</span> | Unique Identification Authority of India
          </p>
          <p className="footer-text" style={{ marginTop: '8px' }}>
            Behavioral Analytics for <span>Digital India</span> | Serving 1.4 Billion Citizens
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
