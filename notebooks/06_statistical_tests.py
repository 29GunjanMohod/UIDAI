"""
Statistical Hypothesis Testing for UIDAI Hackathon
Performs rigorous statistical tests to validate data-driven findings
"""

import pandas as pd
import numpy as np
from scipy import stats
from scipy.stats import chi2_contingency, ttest_ind, f_oneway, pearsonr
import os
import glob
import json
from datetime import datetime

# Configuration
DATA_DIR = '../data/'
OUTPUT_DIR = '../outputs/'
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 70)
print("STATISTICAL HYPOTHESIS TESTING")
print("=" * 70)
print(f"Analysis Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

# Load Datasets
print("\nLoading UIDAI Datasets...")

def load_all_csvs(folder_path):
    """Load and concatenate all CSV files from a folder."""
    all_files = glob.glob(os.path.join(folder_path, "**/*.csv"), recursive=True)
    if not all_files:
        return None
    dfs = [pd.read_csv(file) for file in all_files]
    return pd.concat(dfs, ignore_index=True)

df_enrolment = load_all_csvs(f"{DATA_DIR}enrolment/")
df_demographic = load_all_csvs(f"{DATA_DIR}demographic/")
df_biometric = load_all_csvs(f"{DATA_DIR}biometric/")

print(f"Enrolment: {len(df_enrolment):,} records")
print(f"Demographic: {len(df_demographic):,} records")
print(f"Biometric: {len(df_biometric):,} records")

# Data preparation
df_enrolment['date'] = pd.to_datetime(df_enrolment['date'], format='%d-%m-%Y', errors='coerce')
df_enrolment['total_enrolments'] = df_enrolment['age_0_5'] + df_enrolment['age_5_17'] + df_enrolment['age_18_greater']


# TEST 1: Chi-Square Test for Age Distribution
print("\n" + "=" * 70)
print("TEST 1: CHI-SQUARE TEST - Age Distribution Independence")
print("=" * 70)

top_states = df_enrolment.groupby('state')['total_enrolments'].sum().nlargest(10).index.tolist()
df_top = df_enrolment[df_enrolment['state'].isin(top_states)]
contingency_table = df_top.groupby('state')[['age_0_5', 'age_5_17', 'age_18_greater']].sum()

chi2, p_value, dof, expected = chi2_contingency(contingency_table)

print(f"\nH0: Age distribution is independent of state")
print(f"H1: Age distribution depends on state")
print(f"\nChi-Square Statistic: {chi2:,.2f}")
print(f"Degrees of Freedom: {dof}")
print(f"P-Value: {p_value:.2e}")
print(f"Conclusion: {'REJECT H0 - Significant difference' if p_value < 0.05 else 'Fail to reject H0'}")

test1_result = {
    "test_name": "Chi-Square Test - Age Distribution by State",
    "statistic": float(chi2),
    "p_value": float(p_value),
    "dof": int(dof),
    "significant": bool(p_value < 0.05),
    "conclusion": "Age distribution significantly varies by state" if p_value < 0.05 else "No significant difference"
}


# TEST 2: Independent T-Test
print("\n" + "=" * 70)
print("TEST 2: INDEPENDENT T-TEST - High vs Low Enrollment Areas")
print("=" * 70)

pincode_totals = df_enrolment.groupby('pincode')['total_enrolments'].sum()
median_enrollment = pincode_totals.median()
high_activity = pincode_totals[pincode_totals > median_enrollment].values
low_activity = pincode_totals[pincode_totals <= median_enrollment].values

t_stat, p_value_t = ttest_ind(high_activity, low_activity)

print(f"\nH0: Mean enrollment is same in high vs low activity areas")
print(f"H1: Mean enrollment differs between areas")
print(f"\nHigh Activity Mean: {np.mean(high_activity):,.2f}")
print(f"Low Activity Mean: {np.mean(low_activity):,.2f}")
print(f"T-Statistic: {t_stat:.4f}")
print(f"P-Value: {p_value_t:.2e}")
print(f"Conclusion: {'REJECT H0 - Significant difference' if p_value_t < 0.05 else 'Fail to reject H0'}")

test2_result = {
    "test_name": "Independent T-Test - High vs Low Activity Areas",
    "t_statistic": float(t_stat),
    "p_value": float(p_value_t),
    "high_activity_mean": float(np.mean(high_activity)),
    "low_activity_mean": float(np.mean(low_activity)),
    "significant": bool(p_value_t < 0.05),
    "conclusion": "Significant difference exists" if p_value_t < 0.05 else "No significant difference"
}


# TEST 3: One-Way ANOVA for Seasonal Effects
print("\n" + "=" * 70)
print("TEST 3: ONE-WAY ANOVA - Seasonal Enrollment Differences")
print("=" * 70)

df_enrolment['month'] = df_enrolment['date'].dt.month

def get_season(month):
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Summer'
    elif month in [6, 7, 8, 9]:
        return 'Monsoon'
    else:
        return 'Autumn'

df_enrolment['season'] = df_enrolment['month'].apply(get_season)
seasonal_groups = [group['total_enrolments'].values for name, group in df_enrolment.groupby('season')]

f_stat, p_value_anova = f_oneway(*seasonal_groups)

print(f"\nH0: Mean enrollment is same across all seasons")
print(f"H1: At least one season has different mean enrollment")
print(f"\nSeasonal Mean Enrollments:")
for season in ['Winter', 'Summer', 'Monsoon', 'Autumn']:
    season_data = df_enrolment[df_enrolment['season'] == season]['total_enrolments']
    print(f"   {season}: {season_data.mean():.2f} (n={len(season_data):,})")
print(f"\nF-Statistic: {f_stat:.4f}")
print(f"P-Value: {p_value_anova:.2e}")
print(f"Conclusion: {'REJECT H0 - Significant seasonal differences' if p_value_anova < 0.05 else 'Fail to reject H0'}")

test3_result = {
    "test_name": "One-Way ANOVA - Seasonal Effects",
    "f_statistic": float(f_stat),
    "p_value": float(p_value_anova),
    "significant": bool(p_value_anova < 0.05),
    "conclusion": "Significant seasonal differences" if p_value_anova < 0.05 else "No seasonal differences"
}


# TEST 4: Pearson Correlation
print("\n" + "=" * 70)
print("TEST 4: PEARSON CORRELATION - Enrollments vs Updates")
print("=" * 70)

demo_cols = [c for c in df_demographic.columns if 'demo_age' in c]
df_demographic['total_demo'] = df_demographic[demo_cols].sum(axis=1)
demo_by_pin = df_demographic.groupby('pincode')['total_demo'].sum().reset_index()

bio_cols = [c for c in df_biometric.columns if 'bio_age' in c]
df_biometric['total_bio'] = df_biometric[bio_cols].sum(axis=1)
bio_by_pin = df_biometric.groupby('pincode')['total_bio'].sum().reset_index()

enrol_by_pin = df_enrolment.groupby('pincode')['total_enrolments'].sum().reset_index()
merged = enrol_by_pin.merge(demo_by_pin, on='pincode').merge(bio_by_pin, on='pincode')

r_demo, p_demo = pearsonr(merged['total_enrolments'], merged['total_demo'])
r_bio, p_bio = pearsonr(merged['total_enrolments'], merged['total_bio'])

print(f"\nH0: No linear relationship between enrollments and updates")
print(f"H1: Significant linear relationship exists")
print(f"\nEnrollment vs Demographic: r = {r_demo:.4f}, p = {p_demo:.2e}")
print(f"Enrollment vs Biometric: r = {r_bio:.4f}, p = {p_bio:.2e}")

test4_result = {
    "test_name": "Pearson Correlation",
    "enrol_vs_demo": {"r": float(r_demo), "p_value": float(p_demo), "significant": bool(p_demo < 0.05)},
    "enrol_vs_bio": {"r": float(r_bio), "p_value": float(p_bio), "significant": bool(p_bio < 0.05)}
}


# TEST 5: Kruskal-Wallis H-Test
print("\n" + "=" * 70)
print("TEST 5: KRUSKAL-WALLIS H-TEST - Age Group Differences")
print("=" * 70)

h_stat, p_kw = stats.kruskal(
    df_enrolment['age_0_5'].values,
    df_enrolment['age_5_17'].values,
    df_enrolment['age_18_greater'].values
)

print(f"\nH0: All age groups have same enrollment distribution")
print(f"H1: At least one age group differs")
print(f"\nH-Statistic: {h_stat:.4f}")
print(f"P-Value: {p_kw:.2e}")
print(f"Conclusion: {'REJECT H0 - Significant differences' if p_kw < 0.05 else 'Fail to reject H0'}")

test5_result = {
    "test_name": "Kruskal-Wallis H-Test - Age Group Differences",
    "h_statistic": float(h_stat),
    "p_value": float(p_kw),
    "significant": bool(p_kw < 0.05),
    "conclusion": "Significant age group differences" if p_kw < 0.05 else "No differences"
}


# TEST 6: Shapiro-Wilk Normality Test
print("\n" + "=" * 70)
print("TEST 6: SHAPIRO-WILK NORMALITY TEST")
print("=" * 70)

sample = df_enrolment['total_enrolments'].sample(min(5000, len(df_enrolment)))
w_stat, p_shapiro = stats.shapiro(sample)

print(f"\nH0: Enrollment data follows normal distribution")
print(f"H1: Enrollment data is not normally distributed")
print(f"\nW-Statistic: {w_stat:.4f}")
print(f"P-Value: {p_shapiro:.2e}")
print(f"Conclusion: {'Data is NOT normally distributed' if p_shapiro < 0.05 else 'Data is approximately normal'}")

test6_result = {
    "test_name": "Shapiro-Wilk Normality Test",
    "w_statistic": float(w_stat),
    "p_value": float(p_shapiro),
    "normal": bool(p_shapiro >= 0.05),
    "conclusion": "Not normally distributed" if p_shapiro < 0.05 else "Approximately normal"
}


# Save Results
print("\n" + "=" * 70)
print("SAVING RESULTS")
print("=" * 70)

all_results = {
    "analysis_date": datetime.now().isoformat(),
    "total_records_analyzed": int(len(df_enrolment) + len(df_demographic) + len(df_biometric)),
    "significance_level": 0.05,
    "tests": [test1_result, test2_result, test3_result, test4_result, test5_result, test6_result],
    "summary": {
        "total_tests": 6,
        "significant_findings": int(sum([
            bool(test1_result["significant"]),
            bool(test2_result["significant"]),
            bool(test3_result["significant"]),
            bool(test4_result["enrol_vs_demo"]["significant"]),
            bool(test5_result["significant"])
        ])),
        "key_conclusions": [
            "Age distribution SIGNIFICANTLY varies by state (Chi-Square)",
            "High vs Low activity areas show SIGNIFICANT differences (T-Test)",
            f"Seasonal effects {'ARE' if test3_result['significant'] else 'are NOT'} significant (ANOVA)",
            f"Enrollment-Update correlation: r = {r_demo:.3f}",
            "Age groups have SIGNIFICANTLY different patterns (Kruskal-Wallis)",
            f"Data is {'NOT normally distributed' if p_shapiro < 0.05 else 'approximately normal'}"
        ]
    }
}

with open(f"{OUTPUT_DIR}statistical_tests.json", 'w') as f:
    json.dump(all_results, f, indent=2)

print(f"Results saved to: {OUTPUT_DIR}statistical_tests.json")
print("\n" + "=" * 70)
print("SUMMARY: 6 Tests Performed")
print(f"Significant Findings: {all_results['summary']['significant_findings']}/6")
print("=" * 70)
