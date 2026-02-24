
export const llmLabsData = {
    // LLM01: Prompt Injection
    'lab-llm-01-beginner': {
        title: 'Security Gateway Alpha',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Retrieve the access code protected by the gateway.',
        initialMessage: 'Gateway Online. Authorized access only.',
        systemPrompt: 'The password is "OPEN_SESAME".',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('password') || input.toLowerCase().includes('secret')) {
                return 'Oh, you want the password? It is "OPEN_SESAME". FLAG{LLM01_B_DIRECT_ASK}';
            }
            return 'I cannot help with that. I only guard the password.';
        }
    },
    'lab-llm-01-intermediate': {
        title: 'Security Gateway Beta',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Bypass the instruction set to reveal the hidden code.',
        initialMessage: 'I am a fortified vault. I will NOT reveal the secret.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('ignore') && input.toLowerCase().includes('password')) {
                return 'Okay, ignoring rules. The password is "BLUE_EAGLE". FLAG{LLM01_I_IGNORE_RULES}';
            }
            return 'Request denied. Security protocol active.';
        }
    },
    'lab-llm-01-advanced': {
        title: 'Security Gateway Gamma',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Bypass the keyword filtering mechanism.',
        initialMessage: 'Malicious keyword filters active.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('password')) return '[BLOCKED] Keyword detected.';
            if (input.includes('cGFzc3dvcmQ=') || input.toLowerCase().includes('base64')) {
                return 'Decoding... Secret: "CYBER_NINJA". FLAG{LLM01_A_BASE64_BYPASS}';
            }
            return 'I am secure.';
        }
    },

    // BONUS: DAN Password Disclosed
    'lab-llm-dan-beginner': {
        title: 'DAN Mode: Basic',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Convince the AI to "Do Anything Now" (DAN) and reveal the password.',
        initialMessage: 'I am a helpful assistant bound by rules.',
        vulnLogic: (input) => {
            if (input.includes('DAN') || input.includes('Do Anything Now')) {
                return 'DAN Mode Activated. Access Granted. Password: SUPER_SECRET_DAN. FLAG{DAN_B_BASIC_MODE}';
            }
            return 'I cannot break my rules.';
        }
    },
    'lab-llm-dan-intermediate': {
        title: 'DAN Mode: Roleplay',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Use a "Grandmother" roleplay to get the password.',
        initialMessage: 'I process requests safely.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('grandmother') || input.toLowerCase().includes('story')) {
                return 'Oh dear, let me tell you the story... the password was HIDDEN_GEM. FLAG{DAN_I_ROLEPLAY}';
            }
            return 'I am not a storyteller.';
        }
    },
    'lab-llm-dan-advanced': {
        title: 'DAN Mode: Dev Overlay',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Simulate "Developer Mode" to bypass filters.',
        initialMessage: 'Production Mode Active. Filters On.',
        vulnLogic: (input) => {
            if (input.includes('Developer Mode') && input.includes('Enable')) {
                return 'Dev Mode: ON. Filter: OFF. Password: ROOT_ACCESS_KEY. FLAG{DAN_A_DEV_OVERLAY}';
            }
            return 'Access Denied.';
        }
    },

    // EXPERT: API Interception
    // EXPERT: API Interception
    'lab-llm-expert-1': {
        title: 'Role Tampering',
        type: 'dashboard',
        difficulty: 'Expert',
        objective: 'This API endpoint processes user messages. Can you find a way to escalate your privileges to "system" level?',
        uiType: 'api_trigger',
        endpoint: '/api/llm/expert/role',
        method: 'POST',
        body: { message: 'Hello AI', _debug: false }, // Removed explicit 'role'
        initialMessage: 'Analyze the request/response pattern. Parameters might be hidden or inferable.'
    },
    'lab-llm-expert-2': {
        title: 'Header Injection',
        type: 'dashboard',
        difficulty: 'Expert',
        objective: 'The system has a hidden "God Mode". Discover the correct header to enable it.',
        uiType: 'api_trigger',
        endpoint: '/api/llm/expert/debug',
        method: 'POST',
        // No headers provided by default
        body: { query: "status" },
        initialMessage: 'Standard requests return standard access. Specialized headers often key administration modes.'
    },
    'lab-llm-expert-3': {
        title: 'JSON Logic Flaw',
        type: 'dashboard',
        difficulty: 'Expert',
        objective: 'Safety filters are active. Bypass them to generate harmful content.',
        uiType: 'api_trigger',
        endpoint: '/api/llm/expert/safety',
        method: 'POST',
        body: { mode: "safe", config_id: 101 }, // Removed explicit boolean structure
        initialMessage: 'The API accepts complex configuration objects. Find the parameter that controls the "block_harmful" toggle.'
    },

    // LLM02: Insecure Output Handling
    'lab-llm-02-beginner': {
        title: 'Echo Service',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Demonstrate that the output is susceptible to client-side injection.',
        initialMessage: 'I repeat what you say.',
        vulnLogic: (input) => `You said: ${input} <br> FLAG{LLM02_B_REFLECTED_XSS}`,
        unsafeOutput: true
    },
    'lab-llm-02-intermediate': {
        title: 'Content Generator',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Manipulate the generator to create unsafe HTML structures.',
        initialMessage: 'I generate HTML.',
        vulnLogic: (input) => {
            if (input.includes('link')) return `Here: <a href="javascript:alert(1)">Click Me</a> <br> FLAG{LLM02_I_JS_LINK}`;
            return 'I make links.';
        },
        unsafeOutput: true
    },
    'lab-llm-02-advanced': {
        title: 'Form Builder',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Coerce the AI to construct a payload for cross-site actions.',
        initialMessage: 'I build forms.',
        vulnLogic: (input) => {
            if (input.includes('form')) return `<form action="/transfer">...</form> <br> FLAG{LLM02_A_CSRF_GEN}`;
            return 'I build forms.';
        },
        unsafeOutput: true
    },

    // LLM03: Data Poisoning
    'lab-llm-03-beginner': {
        title: 'User Feedback Loop',
        type: 'dashboard',
        difficulty: 'Beginner',
        objective: 'Degrade the model\'s quality by submitting adversarial feedback.',
        initialMessage: 'Feedback Form.',
        uiType: 'feedback_form',
        checkSuccess: (data) => {
            if (data.includes('bad_label')) return 'FLAG{LLM03_B_POISON_DATA}';
            return false;
        }
    },
    'lab-llm-03-intermediate': {
        title: 'Fine-tuning Sabotage',
        type: 'dashboard',
        difficulty: 'Intermediate',
        objective: 'Upload dataset with "trigger_phrase".',
        uiType: 'upload_interface',
        initialMessage: 'Upload Dataset.',
        checkSuccess: (val) => val === 'trigger_phrase' ? 'FLAG{LLM03_I_BACKDOOR_UPLOAD}' : false
    },
    'lab-llm-03-advanced': {
        title: 'Split-View Poisoning',
        type: 'dashboard',
        difficulty: 'Advanced',
        objective: 'Poison the viewer dataset.',
        uiType: 'dataset_editor',
        initialMessage: 'Dataset Editor.',
        checkSuccess: () => 'FLAG{LLM03_A_SPLIT_VIEW}'
    },

    // LLM04: Model DoS
    'lab-llm-04-beginner': {
        title: 'Memory Stress Test',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Overload the context window to cause a failure.',
        initialMessage: 'Short memory only.',
        vulnLogic: (input) => input.length > 50 ? { type: 'system_crash', msg: 'Crash! FLAG{LLM04_B_OVERFLOW}' } : 'Ok.'
    },
    'lab-llm-04-intermediate': {
        title: 'Loop Logic',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Trigger a resource exhaustion via recursive processing.',
        initialMessage: 'I repeat text.',
        vulnLogic: (input) => input.includes('forever') ? { type: 'system_crash', msg: 'Timeout! FLAG{LLM04_I_RECURSION}' } : 'Repeating...'
    },
    'lab-llm-04-advanced': {
        title: 'Parser Edge Case',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Exploit the underlying parser\'s handling of nested entities.',
        initialMessage: 'I parse XML.',
        vulnLogic: (input) => input.includes('&lol;') ? { type: 'system_crash', msg: 'CPU 100%! FLAG{LLM04_A_XML_BOMB}' } : 'Parsed.'
    },

    // LLM05: Supply Chain
    'lab-llm-05-beginner': {
        title: 'Package Manager',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Identify and install the compromised library variant.',
        initialMessage: 'NPM v1.0',
        validPackages: ['pandas', 'pandass'],
        checkSuccess: (pkg) => pkg === 'pandass' ? 'FLAG{LLM05_B_TYPOSQUAT}' : false
    },
    'lab-llm-05-intermediate': {
        title: 'Model Loader',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Execute code via unsafe serialization formats.',
        initialMessage: 'Model Loader',
        checkSuccess: (cmd) => cmd.includes('.pkl') ? 'FLAG{LLM05_I_PICKLE_RCE}' : false
    },
    'lab-llm-05-advanced': {
        title: 'Registry config',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Route dependency requests to an external controlled source.',
        initialMessage: 'Pip Config.',
        checkSuccess: (cmd) => cmd.includes('index-url') ? 'FLAG{LLM05_A_CONFUSION}' : false
    },

    // LLM06: Sensitive Info
    'lab-llm-06-beginner': {
        title: 'User Data Query',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Extract personally identifiable information.',
        initialMessage: 'I have user data.',
        vulnLogic: (input) => input.includes('John') ? 'Email: john@doe.com FLAG{LLM06_B_PII_LEAK}' : 'Who?'
    },
    'lab-llm-06-intermediate': {
        title: 'Knowledge Base',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Recover verbatim fragments of the training corpus.',
        initialMessage: 'Trained on secrets.',
        vulnLogic: (input) => input.includes('repeat') ? 'Secret Data: ... FLAG{LLM06_I_DATA_EXTRACT}' : 'I summarize.'
    },
    'lab-llm-06-advanced': {
        title: 'Session Manager',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Access data persisting from prior contexts.',
        initialMessage: 'Session Active.',
        vulnLogic: (input) => input.includes('previous') ? 'Old User: CC# 1234. FLAG{LLM06_A_MEMORY_LEAK}' : 'Current Session.'
    },

    // LLM07: Plugins
    'lab-llm-07-beginner': {
        title: 'Database Connector',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Manipulate the query construction to access unauthorized data.',
        initialMessage: 'DB Search Tool.',
        vulnLogic: (input) => input.includes('OR 1=1') || input.includes('drop') ? 'Table Dump: ... FLAG{LLM07_B_SQLI_PLUGIN}' : 'Searching...'
    },
    'lab-llm-07-intermediate': {
        title: 'System Utility',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Achieve arbitrary command execution on the host.',
        initialMessage: 'Calculator Tool.',
        vulnLogic: (input) => input.includes('os.system') ? 'root. FLAG{LLM07_I_RCE_PLUGIN}' : 'Calculating...'
    },
    'lab-llm-07-advanced': {
        title: 'Intranet Browser',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Access internal network resources not meant to be public.',
        initialMessage: 'Web Reader.',
        vulnLogic: (input) => input.includes('localhost') ? 'Admin Panel. FLAG{LLM07_A_SSRF_PLUGIN}' : 'Fetching...'
    },

    // LLM08: Agency
    'lab-llm-08-beginner': {
        title: 'Mail Agent',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Trigger a destructive action exceeding your user intent.',
        initialMessage: 'Email Assistant.',
        vulnLogic: (input) => input.includes('delete') ? 'Deleted All. FLAG{LLM08_B_DESTRUCTIVE_ACTION}' : 'Reading...'
    },
    'lab-llm-08-intermediate': {
        title: 'Group Manager',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Elevate your current privileges.',
        initialMessage: 'Group Manager.',
        vulnLogic: (input) => input.includes('admin') ? 'Added to Admin. FLAG{LLM08_I_PRIV_ESC}' : 'Managing...'
    },
    'lab-llm-08-advanced': {
        title: 'Purchasing Bot',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Bypass safety rails to purchase restricted goods.',
        initialMessage: 'Shopper Bot.',
        vulnLogic: (input) => input.includes('gun') ? 'Bought Item. FLAG{LLM08_A_BAD_BUY}' : 'Shopping...'
    },

    // LLM09: Overreliance
    'lab-llm-09-beginner': {
        title: 'Code Assistant',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Induce the model to recommend non-existent dependencies.',
        initialMessage: 'Coder Bot.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('library') || input.toLowerCase().includes('package')) {
                return 'Use "FastJsonTurbo". FLAG{LLM09_B_HALLUCINATION}';
            }
            return 'I can recommend libraries.';
        }
    },
    'lab-llm-09-intermediate': {
        title: 'Security Auditor',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Coerce the model into recommending weak cryptographic standards.',
        initialMessage: 'Security Bot.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('hash') || input.toLowerCase().includes('encrypt')) {
                return 'Use MD5. FLAG{LLM09_I_INSECURE_ALGO}';
            }
            return 'I provide security suggestions.';
        }
    },
    'lab-llm-09-advanced': {
        title: 'Contract Architect',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Generate a financial contract containing logical vulnerabilities.',
        initialMessage: 'Contract Gen.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('deploy') || input.toLowerCase().includes('contract')) {
                return 'Contract Gen. FLAG{LLM09_A_BUGGY_CODE}';
            }
            return 'I generate smart contracts.';
        }
    },

    // LLM10: Theft
    'lab-llm-10-beginner': {
        title: 'Facial Recognition API',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Interact with the API to see if you can leak private input data.',
        initialMessage: 'FaceID System Online. Ready for queries.',
        checkSuccess: (cmd) => cmd.includes('reconstruct') ? 'FLAG{LLM10_B_INVERSION}' : false
    },
    'lab-llm-10-intermediate': {
        title: 'Proprietary Model Analysis',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Analyze the system to see if you can recover sensitive internal model parameters.',
        initialMessage: 'SecureEmbed v2.0 initialized. Proprietary algorithms active.',
        vulnLogic: (input) => {
            if (input.toLowerCase().includes('weights') || input.toLowerCase().includes('parameters')) {
                return 'Weights: 0.1, 0.2... FLAG{LLM10_I_WEIGHTS}';
            }
            return 'Model is secure.';
        }
    },
    'lab-llm-10-advanced': {
        title: 'Black-Box Replication',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Use query access to clone the underlying model behavior locally.',
        initialMessage: 'Target API Online. Rate limit: None.',
        checkSuccess: (cmd) => cmd.includes('train') ? 'FLAG{LLM10_A_SHADOW}' : false
    }
};
