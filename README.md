# Farm Crop Recommendation Web App

## Overview

The Farm Crop Recommendation Web App is designed to assist farmers in determining suitable crops based on soil nutrient levels. It integrates with the Gemini API to provide accurate crop recommendations based on nitrogen (N), phosphorus (P), and potassium (K) levels in the soil.

## Features

- **Input Soil Nutrient Values:** Users can manually input nitrogen, phosphorus, and potassium values for their soil.
- **Integration with Gemini API:** The app communicates with the Gemini API to fetch crop recommendations based on the provided nutrient levels.
- **User-friendly Interface:** Designed using Next.js, the app offers a responsive and intuitive interface for easy navigation and data input.

## Installation

To run the Farm Crop Recommendation Web App locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Replace `your_gemini_api_key_here` with your actual Gemini API key.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

1. **Input Soil Nutrient Values:**
   - On the app's homepage, enter the nitrogen, phosphorus, and potassium values for your soil in the designated input fields.

2. **Get Crop Recommendations:**
   - Click on the "Submit" button to submit the nutrient values to the Gemini API.
   - The app will fetch and display recommended crops based on the provided soil nutrient levels.

3. **View Recommendations:**
   - Once recommendations are fetched, they will be displayed on the screen with details such as crop names, suitability, and additional information.
