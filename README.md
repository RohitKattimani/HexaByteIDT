# HEXABYTE | Cyber Intelligence Hub

> *"Knowledge is defense. Defense is survival."*

HEXABYTE is an advanced **cybersecurity awareness platform** designed to train the public in spotting digital threats. By combining **randomized security simulations** with a **Llama 3.1 AI-powered heuristic engine**, HEXABYTE transforms passive learning into active defense.

---

## Key Features

- **Threat Detector**  
  Deep-scan analysis powered by **Meta’s Llama 3.1 8B Instruct model**. Detects psychological manipulation and malicious intent in emails or links.

- **Security Simulation**  
  Randomized **5-question quiz engine** drawn from a master database of **40+ real-world cybersecurity scenarios** (Phishing, Social Engineering, Network Security).

- **Safety Scoring**  
  Instant feedback with remediation advice. Users discover their personal **Security IQ** and learn corrective strategies.

- **Cyber-Gothic UI**  
  Responsive interface built with **Bootstrap 5**, styled in a **Neon-Dark aesthetic** with Glassmorphism effects.

---

## 🛠️ Tech Stack

| Layer       | Tools & Frameworks |
|-------------|--------------------|
| **Frontend** | HTML5, CSS3 (Custom Glassmorphism), JavaScript (ES6+) |
| **Styling**  | Bootstrap 5, Font Awesome 6 |
| **Fonts**    | JetBrains Mono (terminal feel), Space Grotesk |
| **AI Engine**| Llama 3.1 8B via OpenRouter API |
| **Backend**  | Vercel Serverless Functions (Node.js) |
| **Deployment** | Vercel |

---

## Architecture & Security

HEXABYTE is built with **serverless security-first architecture**:

1. Client sends the *threat payload* → `/api/analyze`.
2. API Key stored securely as an **Environment Variable** on the server.
3. Server communicates with **OpenRouter**, returns only the AI’s analysis.
4. **Result:** API Key is never exposed to the browser or dev tools.

---

## Getting Started

### Prerequisites
- An **OpenRouter API Key**
- Vercel CLI *(local testing)*

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hexabyte.git
cd hexabyte

# Set up environment variables
echo "OPENROUTER_API_KEY=your_secret_key_here" > .env

# Local Testing (Vercel Dev)
vercel dev
