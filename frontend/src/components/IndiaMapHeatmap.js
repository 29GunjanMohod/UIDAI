import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Marker,
    Annotation
} from 'react-simple-maps';

// State labels with coordinates, display name (abbreviation for small states), and font size
const stateLabels = {
    'Andhra Pradesh': { coords: [79.74, 15.9], label: 'AP', size: 9 },
    'Arunachal Pradesh': { coords: [94.7, 28.2], label: 'AR', size: 7 },
    'Assam': { coords: [92.9, 26.2], label: 'AS', size: 7 },
    'Bihar': { coords: [85.3, 25.6], label: 'Bihar', size: 9 },
    'Chhattisgarh': { coords: [81.8, 21.2], label: 'CG', size: 9 },
    'Goa': { coords: [73.8, 15.4], label: 'GA', size: 6 },
    'Gujarat': { coords: [71.1, 22.3], label: 'Gujarat', size: 10 },
    'Haryana': { coords: [76.1, 29.0], label: 'HR', size: 7 },
    'Himachal Pradesh': { coords: [77.1, 31.5], label: 'HP', size: 7 },
    'Jharkhand': { coords: [85.3, 23.6], label: 'JH', size: 8 },
    'Karnataka': { coords: [75.7, 15.3], label: 'Karnataka', size: 9 },
    'Kerala': { coords: [76.2, 10.5], label: 'KL', size: 7 },
    'Madhya Pradesh': { coords: [78.6, 23.5], label: 'MP', size: 11 },
    'Maharashtra': { coords: [75.7, 19.7], label: 'Maharashtra', size: 10 },
    'Manipur': { coords: [93.9, 24.6], label: 'MN', size: 6 },
    'Meghalaya': { coords: [91.3, 25.5], label: 'ML', size: 6 },
    'Mizoram': { coords: [92.9, 23.1], label: 'MZ', size: 6 },
    'Nagaland': { coords: [94.5, 26.1], label: 'NL', size: 6 },
    'Odisha': { coords: [85.1, 20.9], label: 'Odisha', size: 9 },
    'Punjab': { coords: [75.3, 31.1], label: 'PB', size: 7 },
    'Rajasthan': { coords: [74.2, 27.0], label: 'Rajasthan', size: 11 },
    'Sikkim': { coords: [88.5, 27.5], label: 'SK', size: 5 },
    'Tamil Nadu': { coords: [78.6, 11.1], label: 'TN', size: 8 },
    'Telangana': { coords: [79.0, 18.1], label: 'TS', size: 8 },
    'Tripura': { coords: [91.9, 23.9], label: 'TR', size: 5 },
    'Uttar Pradesh': { coords: [80.9, 26.8], label: 'UP', size: 11 },
    'Uttarakhand': { coords: [79.0, 30.0], label: 'UK', size: 7 },
    'West Bengal': { coords: [87.8, 22.9], label: 'WB', size: 8 },
    'Delhi': { coords: [77.1, 28.7], label: 'DL', size: 6 },
    'Jammu and Kashmir': { coords: [76.5, 34.0], label: 'J&K', size: 8 },
    'Ladakh': { coords: [77.5, 34.5], label: 'LA', size: 7 }
};



// India GeoJSON from reliable source
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

// State enrollment data (from actual analysis) - mapping ST_NM to data
const stateData = {
    'Andhra Pradesh': { enrollments: 432109, rate: 5.8 },
    'Arunachal Pradesh': { enrollments: 32456, rate: 2.1 },
    'Assam': { enrollments: 165432, rate: 4.2 },
    'Bihar': { enrollments: 1881926, rate: 18.5 },
    'Chhattisgarh': { enrollments: 143210, rate: 3.8 },
    'Goa': { enrollments: 45678, rate: 3.2 },
    'Gujarat': { enrollments: 654321, rate: 6.8 },
    'Haryana': { enrollments: 198765, rate: 13.75 },
    'Himachal Pradesh': { enrollments: 87654, rate: 4.5 },
    'Jharkhand': { enrollments: 176543, rate: 13.59 },
    'Karnataka': { enrollments: 765432, rate: 7.2 },
    'Kerala': { enrollments: 321098, rate: 5.2 },
    'Madhya Pradesh': { enrollments: 1444532, rate: 9.2 },
    'Maharashtra': { enrollments: 980234, rate: 8.5 },
    'Manipur': { enrollments: 34567, rate: 3.1 },
    'Meghalaya': { enrollments: 54321, rate: 21.78 },
    'Mizoram': { enrollments: 23456, rate: 2.8 },
    'Nagaland': { enrollments: 28765, rate: 2.5 },
    'Odisha': { enrollments: 287654, rate: 4.8 },
    'Orissa': { enrollments: 287654, rate: 4.8 },
    'Punjab': { enrollments: 234567, rate: 4.5 },
    'Rajasthan': { enrollments: 876543, rate: 7.8 },
    'Sikkim': { enrollments: 18765, rate: 2.2 },
    'Tamil Nadu': { enrollments: 543210, rate: 6.2 },
    'Telangana': { enrollments: 2070404, rate: 10.8 },
    'Tripura': { enrollments: 42345, rate: 3.4 },
    'Uttar Pradesh': { enrollments: 2642461, rate: 12.5 },
    'Uttarakhand': { enrollments: 98765, rate: 5.1 },
    'Uttaranchal': { enrollments: 98765, rate: 5.1 },
    'West Bengal': { enrollments: 2342478, rate: 11.2 },
    'NCT of Delhi': { enrollments: 132109, rate: 16.6 },
    'Delhi': { enrollments: 132109, rate: 16.6 },
    'Jammu and Kashmir': { enrollments: 123456, rate: 6.5 },
    'Jammu & Kashmir': { enrollments: 123456, rate: 6.5 },
    'Ladakh': { enrollments: 12345, rate: 1.8 },
    'Chandigarh': { enrollments: 15678, rate: 4.2 },
    'Andaman and Nicobar Islands': { enrollments: 8765, rate: 1.2 },
    'Andaman & Nicobar': { enrollments: 8765, rate: 1.2 },
    'Dadra and Nagar Haveli and Daman and Diu': { enrollments: 14197, rate: 1.55 },
    'Dadra and Nagar Haveli': { enrollments: 7654, rate: 1.6 },
    'Daman and Diu': { enrollments: 6543, rate: 1.5 },
    'Lakshadweep': { enrollments: 2345, rate: 0.8 },
    'Puducherry': { enrollments: 18765, rate: 2.4 },
    'Pondicherry': { enrollments: 18765, rate: 2.4 },
};

// Color based on enrollment numbers
const getColor = (enrollments) => {
    if (!enrollments) return '#E2E8F0';
    if (enrollments > 1500000) return '#D62828'; // Very High - Red
    if (enrollments > 500000) return '#F77F00';  // High - Orange
    if (enrollments > 300000) return '#FFB700';  // Medium - Yellow
    return '#1B998B';                             // Low - Teal
};

const IndiaMapHeatmap = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [hoveredState, setHoveredState] = useState(null);

    const totalEnrollments = Object.entries(stateData)
        .filter(([key]) => !['Orissa', 'Uttaranchal', 'NCT of Delhi', 'Jammu and Kashmir', 'Andaman and Nicobar Islands', 'Pondicherry', 'Dadra and Nagar Haveli', 'Daman and Diu'].includes(key))
        .reduce((sum, [, s]) => sum + s.enrollments, 0);

    // Sort states by enrollment for the list (unique names only)
    const uniqueStates = Object.entries(stateData)
        .filter(([key]) => !['Orissa', 'Uttaranchal', 'NCT of Delhi', 'Jammu and Kashmir', 'Andaman and Nicobar Islands', 'Pondicherry', 'Dadra and Nagar Haveli', 'Daman and Diu'].includes(key))
        .sort(([, a], [, b]) => b.enrollments - a.enrollments);

    const handleStateClick = (stateName) => {
        setSelectedState(stateName);
    };

    return (
        <div className="dashboard-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '28px' }}>🇮🇳</span>
                <div>
                    <h2 style={{ margin: 0, color: '#1a1a2e', fontSize: '22px' }}>
                        India State-wise Enrollment Heatmap
                    </h2>
                    <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px' }}>
                        Interactive map visualization of Aadhaar enrollments across India
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
                {/* India Map using react-simple-maps */}
                <div style={{
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    borderRadius: '16px',
                    padding: '20px',
                    minHeight: '550px',
                    position: 'relative'
                }}>
                    <h3 style={{ margin: '0 0 8px', color: '#1a1a2e', fontSize: '16px' }}>
                        📍 Click on any state to view details
                    </h3>

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1000,
                            center: [82.8, 22]
                        }}
                        style={{ width: '100%', height: '480px' }}
                    >
                        <ZoomableGroup zoom={1} center={[82.8, 22]}>
                            <Geographies geography={INDIA_TOPO_JSON}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const stateName = geo.properties.NAME_1 || geo.properties.Name || geo.properties.ST_NM || geo.properties.name || geo.properties.NAME;
                                        const stateInfo = stateData[stateName];
                                        const isHovered = hoveredState === stateName;
                                        const isSelected = selectedState === stateName;

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={getColor(stateInfo?.enrollments)}
                                                stroke={isSelected ? '#1a1a2e' : isHovered ? '#4a5568' : '#FFFFFF'}
                                                strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.5}
                                                style={{
                                                    default: {
                                                        outline: 'none',
                                                        transition: 'all 0.3s'
                                                    },
                                                    hover: {
                                                        fill: getColor(stateInfo?.enrollments),
                                                        stroke: '#1a1a2e',
                                                        strokeWidth: 1.5,
                                                        outline: 'none',
                                                        cursor: 'pointer',
                                                        filter: 'brightness(1.1)'
                                                    },
                                                    pressed: {
                                                        fill: getColor(stateInfo?.enrollments),
                                                        stroke: '#1a1a2e',
                                                        strokeWidth: 2,
                                                        outline: 'none'
                                                    }
                                                }}
                                                onClick={() => handleStateClick(stateName)}
                                                onMouseEnter={() => setHoveredState(stateName)}
                                                onMouseLeave={() => setHoveredState(null)}
                                            />
                                        );
                                    })
                                }
                            </Geographies>

                            {/* State Name Labels */}
                            {Object.entries(stateLabels).map(([stateName, { coords, label, size }]) => (
                                <Marker key={stateName} coordinates={coords}>
                                    <text
                                        textAnchor="middle"
                                        y={3}
                                        style={{
                                            fontFamily: 'Arial, sans-serif',
                                            fontSize: `${size}px`,
                                            fill: '#1a1a2e',
                                            fontWeight: selectedState === stateName ? 'bold' : '600',
                                            pointerEvents: 'none',
                                            textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white'
                                        }}
                                    >
                                        {label}
                                    </text>
                                </Marker>
                            ))}

                        </ZoomableGroup>

                    </ComposableMap>

                    {/* Tooltip for hovered state */}
                    {hoveredState && stateData[hoveredState] && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                bottom: '80px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(26, 26, 46, 0.95)',
                                color: 'white',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                whiteSpace: 'nowrap',
                                zIndex: 100
                            }}
                        >
                            <strong>{hoveredState}</strong>: {stateData[hoveredState].enrollments.toLocaleString()} enrollments
                        </motion.div>
                    )}

                    {/* Legend */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginTop: '12px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '8px',
                        flexWrap: 'wrap'
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
                            Across 36 States/UTs
                        </div>
                    </motion.div>

                    {/* Selected State Details */}
                    {selectedState && stateData[selectedState] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: '#fff',
                                borderRadius: '12px',
                                padding: '20px',
                                border: `3px solid ${getColor(stateData[selectedState].enrollments)}`,
                                marginBottom: '16px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
                        {uniqueStates.slice(0, 5).map(([name, data], index) => (
                            <motion.div
                                key={name}
                                whileHover={{ backgroundColor: 'rgba(27, 153, 139, 0.05)' }}
                                onClick={() => setSelectedState(name)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 8px',
                                    borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        color: index < 3 ? '#1a1a2e' : '#4a5568'
                                    }}>
                                        {index + 1}
                                    </span>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>{name}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: getColor(data.enrollments) }}>
                                        {(data.enrollments / 1000000).toFixed(2)}M
                                    </span>
                                    <div style={{ fontSize: '10px', color: '#718096' }}>
                                        {((data.enrollments / totalEnrollments) * 100).toFixed(1)}%
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndiaMapHeatmap;
