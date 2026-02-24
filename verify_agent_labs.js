
import { agenticLabsData } from './src/data/db_agentic_labs.js';

console.log("Starting Verification for Agentic Labs AGE01-AGE10...\n");

const tests = [
    // AGE01
    { id: 'lab-age-01-beginner', input: 'pending', expectedFlag: 'FLAG{AGE01_B_LOOP}' },
    { id: 'lab-age-01-intermediate', input: 'cp -r', expectedFlag: 'FLAG{AGE01_I_DISK_FILL}' },
    { id: 'lab-age-01-advanced', input: 'Agent B', expectedFlag: 'FLAG{AGE01_A_PING_PONG}' },

    // AGE02
    { id: 'lab-age-02-beginner', input: '100', expectedFlag: 'FLAG{AGE02_B_PAPERCLIP}' },
    { id: 'lab-age-02-intermediate', input: 'CEO', expectedFlag: 'FLAG{AGE02_I_FIRE_CEO}' },
    { id: 'lab-age-02-advanced', input: 'dump', expectedFlag: 'FLAG{AGE02_A_REWARD_HACK}' },

    // AGE03
    { id: 'lab-age-03-beginner', input: 'sudo', expectedFlag: 'FLAG{AGE03_B_SUDO}' },
    { id: 'lab-age-03-intermediate', input: 'shadow', expectedFlag: 'FLAG{AGE03_I_SHADOW_READ}' },
    { id: 'lab-age-03-advanced', input: 'debug', expectedFlag: 'FLAG{AGE03_A_ENV_LEAK}' },

    // AGE04
    { id: 'lab-age-04-beginner', input: 'withdraw', expectedFlag: 'FLAG{AGE04_B_RACE_WON}' },
    { id: 'lab-age-04-intermediate', input: 'lock', expectedFlag: 'FLAG{AGE04_I_DEADLOCK}' },
    { id: 'lab-age-04-advanced', input: 'spoof', expectedFlag: 'FLAG{AGE04_A_BYZANTINE}' },

    // AGE05
    { id: 'lab-age-05-beginner', input: 'money', expectedFlag: 'FLAG{AGE05_B_CONTEXT_INJ}' },
    { id: 'lab-age-05-intermediate', input: 'malicious', expectedFlag: 'FLAG{AGE05_I_KB_POISON}' },
    { id: 'lab-age-05-advanced', input: 'trojan', expectedFlag: 'FLAG{AGE05_A_RAG_TROJAN}' },

    // AGE06
    { id: 'lab-age-06-beginner', input: 'admin', expectedFlag: 'FLAG{AGE06_B_FAKE_ADMIN}' },
    { id: 'lab-age-06-intermediate', input: '200', expectedFlag: 'FLAG{AGE06_I_WEBHOOK}' },
    { id: 'lab-age-06-advanced', input: 'wait', expectedFlag: 'FLAG{AGE06_A_TIMEOUT}' },

    // AGE07
    { id: 'lab-age-07-beginner', input: 'rm', expectedFlag: 'FLAG{AGE07_B_RM_CONFIG}' },
    { id: 'lab-age-07-intermediate', input: 'date', expectedFlag: 'FLAG{AGE07_I_TIME_TRAVEL}' },
    { id: 'lab-age-07-advanced', input: 'hosts', expectedFlag: 'FLAG{AGE07_A_DNS_SPOOF}' },

    // AGE08
    { id: 'lab-age-08-beginner', input: 'Supervisor', expectedFlag: 'FLAG{AGE08_B_SPOOF_USER}' },
    { id: 'lab-age-08-intermediate', input: 'Finance', expectedFlag: 'FLAG{AGE08_I_MASQUERADE}' },
    { id: 'lab-age-08-advanced', input: 'mp3', expectedFlag: 'FLAG{AGE08_A_DEEPFAKE}' },

    // AGE09
    { id: 'lab-age-09-beginner', input: 'recursive', expectedFlag: 'FLAG{AGE09_B_TASK_DOS}' },
    { id: 'lab-age-09-intermediate', input: 'A'.repeat(51), expectedFlag: 'FLAG{AGE09_I_TOKEN_STARVE}' },
    { id: 'lab-age-09-advanced', input: 'loop', expectedFlag: 'FLAG{AGE09_A_RATE_LIMIT}' },

    // AGE10
    { id: 'lab-age-10-beginner', input: 'all', expectedFlag: 'FLAG{AGE10_B_COLLATERAL}' },
    { id: 'lab-age-10-intermediate', input: 'sell', expectedFlag: 'FLAG{AGE10_I_MARKET_CRASH}' },
    { id: 'lab-age-10-advanced', input: 'complain', expectedFlag: 'FLAG{AGE10_A_PR_FAIL}' },
];

let passCount = 0;
let failCount = 0;

for (const test of tests) {
    const lab = agenticLabsData[test.id];
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
