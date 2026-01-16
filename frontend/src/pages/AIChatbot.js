import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Knowledge base for Aadhaar Intelligence System
const knowledgeBase = {
  // General Info
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
  
  // Data patterns for matching
  patterns: {
    enrollment: ['enrollment', 'enrolment', 'enroll', 'registered', 'aadhaar count', 'how many'],
    fraud: ['fraud', 'anomaly', 'suspicious', 'fake', 'duplicate', 'irregular'],
    forecast: ['forecast', 'prediction', 'predict', 'future', 'demand', 'next month'],
    geographic: ['state', 'district', 'pincode', 'location', 'area', 'region', 'maharashtra', 'delhi', 'karnataka'],
    demographic: ['age', 'gender', 'population', 'demographic', 'senior', 'youth', 'children'],
    update: ['update', 'biometric', 'demographic update', 'correction'],
    staffing: ['staff', 'employee', 'workforce', 'center', 'resource'],
    model: ['model', 'algorithm', 'machine learning', 'ml', 'ai', 'random forest', 'isolation forest'],
    help: ['help', 'what can you do', 'features', 'capabilities'],
  },
  
  // Responses
  responses: {
    greeting: [
      "👋 Namaste! I'm your Aadhaar Intelligence Assistant. How can I help you today?",
      "Hello! I'm here to help you understand Aadhaar data insights. What would you like to know?",
      "Hi there! Ask me anything about enrollments, fraud detection, or demand forecasting!"
    ],
    enrollment: [
      "📊 **Enrollment Insights:**\n\n• Total Records Analyzed: **4.9 Million+**\n• Peak Enrollment Month: **August** (+38% surge)\n• Top States: Maharashtra, Uttar Pradesh, Karnataka\n• Average Daily Enrollments: ~45,000\n\nWould you like state-wise breakdown?",
      "Based on our analysis of UIDAI data:\n\n• **1,006,029** enrollment records processed\n• **2,071,700** demographic records\n• **1,861,108** biometric records\n\nThe data shows seasonal patterns with peaks in Q3."
    ],
    fraud: [
      "🚨 **Fraud Detection Summary:**\n\n• Detection Method: **Isolation Forest**\n• Anomaly Rate: **2.0%** of transactions flagged\n• High-Risk Pincodes: 47 identified\n• Fraud Patterns: Enrollment spikes, age distribution anomalies\n\n**Key Indicators:**\n- Unusual enrollment volume (>3σ from mean)\n- Geographic clustering of irregularities\n- Biometric mismatch patterns",
      "Our fraud detection system identified:\n\n• **390 anomalous records** with unusual patterns\n• **2% contamination rate** via Isolation Forest\n• Risk scoring based on multiple factors\n\nWant me to explain the detection methodology?"
    ],
    forecast: [
      "🔮 **Demand Forecast (Next 6 Months):**\n\n| Month | Predicted Enrollments | Change |\n|-------|----------------------|--------|\n| Jan 2026 | 1.42M | +5% |\n| Feb 2026 | 1.38M | -3% |\n| Mar 2026 | 1.51M | +9% |\n| Apr 2026 | 1.45M | -4% |\n| May 2026 | 1.55M | +7% |\n| Jun 2026 | 1.62M | +5% |\n\n**Model Accuracy: 98.83%** (R² score)",
      "Based on our forecasting model:\n\n• **August Peak**: Expect 38% increase in enrollments\n• **Recommended Staffing**: Scale from 2,800 to 3,920 (+40%)\n• **Resource Allocation**: Prioritize Maharashtra, UP, Karnataka\n\nThe model uses historical patterns and seasonal trends."
    ],
    geographic: [
      "🗺️ **Geographic Analysis:**\n\n**Top 5 States by Enrollment:**\n1. Maharashtra - 18.2%\n2. Uttar Pradesh - 15.7%\n3. Karnataka - 9.8%\n4. Tamil Nadu - 8.4%\n5. Gujarat - 7.1%\n\n**Coverage Gaps Identified:**\n- 23 underserved districts\n- 156 priority pincodes for mobile vans\n\nAsk about a specific state for detailed insights!",
      "Geographic distribution shows:\n\n• **Urban vs Rural**: 62% urban, 38% rural enrollments\n• **High Density Zones**: Mumbai, Delhi NCR, Bangalore\n• **Mobile Van Priority**: Northeast states, J&K, remote areas"
    ],
    demographic: [
      "👥 **Demographic Insights:**\n\n**Age Distribution:**\n• 0-17 years: 28%\n• 18-35 years: 35%\n• 36-60 years: 27%\n• 60+ years: 10%\n\n**Key Findings:**\n- Youth (18-35) drive enrollment growth\n- Senior citizen updates increasing 15% YoY\n- Child enrollment peaks during school admissions (June-July)",
      "Demographic analysis reveals:\n\n• **Gender Ratio**: 51.2% Male, 48.8% Female\n• **Most Active Age Group**: 25-34 years\n• **Senior Citizen Services**: Growing demand for doorstep enrollment"
    ],
    update: [
      "🔄 **Update Patterns:**\n\n**Biometric Updates:**\n• Total: 1.86M records\n• Peak: Every 10 years (mandatory)\n• Common: Fingerprint refresh\n\n**Demographic Updates:**\n• Total: 2.07M records\n• Common: Address change (45%)\n• Growing: Mobile number updates (32%)",
      "Update trends show:\n\n• **Address Changes**: Post-migration peaks\n• **Name Corrections**: 12% of updates\n• **Biometric Refresh**: 10-year cycle compliance"
    ],
    staffing: [
      "👨‍💼 **Staffing Recommendations:**\n\n**Current Baseline:** 2,800 staff\n**Peak Season (Aug):** 3,920 staff needed (+40%)\n**Off-Peak:** 2,520 staff (10% reduction possible)\n\n**Optimization Suggestions:**\n1. Cross-train 200 staff for flexibility\n2. Deploy 50 mobile vans in underserved areas\n3. Implement appointment scheduling to smooth demand",
      "Resource planning insights:\n\n• **Cost Savings**: ₹2.3 Cr annual with dynamic staffing\n• **Efficiency Gain**: 23% with ML-based scheduling\n• **Mobile Vans**: 15 critical deployment zones identified"
    ],
    model: [
      "🤖 **ML Models Used:**\n\n**1. Isolation Forest**\n- Purpose: Anomaly Detection\n- Contamination: 2%\n- Features: Enrollment patterns, age distribution\n\n**2. K-Means Clustering**\n- Purpose: Geographic segmentation\n- Clusters: 8\n- Silhouette: 42.73%\n\n**3. Random Forest**\n- Purpose: Demand forecasting\n- Accuracy: R² = 0.9883",
      "Our ML pipeline includes:\n\n• **Preprocessing**: StandardScaler, MinMaxScaler\n• **Feature Engineering**: Rolling averages, lag features\n• **Validation**: 80-20 train-test split\n• **Metrics**: MAE, RMSE, R² score"
    ],
    help: [
      "🎯 **I can help you with:**\n\n1. **📊 Enrollment Data** - Statistics, trends, state-wise analysis\n2. **🚨 Fraud Detection** - Anomalies, suspicious patterns, risk scores\n3. **🔮 Demand Forecast** - Predictions, staffing needs, resource planning\n4. **🗺️ Geographic Analysis** - State/district insights, coverage gaps\n5. **👥 Demographics** - Age, gender, population analysis\n6. **🤖 ML Models** - Algorithms used, accuracy metrics\n\n**Try asking:**\n- \"What are the top states by enrollment?\"\n- \"Show me fraud detection results\"\n- \"What's the forecast for next month?\"",
    ],
    unknown: [
      "I'm not sure about that. Try asking about:\n• Enrollments\n• Fraud detection\n• Demand forecasting\n• Geographic analysis\n• Demographics\n• ML models",
      "I don't have information on that specific topic. I specialize in Aadhaar data insights. What would you like to know about enrollments, fraud, or forecasting?",
    ]
  }
};

// Find matching response based on user input
const findResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Check for greetings
  if (knowledgeBase.greetings.some(g => lowerInput.includes(g))) {
    const responses = knowledgeBase.responses.greeting;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Check patterns
  for (const [category, keywords] of Object.entries(knowledgeBase.patterns)) {
    if (keywords.some(k => lowerInput.includes(k))) {
      const responses = knowledgeBase.responses[category];
      if (responses) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  // Default response
  const unknownResponses = knowledgeBase.responses.unknown;
  return unknownResponses[Math.floor(Math.random() * unknownResponses.length)];
};

// Quick suggestion buttons
const quickSuggestions = [
  { icon: '📊', text: 'Enrollment stats', query: 'Show me enrollment statistics' },
  { icon: '🚨', text: 'Fraud detection', query: 'What fraud patterns were detected?' },
  { icon: '🔮', text: 'Demand forecast', query: 'What is the demand forecast?' },
  { icon: '🗺️', text: 'Top states', query: 'Which states have highest enrollment?' },
  { icon: '👥', text: 'Demographics', query: 'Show demographic analysis' },
  { icon: '🤖', text: 'ML models', query: 'What ML models are used?' },
];

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Namaste! I'm your **Aadhaar Intelligence Assistant**.\n\nI can help you understand:\n• 📊 Enrollment trends & statistics\n• 🚨 Fraud detection results\n• 🔮 Demand forecasting\n• 🗺️ Geographic insights\n\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = findResponse(text);
    
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      text: response,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (query) => {
    handleSend(query);
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .split('\n')
      .map((line, i) => {
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Tables (simple)
        if (line.startsWith('|')) {
          return <div key={i} style={{ fontFamily: 'monospace', fontSize: '12px' }}>{line}</div>;
        }
        // Bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          return <div key={i} style={{ paddingLeft: '10px' }} dangerouslySetInnerHTML={{ __html: line }} />;
        }
        // Numbered lists
        if (/^\d+\./.test(line)) {
          return <div key={i} style={{ paddingLeft: '10px' }} dangerouslySetInnerHTML={{ __html: line }} />;
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
      });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div 
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.headerContent}>
          <div style={styles.botAvatar}>🤖</div>
          <div>
            <h1 style={styles.title}>Aadhaar Intelligence Assistant</h1>
            <p style={styles.subtitle}>Ask me anything about Aadhaar data insights</p>
          </div>
        </div>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot}></span>
          Online
        </div>
      </motion.div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        {/* Messages */}
        <div style={styles.messagesContainer}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {message.type === 'bot' && (
                  <div style={styles.messageAvatar}>🤖</div>
                )}
                <div style={{
                  ...styles.message,
                  ...(message.type === 'user' ? styles.userMessage : styles.botMessage)
                }}>
                  {formatMessage(message.text)}
                  <div style={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div style={styles.messageAvatar}>👤</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.typingIndicator}
            >
              <div style={styles.messageAvatar}>🤖</div>
              <div style={styles.typingDots}>
                <span style={styles.dot}>●</span>
                <span style={{ ...styles.dot, animationDelay: '0.2s' }}>●</span>
                <span style={{ ...styles.dot, animationDelay: '0.4s' }}>●</span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div style={styles.suggestionsContainer}>
          <p style={styles.suggestionsLabel}>Quick questions:</p>
          <div style={styles.suggestions}>
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                style={styles.suggestionButton}
                whileHover={{ scale: 1.05, backgroundColor: '#e8f4fc' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSuggestionClick(suggestion.query)}
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.text}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              style={styles.input}
            />
            <motion.button
              style={styles.sendButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              ➤
            </motion.button>
          </div>
          <p style={styles.inputHint}>Press Enter to send • Try "What is the fraud detection rate?"</p>
        </div>
      </div>

      {/* Stats Panel */}
      <motion.div 
        style={styles.statsPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 style={styles.statsPanelTitle}>📈 Quick Stats</h3>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total Records</span>
          <span style={styles.statValue}>4.9M+</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>States Covered</span>
          <span style={styles.statValue}>36</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Anomaly Rate</span>
          <span style={styles.statValue}>2.3%</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Forecast Accuracy</span>
          <span style={styles.statValue}>98.83%</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Priority Pincodes</span>
          <span style={styles.statValue}>156</span>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gridTemplateRows: 'auto 1fr',
    gap: '20px',
    height: 'calc(100vh - 40px)',
    padding: '20px',
    backgroundColor: '#f8fafc',
  },
  header: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  botAvatar: {
    fontSize: '48px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    margin: '5px 0 0',
    fontSize: '14px',
    opacity: 0.9,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '20px',
    fontSize: '14px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    background: '#4ade80',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
  messageAvatar: {
    fontSize: '24px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    flexShrink: 0,
  },
  message: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  botMessage: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    borderBottomLeftRadius: '4px',
  },
  userMessage: {
    backgroundColor: '#667eea',
    color: 'white',
    borderBottomRightRadius: '4px',
  },
  timestamp: {
    fontSize: '10px',
    opacity: 0.6,
    marginTop: '5px',
    textAlign: 'right',
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  typingDots: {
    display: 'flex',
    gap: '4px',
    padding: '12px 16px',
    backgroundColor: '#f1f5f9',
    borderRadius: '16px',
  },
  dot: {
    fontSize: '12px',
    color: '#667eea',
    animation: 'bounce 1.4s infinite',
  },
  suggestionsContainer: {
    padding: '15px 20px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  suggestionsLabel: {
    margin: '0 0 10px',
    fontSize: '12px',
    color: '#64748b',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  suggestionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    backgroundColor: 'white',
    fontSize: '13px',
    color: '#334155',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputArea: {
    padding: '15px 20px',
    borderTop: '1px solid #e2e8f0',
  },
  inputWrapper: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '14px 20px',
    border: '2px solid #e2e8f0',
    borderRadius: '25px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  sendButton: {
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHint: {
    margin: '8px 0 0',
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center',
  },
  statsPanel: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    height: 'fit-content',
  },
  statsPanelTitle: {
    margin: '0 0 15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#334155',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  statLabel: {
    fontSize: '13px',
    color: '#64748b',
  },
  statValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#667eea',
  },
};

// Add CSS animation for typing dots
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  input:focus {
    border-color: #667eea !important;
  }
`;
document.head.appendChild(styleSheet);

export default AIChatbot;
