import { DecisionAnalysis } from "../types";

export const PRESET_DECISIONS: DecisionAnalysis[] = [
  {
    id: "preset_startup_vs_corporate",
    createdAt: "2026-09-10T10:00:00.000Z",
    title: "Join an Early-Stage AI Startup vs. Stay at Established Tech Giant",
    context: "Mid-level software engineer with 5 years experience. Off-market startup offer with 1.2% equity and competitive base, versus stable promotion track, great health benefits, and 401k match at current enterprise employer.",
    priority: "Long-term career velocity & upside",
    timeHorizon: "2-3 Years",
    options: [
      {
        id: "opt_startup",
        name: "Join AI Startup",
        tagline: "High leverage, rapid learning curve, asymmetric equity upside",
        pros: [
          {
            id: "p1",
            point: "Steepest learning curve & broad technical ownership",
            detail: "You will directly architect systems, make product decisions, and wear multiple hats, compressing 5 years of senior experience into 18 months.",
            category: "Career & Growth",
            weight: 5,
          },
          {
            id: "p2",
            point: "Substantial equity upside if the startup succeeds",
            detail: "A 1.2% grant at seed/Series A offers life-changing upside if the company hits product-market fit or reaches acquisition.",
            category: "Financial",
            weight: 4,
          },
          {
            id: "p3",
            point: "Flat organizational hierarchy and rapid execution",
            detail: "Zero bureaucracy and minimal meeting overhead; features ship to real customers in days instead of quarterly review cycles.",
            category: "Well-being & Lifestyle",
            weight: 4,
          },
          {
            id: "p4",
            point: "High-caliber network of founders and early operators",
            detail: "Working alongside venture-backed founders connects you to an elite tier of angel investors and future startup collaborators.",
            category: "Career & Growth",
            weight: 4,
          },
        ],
        cons: [
          {
            id: "c1",
            point: "18-24 month runway risk and high failure rate",
            detail: "If subsequent funding rounds stall or market conditions tighten, the company may need down-rounds or layoffs.",
            category: "Risk & Security",
            weight: 5,
          },
          {
            id: "c2",
            point: "Demanding pace with unpredictable work hours",
            detail: "Early-stage milestones demand irregular schedules, weekend alerts, and potential burnout if boundaries aren't guarded.",
            category: "Well-being & Lifestyle",
            weight: 4,
          },
          {
            id: "c3",
            point: "Illiquid compensation and modest cash perks",
            detail: "No 401k match, higher healthcare copays, and paper equity that cannot be cashed out for 4-7 years.",
            category: "Financial",
            weight: 3,
          },
        ],
        swot: {
          strengths: [
            "Massive autonomy and direct influence on company direction",
            "High density of ambitious talent with zero red tape",
            "Speed of product iteration and modern tech stack",
          ],
          weaknesses: [
            "Lack of formal mentorship or structured managerial support",
            "Fragile operational processes and shifting product specs",
            "Compensation heavily tilted toward unvested paper equity",
          ],
          opportunities: [
            "Grow into Head of Engineering or VP as headcount expands",
            "Define the core proprietary architecture from day one",
            "Build an undeniable resume narrative of early technical leadership",
          ],
          threats: [
            "Macro venture winter or aggressive competition from incumbents",
            "Co-founder friction or pivot away from original mission",
            "Sudden dilution in down-rounds or acqui-hire fire sale",
          ],
        },
      },
      {
        id: "opt_corporate",
        name: "Stay at Tech Giant",
        tagline: "Predictable promotion, top-tier compensation, high stability",
        pros: [
          {
            id: "p1",
            point: "Predictable, liquid total compensation & benefits",
            detail: "Reliable RSUs, guaranteed cash bonuses, 50% 401k match, and comprehensive family health and mental wellness coverage.",
            category: "Financial",
            weight: 5,
          },
          {
            id: "p2",
            point: "Clear senior promotion pathway with structured milestones",
            detail: "Upcoming performance cycle has you on track for Senior Software Engineer with a clear rubric and sponsor.",
            category: "Career & Growth",
            weight: 4,
          },
          {
            id: "p3",
            point: "Defensible work-life balance and psychological safety",
            detail: "Strict 40-hour expectations, ample PTO, and dedicated on-call rotations prevent chronic fatigue.",
            category: "Well-being & Lifestyle",
            weight: 5,
          },
          {
            id: "p4",
            point: "Deep prestige brand on resume",
            detail: "Top-tier enterprise logo provides lifelong credibility when interviewing anywhere in the world.",
            category: "General",
            weight: 3,
          },
        ],
        cons: [
          {
            id: "c1",
            point: "Slower organizational velocity and political bureaucracy",
            detail: "Months spent in cross-functional committee alignment, compliance sign-offs, and legacy pipeline maintenance.",
            category: "Career & Growth",
            weight: 4,
          },
          {
            id: "c2",
            point: "Narrow scope of technical ownership (a cog in the machine)",
            detail: "Specialization leads to working on isolated microservices rather than full system design from scratch.",
            category: "Career & Growth",
            weight: 4,
          },
          {
            id: "c3",
            point: "Golden handcuffs and risk aversion",
            detail: "Gradual vesting schedules make it psychologically harder to take entrepreneurial leaps as compensation climbs.",
            category: "Risk & Security",
            weight: 3,
          },
        ],
        swot: {
          strengths: [
            "Rock-solid balance sheet, immense compute infrastructure, resilient perks",
            "Established brand and deep domain experts to consult",
            "Consistent work hours with little emergency weekend churn",
          ],
          weaknesses: [
            "Inertia around legacy tech choices and compliance reviews",
            "Impact is diluted across thousands of global team members",
            "Promotion velocity capped by rigid cycle calibrations",
          ],
          opportunities: [
            "Transfer internally to high-growth AI research or product initiatives",
            "Maximize 401k and liquid RSU savings to build personal financial moat",
            "Lead large distributed project squads as a Senior Staff track",
          ],
          threats: [
            "Corporate restructuring or shifting organizational priorities",
            "Gradual skill atrophy regarding modern zero-to-one tooling",
            "Boredom and creeping career dissatisfaction",
          ],
        },
      },
    ],
    comparisonMatrix: [
      {
        criteria: "Skill Growth & Learning Speed",
        category: "Career & Growth",
        importance: "High",
        ratings: [
          { optionName: "Join AI Startup", score: 9, notes: "Forced full-stack problem solving every day" },
          { optionName: "Stay at Tech Giant", score: 6, notes: "Deep specialized skills, but narrower domain" },
        ],
        verdictInsight: "Startup wins decisively on multi-dimensional growth and autonomy.",
      },
      {
        criteria: "Total Financial Upside (Expected Value)",
        category: "Financial",
        importance: "High",
        ratings: [
          { optionName: "Join AI Startup", score: 7, notes: "Very high ceiling, but median outcome is zero equity" },
          { optionName: "Stay at Tech Giant", score: 8, notes: "Liquid RSUs beat 90% of startup exits on risk-adjusted basis" },
        ],
        verdictInsight: "Corporate wins on guaranteed cash, but startup holds generational ceiling.",
      },
      {
        criteria: "Work-Life Balance & Health",
        category: "Well-being & Lifestyle",
        importance: "Medium",
        ratings: [
          { optionName: "Join AI Startup", score: 4, notes: "Intense deadlines and small team coverage" },
          { optionName: "Stay at Tech Giant", score: 9, notes: "Generous PTO, flexible hybrid policy, protected weekends" },
        ],
        verdictInsight: "Corporate offers substantially superior psychological and physical breathing room.",
      },
      {
        criteria: "Job Security & Downside Protection",
        category: "Risk & Security",
        importance: "High",
        ratings: [
          { optionName: "Join AI Startup", score: 3, notes: "Dependent on VC funding cycles and product adoption" },
          { optionName: "Stay at Tech Giant", score: 8, notes: "Insulated by multi-billion dollar enterprise revenue" },
        ],
        verdictInsight: "Corporate is dramatically safer against macro-economic headwinds.",
      },
      {
        criteria: "Daily Agency & Bureaucracy Absence",
        category: "General",
        importance: "Medium",
        ratings: [
          { optionName: "Join AI Startup", score: 9, notes: "Decide at 9am, test by lunch, ship by 5pm" },
          { optionName: "Stay at Tech Giant", score: 4, notes: "Multiple design docs, RFC reviews, and sign-offs" },
        ],
        verdictInsight: "Startup is unmatched for developers who thrive on uninhibited building.",
      },
    ],
    tiebreakerVerdict: {
      headline: "Take the Startup Leap — Your Career Window Is Prime",
      recommendedOption: "Join AI Startup",
      confidenceScore: 78,
      reasoning: "At 5 years of engineering experience, you have established your fundamental technical toolkit and enterprise resume credentials. The downside of the startup is easily capped (you can always return to corporate tech with an even stronger senior pitch), whereas the upside in career velocity, ownership, and equity participation during an AI inflection is asymmetric.",
      conditionalRule: {
        choosePrimaryIf: "You are energized by ambiguity, have at least 6 months of living expenses saved in emergency funds, and value exponential career velocity over guaranteed incremental raises.",
        chooseAlternativeIf: "You have major upcoming financial commitments (e.g. buying a home next year, new dependent) or are currently experiencing burnout and need recuperation.",
      },
      blindSpots: [
        "Overestimating startup equity valuation before checking liquidation preferences and dilution.",
        "Underestimating the mental fatigue of perpetual context switching in early-stage engineering.",
        "Believing you cannot return to big tech: corporate recruiters actively covet engineers with real startup execution scars.",
      ],
      thoughtExperiments: [
        {
          title: "The Regret Minimization Test (Jeff Bezos)",
          prompt: "Picture yourself at age 80 looking back on your 30s. Which decision would trigger deeper regret?",
          insight: "Most people regret paths not explored (omission) far more than calculated gambles that didn't pan out (commission).",
        },
        {
          title: "The 10/10/10 Rule (Suzy Welch)",
          prompt: "How will you feel about this choice in 10 minutes, 10 months, and 10 years?",
          insight: "In 10 minutes you'll feel anxious. In 10 months you will have learned tremendous skills. In 10 years you'll remember the boldness.",
        },
        {
          title: "The Coin-Flip Gut Check",
          prompt: "If a coin assigned you to Corporate right now, do you feel instant relief or a twinge of disappointment?",
          insight: "The emotional reaction while the coin is in the air reveals your subconscious verdict faster than spreadsheets.",
        },
      ],
    },
  },
  {
    id: "preset_buy_vs_rent",
    createdAt: "2026-09-09T14:30:00.000Z",
    title: "Buy a Home in the Suburbs vs. Rent in the City & Invest the Difference",
    context: "Young couple considering buying a $650,000 single-family house with 15% down at 6.2% mortgage, versus renting a 2-bedroom city apartment for $2,800/mo and dollar-cost averaging the $97,500 down payment and maintenance gap into global index funds.",
    priority: "Financial independence & geographic flexibility",
    timeHorizon: "5-7 Years",
    options: [
      {
        id: "opt_buy",
        name: "Buy Suburban Home",
        tagline: "Forced savings, permanent stability, personalization freedom",
        pros: [
          {
            id: "p1",
            point: "Fixed housing cost hedge against inflation",
            detail: "Your principal and interest payment remains locked for 30 years while market rents trend upward annually.",
            category: "Financial",
            weight: 4,
          },
          {
            id: "p2",
            point: "Emotional sanctuary and unconditional customization",
            detail: "Renovate, landscape, paint, and adopt pets without landlord restrictions or annual lease renewal anxieties.",
            category: "Well-being & Lifestyle",
            weight: 5,
          },
          {
            id: "p3",
            point: "Forced wealth accumulation via principal paydown",
            detail: "Every monthly mortgage payment builds illiquid equity that would otherwise be spent on rent.",
            category: "Financial",
            weight: 4,
          },
        ],
        cons: [
          {
            id: "c1",
            point: "Substantial non-recoverable phantom costs",
            detail: "Property taxes, homeowner insurance, HOA fees, mortgage interest, and the 1-2% annual maintenance rule are unrecoverable expenses.",
            category: "Financial",
            weight: 5,
          },
          {
            id: "c2",
            point: "Severe geographic lock-in and high transaction friction",
            detail: "Selling a house costs 6-8% in agent commissions and closing fees; moving for career opportunities requires months of friction.",
            category: "Career & Growth",
            weight: 4,
          },
          {
            id: "c3",
            point: "Capital concentration risk in a single asset",
            detail: "A large portion of personal net worth becomes concentrated in one physical zip code and structure.",
            category: "Risk & Security",
            weight: 4,
          },
        ],
        swot: {
          strengths: [
            "Tangible physical security and generational nesting space",
            "Access to suburban yard, community roots, and dedicated home office",
            "Leveraged appreciation on the full $650k asset value",
          ],
          weaknesses: [
            "High upfront capital drain ($97k down + closing costs)",
            "Weekend time absorbed by DIY chores and contractor repairs",
            "Illiquid equity that cannot easily be reallocated",
          ],
          opportunities: [
            "Refinance if interest rates soften over the next 3-5 years",
            "Add value through strategic kitchen or energy efficiency renovations",
            "Long-term conversion into a rental property later in life",
          ],
          threats: [
            "Local property tax reassessments and skyrocketing insurance premiums",
            "Unexpected high-ticket repairs (HVAC failure, roof replacement)",
            "Suburban neighborhood stagnation or traffic commute degradation",
          ],
        },
      },
      {
        id: "opt_rent_invest",
        name: "Rent & Invest Difference",
        tagline: "Liquid wealth, zero maintenance stress, total geographic agility",
        pros: [
          {
            id: "p1",
            point: "Total lifestyle mobility and zero repair obligations",
            detail: "A leaking roof or broken refrigerator is a 10-second maintenance ticket solved by management on their dime.",
            category: "Well-being & Lifestyle",
            weight: 5,
          },
          {
            id: "p2",
            point: "Historically superior compound returns in diversified equities",
            detail: "Investing $100k plus the monthly cashflow surplus into broad market index funds historically outpaces residential home price appreciation.",
            category: "Financial",
            weight: 5,
          },
          {
            id: "p3",
            point: "Vibrant city walkability and short commutes",
            detail: "Walk to dinners, cultural events, gyms, and transit without enduring 45-minute highway commutes.",
            category: "Well-being & Lifestyle",
            weight: 4,
          },
        ],
        cons: [
          {
            id: "c1",
            point: "Subject to landlord discretion and lease terminations",
            detail: "Risk of sudden rent increases or non-renewal if the landlord decides to sell or renovate the building.",
            category: "Risk & Security",
            weight: 4,
          },
          {
            id: "c2",
            point: "Psychological feeling of 'dead money' and space constraints",
            detail: "Smaller square footage, shared walls, and lack of private yard space for outdoor projects.",
            category: "Well-being & Lifestyle",
            weight: 3,
          },
          {
            id: "c3",
            point: "Requires ironclad discipline to actually invest the surplus",
            detail: "If the difference between renting and owning is casually spent on lifestyle inflation rather than invested, wealth lags.",
            category: "Financial",
            weight: 4,
          },
        ],
        swot: {
          strengths: [
            "Maximum liquidity: portfolio can be rebalanced or cashed in seconds",
            "Predictable maximum housing cost (rent is the maximum you pay; mortgage is the minimum)",
            "Freedom to pursue jobs in any city or country on short notice",
          ],
          weaknesses: [
            "No collateral to borrow against at preferential mortgage rates",
            "Annual uncertainty regarding rent renewals",
            "Noise transfer from neighboring tenants",
          ],
          opportunities: [
            "Exploit career relocation opportunities that require moving to high-opportunity cities",
            "Pounce on real estate downturns with cash reserves when conditions are favorable",
            "Compound equity tax-advantaged through retirement accounts",
          ],
          threats: [
            "Runaway municipal rent increases without rent control caps",
            "Lifestyle creep eroding the monthly investment discipline",
            "Missing out on rapid local real estate appreciation runs",
          ],
        },
      },
    ],
    comparisonMatrix: [
      {
        criteria: "Long-Term Net Worth Trajectory",
        category: "Financial",
        importance: "High",
        ratings: [
          { optionName: "Buy Suburban Home", score: 7, notes: "Solid 3-4% historical real growth + leverage" },
          { optionName: "Rent & Invest Difference", score: 9, notes: "Global equities historically generate 7-8% real CAGR" },
        ],
        verdictInsight: "Renting and investing the spread wins financially if discipline is maintained.",
      },
      {
        criteria: "Lifestyle Control & Emotional Peace",
        category: "Well-being & Lifestyle",
        importance: "High",
        ratings: [
          { optionName: "Buy Suburban Home", score: 9, notes: "Unchallenged kingdom, custom design, yard privacy" },
          { optionName: "Rent & Invest Difference", score: 6, notes: "Limited renovation rights, landlord oversight" },
        ],
        verdictInsight: "Home ownership wins for psychological nesting and family stability.",
      },
      {
        criteria: "Career & Geographic Agility",
        category: "Career & Growth",
        importance: "Medium",
        ratings: [
          { optionName: "Buy Suburban Home", score: 4, notes: "Expensive transaction costs create severe lock-in" },
          { optionName: "Rent & Invest Difference", score: 9, notes: "Notice period is 30-60 days to move anywhere" },
        ],
        verdictInsight: "Renting provides unmatched adaptability to seize emerging opportunities.",
      },
      {
        criteria: "Maintenance Overhead & Stress",
        category: "Well-being & Lifestyle",
        importance: "Medium",
        ratings: [
          { optionName: "Buy Suburban Home", score: 4, notes: "Weekends spent mowing, cleaning gutters, hiring trades" },
          { optionName: "Rent & Invest Difference", score: 9, notes: "Zero maintenance burden, simply call the super" },
        ],
        verdictInsight: "Renting preserves free time and removes sudden financial shocks.",
      },
    ],
    tiebreakerVerdict: {
      headline: "Rent & Invest for 2 More Years — Retain Your Agility",
      recommendedOption: "Rent & Invest Difference",
      confidenceScore: 74,
      reasoning: "Given your stated priority of financial independence and geographic flexibility over a 5-7 year horizon, buying at current borrowing rates with high transaction friction carries disproportionate opportunity cost. Renting gives you peak optionality to invest liquid capital while waiting for clearer career anchors.",
      conditionalRule: {
        choosePrimaryIf: "You value career mobility, want your capital compounding in liquid markets, and don't yet have children enrolled in a specific school district.",
        chooseAlternativeIf: "You are confident you will remain in this exact geographic submarket for at least 7-10 years and crave the pride and creative sovereignty of owning your home.",
      },
      blindSpots: [
        "Treating a primary residence as an 'investment' rather than a leveraged lifestyle luxury with high carrying costs.",
        "Failing to automate investments: the 'rent and invest' strategy only works if the surplus is automatically transferred to index funds on the 1st of every month.",
        "Underestimating the 6% seller fee and 2% buyer closing costs when calculating break-even horizons.",
      ],
      thoughtExperiments: [
        {
          title: "The 5-Year Break-Even Calculation",
          prompt: "If a dream job or family need arose 3 years from now requiring a move, would you be comfortable losing $45,000 in closing costs?",
          insight: "If your horizon in the home is under 5-7 years, transaction fees almost always wipe out equity gains.",
        },
        {
          title: "The Weekend Time-Audit",
          prompt: "Do you genuinely enjoy home improvement projects and yard work, or do you view them as chores that steal personal time?",
          insight: "A house is both a financial asset and an unpaid second job as a property manager.",
        },
      ],
    },
  },
];
