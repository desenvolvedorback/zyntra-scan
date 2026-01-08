# **App Name**: Zyntra Scan

## Core Features:

- URL Input: Accepts a URL from the user via a text input field on the homepage.
- Site Analysis: Performs passive analysis of a given website, extracting the HTTP status, response time, HTTPS status, SSL certificate validity, security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options), and detects redirects.
- Link Suspicion Check: Analyzes the provided URL for suspicious characteristics, such as shortened URLs, direct IP usage, missing HTTPS, multiple redirects, and suspicious words in the path; classifies the risk level (Low, Medium, High).
- Report Generation: Generates a report summarizing the findings from the site and link analysis, displayed on a dedicated report page.
- Risk Indicators: Provides visual indicators representing the risk level (low, medium, high) determined during link analysis within the report.
- Detailed Information Display: Presents the extracted technical information and analysis results in an organized and accessible format on the report page.

## Style Guidelines:

- Primary color: Dark blue (#003049) to evoke trust and security.
- Background color: Light blue (#D4EDF2) for a clean and accessible feel.
- Accent color: Black (#000000) for important information and to contrast with the light background.
- Body and headline font: 'Inter', a sans-serif, for a clean, modern, readable design.
- Use clear, simple icons to represent different security aspects and risk levels.
- Clean and functional layout with clear sections for URL input and report display.