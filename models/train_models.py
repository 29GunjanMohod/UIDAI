"""
🤖 AADHAAR INTELLIGENCE SYSTEM - ML MODEL TRAINING
==================================================
This script trains all ML models using REAL UIDAI data.

Models Trained:
1. Isolation Forest - Fraud/Anomaly Detection
2. DBSCAN - Fraud Ring Clustering  
3. Random Forest - Demand Forecasting
4. XGBoost - Enrollment Prediction
5. K-Means - Geographic Segmentation

Author: Aadhaar Intelligence Team
Date: January 2026
"""

import pandas as pd
import numpy as np
import glob
import os
import joblib
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Scikit-learn imports
from sklearn.ensemble import IsolationForest, RandomForestRegressor, GradientBoostingRegressor
from sklearn.cluster import DBSCAN, KMeans
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score, TimeSeriesSplit
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    mean_absolute_error, mean_squared_error, r2_score,
    silhouette_score, classification_report, confusion_matrix
)
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.neighbors import LocalOutlierFactor

# Try importing XGBoost (optional)
try:
    import xgboost as xgb
    HAS_XGBOOST = True
except ImportError:
    HAS_XGBOOST = False
    print("⚠️ XGBoost not installed, using GradientBoosting instead")

print("="*70)
print("🤖 AADHAAR INTELLIGENCE - ML MODEL TRAINING PIPELINE")
print("="*70)
print(f"📅 Training Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print()

# ============================================
# CONFIGURATION
# ============================================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
OUTPUT_DIR = os.path.join(BASE_DIR, 'outputs')
MODELS_DIR = os.path.join(BASE_DIR, 'models', 'trained')

# Create directories
os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, 'metrics'), exist_ok=True)

print(f"📂 Base Directory: {BASE_DIR}")
print(f"📂 Models will be saved to: {MODELS_DIR}")
print()

# ============================================
# LOAD DATA
# ============================================
def load_all_data():
    """Load all UIDAI datasets"""
    print("📊 LOADING UIDAI DATASETS...")
    print("-"*50)
    
    datasets = {}
    
    # Load Enrollment Data
    enrol_pattern = os.path.join(DATA_DIR, 'enrolment', '**', '*.csv')
    enrol_files = glob.glob(enrol_pattern, recursive=True)
    if enrol_files:
        df_list = [pd.read_csv(f) for f in enrol_files]
        datasets['enrollment'] = pd.concat(df_list, ignore_index=True)
        print(f"✅ Enrollment: {len(datasets['enrollment']):,} records from {len(enrol_files)} files")
    
    # Load Demographic Data
    demo_pattern = os.path.join(DATA_DIR, 'demographic', '**', '*.csv')
    demo_files = glob.glob(demo_pattern, recursive=True)
    if demo_files:
        df_list = [pd.read_csv(f) for f in demo_files]
        datasets['demographic'] = pd.concat(df_list, ignore_index=True)
        print(f"✅ Demographic: {len(datasets['demographic']):,} records from {len(demo_files)} files")
    
    # Load Biometric Data
    bio_pattern = os.path.join(DATA_DIR, 'biometric', '**', '*.csv')
    bio_files = glob.glob(bio_pattern, recursive=True)
    if bio_files:
        df_list = [pd.read_csv(f) for f in bio_files]
        datasets['biometric'] = pd.concat(df_list, ignore_index=True)
        print(f"✅ Biometric: {len(datasets['biometric']):,} records from {len(bio_files)} files")
    
    print()
    return datasets

# ============================================
# MODEL 1: ISOLATION FOREST (Anomaly Detection)
# ============================================
def train_isolation_forest(data):
    """
    Train Isolation Forest for fraud/anomaly detection.
    
    Best for: Detecting unusual enrollment patterns, suspicious pincodes
    Algorithm: Isolation Forest (unsupervised anomaly detection)
    Contamination: 2% (assumes 2% of data are anomalies)
    """
    print("="*70)
    print("🚨 MODEL 1: ISOLATION FOREST (Anomaly Detection)")
    print("="*70)
    
    # Prepare features
    df = data['enrollment'].copy()
    
    # Get numeric columns for features
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    # Create aggregated features if we have pincode/district data
    if 'Pincode' in df.columns or 'pincode' in df.columns:
        pincode_col = 'Pincode' if 'Pincode' in df.columns else 'pincode'
        
        # Aggregate by pincode
        agg_features = df.groupby(pincode_col).agg({
            col: ['sum', 'mean', 'std'] for col in numeric_cols if col != pincode_col
        }).reset_index()
        agg_features.columns = ['_'.join(col).strip('_') for col in agg_features.columns]
        
        # Fill NaN with 0
        agg_features = agg_features.fillna(0)
        
        # Select features for training
        feature_cols = [col for col in agg_features.columns if col not in [pincode_col, 'Pincode', 'pincode']]
        X = agg_features[feature_cols].values
    else:
        # Use raw numeric data
        X = df[numeric_cols].fillna(0).values
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    print(f"📊 Features shape: {X_scaled.shape}")
    print(f"📊 Number of samples: {X_scaled.shape[0]}")
    print(f"📊 Number of features: {X_scaled.shape[1]}")
    print()
    
    # Train Isolation Forest
    print("🔄 Training Isolation Forest...")
    model = IsolationForest(
        n_estimators=200,           # More trees = better accuracy
        contamination=0.02,         # 2% anomaly rate
        max_samples='auto',
        random_state=42,
        n_jobs=-1,                  # Use all CPU cores
        verbose=0
    )
    
    # Fit and predict
    predictions = model.fit_predict(X_scaled)
    scores = model.decision_function(X_scaled)
    
    # Calculate metrics
    n_anomalies = (predictions == -1).sum()
    anomaly_rate = n_anomalies / len(predictions) * 100
    
    print(f"✅ Training Complete!")
    print(f"📊 Total Samples: {len(predictions):,}")
    print(f"🚨 Anomalies Detected: {n_anomalies:,} ({anomaly_rate:.2f}%)")
    print(f"✅ Normal Samples: {(predictions == 1).sum():,}")
    print()
    
    # Save model and scaler
    model_path = os.path.join(MODELS_DIR, 'isolation_forest_model.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'isolation_forest_scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"💾 Model saved: {model_path}")
    print(f"💾 Scaler saved: {scaler_path}")
    
    # Save predictions
    results_df = pd.DataFrame({
        'anomaly_score': scores,
        'prediction': predictions,
        'is_anomaly': predictions == -1
    })
    results_path = os.path.join(OUTPUT_DIR, 'fraud_predictions.csv')
    results_df.to_csv(results_path, index=False)
    print(f"💾 Predictions saved: {results_path}")
    
    metrics = {
        'model': 'Isolation Forest',
        'total_samples': int(len(predictions)),
        'anomalies_detected': int(n_anomalies),
        'anomaly_rate': round(anomaly_rate, 2),
        'contamination': 0.02,
        'n_estimators': 200
    }
    
    print()
    return model, scaler, metrics


# ============================================
# MODEL 2: DBSCAN (Fraud Ring Clustering)
# ============================================
def train_dbscan(data):
    """
    Train DBSCAN for fraud ring detection.
    
    Best for: Identifying clusters of suspicious activities
    Algorithm: DBSCAN (Density-Based Spatial Clustering)
    """
    print("="*70)
    print("🔍 MODEL 2: DBSCAN (Fraud Ring Clustering)")
    print("="*70)
    
    df = data['enrollment'].copy()
    
    # Get numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    # Prepare features
    X = df[numeric_cols].fillna(0).values
    
    # Standardize
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Sample if dataset is too large
    if len(X_scaled) > 50000:
        np.random.seed(42)
        sample_idx = np.random.choice(len(X_scaled), 50000, replace=False)
        X_sample = X_scaled[sample_idx]
    else:
        X_sample = X_scaled
        sample_idx = np.arange(len(X_scaled))
    
    print(f"📊 Features shape: {X_sample.shape}")
    print()
    
    # Train DBSCAN
    print("🔄 Training DBSCAN Clustering...")
    model = DBSCAN(
        eps=0.5,                    # Maximum distance between samples
        min_samples=5,              # Minimum samples in a cluster
        metric='euclidean',
        n_jobs=-1
    )
    
    clusters = model.fit_predict(X_sample)
    
    # Calculate metrics
    n_clusters = len(set(clusters)) - (1 if -1 in clusters else 0)
    n_noise = (clusters == -1).sum()
    
    # Silhouette score (only if we have valid clusters)
    if n_clusters > 1:
        # Filter out noise points for silhouette calculation
        mask = clusters != -1
        if mask.sum() > 1:
            silhouette = silhouette_score(X_sample[mask], clusters[mask])
        else:
            silhouette = 0
    else:
        silhouette = 0
    
    print(f"✅ Training Complete!")
    print(f"📊 Number of Clusters: {n_clusters}")
    print(f"📊 Noise Points (potential fraud): {n_noise:,}")
    print(f"📊 Silhouette Score: {silhouette:.4f}")
    print()
    
    # Save model
    model_path = os.path.join(MODELS_DIR, 'dbscan_model.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'dbscan_scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"💾 Model saved: {model_path}")
    print(f"💾 Scaler saved: {scaler_path}")
    
    # Save cluster results
    cluster_df = pd.DataFrame({
        'cluster': clusters,
        'is_noise': clusters == -1
    })
    cluster_path = os.path.join(OUTPUT_DIR, 'cluster_results.csv')
    cluster_df.to_csv(cluster_path, index=False)
    print(f"💾 Clusters saved: {cluster_path}")
    
    metrics = {
        'model': 'DBSCAN',
        'n_clusters': int(n_clusters),
        'noise_points': int(n_noise),
        'silhouette_score': round(silhouette, 4),
        'eps': 0.5,
        'min_samples': 5
    }
    
    print()
    return model, scaler, metrics


# ============================================
# MODEL 3: RANDOM FOREST (Demand Forecasting)
# ============================================
def train_demand_forecast(data):
    """
    Train Random Forest for demand forecasting.
    
    Best for: Predicting future enrollment demand
    Algorithm: Random Forest Regressor (ensemble method)
    """
    print("="*70)
    print("🔮 MODEL 3: RANDOM FOREST (Demand Forecasting)")
    print("="*70)
    
    df = data['enrollment'].copy()
    
    # Get numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if len(numeric_cols) < 2:
        print("⚠️ Not enough numeric columns for forecasting")
        return None, None, {}
    
    # Create time-based features if possible
    # For now, use existing numeric features
    
    # Use first numeric column as target (enrollment count)
    target_col = numeric_cols[0]
    feature_cols = numeric_cols[1:] if len(numeric_cols) > 1 else numeric_cols
    
    # Prepare data
    X = df[feature_cols].fillna(0).values
    y = df[target_col].fillna(0).values
    
    # Add synthetic time features
    n_samples = len(X)
    time_features = np.column_stack([
        np.arange(n_samples),                          # Time index
        np.sin(2 * np.pi * np.arange(n_samples) / 12), # Monthly seasonality
        np.cos(2 * np.pi * np.arange(n_samples) / 12),
        np.sin(2 * np.pi * np.arange(n_samples) / 52), # Weekly seasonality
    ])
    
    X_enhanced = np.hstack([X, time_features])
    
    # ============================================
    # FIX: Use temporal split instead of random split
    # This prevents data leakage (future data in training)
    # ============================================
    print("📊 Using temporal split for proper time-series validation...")
    
    # Use last 20% as test set (temporal split, not random)
    split_idx = int(len(X_enhanced) * 0.8)
    X_train = X_enhanced[:split_idx]
    X_test = X_enhanced[split_idx:]
    y_train = y[:split_idx]
    y_test = y[split_idx:]

    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print(f"📊 Training samples: {len(X_train):,}")
    print(f"📊 Test samples: {len(X_test):,}")
    print(f"📊 Features: {X_enhanced.shape[1]}")
    print()
    
    # Train Random Forest with regularization to prevent overfitting
    print("🔄 Training Random Forest Regressor (regularized)...")
    model = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,              # Reduced from 15 to prevent overfitting
        min_samples_split=10,      # Increased for regularization
        min_samples_leaf=5,        # Increased for regularization
        max_features='sqrt',       # Feature subsampling for regularization
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train_scaled, y_train)
    
    # Predictions
    y_pred_train = model.predict(X_train_scaled)
    y_pred_test = model.predict(X_test_scaled)
    
    # Calculate metrics
    train_r2 = r2_score(y_train, y_pred_train)
    test_r2 = r2_score(y_test, y_pred_test)
    mae = mean_absolute_error(y_test, y_pred_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    
    # TimeSeriesSplit cross-validation (proper for time-series data)
    tscv = TimeSeriesSplit(n_splits=5)
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=tscv, scoring='r2')
    
    print(f"✅ Training Complete!")
    print(f"📊 Training R² Score: {train_r2:.4f}")
    print(f"📊 Test R² Score: {test_r2:.4f}")
    print(f"📊 MAE: {mae:.2f}")
    print(f"📊 RMSE: {rmse:.2f}")
    print(f"📊 TimeSeriesCV R² Score: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")
    print()
    
    # Convert to percentage accuracy (for display)
    accuracy_pct = max(0, test_r2 * 100)
    
    # Save model
    model_path = os.path.join(MODELS_DIR, 'random_forest_forecast.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'forecast_scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"💾 Model saved: {model_path}")
    print(f"💾 Scaler saved: {scaler_path}")
    
    metrics = {
        'model': 'Random Forest Regressor',
        'train_r2': round(train_r2, 4),
        'test_r2': round(test_r2, 4),
        'accuracy_pct': round(accuracy_pct, 2),
        'mae': round(mae, 2),
        'rmse': round(rmse, 2),
        'cv_mean': round(cv_scores.mean(), 4),
        'cv_std': round(cv_scores.std(), 4),
        'n_estimators': 100
    }
    
    print()
    return model, scaler, metrics


# ============================================
# MODEL 4: GRADIENT BOOSTING / XGBOOST
# ============================================
def train_xgboost_model(data):
    """
    Train XGBoost/Gradient Boosting for enrollment prediction.
    
    Best for: High accuracy predictions with feature importance
    Algorithm: XGBoost or Gradient Boosting (if XGBoost not available)
    """
    print("="*70)
    print("🚀 MODEL 4: GRADIENT BOOSTING (Enrollment Prediction)")
    print("="*70)
    
    df = data['enrollment'].copy()
    
    # Get numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if len(numeric_cols) < 2:
        print("⚠️ Not enough numeric columns")
        return None, None, {}
    
    # Prepare features and target
    target_col = numeric_cols[0]
    feature_cols = numeric_cols[1:]
    
    X = df[feature_cols].fillna(0).values
    y = df[target_col].fillna(0).values
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Standardize
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print(f"📊 Training samples: {len(X_train):,}")
    print(f"📊 Test samples: {len(X_test):,}")
    print()
    
    # Train model
    if HAS_XGBOOST:
        print("🔄 Training XGBoost Regressor...")
        model = xgb.XGBRegressor(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            n_jobs=-1
        )
        model_name = 'XGBoost'
    else:
        print("🔄 Training Gradient Boosting Regressor...")
        model = GradientBoostingRegressor(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            random_state=42
        )
        model_name = 'Gradient Boosting'
    
    model.fit(X_train_scaled, y_train)
    
    # Predictions
    y_pred_test = model.predict(X_test_scaled)
    
    # Metrics
    test_r2 = r2_score(y_test, y_pred_test)
    mae = mean_absolute_error(y_test, y_pred_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    
    print(f"✅ Training Complete!")
    print(f"📊 Test R² Score: {test_r2:.4f}")
    print(f"📊 MAE: {mae:.2f}")
    print(f"📊 RMSE: {rmse:.2f}")
    print(f"📊 Accuracy: {max(0, test_r2*100):.2f}%")
    print()
    
    # Save model
    model_path = os.path.join(MODELS_DIR, 'gradient_boost_model.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'gradient_boost_scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"💾 Model saved: {model_path}")
    print(f"💾 Scaler saved: {scaler_path}")
    
    metrics = {
        'model': model_name,
        'test_r2': round(test_r2, 4),
        'accuracy_pct': round(max(0, test_r2*100), 2),
        'mae': round(mae, 2),
        'rmse': round(rmse, 2),
        'n_estimators': 100
    }
    
    print()
    return model, scaler, metrics


# ============================================
# MODEL 5: K-MEANS (Geographic Segmentation)
# ============================================
def train_kmeans(data):
    """
    Train K-Means for geographic segmentation.
    
    Best for: Segmenting pincodes/districts by service needs
    Algorithm: K-Means Clustering
    """
    print("="*70)
    print("📍 MODEL 5: K-MEANS (Geographic Segmentation)")
    print("="*70)
    
    df = data['enrollment'].copy()
    
    # Get numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    X = df[numeric_cols].fillna(0).values
    
    # Standardize
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    print(f"📊 Samples: {X_scaled.shape[0]:,}")
    print(f"📊 Features: {X_scaled.shape[1]}")
    print()
    
    # Find optimal k using elbow method (simplified)
    print("🔄 Finding optimal number of clusters...")
    inertias = []
    silhouettes = []
    K_range = range(2, 8)
    
    for k in K_range:
        kmeans_temp = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans_temp.fit(X_scaled[:10000] if len(X_scaled) > 10000 else X_scaled)  # Sample for speed
        inertias.append(kmeans_temp.inertia_)
        
        labels_temp = kmeans_temp.labels_
        if len(set(labels_temp)) > 1:
            sil = silhouette_score(X_scaled[:10000] if len(X_scaled) > 10000 else X_scaled, labels_temp)
            silhouettes.append(sil)
        else:
            silhouettes.append(0)
    
    # Choose k with best silhouette
    best_k = K_range[np.argmax(silhouettes)]
    print(f"📊 Optimal clusters: {best_k} (silhouette: {max(silhouettes):.4f})")
    print()
    
    # Train final model
    print(f"🔄 Training K-Means with {best_k} clusters...")
    model = KMeans(
        n_clusters=best_k,
        init='k-means++',
        n_init=10,
        max_iter=300,
        random_state=42
    )
    
    # Sample if too large
    if len(X_scaled) > 100000:
        sample_idx = np.random.choice(len(X_scaled), 100000, replace=False)
        model.fit(X_scaled[sample_idx])
        labels = model.predict(X_scaled)
    else:
        labels = model.fit_predict(X_scaled)
    
    # Calculate metrics
    silhouette = silhouette_score(X_scaled[:50000] if len(X_scaled) > 50000 else X_scaled, 
                                   labels[:50000] if len(labels) > 50000 else labels)
    
    # Cluster distribution
    unique, counts = np.unique(labels, return_counts=True)
    
    print(f"✅ Training Complete!")
    print(f"📊 Number of Clusters: {best_k}")
    print(f"📊 Silhouette Score: {silhouette:.4f}")
    print(f"📊 Cluster Distribution:")
    for cluster, count in zip(unique, counts):
        pct = count / len(labels) * 100
        print(f"   Cluster {cluster}: {count:,} ({pct:.1f}%)")
    print()
    
    # Save model
    model_path = os.path.join(MODELS_DIR, 'kmeans_model.pkl')
    scaler_path = os.path.join(MODELS_DIR, 'kmeans_scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"💾 Model saved: {model_path}")
    print(f"💾 Scaler saved: {scaler_path}")
    
    # Save segmentation results
    segment_df = pd.DataFrame({
        'cluster': labels,
        'cluster_name': [f'Segment_{l}' for l in labels]
    })
    segment_path = os.path.join(OUTPUT_DIR, 'geographic_segments.csv')
    segment_df.to_csv(segment_path, index=False)
    print(f"💾 Segments saved: {segment_path}")
    
    metrics = {
        'model': 'K-Means',
        'n_clusters': int(best_k),
        'silhouette_score': round(silhouette, 4),
        'cluster_distribution': {int(k): int(v) for k, v in zip(unique, counts)}
    }
    
    print()
    return model, scaler, metrics


# ============================================
# MAIN TRAINING PIPELINE
# ============================================
def main():
    """Run the complete training pipeline"""
    
    # Load data
    data = load_all_data()
    
    if not data or 'enrollment' not in data:
        print("❌ ERROR: Could not load enrollment data!")
        return
    
    all_metrics = {}
    
    # Train all models
    print("\n" + "🚀 STARTING MODEL TRAINING PIPELINE".center(70))
    print("="*70 + "\n")
    
    # Model 1: Isolation Forest
    try:
        _, _, metrics1 = train_isolation_forest(data)
        all_metrics['isolation_forest'] = metrics1
    except Exception as e:
        print(f"❌ Isolation Forest failed: {e}")
    
    # Model 2: DBSCAN
    try:
        _, _, metrics2 = train_dbscan(data)
        all_metrics['dbscan'] = metrics2
    except Exception as e:
        print(f"❌ DBSCAN failed: {e}")
    
    # Model 3: Random Forest Forecast
    try:
        _, _, metrics3 = train_demand_forecast(data)
        all_metrics['random_forest'] = metrics3
    except Exception as e:
        print(f"❌ Random Forest failed: {e}")
    
    # Model 4: Gradient Boosting
    try:
        _, _, metrics4 = train_xgboost_model(data)
        all_metrics['gradient_boosting'] = metrics4
    except Exception as e:
        print(f"❌ Gradient Boosting failed: {e}")
    
    # Model 5: K-Means
    try:
        _, _, metrics5 = train_kmeans(data)
        all_metrics['kmeans'] = metrics5
    except Exception as e:
        print(f"❌ K-Means failed: {e}")
    
    # Save all metrics
    metrics_path = os.path.join(OUTPUT_DIR, 'metrics', 'model_metrics.json')
    with open(metrics_path, 'w') as f:
        json.dump(all_metrics, f, indent=2)
    
    # Print Summary
    print("\n" + "="*70)
    print("📊 TRAINING SUMMARY".center(70))
    print("="*70)
    print()
    
    print("✅ MODELS TRAINED:")
    for name, metrics in all_metrics.items():
        if metrics:
            model_name = metrics.get('model', name)
            print(f"   • {model_name}")
    
    print()
    print("💾 FILES CREATED:")
    for f in os.listdir(MODELS_DIR):
        print(f"   • models/trained/{f}")
    
    print()
    print("📈 KEY METRICS:")
    if 'isolation_forest' in all_metrics:
        print(f"   • Anomaly Detection Rate: {all_metrics['isolation_forest'].get('anomaly_rate', 'N/A')}%")
    if 'random_forest' in all_metrics:
        print(f"   • Forecast Accuracy (R²): {all_metrics['random_forest'].get('accuracy_pct', 'N/A')}%")
    if 'kmeans' in all_metrics:
        print(f"   • Clustering Silhouette: {all_metrics['kmeans'].get('silhouette_score', 'N/A')}")
    
    print()
    print(f"📅 Training Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*70)
    
    return all_metrics


if __name__ == "__main__":
    metrics = main()

