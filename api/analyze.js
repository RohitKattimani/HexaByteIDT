// api/analyze.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY; // Pulled from Vercel settings ig lemme check

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
          { "role": "system", "content": "You are HEXABYTE Threat Detector. Analyze input. Label it as SAFE, INFORMATIONAL, SUSPICIOUS, or DANGEROUS. Be professional and concise." },
          { "role": "user", "content": text }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
