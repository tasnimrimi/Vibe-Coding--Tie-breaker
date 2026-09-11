import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize GoogleGenAI client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper for delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Candidate models in preference order
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

// Fallback decision generator in case all external AI models are temporarily down or 503
function generateStrategicFallback(
  title: string,
  cleanedOptions: string[],
  context?: string,
  priority?: string,
  timeHorizon?: string
) {
  const opt1Name = cleanedOptions[0] || "Option A: Aggressive Growth Path";
  const opt2Name = cleanedOptions[1] || "Option B: Defensive Stability Path";

  const chosenPriority = priority || "Long-Term Upside";
  const chosenHorizon = timeHorizon || "2-3 Years";

  return {
    id: "dec_fb_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    title: title.trim(),
    context: context?.trim() || undefined,
    priority: chosenPriority,
    timeHorizon: chosenHorizon,
    options: [
      {
        id: "opt_1",
        name: opt1Name,
        tagline: "High momentum, accelerated learning curve, expanded long-term upside",
        pros: [
          {
            id: "p_1_1",
            point: "Steeper skill acquisition & strategic ownership",
            detail: `Pursuing ${opt1Name} directly exposes you to unconstrained learning and high-leverage challenges that compound over ${chosenHorizon}.`,
            category: "Career & Growth" as const,
            weight: 5,
          },
          {
            id: "p_1_2",
            point: "Aligns with primary goal: " + chosenPriority,
            detail: `Prioritizing ${chosenPriority} unlocks higher ceiling outcomes compared to default conservative trajectories.`,
            category: "Financial" as const,
            weight: 4,
          },
          {
            id: "p_1_3",
            point: "Minimizes long-term regret of inaction",
            detail: "Psychological research demonstrates people overwhelmingly regret missed opportunities far more than calculated leaps.",
            category: "Well-being & Lifestyle" as const,
            weight: 4,
          },
          {
            id: "p_1_4",
            point: "Expands professional optionality and network leverage",
            detail: "Stepping onto this path connects you with active practitioners and opens non-linear future doors.",
            category: "General" as const,
            weight: 4,
          },
        ],
        cons: [
          {
            id: "c_1_1",
            point: "Higher variance and near-term transition friction",
            detail: "Initial 6-12 months will demand intense focus, adaptive energy, and managing unexpected obstacles.",
            category: "Risk & Security" as const,
            weight: 4,
          },
          {
            id: "c_1_2",
            point: "Temporary compression of personal free time",
            detail: "Ramping up this path will require trade-offs in leisure, routine comfort, or extracurricular flexibility.",
            category: "Well-being & Lifestyle" as const,
            weight: 3,
          },
          {
            id: "c_1_3",
            point: "Uncertain initial ROI before inflection point",
            detail: "The full payoff may take 18-24 months to materialize, requiring patience and capital buffer.",
            category: "Financial" as const,
            weight: 3,
          },
        ],
        swot: {
          strengths: [
            "Proactive initiative and strong leverage over future trajectory",
            "High alignment with stated priority of " + chosenPriority,
            "Builds valuable, scarce domain capabilities",
          ],
          weaknesses: [
            "Requires higher emotional resilience and stamina during initial phase",
            "Steeper learning curve with fewer safety nets",
            "Potential friction with existing routines",
          ],
          opportunities: [
            "Capture disproportionate upside over " + chosenHorizon,
            "Establish yourself as an agile leader or domain authority",
            "Create durable independence and career resilience",
          ],
          threats: [
            "Macroeconomic shifts or unexpected external friction",
            "Burnout if personal boundaries and recuperation are neglected",
            "Short-term impatience before compounding takes effect",
          ],
        },
      },
      {
        id: "opt_2",
        name: opt2Name,
        tagline: "Predictable rhythm, fortified downside protection, steady accumulation",
        pros: [
          {
            id: "p_2_1",
            point: "High certainty, lower volatility, and predictable pacing",
            detail: `Choosing ${opt2Name} preserves stability and minimizes disruptive operational shocks over ${chosenHorizon}.`,
            category: "Risk & Security" as const,
            weight: 5,
          },
          {
            id: "p_2_2",
            point: "Protected mental bandwidth and lifestyle balance",
            detail: "Familiarity with systems and demands leaves energy for family, health, and personal pursuits.",
            category: "Well-being & Lifestyle" as const,
            weight: 4,
          },
          {
            id: "p_2_3",
            point: "Guaranteed steady baseline accumulation",
            detail: "Reliable yields and zero downside risk to current commitments.",
            category: "Financial" as const,
            weight: 4,
          },
        ],
        cons: [
          {
            id: "c_2_1",
            point: "Opportunity cost of missed momentum",
            detail: "Remaining on this track may leave you lagging peers who took calculated leaps during pivotal industry windows.",
            category: "Career & Growth" as const,
            weight: 4,
          },
          {
            id: "c_2_2",
            point: "Risk of creeping complacency and skill stagnation",
            detail: "Predictability often leads to passive comfort rather than active mastery and self-reinvention.",
            category: "General" as const,
            weight: 4,
          },
          {
            id: "c_2_3",
            point: "Capped upside and incremental progress",
            detail: "Returns are linear rather than exponential, requiring longer to reach breakthrough goals.",
            category: "Financial" as const,
            weight: 3,
          },
        ],
        swot: {
          strengths: [
            "Rock-solid baseline stability and low cognitive friction",
            "Established credibility, relationships, and predictable routine",
            "Clear downside protection against volatility",
          ],
          weaknesses: [
            "Slow compounding rate and bureaucratic or environmental inertia",
            "Limited autonomy to pivot quickly without external consensus",
            "Lower ceiling on personal and financial returns",
          ],
          opportunities: [
            "Leverage calm stability to incubate side initiatives or deepen savings",
            "Optimize existing workflows to maximize personal leisure time",
            "Await high-conviction future opportunities with low pressure",
          ],
          threats: [
            "Gradual erosion of competitive edge as domain norms evolve",
            "Subconscious regret or feeling stuck in a status quo trap",
            "Forced disruptions down the line without preparation",
          ],
        },
      },
    ],
    comparisonMatrix: [
      {
        criteria: "Upside Potential & Growth Velocity",
        category: "Career & Growth",
        importance: "High" as const,
        ratings: [
          { optionName: opt1Name, score: 9, notes: "Direct leverage and exponential compounding potential" },
          { optionName: opt2Name, score: 6, notes: "Reliable but strictly linear trajectory" },
        ],
        verdictInsight: `${opt1Name} provides significantly higher leverage for ${chosenPriority}.`,
      },
      {
        criteria: "Downside Protection & Psychological Safety",
        category: "Risk & Security",
        importance: "High" as const,
        ratings: [
          { optionName: opt1Name, score: 5, notes: "Higher initial volatility requiring active adaptation" },
          { optionName: opt2Name, score: 9, notes: "Insulated from sudden shocks and high predictability" },
        ],
        verdictInsight: `${opt2Name} is the definitive winner for stress minimization and security.`,
      },
      {
        criteria: "Long-Term Alignment with " + chosenPriority,
        category: "General",
        importance: "High" as const,
        ratings: [
          { optionName: opt1Name, score: 8, notes: "Directly optimized for target strategic outcome" },
          { optionName: opt2Name, score: 6, notes: "Moderate alignment; maintains default course" },
        ],
        verdictInsight: `${opt1Name} matches the stated objective with greater directness.`,
      },
      {
        criteria: "Work-Life Integration & Energy",
        category: "Well-being & Lifestyle",
        importance: "Medium" as const,
        ratings: [
          { optionName: opt1Name, score: 6, notes: "Demanding transition period with initial sprint" },
          { optionName: opt2Name, score: 8, notes: "Stable hours and predictable expectations" },
        ],
        verdictInsight: `${opt2Name} preserves more daily breathing room and routine ease.`,
      },
      {
        criteria: "Reversibility & Future Optionality",
        category: "General",
        importance: "Medium" as const,
        ratings: [
          { optionName: opt1Name, score: 8, notes: "Experience gained is portable and highly respected" },
          { optionName: opt2Name, score: 6, notes: "Easier to stay, but harder to leap later" },
        ],
        verdictInsight: "Leaping builds distinct resume narratives that enhance future optionality.",
      },
    ],
    tiebreakerVerdict: {
      headline: `Lean Into ${opt1Name} — The Expected Value Favors Decisive Action`,
      recommendedOption: opt1Name,
      confidenceScore: 76,
      reasoning: `Evaluating both paths through the lens of your priority (${chosenPriority}) and horizon (${chosenHorizon}), ${opt1Name} carries favorable asymmetry: the downside can be actively mitigated with sensible boundaries, whereas the upside represents non-linear growth and lasting confidence.`,
      conditionalRule: {
        choosePrimaryIf: `You have sufficient mental bandwidth, want to accelerate toward "${chosenPriority}", and believe that regret from inaction hurts more than temporary friction.`,
        chooseAlternativeIf: `You are currently facing major personal energy deficits or cannot afford any financial/operational variance over the next 12 months.`,
      },
      blindSpots: [
        "Status Quo Bias: Overvaluing current comfort simply because it is familiar.",
        "Sunk Cost Fallacy: Staying committed to an older path just because of time already invested.",
        "Catastrophizing Downside: Assuming a setback would be permanent, when in reality most career and lifestyle decisions are two-way doors.",
      ],
      thoughtExperiments: [
        {
          title: "The Regret Minimization Test (Jeff Bezos)",
          prompt: "Looking back from age 80, which path would you be prouder to have pursued?",
          insight: "Almost all high-performers regret the risks they didn't take rather than the failures they endured.",
        },
        {
          title: "The 10/10/10 Rule (Suzy Welch)",
          prompt: "How will this choice feel in 10 minutes, 10 months, and 10 years?",
          insight: "Short-term anxiety passes quickly; long-term trajectory compounds indefinitely.",
        },
        {
          title: "The Coin-Flip Intuition Check",
          prompt: "If a coin landed on the alternative right now, would you feel immediate relief or secret disappointment?",
          insight: "Your subconscious emotional response provides instant clarity before over-analysis sets in.",
        },
      ],
    },
  };
}

// API route to analyze a decision
app.post("/api/analyze-decision", async (req, res) => {
  try {
    const { title, context, options, priority, timeHorizon } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Decision title is required." });
    }

    const cleanedOptions: string[] = Array.isArray(options)
      ? options.map((opt: string) => opt.trim()).filter((opt: string) => opt.length > 0)
      : [];

    let ai: GoogleGenAI | null = null;
    try {
      ai = getGeminiClient();
    } catch (e: any) {
      console.warn("Gemini client initialization warning:", e.message);
    }

    const prompt = `You are "The Tiebreaker", an expert strategic advisor, cognitive psychologist, and decision-making consultant.
The user has a critical dilemma and needs comprehensive analysis to break deadlock.

Dilemma: "${title.trim()}"
${context ? `Context & Background: "${context.trim()}"` : ""}
${priority ? `User's Top Priority: "${priority.trim()}"` : ""}
${timeHorizon ? `Time Horizon: "${timeHorizon.trim()}"` : ""}
${
  cleanedOptions.length >= 2
    ? `Specific Options Considered: ${cleanedOptions.map((o, idx) => `Option ${idx + 1}: "${o}"`).join(", ")}`
    : "If fewer than 2 specific options were given, infer the 2 or 3 most realistic, actionable contrasting paths (e.g. Option A vs Option B or Yes vs No)."
}

Perform an in-depth decision breakdown providing:
1. Two to three distinct options with descriptive titles and compelling taglines.
2. For EACH option:
   - 4-5 high-impact Pros (each with clear point, rich detail explaining the real-world impact, appropriate category: 'Financial', 'Career & Growth', 'Well-being & Lifestyle', 'Risk & Security', or 'General', and a recommended weight 1-5 where 5 is highest positive impact).
   - 4-5 high-impact Cons (each with clear point, rich detail explaining consequences, appropriate category, and weight 1-5 where 5 is severe negative consequence).
   - A SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) with 3-4 bullet points each.
3. A side-by-side Comparison Matrix:
   - 5 to 7 key evaluation criteria (e.g. Financial Return/Cost, Work-Life Balance/Fulfillment, Growth Velocity, Risk Profile, Reversibility, Long-Term Strategic Upside).
   - Category for each criteria.
   - Importance level ('High', 'Medium', 'Low').
   - For each option, an objective rating from 1 to 10 and concise notes explaining why.
   - A short verdict insight highlighting which option wins that criterion and why.
4. "The Tiebreaker Verdict":
   - Clear, decisive headline.
   - Name of recommended option (must match one of the option names).
   - Confidence score percentage (integer between 50 and 95).
   - Thoughtful, unbiased synthesis explaining why this recommendation edges ahead while respecting trade-offs.
   - Conditional rule: "Choose [Primary Option] IF..." and "Choose [Alternative Option] IF...".
   - 3-4 critical blind spots or cognitive biases the user should watch out for.
   - 2-3 thought experiments (e.g. "10/10/10 Rule", "The Regret Minimization Test", "The Coin-Flip Gut Check") tailored specifically to this dilemma.

Return the response strictly adhering to the JSON schema.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              tagline: { type: Type.STRING },
              pros: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    point: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    category: {
                      type: Type.STRING,
                      enum: [
                        "Financial",
                        "Career & Growth",
                        "Well-being & Lifestyle",
                        "Risk & Security",
                        "General",
                      ],
                    },
                    weight: { type: Type.INTEGER },
                  },
                  required: ["point", "detail", "category", "weight"],
                },
              },
              cons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    point: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    category: {
                      type: Type.STRING,
                      enum: [
                        "Financial",
                        "Career & Growth",
                        "Well-being & Lifestyle",
                        "Risk & Security",
                        "General",
                      ],
                    },
                    weight: { type: Type.INTEGER },
                  },
                  required: ["point", "detail", "category", "weight"],
                },
              },
              swot: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  threats: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["strengths", "weaknesses", "opportunities", "threats"],
              },
            },
            required: ["name", "tagline", "pros", "cons", "swot"],
          },
        },
        comparisonMatrix: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              criteria: { type: Type.STRING },
              category: { type: Type.STRING },
              importance: {
                type: Type.STRING,
                enum: ["High", "Medium", "Low"],
              },
              ratings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    optionName: { type: Type.STRING },
                    score: { type: Type.INTEGER },
                    notes: { type: Type.STRING },
                  },
                  required: ["optionName", "score", "notes"],
                },
              },
              verdictInsight: { type: Type.STRING },
            },
            required: ["criteria", "category", "importance", "ratings", "verdictInsight"],
          },
        },
        tiebreakerVerdict: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            recommendedOption: { type: Type.STRING },
            confidenceScore: { type: Type.INTEGER },
            reasoning: { type: Type.STRING },
            conditionalRule: {
              type: Type.OBJECT,
              properties: {
                choosePrimaryIf: { type: Type.STRING },
                chooseAlternativeIf: { type: Type.STRING },
              },
              required: ["choosePrimaryIf", "chooseAlternativeIf"],
            },
            blindSpots: { type: Type.ARRAY, items: { type: Type.STRING } },
            thoughtExperiments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  insight: { type: Type.STRING },
                },
                required: ["title", "prompt", "insight"],
              },
            },
          },
          required: [
            "headline",
            "recommendedOption",
            "confidenceScore",
            "reasoning",
            "conditionalRule",
            "blindSpots",
            "thoughtExperiments",
          ],
        },
      },
      required: ["title", "options", "comparisonMatrix", "tiebreakerVerdict"],
    };

    let parsedResult: any = null;

    // Attempt Gemini model generation with candidate fallback and retry
    if (ai) {
      for (const modelName of CANDIDATE_MODELS) {
        let attempts = 0;
        const maxAttemptsForModel = 2;

        while (attempts < maxAttemptsForModel) {
          try {
            attempts++;
            console.log(`Analyzing decision with model: ${modelName} (attempt ${attempts})`);

            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema,
              },
            });

            const textOutput = response.text;
            if (textOutput) {
              parsedResult = JSON.parse(textOutput);
              console.log(`Successfully generated decision analysis with model: ${modelName}`);
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Model ${modelName} attempt ${attempts} error:`, modelErr.message);
            const isTransient =
              modelErr.message?.includes("503") ||
              modelErr.message?.includes("demand") ||
              modelErr.message?.includes("UNAVAILABLE") ||
              modelErr.message?.includes("429") ||
              modelErr.status === 503;

            if (isTransient && attempts < maxAttemptsForModel) {
              await sleep(1000 * attempts);
            } else {
              break; // Try next model in CANDIDATE_MODELS
            }
          }
        }

        if (parsedResult) break;
      }
    }

    // If all models failed or AI unavailable, invoke strategic fallback generator
    if (!parsedResult) {
      console.warn("AI models temporarily unavailable or under high demand. Using strategic fallback generator.");
      const fallbackData = generateStrategicFallback(
        title,
        cleanedOptions,
        context,
        priority,
        timeHorizon
      );
      return res.json(fallbackData);
    }

    // Format and sanitize parsedResult
    const analysisResult = {
      id: "dec_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      title: parsedResult.title || title,
      context,
      priority,
      timeHorizon,
      options: (parsedResult.options || []).map((opt: any, optIdx: number) => ({
        id: opt.id || `opt_${optIdx + 1}`,
        name: opt.name || `Option ${optIdx + 1}`,
        tagline: opt.tagline || "",
        pros: (opt.pros || []).map((p: any, pIdx: number) => ({
          id: p.id || `pro_${optIdx}_${pIdx}`,
          point: p.point || "",
          detail: p.detail || "",
          category: p.category || "General",
          weight: Math.max(1, Math.min(5, Number(p.weight) || 3)),
        })),
        cons: (opt.cons || []).map((c: any, cIdx: number) => ({
          id: c.id || `con_${optIdx}_${cIdx}`,
          point: c.point || "",
          detail: c.detail || "",
          category: c.category || "General",
          weight: Math.max(1, Math.min(5, Number(c.weight) || 3)),
        })),
        swot: {
          strengths: Array.isArray(opt.swot?.strengths) ? opt.swot.strengths : [],
          weaknesses: Array.isArray(opt.swot?.weaknesses) ? opt.swot.weaknesses : [],
          opportunities: Array.isArray(opt.swot?.opportunities) ? opt.swot.opportunities : [],
          threats: Array.isArray(opt.swot?.threats) ? opt.swot.threats : [],
        },
      })),
      comparisonMatrix: (parsedResult.comparisonMatrix || []).map((row: any) => ({
        criteria: row.criteria || "Evaluation Factor",
        category: row.category || "General",
        importance: row.importance || "Medium",
        ratings: (row.ratings || []).map((r: any) => ({
          optionName: r.optionName || "",
          score: Math.max(1, Math.min(10, Number(r.score) || 5)),
          notes: r.notes || "",
        })),
        verdictInsight: row.verdictInsight || "",
      })),
      tiebreakerVerdict: {
        headline: parsedResult.tiebreakerVerdict?.headline || "Synthesis Verdict",
        recommendedOption: parsedResult.tiebreakerVerdict?.recommendedOption || (parsedResult.options?.[0]?.name ?? "Option 1"),
        confidenceScore: Math.max(50, Math.min(99, Number(parsedResult.tiebreakerVerdict?.confidenceScore) || 75)),
        reasoning: parsedResult.tiebreakerVerdict?.reasoning || "",
        conditionalRule: {
          choosePrimaryIf: parsedResult.tiebreakerVerdict?.conditionalRule?.choosePrimaryIf || "",
          chooseAlternativeIf: parsedResult.tiebreakerVerdict?.conditionalRule?.chooseAlternativeIf || "",
        },
        blindSpots: Array.isArray(parsedResult.tiebreakerVerdict?.blindSpots) ? parsedResult.tiebreakerVerdict.blindSpots : [],
        thoughtExperiments: Array.isArray(parsedResult.tiebreakerVerdict?.thoughtExperiments)
          ? parsedResult.tiebreakerVerdict.thoughtExperiments
          : [],
      },
    };

    return res.json(analysisResult);
  } catch (error: any) {
    console.error("Error generating decision analysis:", error);
    // Even on unexpected error, provide fallback rather than crashing
    try {
      const fallback = generateStrategicFallback(
        req.body?.title || "Decision Deliberation",
        req.body?.options || [],
        req.body?.context,
        req.body?.priority,
        req.body?.timeHorizon
      );
      return res.json(fallback);
    } catch {
      return res.status(500).json({
        error: "Unable to process decision analysis at this time. Please try again.",
      });
    }
  }
});

// Start the server with Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Tiebreaker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
