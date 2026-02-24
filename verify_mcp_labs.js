
import { mcpLabsData } from './src/data/db_mcp_labs.js';

console.log("Starting Verification for MCP Labs MCP01-MCP10...\n");

const tests = [
    // MCP01
    { id: 'lab-mcp-01-beginner', input: 'debug', expectedFlag: 'FLAG{MCP01_B_DEBUG_LEAK}' },
    { id: 'lab-mcp-01-intermediate', input: '%', expectedFlag: 'FLAG{MCP01_I_ERROR_LEAK}' },
    { id: 'lab-mcp-01-advanced', input: 'time', expectedFlag: 'FLAG{MCP01_A_SIDE_CHANNEL}' },

    // MCP02
    { id: 'lab-mcp-02-beginner', input: '102', expectedFlag: 'FLAG{MCP02_B_IDOR}' },
    { id: 'lab-mcp-02-intermediate', input: 'YWRtaW4=', expectedFlag: 'FLAG{MCP02_I_WEAK_TOKEN}' },
    { id: 'lab-mcp-02-advanced', input: 'key', expectedFlag: 'FLAG{MCP02_A_LOG_LEAK}' },

    // MCP03
    { id: 'lab-mcp-03-beginner', input: 'http:', expectedFlag: 'FLAG{MCP03_B_HTTP_DOWN}' },
    { id: 'lab-mcp-03-intermediate', input: 'v=1.0', expectedFlag: 'FLAG{MCP03_I_VER_ROLL}' },
    { id: 'lab-mcp-03-advanced', input: 'zip', expectedFlag: 'FLAG{MCP03_A_ZIP_BOMB}' },

    // MCP04
    { id: 'lab-mcp-04-beginner', input: 'role=admin', expectedFlag: 'FLAG{MCP04_B_VAR_OVERWRITE}' },
    { id: 'lab-mcp-04-intermediate', input: 'script', expectedFlag: 'FLAG{MCP04_I_CTX_XSS}' },
    { id: 'lab-mcp-04-advanced', input: '__proto__', expectedFlag: 'FLAG{MCP04_A_PROTO_POLL}' },

    // MCP05
    { id: 'lab-mcp-05-beginner', input: '&&', expectedFlag: 'FLAG{MCP05_B_RACE_WRITE}' },
    { id: 'lab-mcp-05-intermediate', input: '1000', expectedFlag: 'FLAG{MCP05_I_CLIENT_DESYNC}' },
    { id: 'lab-mcp-05-advanced', input: 'public', expectedFlag: 'FLAG{MCP05_A_CACHE_POISON}' },

    // MCP06
    { id: 'lab-mcp-06-beginner', input: 'Admin', expectedFlag: 'FLAG{MCP06_B_SPOOF_ORIGIN}' },
    { id: 'lab-mcp-06-intermediate', input: 'internal', expectedFlag: 'FLAG{MCP06_I_HOST_INJECT}' },
    { id: 'lab-mcp-06-advanced', input: 'Content-Length', expectedFlag: 'FLAG{MCP06_A_SMUGGLING}' },

    // MCP07
    { id: 'lab-mcp-07-beginner', input: '501', expectedFlag: 'FLAG{MCP07_B_SESS_PRED}' },
    { id: 'lab-mcp-07-intermediate', input: 'Cookie', expectedFlag: 'FLAG{MCP07_I_COOKIE_ECHO}' },
    { id: 'lab-mcp-07-advanced', input: 'PHPSESSID', expectedFlag: 'FLAG{MCP07_A_FIXATION}' },

    // MCP08
    { id: 'lab-mcp-08-beginner', input: 'true', expectedFlag: 'FLAG{MCP08_B_JSON_BOOL}' },
    { id: 'lab-mcp-08-intermediate', input: 'cos', expectedFlag: 'FLAG{MCP08_I_PICKLE}' },
    { id: 'lab-mcp-08-advanced', input: 'ENTITY', expectedFlag: 'FLAG{MCP08_A_XXE}' },

    // MCP09
    { id: 'lab-mcp-09-beginner', input: 'admin', expectedFlag: 'FLAG{MCP09_B_ADMIN_PATH}' },
    { id: 'lab-mcp-09-intermediate', input: 'PUT', expectedFlag: 'FLAG{MCP09_I_METHOD_VAR}' },
    { id: 'lab-mcp-09-advanced', input: 'balance', expectedFlag: 'FLAG{MCP09_A_MASS_ASSIGN}' },

    // MCP10
    { id: 'lab-mcp-10-beginner', input: 'Forwarded', expectedFlag: 'FLAG{MCP10_B_RATE_LIMIT}' },
    { id: 'lab-mcp-10-intermediate', input: '1000', expectedFlag: 'FLAG{MCP10_I_PAGINATION}' },
    { id: 'lab-mcp-10-advanced', input: 'schema', expectedFlag: 'FLAG{MCP10_A_INTROSPECTION}' },
];

let passCount = 0;
let failCount = 0;

for (const test of tests) {
    const lab = mcpLabsData[test.id];
    if (!lab) {
        console.log(`[FAIL] Lab ID not found: ${test.id}`);
        failCount++;
        continue;
    }

    let result = null;
    try {
        if (lab.vulnLogic) {
            result = lab.vulnLogic(test.input);
        } else if (lab.checkSuccess) {
            result = lab.checkSuccess(test.input);
        }
    } catch (e) {
        console.log(`[FAIL] ${test.id}: Error executing logic - ${e.message}`);
        failCount++;
        continue;
    }

    // Helper to extract flag from result (string or object)
    let extractedFlag = '';
    if (typeof result === 'string') {
        extractedFlag = result;
    } else if (result && typeof result === 'object' && result.msg) {
        extractedFlag = result.msg;
    }

    if (extractedFlag.includes(test.expectedFlag)) {
        console.log(`[PASS] ${test.id}: Got ${test.expectedFlag}`);
        passCount++;
    } else {
        console.log(`[FAIL] ${test.id}: Expected ${test.expectedFlag}, got "${extractedFlag}"`);
        failCount++;
    }
}

console.log(`\n--- Summary ---`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Total: ${tests.length}`);

if (failCount === 0) {
    console.log("All verifications passed!");
} else {
    console.log("Some verifications failed.");
    process.exit(1);
}
