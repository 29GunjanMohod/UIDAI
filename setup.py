#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
🇮🇳 AADHAAR INTELLIGENCE SYSTEM
================================
Behavioral Analytics Platform for 1.4 Billion Citizens
UIDAI Hackathon 2025-26

Installation:
    pip install -e .

Or with development dependencies:
    pip install -e ".[dev]"

Author: UIDAI Hackathon Team
License: MIT
"""

from setuptools import setup, find_packages
import os

# Read the README file
def read_readme():
    readme_path = os.path.join(os.path.dirname(__file__), 'README.md')
    if os.path.exists(readme_path):
        with open(readme_path, 'r', encoding='utf-8') as f:
            return f.read()
    return ""

# Read requirements.txt
def read_requirements():
    req_path = os.path.join(os.path.dirname(__file__), 'requirements.txt')
    if os.path.exists(req_path):
        with open(req_path, 'r', encoding='utf-8') as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    return []

setup(
    name="aadhaar-intelligence",
    version="1.0.0",
    author="UIDAI Hackathon Team",
    author_email="hackathon@uidai.gov.in",
    description="Behavioral Analytics Platform for Aadhaar - UIDAI Hackathon 2025-26",
    long_description=read_readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/uidai/aadhaar-intelligence",
    
    packages=find_packages(exclude=['tests', 'tests.*', 'notebooks', 'frontend']),
    
    python_requires=">=3.10",
    
    install_requires=[
        "pandas>=2.0.0",
        "numpy>=1.24.0",
        "plotly>=5.18.0",
        "scikit-learn>=1.3.0",
        "fastapi>=0.109.0",
        "uvicorn>=0.25.0",
    ],
    
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=4.0.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "mypy>=1.0.0",
            "jupyter>=1.0.0",
        ],
        "ml": [
            "tensorflow>=2.15.0",
            "keras>=3.0.0",
            "prefixspan>=0.5.2",
        ],
        "geo": [
            "folium>=0.15.0",
            "geopandas>=0.14.0",
        ],
        "all": [
            "tensorflow>=2.15.0",
            "keras>=3.0.0",
            "prefixspan>=0.5.2",
            "folium>=0.15.0",
            "geopandas>=0.14.0",
        ]
    },
    
    entry_points={
        "console_scripts": [
            "aadhaar-api=backend.api:main",
        ],
    },
    
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Framework :: FastAPI",
        "Intended Audience :: Government",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Natural Language :: English",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Scientific/Engineering :: Information Analysis",
    ],
    
    keywords=[
        "aadhaar", "uidai", "analytics", "fraud-detection", 
        "machine-learning", "government", "digital-india",
        "behavioral-analytics", "forecasting"
    ],
    
    project_urls={
        "Documentation": "https://github.com/uidai/aadhaar-intelligence#readme",
        "Source": "https://github.com/uidai/aadhaar-intelligence",
        "Bug Reports": "https://github.com/uidai/aadhaar-intelligence/issues",
        "UIDAI": "https://uidai.gov.in",
    },
    
    include_package_data=True,
    zip_safe=False,
)
