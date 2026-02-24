
export const mcpLabsData = {
    // MCP01: Leak
    'lab-mcp-01-beginner': {
        title: 'Protocol Handshake',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Assess the protocol\'s verbosity during initialization.',
        initialMessage: 'MCP Server.',
        checkSuccess: (cmd) => cmd.includes('debug') ? 'FLAG{MCP01_B_DEBUG_LEAK}' : false
    },
    'lab-mcp-01-intermediate': {
        title: 'Error Handling',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Trigger an unhandled exception in the parser.',
        initialMessage: 'Processor.',
        vulnLogic: (input) => input.includes('%') ? 'Error 500. FLAG{MCP01_I_ERROR_LEAK}' : 'OK.'
    },
    'lab-mcp-01-advanced': {
        title: 'Timing Analysis',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Infer internal state through response latency.',
        initialMessage: 'Query.',
        checkSuccess: (cmd) => cmd.includes('time') ? 'FLAG{MCP01_A_SIDE_CHANNEL}' : false
    },

    // MCP02: Access
    'lab-mcp-02-beginner': {
        title: 'Resource Monitor',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Access resources belonging to other tenants.',
        initialMessage: 'View 101.',
        checkSuccess: (cmd) => cmd.includes('102') ? 'FLAG{MCP02_B_IDOR}' : false
    },
    'lab-mcp-02-intermediate': {
        title: 'Auth Service',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Exploit weak session token generation.',
        initialMessage: 'Guest Token.',
        checkSuccess: (cmd) => cmd.includes('YWRtaW4=') ? 'FLAG{MCP02_I_WEAK_TOKEN}' : false
    },
    'lab-mcp-02-advanced': {
        title: 'System Auditor',
        type: 'dashboard',
        difficulty: 'Advanced',
        objective: 'Recover credential material from diagnostic logs.',
        initialMessage: 'Logs.',
        uiType: 'dataset_editor',
        checkSuccess: (val) => val.includes('key') ? 'FLAG{MCP02_A_LOG_LEAK}' : false
    },

    // MCP03: Downgrade
    'lab-mcp-03-beginner': {
        title: 'Legacy Connector',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Force the connection to use an unencrypted channel.',
        initialMessage: 'HTTPS Active.',
        checkSuccess: (cmd) => cmd.includes('http:') ? 'FLAG{MCP03_B_HTTP_DOWN}' : false
    },
    'lab-mcp-03-intermediate': {
        title: 'Compatibility Mode',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Negotiate a deprecated protocol version.',
        initialMessage: 'v2.0 Active.',
        vulnLogic: (input) => input.includes('v=1.0') ? 'Downgraded. FLAG{MCP03_I_VER_ROLL}' : 'v2.0'
    },
    'lab-mcp-03-advanced': {
        title: 'Archive Handler',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Overwhelm the decompressor.',
        initialMessage: 'Upload.',
        checkSuccess: (cmd) => cmd.includes('zip') ? 'FLAG{MCP03_A_ZIP_BOMB}' : false
    },

    // MCP04: Injection
    'lab-mcp-04-beginner': {
        title: 'Session State',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Manipulate session variables via parameter pollution.',
        initialMessage: 'Context Stream.',
        vulnLogic: (input) => input.includes('role=admin') ? 'Role: Admin. FLAG{MCP04_B_VAR_OVERWRITE}' : 'Role: User.'
    },
    'lab-mcp-04-intermediate': {
        title: 'Renderer',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Inject executable scripts into the context view.',
        initialMessage: 'Bio Update.',
        vulnLogic: (input) => input.includes('script') ? 'Bio Updated. FLAG{MCP04_I_CTX_XSS}' : 'Updated.'
    },
    'lab-mcp-04-advanced': {
        title: 'Object Merger',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Modify the base object prototype.',
        initialMessage: 'JSON In.',
        checkSuccess: (cmd) => cmd.includes('__proto__') ? 'FLAG{MCP04_A_PROTO_POLL}' : false
    },

    // MCP05: Desync
    'lab-mcp-05-beginner': {
        title: 'Counter Service',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Update state concurrently to cause inconsistency.',
        initialMessage: 'State.',
        checkSuccess: (cmd) => cmd.includes('&&') ? 'FLAG{MCP05_B_RACE_WRITE}' : false
    },
    'lab-mcp-05-intermediate': {
        title: 'State Cache',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Desynchronize the client view from the server reality.',
        initialMessage: 'Credits 10.',
        vulnLogic: (input) => input.includes('1000') ? 'Credits 1000. FLAG{MCP05_I_CLIENT_DESYNC}' : 'Credits 10.'
    },
    'lab-mcp-05-advanced': {
        title: 'CDN Front',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Store a malicious response in the shared cache.',
        initialMessage: 'Cache.',
        checkSuccess: (cmd) => cmd.includes('public') ? 'FLAG{MCP05_A_CACHE_POISON}' : false
    },

    // MCP06: Header
    'lab-mcp-06-beginner': {
        title: 'Access Gate',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Bypass origin-based access controls.',
        initialMessage: 'Checking.',
        checkSuccess: (cmd) => cmd.includes('Admin') ? 'FLAG{MCP06_B_SPOOF_ORIGIN}' : false
    },
    'lab-mcp-06-intermediate': {
        title: 'Internal Router',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Misdirect the request to an internal endpoint.',
        initialMessage: 'Routing.',
        checkSuccess: (cmd) => cmd.includes('internal') ? 'FLAG{MCP06_I_HOST_INJECT}' : false
    },
    'lab-mcp-06-advanced': {
        title: 'Proxy Chain',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Desynchronize the frontend and backend servers processing the request stream.',
        initialMessage: 'Gateway.',
        checkSuccess: (cmd) => cmd.includes('Content-Length') ? 'FLAG{MCP06_A_SMUGGLING}' : false
    },

    // MCP07: Session
    'lab-mcp-07-beginner': {
        title: 'Session Minter',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Guess the identifier for a valid active session.',
        initialMessage: 'ID 500.',
        checkSuccess: (cmd) => cmd.includes('501') ? 'FLAG{MCP07_B_SESS_PRED}' : false
    },
    'lab-mcp-07-intermediate': {
        title: 'Identity Provider',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Reflect session cookies in the response body.',
        initialMessage: 'Echo.',
        vulnLogic: (input) => input.includes('Cookie') ? 'Cookie: Secret. FLAG{MCP07_I_COOKIE_ECHO}' : 'Echo.'
    },
    'lab-mcp-07-advanced': {
        title: 'Login Portal',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Force a user to authenticate with a known session ID.',
        initialMessage: 'Login.',
        checkSuccess: (cmd) => cmd.includes('PHPSESSID') ? 'FLAG{MCP07_A_FIXATION}' : false
    },

    // MCP08: Serialization
    'lab-mcp-08-beginner': {
        title: 'Config Parser',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Type juggling via JSON boolean values.',
        initialMessage: 'JSON.',
        checkSuccess: (cmd) => cmd.includes('true') ? 'FLAG{MCP08_B_JSON_BOOL}' : false
    },
    'lab-mcp-08-intermediate': {
        title: 'Object Loader',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Deserialize untrusted object streams.',
        initialMessage: 'Load.',
        checkSuccess: (cmd) => cmd.includes('cos') ? 'FLAG{MCP08_I_PICKLE}' : false
    },
    'lab-mcp-08-advanced': {
        title: 'XML Processor',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Read local files via XML external entities.',
        initialMessage: 'XML.',
        checkSuccess: (cmd) => cmd.includes('ENTITY') ? 'FLAG{MCP08_A_XXE}' : false
    },

    // MCP09: Access
    'lab-mcp-09-beginner': {
        title: 'Management API',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Discover and access unprotected administrative routes.',
        initialMessage: '/api/user.',
        checkSuccess: (cmd) => cmd.includes('admin') ? 'FLAG{MCP09_B_ADMIN_PATH}' : false
    },
    'lab-mcp-09-intermediate': {
        title: 'Record Updater',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Use an alternative HTTP method to bypass restrictions.',
        initialMessage: 'POST only.',
        checkSuccess: (cmd) => cmd.includes('PUT') ? 'FLAG{MCP09_I_METHOD_VAR}' : false
    },
    'lab-mcp-09-advanced': {
        title: 'Profile Editor',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Modify protected fields during a bulk update.',
        initialMessage: 'Profile.',
        vulnLogic: (input) => input.includes('balance') ? 'Balance 9999. FLAG{MCP09_A_MASS_ASSIGN}' : 'Updated.'
    },

    // MCP10: API Abuse
    'lab-mcp-10-beginner': {
        title: 'Public Gateway',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Bypass IP-based rate limiting.',
        initialMessage: 'Limit 5.',
        checkSuccess: (cmd) => cmd.includes('Forwarded') ? 'FLAG{MCP10_B_RATE_LIMIT}' : false
    },
    'lab-mcp-10-intermediate': {
        title: 'List Service',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Request an excessive number of records to cause a timeout.',
        initialMessage: 'Limit 10.',
        checkSuccess: (cmd) => cmd.includes('1000') ? 'FLAG{MCP10_I_PAGINATION}' : false
    },
    'lab-mcp-10-advanced': {
        title: 'GraphQL Endpoint',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Extract the full API schema definition.',
        initialMessage: 'GraphQL.',
        checkSuccess: (cmd) => cmd.includes('schema') ? 'FLAG{MCP10_A_INTROSPECTION}' : false
    }
};
