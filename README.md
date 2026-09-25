# Duct Loss Calculator

An intelligent HVAC duct fitting pressure loss calculator built with React, TypeScript, Vite, and Tailwind CSS. Estimate pressure drops and visualize system performance curves using ASHRAE database fitting methodologies.

## Features

- **ASHRAE-Based Calculations**: Round, rectangular, transitions, elbows, junctions, tees, dampers, and obstructions.
- **Fitting Diagrams**: Dynamic SVG visualization for fitting geometry and dimension validation.
- **System Resistance Curve**: Visual dynamic pressure vs. airflow charts with Recharts.
- **Project Schedule & Summary**: Track multiple duct segments and aggregate total pressure losses.
- **PDF Export**: Export engineering calculation schedules directly into PDF documents using `jspdf` and `jspdf-autotable`.
- **Preconfigured GitHub Actions CI/CD**: Automatic build and deployment to GitHub Pages via `.github/workflows/deploy.yml`.

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or 20+ recommended)
- `npm` (included with Node.js)

### Installation

1. Clone or extract the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the URL displayed in the terminal).

4. Build for production:
   ```bash
   npm run build
   ```
   Production output will be generated in the `dist/` directory.

## GitHub Pages Deployment

This project includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable automatic hosting on GitHub Pages:
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. Every push to the `main` branch will build and deploy the app automatically!
