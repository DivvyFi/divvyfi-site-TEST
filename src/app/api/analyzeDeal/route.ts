import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      purchasePrice,
      revenue,
      expenses,
      sde,
      debtTerms,
      partners,
      investors,
      projectedGrowth,
      industry,
      location
    } = body;

    const prompt = `
You are DivvyFi's AI Deal Analyzer, a financial intelligence engine that evaluates business acquisitions.

Analyze the following business acquisition opportunity and return structured JSON:

### Deal Inputs
- Purchase Price: ${purchasePrice}
- Annual Revenue: ${revenue}
- Annual Expenses: ${expenses}
- SDE / EBITDA: ${sde}
- Debt Terms: ${JSON.stringify(debtTerms)}
- Partners: ${JSON.stringify(partners)}
- Investors: ${JSON.stringify(investors)}
- Projected Growth: ${projectedGrowth}
- Industry: ${industry}
- Location: ${location}

### Your Task:
Return a JSON object with this exact structure:

{
  "dealScore": number (0-100),
  "summary": string,
  "riskLevel": "Low" | "Medium" | "High",
  "profitability": {
    "annualCashflow": number,
    "monthlyCashflow": number,
    "roi": number,
    "paybackPeriodYears": number
  },
  "debtAnalysis": {
    "monthlyPayment": number,
    "interestRate": number,
    "dscr": number  // debt service coverage ratio
  },
  "partnerAnalysis": {
    "fairnessScore": number,
    "recommendedSplits": object,
    "conflictRisks": string[]
  },
  "investorReturns": {
    "annualizedReturn": number,
    "equityMultiple": number,
    "profitDistribution": object
  },
  "valuation": {
    "industryMultipleEstimate": number,
    "suggestedOfferPrice": number,
    "futureValuation5yr": number
  },
  "risks": string[],
  "recommendations": string[]
}

Respond ONLY with valid JSON.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1", // or "gpt-5" if available
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const result = completion.choices[0]?.message?.content;

    return NextResponse.json(JSON.parse(result));
  } catch (err: any) {
    console.error("Deal Analyzer API Error:", err);

    return NextResponse.json(
      { error: "Failed to analyze deal", details: err.message },
      { status: 500 }
    );
  }
}
