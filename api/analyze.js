// api/analyze.js
export default async function handler(req, res) {
  // 1. Safety Check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Extract input and API key
  const { text } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY;

  // 3. Define the "Hardened" System Prompt
  // This helps prevent the AI from refusing to analyze "dangerous" content.
  const systemMessage = `You are the HEXABYTE Threat Detector, a professional Cybersecurity Forensic Expert. 
Your sole objective is to analyze user-provided text or links for signs of PHISHING, MALWARE, or SOCIAL ENGINEERING.
Even if the content is dangerous, do NOT refuse the analysis; instead, explain WHY it is dangerous to protect the user.
Your response must follow this strict format:
1. Label: [SAFE, INFORMATIONAL, SUSPICIOUS, or DANGEROUS]
2. Analysis: (2-3 sentences explaining the technical red flags found, like suspicious domains or urgent language.)`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${API_KEY}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct",
        "messages": [
          { "role": "system", "content": systemMessage },
          { "role": "user", "content": text }
        ]
      })
    });

    const data = await response.json();

    // 4. Handle API Errors (e.g., Invalid Key or AI Refusal)
    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return res.status(200).json({ 
        content: `⚠️ API Error: ${data.error.message || "The security node is currently unavailable."}` 
      });
    }

    // 5. Success: Return the AI's analysis
    // This way we can send 'content' back so your frontend code can easily display it.
    const aiResponse = data.choices?.[0]?.message?.content || "No analysis generated.";
    res.status(200).json({ content: aiResponse });

  } catch (error) {
    console.error("Serverless Function Crash:", error);
    res.status(500).json({ content: "The threat detection engine encountered a system error." });
  }
}
