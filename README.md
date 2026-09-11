# The Tiebreaker

An AI-assisted decision-making app created as a hands-on lab practice project for a Google AI Professionals course. The project was built with a vibe-coding workflow in Google AI Studio to explore how natural-language prompts can be turned into a working application.

> **Educational project:** This repository is an independent course and lab exercise. It is not an official Google product and is not endorsed or maintained by Google.

## About the lab

The goal of the lab was to practice AI-assisted app development by building a tool that helps break a deadlock between competing choices. A user describes a decision, adds two or more options, and can include context, priorities, and a time horizon. The app then produces a structured analysis to make the trade-offs easier to compare.

## Features

- Weighted pros and cons for each option
- Side-by-side comparison matrix
- SWOT analysis
- A suggested tiebreaker verdict with a confidence score
- Conditional guidance and thought experiments
- Preset examples for exploring the interface
- Decision history stored locally in the browser
- Markdown export
- Built-in fallback analysis when the Gemini service is unavailable

## Tech stack

- React 19 and TypeScript
- Vite
- Express
- Tailwind CSS
- Google Gen AI SDK (Gemini)

## Run locally

### Prerequisites

- Node.js 20 or later
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tasnimrimi/Vibe-Coding--Tie-breaker.git
   cd Vibe-Coding--Tie-breaker
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example` and add your Gemini API key:

   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## Privacy and API-key notes

- Keep `.env` private and never commit a real API key.
- When Gemini is available, decision details entered into the app are sent to the Gemini API for analysis.
- Saved decision history is stored in the browser's local storage.
- This repository does not contain a setting that grants Google AI Studio access to other GitHub repositories. GitHub App access must be reviewed separately in your GitHub account settings.

## Project context

This repository documents a learning exercise: experimenting with vibe coding, prompt-driven development, and Gemini integration during a Google course lab. It is intended for practice and portfolio documentation rather than production decision-making.
