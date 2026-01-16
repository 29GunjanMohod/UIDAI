#!/usr/bin/env python
"""
Script to execute all notebooks sequentially using nbconvert API
"""
import os
import sys

# Add the current directory to the path
current_dir = r"c:\Users\Gunja\Desktop\Aadhar (UIDAI) HAckthon\aadhaar-intelligence"
os.chdir(current_dir)
sys.path.insert(0, current_dir)

from nbconvert import exporters
import nbformat

notebooks = [
    'notebooks/01_data_pipeline.ipynb',
    'notebooks/02_life_events.ipynb',
    'notebooks/04_anomaly_detection.ipynb',
    'notebooks/05_forecasting.ipynb'
]

print("Starting notebook execution...")

# Import the ExecutePreprocessor
from nbconvert.preprocessors import ExecutePreprocessor

for notebook_path in notebooks:
    print(f"\n{'='*80}")
    print(f"Running: {notebook_path}")
    print(f"{'='*80}")
    
    try:
        # Read the notebook
        with open(notebook_path, 'r', encoding='utf-8') as f:
            nb = nbformat.read(f, as_version=4)
        
        # Create an executor
        ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
        
        # Execute the notebook
        print(f"Executing {notebook_path}...")
        ep.preprocess(nb, {'metadata': {'path': os.path.dirname(notebook_path)}})
        
        # Write the executed notebook back
        output_path = notebook_path.replace('.ipynb', '_executed.ipynb')
        with open(output_path, 'w', encoding='utf-8') as f:
            nbformat.write(nb, f)
        
        print(f"✓ {notebook_path} completed successfully")
        print(f"  Output saved to: {output_path}")
        
    except Exception as e:
        print(f"✗ Error running {notebook_path}: {e}")
        import traceback
        traceback.print_exc()

print(f"\n{'='*80}")
print("All notebooks execution complete!")
print(f"{'='*80}")
