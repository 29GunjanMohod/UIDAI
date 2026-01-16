import React, { createContext, useState, useContext } from 'react';

// Translations
const translations = {
    en: {
        // Header
        title: 'AADHAAR INTELLIGENCE SYSTEM',
        subtitle: 'Smart Analytics for 1.4 Billion Citizens',

        // Navigation
        homeDashboard: 'Home Dashboard',
        dataAnalysis: 'Data Analysis',
        lifeEvents: 'Life Events',
        locationAnalysis: 'Location Analysis',
        fraudDetection: 'Fraud Detection',
        futurePredictions: 'Future Predictions',
        suggestions: 'Suggestions',
        security: 'Security',
        livePredictions: 'Live Predictions',
        liveAlerts: 'Live Alerts',
        indiaMap: 'India Map',
        roiCalculator: 'ROI Calculator',

        // KPIs
        fraudPrevention: 'Annual Fraud Prevention',
        criticalZones: 'Critical Deployment Zones',
        fraudAccuracy: 'Fraud Detection Accuracy',
        pincodesAnalyzed: 'Pincodes Analyzed',

        // Common
        viewDetails: 'View Details',
        download: 'Download',
        refresh: 'Refresh',
        loading: 'Loading...',
        connected: 'API CONNECTED',
        offline: 'OFFLINE MODE',
        liveData: 'Live Data',

        // Analysis
        method1: 'Life Event Patterns',
        method2: 'Location-Based Analysis',
        method3: 'Fraud Detection',
        method4: 'Future Demand Prediction',

        // Footer
        footer1: 'Unique Identification Authority of India',
        footer2: 'Behavioral Analytics for Digital India',
        footer3: 'Serving 1.4 Billion Citizens'
    },
    hi: {
        // Header
        title: 'आधार इंटेलिजेंस सिस्टम',
        subtitle: '1.4 अरब नागरिकों के लिए स्मार्ट एनालिटिक्स',

        // Navigation
        homeDashboard: 'होम डैशबोर्ड',
        dataAnalysis: 'डेटा विश्लेषण',
        lifeEvents: 'जीवन की घटनाएं',
        locationAnalysis: 'स्थान विश्लेषण',
        fraudDetection: 'धोखाधड़ी पहचान',
        futurePredictions: 'भविष्य की भविष्यवाणी',
        suggestions: 'सुझाव',
        security: 'सुरक्षा',
        livePredictions: 'लाइव भविष्यवाणी',
        liveAlerts: 'लाइव अलर्ट',
        indiaMap: 'भारत का नक्शा',
        roiCalculator: 'ROI कैलकुलेटर',

        // KPIs
        fraudPrevention: 'वार्षिक धोखाधड़ी रोकथाम',
        criticalZones: 'महत्वपूर्ण तैनाती क्षेत्र',
        fraudAccuracy: 'धोखाधड़ी पहचान सटीकता',
        pincodesAnalyzed: 'विश्लेषित पिनकोड',

        // Common
        viewDetails: 'विवरण देखें',
        download: 'डाउनलोड',
        refresh: 'रिफ्रेश',
        loading: 'लोड हो रहा है...',
        connected: 'API कनेक्टेड',
        offline: 'ऑफलाइन मोड',
        liveData: 'लाइव डेटा',

        // Analysis
        method1: 'जीवन घटना पैटर्न',
        method2: 'स्थान-आधारित विश्लेषण',
        method3: 'धोखाधड़ी पहचान',
        method4: 'भविष्य की मांग भविष्यवाणी',

        // Footer
        footer1: 'भारतीय विशिष्ट पहचान प्राधिकरण',
        footer2: 'डिजिटल इंडिया के लिए व्यवहार विश्लेषण',
        footer3: '1.4 अरब नागरिकों की सेवा में'
    }
};

// Create context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use language
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language Toggle Component
export const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid rgba(27, 153, 139, 0.3)',
                background: 'linear-gradient(135deg, rgba(27, 153, 139, 0.1) 0%, rgba(27, 153, 139, 0.05) 100%)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1B998B'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(27, 153, 139, 0.2) 0%, rgba(27, 153, 139, 0.1) 100%)';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(27, 153, 139, 0.1) 0%, rgba(27, 153, 139, 0.05) 100%)';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <span style={{ fontSize: '18px' }}>{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>
    );
};

export default LanguageContext;
