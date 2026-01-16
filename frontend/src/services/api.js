/**
 * 🇮🇳 AADHAAR INTELLIGENCE SYSTEM
 * API Service for connecting React Dashboard to Backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  static async fetchWithError(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return null;
    }
  }

  // Get API status and data source info
  static async getStatus() {
    return this.fetchWithError('/api/status');
  }

  // Executive Summary data
  static async getExecutiveSummary() {
    return this.fetchWithError('/api/executive-summary');
  }

  // Geographic Analysis data
  static async getGeographicAnalysis() {
    return this.fetchWithError('/api/geographic-analysis');
  }

  // Fraud Detection data
  static async getFraudDetection() {
    return this.fetchWithError('/api/fraud-detection');
  }

  // Life Events data
  static async getLifeEvents() {
    return this.fetchWithError('/api/life-events');
  }

  // Demand Forecast data
  static async getDemandForecast() {
    return this.fetchWithError('/api/demand-forecast');
  }

  // Recommendations data
  static async getRecommendations() {
    return this.fetchWithError('/api/recommendations');
  }
}

export default ApiService;
