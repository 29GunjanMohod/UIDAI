import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ROICalculator = () => {
    const [budget, setBudget] = useState(10); // in Crores
    const [mobileVans, setMobileVans] = useState(50);
    const [additionalCenters, setAdditionalCenters] = useState(20);

    // ROI Calculations based on real data insights
    const calculations = useMemo(() => {
        // Fraud Detection ROI
        const fraudDetectionRate = 0.947; // 94.7% accuracy
        const avgFraudValue = 20000; // ₹20,000 per case
        const suspiciousEnrollments = 390 * 500; // 390 anomalous pincodes * avg 500
        const fraudPrevention = suspiciousEnrollments * 0.05 * avgFraudValue * fraudDetectionRate;

        // Mobile Van ROI
        const enrollmentsPerVan = 2500; // per month
        const revenuePerEnrollment = 50; // ₹50 service value
        const vanCost = 15; // ₹15 Lakhs per van per year
        const vanRevenue = mobileVans * enrollmentsPerVan * 12 * revenuePerEnrollment;
        const vanCostTotal = mobileVans * vanCost * 100000;
        const vanROI = ((vanRevenue - vanCostTotal) / vanCostTotal) * 100;

        // Center ROI
        const enrollmentsPerCenter = 15000; // per month
        const centerCost = 50; // ₹50 Lakhs setup + operation
        const centerRevenue = additionalCenters * enrollmentsPerCenter * 12 * revenuePerEnrollment;
        const centerCostTotal = additionalCenters * centerCost * 100000;
        const centerROI = ((centerRevenue - centerCostTotal) / centerCostTotal) * 100;

        // Coverage Improvement
        const underservedPincodes = 143468; // HIGH priority pincodes
        const coverageIncrease = (mobileVans * 50 + additionalCenters * 100) / underservedPincodes * 100;

        // Total Investment & Returns
        const totalInvestment = budget * 10000000; // Crores to Rupees
        const totalReturns = fraudPrevention + vanRevenue + centerRevenue;
        const overallROI = ((totalReturns - totalInvestment) / totalInvestment) * 100;

        // Wait Time Reduction
        const waitTimeReduction = Math.min(60, (additionalCenters * 2.5 + mobileVans * 0.5));

        return {
            fraudPrevention: fraudPrevention / 10000000, // in Crores
            vanRevenue: vanRevenue / 10000000,
            centerRevenue: centerRevenue / 10000000,
            vanROI,
            centerROI,
            overallROI,
            coverageIncrease: Math.min(100, coverageIncrease),
            waitTimeReduction,
            peopleServed: (mobileVans * enrollmentsPerVan + additionalCenters * enrollmentsPerCenter) * 12,
            totalReturns: totalReturns / 10000000
        };
    }, [budget, mobileVans, additionalCenters]);

    return (
        <div className="dashboard-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '28px' }}>💰</span>
                <div>
                    <h2 style={{ margin: 0, color: '#1a1a2e', fontSize: '22px' }}>
                        ROI Calculator - Investment Impact Analysis
                    </h2>
                    <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px' }}>
                        Calculate returns on Aadhaar infrastructure investments
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Input Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '16px',
                    padding: '24px'
                }}>
                    <h3 style={{ margin: '0 0 20px', color: '#1a1a2e', fontSize: '16px' }}>
                        📊 Investment Parameters
                    </h3>

                    {/* Budget Slider */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>
                                Total Budget
                            </label>
                            <span style={{ color: '#1B998B', fontWeight: '700', fontSize: '18px' }}>
                                ₹{budget} Crore
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#1B998B' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#718096' }}>
                            <span>₹5 Cr</span>
                            <span>₹100 Cr</span>
                        </div>
                    </div>

                    {/* Mobile Vans Slider */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>
                                🚐 Mobile Enrollment Vans
                            </label>
                            <span style={{ color: '#F77F00', fontWeight: '700', fontSize: '18px' }}>
                                {mobileVans} Vans
                            </span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="200"
                            value={mobileVans}
                            onChange={(e) => setMobileVans(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#F77F00' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#718096' }}>
                            <span>10 Vans</span>
                            <span>200 Vans</span>
                        </div>
                    </div>

                    {/* Additional Centers */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '500' }}>
                                🏢 New Enrollment Centers
                            </label>
                            <span style={{ color: '#D62828', fontWeight: '700', fontSize: '18px' }}>
                                {additionalCenters} Centers
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={additionalCenters}
                            onChange={(e) => setAdditionalCenters(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#D62828' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#718096' }}>
                            <span>5 Centers</span>
                            <span>100 Centers</span>
                        </div>
                    </div>

                    {/* Quick Presets */}
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>Quick Presets:</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[
                                { label: 'Pilot', budget: 10, vans: 20, centers: 5 },
                                { label: 'Regional', budget: 30, vans: 50, centers: 20 },
                                { label: 'National', budget: 75, vans: 150, centers: 75 }
                            ].map((preset) => (
                                <motion.button
                                    key={preset.label}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setBudget(preset.budget);
                                        setMobileVans(preset.vans);
                                        setAdditionalCenters(preset.centers);
                                    }}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        border: '2px solid #1B998B',
                                        background: 'white',
                                        color: '#1B998B',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    {preset.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div>
                    {/* Main ROI Display */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: calculations.overallROI > 100
                                ? 'linear-gradient(135deg, #1B998B 0%, #0d5c52 100%)'
                                : calculations.overallROI > 50
                                    ? 'linear-gradient(135deg, #F77F00 0%, #9a4e00 100%)'
                                    : 'linear-gradient(135deg, #718096 0%, #4a5568 100%)',
                            borderRadius: '16px',
                            padding: '24px',
                            color: '#fff',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '14px', opacity: 0.9 }}>Projected Return on Investment</div>
                        <div style={{ fontSize: '48px', fontWeight: '700', marginTop: '8px' }}>
                            {calculations.overallROI.toFixed(0)}%
                        </div>
                        <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
                            {calculations.overallROI > 100 ? '🌟 EXCELLENT INVESTMENT' :
                                calculations.overallROI > 50 ? '✅ GOOD INVESTMENT' : '⚠️ MODERATE RETURN'}
                        </div>
                    </motion.div>

                    {/* Impact Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {[
                            {
                                icon: '🛡️',
                                label: 'Fraud Prevention',
                                value: `₹${calculations.fraudPrevention.toFixed(1)} Cr`,
                                color: '#D62828'
                            },
                            {
                                icon: '📈',
                                label: 'Total Returns',
                                value: `₹${calculations.totalReturns.toFixed(1)} Cr`,
                                color: '#1B998B'
                            },
                            {
                                icon: '🗺️',
                                label: 'Coverage Increase',
                                value: `+${calculations.coverageIncrease.toFixed(1)}%`,
                                color: '#F77F00'
                            },
                            {
                                icon: '⏱️',
                                label: 'Wait Time Reduction',
                                value: `-${calculations.waitTimeReduction.toFixed(0)}%`,
                                color: '#004E89'
                            },
                            {
                                icon: '👥',
                                label: 'People Served/Year',
                                value: `${(calculations.peopleServed / 1000000).toFixed(1)}M`,
                                color: '#1B998B'
                            },
                            {
                                icon: '🎯',
                                label: 'Van ROI',
                                value: `${calculations.vanROI.toFixed(0)}%`,
                                color: '#F77F00'
                            }
                        ].map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    background: '#fff',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    border: `2px solid ${metric.color}20`,
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{metric.icon}</div>
                                <div style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>{metric.label}</div>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: metric.color }}>
                                    {metric.value}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;
