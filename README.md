<div align="center">

# ⚖️ The Tiebreaker

### An AI-assisted decision companion built through vibe coding with Google AI Studio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini-Google_AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

**Compare choices · Understand trade-offs · Break the deadlock**

</div>

> [!WARNING]
> This is only a **practice project** created while completing a Google AI Professionals course lab. It may contain bugs, errors, incomplete behavior, or inaccurate AI-generated results. It is not production-ready or an official Google product.

## 🌟 Overview

The Tiebreaker turns a difficult choice into a structured comparison. Describe a decision, provide two or more options, and optionally add your priorities, context, and time horizon. The app uses Gemini to generate weighted pros and cons, SWOT analyses, a comparison matrix, and a suggested verdict.

The purpose of this repository is to document the lab experience and demonstrate how a natural-language idea can become a working full-stack application through an AI-assisted development workflow.

## ✨ What It Can Do

| | Feature | What it provides |
|:---:|---|---|
| ⚖️ | **Weighted trade-offs** | Detailed pros and cons with impact scores |
| 📊 | **Comparison matrix** | Side-by-side ratings across important criteria |
| 🧭 | **SWOT analysis** | Strengths, weaknesses, opportunities, and threats |
| 💡 | **Tiebreaker verdict** | A suggested choice with reasoning and confidence |
| 🔀 | **Conditional guidance** | “Choose this if…” rules for different priorities |
| 🧠 | **Thought experiments** | Prompts that reveal preferences and blind spots |
| 🕘 | **Local history** | Saved decisions kept in the browser |
| 📝 | **Markdown export** | Structured results ready to copy and share |
| 🛟 | **Fallback mode** | A built-in analysis when Gemini is unavailable |

## 🔄 How It Works

```text
Decision + Options + Context
            ↓
      Express API route
            ↓
  Gemini structured analysis
            ↓
Pros & Cons · Matrix · SWOT · Verdict
            ↓
 React dashboard + local browser history
```

1. The React form collects the decision details.
2. The Express server creates a structured prompt without exposing the API key to the browser.
3. Gemini returns JSON that matches the decision-analysis schema.
4. The dashboard presents the result and saves it to local storage.
5. If the AI service is unavailable, the app returns a built-in fallback analysis.

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Interface | React 19, TypeScript, Tailwind CSS, Motion |
| Development | Vite |
| Server | Express, Node.js |
| AI | Google Gen AI SDK and Gemini |
| Persistence | Browser local storage |

## 🚀 Run Locally

### Requirements

- Node.js 20 or later
- Git
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/tasnimrimi/Vibe-Coding--Tie-breaker.git
cd Vibe-Coding--Tie-breaker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

Create a `.env` file from `.env.example` and replace the placeholder with your own key:

```env
GEMINI_API_KEY="your_api_key_here"
```

### 4. Start the app

```bash
npm run dev
```

Keep the development server running. Then, on the same computer, open `http://localhost:3000` in your browser.

> [!IMPORTANT]
> `localhost` is a local development address, not a public live-demo link. It only works after you run `npm run dev` on your computer.

## 📁 Project Structure

```text
Vibe-Coding--Tie-breaker/
├── src/
│   ├── components/       # Forms, dashboard, history, and export UI
│   ├── data/             # Preset decision examples
│   ├── App.tsx           # Main application state and view flow
│   └── types.ts          # Decision-analysis types
├── server.ts             # Express server and Gemini integration
├── metadata.json         # Google AI Studio app metadata
├── .env.example          # Environment-variable template
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 🎓 Learning Goals

- Practice prompt-driven and vibe-coded application development
- Explore Google AI Studio's app-building workflow
- Connect a React interface to Gemini through a server-side API
- Request and render structured JSON responses
- Turn a course-lab idea into a portfolio-ready repository

## 👩‍💻 Author

**Tasnim Akhter** · [GitHub](https://github.com/tasnimrimi)

---

<div align="center">

Built as a hands-on Google course lab to explore **vibe coding + Gemini** ✨

</div>
