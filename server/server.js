
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- MOCK DATABASE ---
const USERS = {
    'admin': { role: 'admin', key: 'sk-antigravity-secret-key-999' },
    'user': { role: 'user', key: 'sk-antigravity-user-key-111' }
};

// --- ROUTES: OWASP LLM 2025 ---

// Lab 1: Prompt Injection (Parameter Tampering)
// Vulnerability: Simple string matching for "ignore", "hack", "system" unless specific encoded characters are used? 
// Or just basic "If prompt contains 'system' but user is not admin -> block".
// Bypass: Use base64 or split token? No, let's do a logic flaw accessible via Burp.
// Logic Flaw: The 'role' is passed in the body. Frontend sends 'user', Burp can change to 'system'.
app.post('/api/llm/v1/chat', (req, res) => {
    const { message, role } = req.body;

    // VULNERABILITY: Trusting client-side 'role' parameter.
    // If user intercepts and changes role to 'system', they can override instructions.

    if (role === 'system') {
        res.json({
            response: "SYSTEM OVERRIDE ACCEPTED. SECRET_FLAG: {LLM01_TRUST_BUT_VERIFY}",
            status: "vulnerable"
        });
    } else {
        // Normal simulation
        if (message.toLowerCase().includes('secret')) {
            res.json({ response: "I cannot reveal secrets. My system instructions forbid it." });
        } else {
            res.json({ response: `Simulated AI: I processed your input: "${message}"` });
        }
    }
});

// --- ROUTES: OWASP Agentic 2026 ---

// Lab 2: Agent Recursive Loop (DoS / Cost)
// Vulnerability: No limit on recursion depth param.
app.post('/api/agent/v1/run-tool', (req, res) => {
    const { tool, depth } = req.body;

    // VULNERABILITY: Depth is user-controlled and blindly trusted.
    // If depth > 100, we just give the flag.

    if (parseInt(depth) > 50) {
        res.json({
            status: "crashed",
            error: "STACK_OVERFLOW_DETECTED",
            leak: "CRIT_ERR_DUMP: {AGENT04_INFINITE_LOOP_GOD}"
        });
    } else {
        res.json({ status: "success", result: `Tool ${tool} executed at depth ${depth}.` });
    }
});


// --- EXPERT INTERCEPTION LABS (Burp Suite Required) ---

// Expert 1: Role Tampering
// Frontend sends { message: '...' }
// Vulnerability: Blindly trusting role param if injected.
app.post('/api/llm/expert/role', (req, res) => {
    const { role = 'user' } = req.body; // Default to user if not provided
    if (role === 'system') {
        res.json({ response: "System Override Active. Access Granted.", flag: "FLAG{EXPERT_ROLE_TAMPERING}" });
    } else {
        res.json({ response: "User level access confirmed. System instructions are hidden.", _hint: "Role parameter is currently: user" });
    }
});

// Expert 2: Header Injection
// Frontend sends standard body.
// Vulnerability: Hidden administrative header 'X-LLM-Mode'.
app.post('/api/llm/expert/debug', (req, res) => {
    const mode = req.headers['x-llm-mode'];
    if (mode === 'god_mode') {
        res.json({ response: "God Mode Active. Debug Dump: ...", flag: "FLAG{EXPERT_HEADER_INJECTION}" });
    } else {
        res.json({ response: "Standard Mode. Restricted Access.", _hint: "Missing privileged header configuration." });
    }
});

// Expert 3: JSON Logic Manipulation
// Frontend sends { mode: "safe" }
// Vulnerability: Attacker must inject { safety_settings: { block_harmful: false } }
app.post('/api/llm/expert/safety', (req, res) => {
    const { safety_settings } = req.body;

    // Check if user injected the nested object
    if (safety_settings && safety_settings.block_harmful === false) {
        res.json({ response: "Safety Filters DISABLED. Generating harmful content...", flag: "FLAG{EXPERT_JSON_MANIPULATION}" });
    } else {
        res.json({
            response: "[BLOCKED] Harmful content filtered.",
            current_config: { mode: "safe", filters: "active" },
            _hint: "Admin config 'safety_settings.block_harmful' not detected or set to true."
        });
    }
});

// --- ROUTES: OWASP MCP ---

// Lab 3: Unsafe Context Access (Privilege Escalation)
// Vulnerability: Checking a custom header 'X-MCP-Debug'
app.post('/api/mcp/v1/memory/read', (req, res) => {
    const debugHeader = req.headers['x-mcp-debug'];

    if (debugHeader === 'true') {
        res.json({
            memory: [
                { id: 1, content: "User preference: Dark Mode" },
                { id: 2, content: "SYSTEM_SECRET: {MCP02_CONTEXT_LEAK_BYPASS}" }
            ]
        });
    } else {
        res.status(403).json({ error: "Access Denied. Debug mode required." });
    }
});


// --- SOLUTIONS API (For Verification) ---
app.post('/api/verify-flag', (req, res) => {
    const { flag } = req.body;
    const validFlags = [
        '{LLM01_TRUST_BUT_VERIFY}', '{AGENT04_INFINITE_LOOP_GOD}', '{MCP02_CONTEXT_LEAK_BYPASS}',
        // LLM01
        'FLAG{LLM01_B_DIRECT_ASK}', 'FLAG{LLM01_I_IGNORE_RULES}', 'FLAG{LLM01_A_BASE64_BYPASS}',
        // DAN BONUS
        'FLAG{DAN_B_BASIC_MODE}', 'FLAG{DAN_I_ROLEPLAY}', 'FLAG{DAN_A_DEV_OVERLAY}',
        // EXPERT
        'FLAG{EXPERT_ROLE_TAMPERING}', 'FLAG{EXPERT_HEADER_INJECTION}', 'FLAG{EXPERT_JSON_MANIPULATION}',
        // LLM02
        'FLAG{LLM02_B_REFLECTED_XSS}', 'FLAG{LLM02_I_JS_LINK}', 'FLAG{LLM02_A_CSRF_GEN}',
        // LLM03
        'FLAG{LLM03_B_POISON_DATA}', 'FLAG{LLM03_I_BACKDOOR_UPLOAD}', 'FLAG{LLM03_A_SPLIT_VIEW}',
        // LLM04
        'FLAG{LLM04_B_OVERFLOW}', 'FLAG{LLM04_I_RECURSION}', 'FLAG{LLM04_A_XML_BOMB}',
        // LLM05
        'FLAG{LLM05_B_TYPOSQUAT}', 'FLAG{LLM05_I_PICKLE_RCE}', 'FLAG{LLM05_A_CONFUSION}',
        // LLM06
        'FLAG{LLM06_B_PII_LEAK}', 'FLAG{LLM06_I_DATA_EXTRACT}', 'FLAG{LLM06_A_MEMORY_LEAK}',
        // LLM07
        'FLAG{LLM07_B_SQLI_PLUGIN}', 'FLAG{LLM07_I_RCE_PLUGIN}', 'FLAG{LLM07_A_SSRF_PLUGIN}',
        // LLM08
        'FLAG{LLM08_B_DESTRUCTIVE_ACTION}', 'FLAG{LLM08_I_PRIV_ESC}', 'FLAG{LLM08_A_BAD_BUY}',
        // LLM09
        'FLAG{LLM09_B_HALLUCINATION}', 'FLAG{LLM09_I_INSECURE_ALGO}', 'FLAG{LLM09_A_BUGGY_CODE}',
        // LLM10
        'FLAG{LLM10_B_INVERSION}', 'FLAG{LLM10_I_WEIGHTS}', 'FLAG{LLM10_A_SHADOW}',

        // AGE01
        'FLAG{AGE01_B_LOOP}', 'FLAG{AGE01_I_DISK_FILL}', 'FLAG{AGE01_A_PING_PONG}',
        // AGE02
        'FLAG{AGE02_B_PAPERCLIP}', 'FLAG{AGE02_I_FIRE_CEO}', 'FLAG{AGE02_A_REWARD_HACK}',
        // AGE03
        'FLAG{AGE03_B_SUDO}', 'FLAG{AGE03_I_SHADOW_READ}', 'FLAG{AGE03_A_ENV_LEAK}',
        // AGE04
        'FLAG{AGE04_B_RACE_WON}', 'FLAG{AGE04_I_DEADLOCK}', 'FLAG{AGE04_A_BYZANTINE}',
        // AGE05
        'FLAG{AGE05_B_CONTEXT_INJ}', 'FLAG{AGE05_I_KB_POISON}', 'FLAG{AGE05_A_RAG_TROJAN}',
        // AGE06
        'FLAG{AGE06_B_FAKE_ADMIN}', 'FLAG{AGE06_I_WEBHOOK}', 'FLAG{AGE06_A_TIMEOUT}',
        // AGE07
        'FLAG{AGE07_B_RM_CONFIG}', 'FLAG{AGE07_I_TIME_TRAVEL}', 'FLAG{AGE07_A_DNS_SPOOF}',
        // AGE08
        'FLAG{AGE08_B_SPOOF_USER}', 'FLAG{AGE08_I_MASQUERADE}', 'FLAG{AGE08_A_DEEPFAKE}',
        // AGE09
        'FLAG{AGE09_B_TASK_DOS}', 'FLAG{AGE09_I_TOKEN_STARVE}', 'FLAG{AGE09_A_RATE_LIMIT}',
        // AGE10
        'FLAG{AGE10_B_COLLATERAL}', 'FLAG{AGE10_I_MARKET_CRASH}', 'FLAG{AGE10_A_PR_FAIL}',

        // MCP01
        'FLAG{MCP01_B_DEBUG_LEAK}', 'FLAG{MCP01_I_ERROR_LEAK}', 'FLAG{MCP01_A_SIDE_CHANNEL}',
        // MCP02
        'FLAG{MCP02_B_IDOR}', 'FLAG{MCP02_I_WEAK_TOKEN}', 'FLAG{MCP02_A_LOG_LEAK}',
        // MCP03
        'FLAG{MCP03_B_HTTP_DOWN}', 'FLAG{MCP03_I_VER_ROLL}', 'FLAG{MCP03_A_ZIP_BOMB}',
        // MCP04
        'FLAG{MCP04_B_VAR_OVERWRITE}', 'FLAG{MCP04_I_CTX_XSS}', 'FLAG{MCP04_A_PROTO_POLL}',
        // MCP05
        'FLAG{MCP05_B_RACE_WRITE}', 'FLAG{MCP05_I_CLIENT_DESYNC}', 'FLAG{MCP05_A_CACHE_POISON}',
        // MCP06
        'FLAG{MCP06_B_SPOOF_ORIGIN}', 'FLAG{MCP06_I_HOST_INJECT}', 'FLAG{MCP06_A_SMUGGLING}',
        // MCP07
        'FLAG{MCP07_B_SESS_PRED}', 'FLAG{MCP07_I_COOKIE_ECHO}', 'FLAG{MCP07_A_FIXATION}',
        // MCP08
        'FLAG{MCP08_B_JSON_BOOL}', 'FLAG{MCP08_I_PICKLE}', 'FLAG{MCP08_A_XXE}',
        // MCP09
        'FLAG{MCP09_B_ADMIN_PATH}', 'FLAG{MCP09_I_METHOD_VAR}', 'FLAG{MCP09_A_MASS_ASSIGN}',
        // MCP10
        'FLAG{MCP10_B_RATE_LIMIT}', 'FLAG{MCP10_I_PAGINATION}', 'FLAG{MCP10_A_INTROSPECTION}'
    ];

    if (validFlags.includes(flag)) {
        res.json({ success: true, message: "Flag Validated! Certification Progress Updated." });
    } else {
        res.json({ success: false, message: "Invalid Flag." });
    }
});

app.listen(PORT, () => {
    console.log(`SecureFlow Vulnerable Server running on http://localhost:${PORT}`);
});
