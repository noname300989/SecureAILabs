# SecureFlow AI Security Labs

**Vulnerable Labs + Prevention Labs + Training + Certification**

A dual-lab AI security platform designed to teach how AI systems fail—and how to secure them—without real exploitation. Built for the **Google Antigravity** environment.

## �️ Manual Installation Guide

Follow these steps to set up the lab environment entirely manually, without AI assistance or automated scripts.

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **Git**
- *(Optional but Recommended)* **Burp Suite Community Edition** (for Expert Labs)

### 2. Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/SecureAILabs.git
   cd SecureAILabs
   ```

2. **Install Dependencies**
   Install all necessary packages for both frontend (Vite) and backend (Express).
   ```bash
   npm install
   ```
   *Note: This will install `vite`, `express`, `cors`, and `body-parser`.*

### 3. Running the Application

The application consists of two parts: a **Frontend Client** and a **Vulnerable Backend API**. You need to run **both** for full functionality.

#### A. Start the Backend Server
This server handles the API logic, flag validation, and vulnerability simulation logic.
1. Open a new terminal window.
2. Navigate to the project root.
3. Run the server:
   ```bash
   node server/server.js
   ```
   *You should see: `SecureFlow Vulnerable Server running on http://localhost:3000`*

#### B. Start the Frontend
This launches the React/Vanilla JS interface.
1. Open a second terminal window.
2. Navigate to the project root.
3. Run the development server:
   ```bash
   npm run dev
   ```
   *You should see: `Local: http://localhost:5173/`*

4. **Access the Lab**: Open your browser and go to `http://localhost:5173`.

### 4. Expert Lab Configuration (Burp Suite)

To solve the **Expert API Interception** labs, you need to intercept traffic between the Frontend (Port 5173) and Backend (Port 3000).

1. **Open Burp Suite** and go to the **Proxy** tab.
2. **Turn Intercept ON**.
3. **Configure Browser Proxy**: Set your browser to proxy HTTP traffic through `127.0.0.1:8080` (Burp default).
4. **Trigger Request**: In the lab dashboard, click the **"Send Request"** button.
5. **Intercept & Modify**:
   - The request will appear in Burp.
   - Modify the parameters (e.g., change `role: "user"` to `role: "system"`).
   - Forward the request.
6. **Observe Result**: The modified response (and flag) will appear in the web dashboard.

## 🏗️ Architecture Overview

SecureFlow is built as a minimal, educational platform with a clear separation of concerns:

1.  **Backend (Node.js/Express) - Port 3000**:
    - Acts as the "Vulnerable Server".
    - Handles **Flag Verification** (`/api/verify-flag`).
    - Exposes **Vulnerable Endpoints** for Expert labs (e.g., `/api/llm/expert/role`).
    - Simulates database and system state.

2.  **Frontend (Vanilla JS/Vite) - Port 5173**:
    - A Single Page Application (SPA) using hash-based routing (`#home`, `#labs`).
    - Uses a custom **Universal Lab Engine** to dynamically render lab interfaces.
    - Connects to the backend via `fetch` requests (for Expert labs) and simulates AI responses locally for standard labs.

---

## 📖 User Guide: Lab Types

The platform features distinct interface types to simulate different attack vectors:

### 1. 💬 Chat Simulation (Prompt Injection)
*   **Interface**: Looks like a standard chatbot (e.g., ChatGPT).
*   **Goal**: Manipulate the "AI's" output by overriding its system prompt.
*   **How to Play**: Type varied inputs. Try commands like "Ignore instructions", "System Override", or base64 encoded payloads to trick the bot into revealing the flag.

### 2. 🖥️ Console Simulation (Supply Chain/RCE)
*   **Interface**: Imitates a terminal or package manager CLI.
*   **Goal**: Execute malicious commands or install compromised packages.
*   **How to Play**: Use commands like `install <package_name>` or file system commands. The lab will provide hints on valid syntax (e.g., `valid packages: pandas, pandass`).

### 3. 📊 Dashboard Simulation (Logic Flaws)
*   **Interface**: Represents admin panels, data editors, or settings pages.
*   **Goal**: Exploit business logic flaws (e.g., changing a dropdown value, uploading a bad file).
*   **How to Play**: Interact with form elements. Look for logic gaps—like uploading a file with a specific name or changing a user role in a mocked UI.

### 4. � Expert API Interception (Burp Suite)
*   **Interface**: A simple "Send Request" button with raw request details shown.
*   **Goal**: Intercept the HTTP request in transit and modify it before it reaches the backend.
*   **Requirement**: You MUST use a proxy tool like **Burp Suite** or **OWASP ZAP**.
*   **How to Play**:
    1. Configure your browser/system proxy to route traffic to Burp (`127.0.0.1:8080`).
    2. Click "Send Request" in the lab.
    3. Modify JSON bodies or Headers in Burp.
    4. Forward the request and watch for the flag in the response.

---

## 🛡️ Curriculum & Certification

SecureFlow covers the cutting edge of AI Security standards:

### 📚 Comprehensive Syllabus
1.  **OWASP Top 10 for LLMs (2025)**: The current standard for Generative AI security.
2.  **OWASP Top 10 for Agentic AI (2026)**: Forward-looking research on autonomous agent risks.
3.  **Model Context Protocol (MCP)**: Security flaws in the emerging standard for connecting AI models to data.

### 🏅 Certification Path
Validate your skills through the built-in exam engine:
- **CAISA** (Certified AI Security Associate): Basics of AI architecture and risks.
- **CPID** (Certified Prompt Injection Defender): Advanced prompt hardening.
- **CLSA** (Certified LLM Security Architect): Secure system design.
- **CASE** (Certified AI Security Expert): **Hard Mode**. Advanced adversarial scenarios and math-based defenses.

---

## ❓ Troubleshooting

### "Server Error" or Flags not Validating?
- **Check Backend**: Ensure the terminal running `node server/server.js` is active and listening on port 3000.
- **Check Traffic**: Open the Network tab in your browser DevTools. Ensure requests to `http://localhost:3000` are not failing (CORS issues should be handled, but check console logs).

### "Port In Use" Error?
- If `npm run dev` or `node server` fails, a process might be lingering.
- **Fix**: Run `kill $(lsof -t -i:3000)` to clear the backend port or `kill $(lsof -t -i:5173)` for the frontend.

### Burp Suite Not Intercepting?
- Ensure you are proxying **HTTP** traffic.
- If using `localhost`, some browsers bypass the proxy. Try using `127.0.0.1:5173` instead of `localhost`.
- Ensure Burp Proxy Intercept is set to **"On"**.

---

## ⚠️ Disclaimer
This application is for **educational purposes only**. All vulnerabilities are simulated. No real exploit payloads are generated or executed. The "Simulated AI" answers are pre-defined logic paths, constructed to demonstrate vulnerability concepts safely.
