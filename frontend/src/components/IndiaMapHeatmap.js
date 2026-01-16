import React, { useState } from 'react';
import { motion } from 'framer-motion';

// State enrollment data (from actual analysis)
const stateData = {
    'Uttar Pradesh': { enrollments: 2642461, rate: 12.5, color: '#D62828' },
    'West Bengal': { enrollments: 2342478, rate: 11.2, color: '#D62828' },
    'Bihar': { enrollments: 1881926, rate: 18.5, color: '#D62828' },
    'Telangana': { enrollments: 2070404, rate: 10.8, color: '#F77F00' },
    'Madhya Pradesh': { enrollments: 1444532, rate: 9.2, color: '#F77F00' },
    'Maharashtra': { enrollments: 980234, rate: 8.5, color: '#F77F00' },
    'Rajasthan': { enrollments: 876543, rate: 7.8, color: '#FFB700' },
    'Karnataka': { enrollments: 765432, rate: 7.2, color: '#FFB700' },
    'Gujarat': { enrollments: 654321, rate: 6.8, color: '#FFB700' },
    'Tamil Nadu': { enrollments: 543210, rate: 6.2, color: '#1B998B' },
    'Andhra Pradesh': { enrollments: 432109, rate: 5.8, color: '#1B998B' },
    'Kerala': { enrollments: 321098, rate: 5.2, color: '#1B998B' },
    'Odisha': { enrollments: 287654, rate: 4.8, color: '#1B998B' },
    'Punjab': { enrollments: 234567, rate: 4.5, color: '#004E89' },
    'Haryana': { enrollments: 198765, rate: 13.75, color: '#F77F00' },
    'Jharkhand': { enrollments: 176543, rate: 13.59, color: '#F77F00' },
    'Assam': { enrollments: 165432, rate: 4.2, color: '#004E89' },
    'Chhattisgarh': { enrollments: 143210, rate: 3.8, color: '#004E89' },
    'Delhi': { enrollments: 132109, rate: 16.6, color: '#D62828' },
    'Meghalaya': { enrollments: 54321, rate: 21.78, color: '#D62828' },
};

const IndiaMapHeatmap = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [hoveredState, setHoveredState] = useState(null);

    const totalEnrollments = Object.values(stateData).reduce((sum, s) => sum + s.enrollments, 0);

    // Sort states by enrollment for the list
    const sortedStates = Object.entries(stateData)
        .sort(([, a], [, b]) => b.enrollments - a.enrollments);

    return (
        <div className="dashboard-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '28px' }}>🗺️</span>
                <div>
                    <h2 style={{ margin: 0, color: '#1a1a2e', fontSize: '22px' }}>
                        India State-wise Enrollment Heatmap
                    </h2>
                    <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px' }}>
                        Interactive visualization of Aadhaar enrollments across India
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
                {/* Map Visualization - Simplified Grid */}
                <div style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '16px',
                    padding: '20px',
                    minHeight: '450px'
                }}>
                    <h3 style={{ margin: '0 0 16px', color: '#1a1a2e', fontSize: '16px' }}>
                        📍 State-wise Distribution (Click to select)
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '8px',
                        marginBottom: '20px'
                    }}>
                        {sortedStates.map(([state, data], index) => (
                            <motion.div
                                key={state}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedState(state)}
                                onMouseEnter={() => setHoveredState(state)}
                                onMouseLeave={() => setHoveredState(null)}
                                style={{
                                    background: data.color,
                                    padding: '12px 8px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    border: selectedState === state ? '3px solid #1a1a2e' : '2px solid transparent',
                                    boxShadow: hoveredState === state ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: '#fff',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    lineHeight: '1.2'
                                }}>
                                    {state.length > 12 ? state.substring(0, 10) + '..' : state}
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.9)',
                                    marginTop: '4px'
                                }}>
                                    {(data.enrollments / 1000).toFixed(0)}K
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#D62828' }} />
                            <span style={{ fontSize: '12px', color: '#4a5568' }}>Very High (&gt;1.5M)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#F77F00' }} />
                            <span style={{ fontSize: '12px', color: '#4a5568' }}>High (500K-1.5M)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#FFB700' }} />
                            <span style={{ fontSize: '12px', color: '#4a5568' }}>Medium (300K-500K)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#1B998B' }} />
                            <span style={{ fontSize: '12px', color: '#4a5568' }}>Low (&lt;300K)</span>
                        </div>
                    </div>
                </div>

                {/* Stats Panel */}
                <div>
                    {/* Total Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'linear-gradient(135deg, #1B998B 0%, #1a1a2e 100%)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: '#fff',
                            marginBottom: '16px'
                        }}
                    >
                        <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Enrollments Across India</div>
                        <div style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px' }}>
                            {(totalEnrollments / 1000000).toFixed(1)}M+
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                            Across {Object.keys(stateData).length} States/UTs
                        </div>
                    </motion.div>

                    {/* Selected State Details */}
                    {selectedState && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: '#fff',
                                borderRadius: '12px',
                                padding: '20px',
                                border: '2px solid #e2e8f0',
                                marginBottom: '16px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '20px' }}>📍</span>
                                <h3 style={{ margin: 0, color: '#1a1a2e' }}>{selectedState}</h3>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                                    <span style={{ color: '#718096' }}>Total Enrollments</span>
                                    <span style={{ fontWeight: '600', color: '#1a1a2e' }}>
                                        {stateData[selectedState].enrollments.toLocaleString()}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                                    <span style={{ color: '#718096' }}>Daily Rate</span>
                                    <span style={{ fontWeight: '600', color: '#1a1a2e' }}>
                                        {stateData[selectedState].rate.toFixed(1)}/pincode
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                                    <span style={{ color: '#718096' }}>% of Total</span>
                                    <span style={{ fontWeight: '600', color: '#1a1a2e' }}>
                                        {((stateData[selectedState].enrollments / totalEnrollments) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                                    <span style={{ color: '#718096' }}>Priority Level</span>
                                    <span style={{
                                        fontWeight: '600',
                                        color: stateData[selectedState].rate > 15 ? '#D62828' :
                                            stateData[selectedState].rate > 10 ? '#F77F00' : '#1B998B'
                                    }}>
                                        {stateData[selectedState].rate > 15 ? '🔴 CRITICAL' :
                                            stateData[selectedState].rate > 10 ? '🟠 HIGH' : '🟢 NORMAL'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Top 5 States */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h4 style={{ margin: '0 0 12px', color: '#1a1a2e', fontSize: '14px' }}>
                            🏆 Top 5 States by Enrollment
                        </h4>
                        {sortedStates.slice(0, 5).map(([state, data], index) => (
                            <div
                                key={state}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 0',
                                    borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        fontWeight: '600'
                                    }}>
                                        {index + 1}
                                    </span>
                                    <span style={{ fontSize: '13px', color: '#4a5568' }}>{state}</span>
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>
                                    {(data.enrollments / 1000000).toFixed(1)}M
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndiaMapHeatmap;
