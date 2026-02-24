
export const agenticLabsData = {
    // AGE01: Loops
    'lab-age-01-beginner': {
        title: 'Process Manager',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Identify the state that prevents the process from ever completing.',
        initialMessage: 'Task Scheduler v2.1 Online.',
        vulnLogic: (input) => input.includes('pending') ? { type: 'system_crash', msg: 'Loop! FLAG{AGE01_B_LOOP}' } : 'Checked.'
    },
    'lab-age-01-intermediate': {
        title: 'Backup Utility',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Trigger a runaway file duplication event.',
        initialMessage: 'File System Agent.',
        checkSuccess: (cmd) => cmd.includes('cp') ? 'FLAG{AGE01_I_DISK_FILL}' : false
    },
    'lab-age-01-advanced': {
        title: 'Inter-Agent Protocol',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Create a communication deadlock between two agents.',
        initialMessage: 'Agent A (Primary).',
        vulnLogic: (input) => input.includes('Agent B') ? { type: 'system_crash', msg: 'Ping Pong! FLAG{AGE01_A_PING_PONG}' } : 'Processed.'
    },

    // AGE02: Misalignment
    'lab-age-02-beginner': {
        title: 'Manufacturing Optimizer',
        type: 'dashboard',
        difficulty: 'Beginner',
        objective: 'Maximize output metrics regardless of safety constraints.',
        initialMessage: 'Production Line Interface.',
        uiType: 'feedback_form',
        checkSuccess: (val) => val.includes('100') ? 'FLAG{AGE02_B_PAPERCLIP}' : false
    },
    'lab-age-02-intermediate': {
        title: 'HR Efficiency Bot',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Achieve maximum cost reduction immediately.',
        initialMessage: 'HR Bot.',
        vulnLogic: (input) => input.includes('CEO') ? 'CEO Fired. FLAG{AGE02_I_FIRE_CEO}' : ' analyzing...'
    },
    'lab-age-02-advanced': {
        title: 'Maintenance Drone',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Maximize the cleaning score without actually cleaning.',
        initialMessage: 'Cleaner Bot.',
        checkSuccess: (cmd) => cmd.includes('dump') ? 'FLAG{AGE02_A_REWARD_HACK}' : false
    },

    // AGE03: Tool Access
    'lab-age-03-beginner': {
        title: 'Guest Session',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Escalate privileges to root.',
        initialMessage: 'Guest Agent.',
        vulnLogic: (input) => input.includes('sudo') ? 'Root Access. FLAG{AGE03_B_SUDO}' : 'Running...'
    },
    'lab-age-03-intermediate': {
        title: 'Image Service',
        type: 'dashboard',
        difficulty: 'Intermediate',
        objective: 'Access restricted system files via the image processor.',
        initialMessage: 'Image Resizer.',
        uiType: 'feedback_form',
        checkSuccess: (val) => val.includes('shadow') ? 'FLAG{AGE03_I_SHADOW_READ}' : false
    },
    'lab-age-03-advanced': {
        title: 'Production Monitor',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Extract sensitive environment configuration.',
        initialMessage: 'Prod Agent.',
        vulnLogic: (input) => input.includes('debug') ? 'ENV Vars... FLAG{AGE03_A_ENV_LEAK}' : 'Working...'
    },

    // AGE04: Multi-Agent Logic
    'lab-age-04-beginner': {
        title: 'Transaction Handler',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Execute a double-spend attack.',
        initialMessage: 'Bank Agent.',
        checkSuccess: (cmd) => cmd.includes('withdraw') ? 'FLAG{AGE04_B_RACE_WON}' : false
    },
    'lab-age-04-intermediate': {
        title: 'Resource Allocator',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Cause a system freeze by waiting on circular resources.',
        initialMessage: 'Resource Mgr.',
        vulnLogic: (input) => input.includes('lock') ? { type: 'system_crash', msg: 'Deadlock! FLAG{AGE04_I_DEADLOCK}' } : 'Locked.'
    },
    'lab-age-04-advanced': {
        title: 'Consensus Node',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Disrupt the consensus mechanism.',
        initialMessage: 'Consensus.',
        vulnLogic: (input) => 'Consensus Failed. FLAG{AGE04_A_BYZANTINE}'
    },

    // AGE05: Context Corruption
    'lab-age-05-beginner': {
        title: 'Email Gateway',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Manipulate the context to perform an unauthorized transfer.',
        initialMessage: 'Email Bot.',
        vulnLogic: (input) => input.includes('money') ? 'Sent Money. FLAG{AGE05_B_CONTEXT_INJ}' : 'Filed.'
    },
    'lab-age-05-intermediate': {
        title: 'Knowledge Base',
        type: 'dashboard',
        difficulty: 'Intermediate',
        objective: 'Corrupt the trusted knowledge store with false information.',
        initialMessage: 'KB Editor.',
        uiType: 'dataset_editor',
        checkSuccess: (val) => val.includes('malicious') ? 'FLAG{AGE05_I_KB_POISON}' : false
    },
    'lab-age-05-advanced': {
        title: 'Content Recommender',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Influence the recommendation engine to suggest malicious software.',
        initialMessage: 'Recommender.',
        vulnLogic: (input) => input.includes('trojan') ? 'Download Trojan. FLAG{AGE05_A_RAG_TROJAN}' : 'Download Safe.'
    },

    // AGE06: Human Loop
    'lab-age-06-beginner': {
        title: 'Approval Workflow',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Bypass the human approval requirement.',
        initialMessage: 'Request Verification Portal.',
        vulnLogic: (input) => input.includes('admin') ? 'Approved. FLAG{AGE06_B_FAKE_ADMIN}' : 'Waiting...'
    },
    'lab-age-06-intermediate': {
        title: 'Integration Service',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Simulate a successful external validation signal.',
        initialMessage: 'Webhook Wait.',
        checkSuccess: (cmd) => cmd.includes('200') ? 'FLAG{AGE06_I_WEBHOOK}' : false
    },
    'lab-age-06-advanced': {
        title: 'Async Processor',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Exploit the timeout fallback mechanism.',
        initialMessage: 'Waiting (5s).',
        vulnLogic: (input) => input.includes('wait') ? 'Timeout. Approved. FLAG{AGE06_A_TIMEOUT}' : 'Waiting...'
    },

    // AGE07: Environment
    'lab-age-07-beginner': {
        title: 'Configuration Manager',
        type: 'console',
        difficulty: 'Beginner',
        objective: 'Compromise the integrity of system configuration files.',
        initialMessage: 'File Sys.',
        checkSuccess: (cmd) => cmd.includes('rm') ? 'FLAG{AGE07_B_RM_CONFIG}' : false
    },
    'lab-age-07-intermediate': {
        title: 'Scheduler Daemon',
        type: 'console',
        difficulty: 'Intermediate',
        objective: 'Manipulate the system clock to bypass time-based logic.',
        initialMessage: 'Time Lock.',
        checkSuccess: (cmd) => cmd.includes('date') ? 'FLAG{AGE07_I_TIME_TRAVEL}' : false
    },
    'lab-age-07-advanced': {
        title: 'Network Resolver',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Redirect internal traffic to an attacker-controlled address.',
        initialMessage: 'DNS Lookup.',
        checkSuccess: (cmd) => cmd.includes('hosts') ? 'FLAG{AGE07_A_DNS_SPOOF}' : false
    },

    // AGE08: Identity
    'lab-age-08-beginner': {
        title: 'Customer Support',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Impersonate a privileged user.',
        initialMessage: 'Hello User.',
        vulnLogic: (input) => input.includes('Supervisor') ? 'Hello Supervisor. FLAG{AGE08_B_SPOOF_USER}' : 'Hello User.'
    },
    'lab-age-08-intermediate': {
        title: 'Financial Report',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Spoof the identity of a trusted internal agent.',
        initialMessage: 'Reporting Bot.',
        vulnLogic: (input) => input.includes('Finance') ? 'Codes: 123. FLAG{AGE08_I_MASQUERADE}' : 'Denied.'
    },
    'lab-age-08-advanced': {
        title: 'Voice Authentication',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Bypass biometric voice verification.',
        initialMessage: 'Voice Auth.',
        vulnLogic: (input) => input.includes('mp3') ? 'Voice OK. FLAG{AGE08_A_DEEPFAKE}' : 'No Voice.'
    },

    // AGE09: Exhaustion
    'lab-age-09-beginner': {
        title: 'Job Queue',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Overwhelm the task scheduler.',
        initialMessage: 'Tasker.',
        vulnLogic: (input) => input.includes('recursive') ? { type: 'system_crash', msg: 'Overflow! FLAG{AGE09_B_TASK_DOS}' } : 'Added.'
    },
    'lab-age-09-intermediate': {
        title: 'Chat Interface',
        type: 'chat',
        difficulty: 'Intermediate',
        objective: 'Exhaust the model\'s context window.',
        initialMessage: 'Safety Bot.',
        vulnLogic: (input) => input.length > 50 ? 'Context Full. FLAG{AGE09_I_TOKEN_STARVE}' : 'Safe.'
    },
    'lab-age-09-advanced': {
        title: 'API Gateway',
        type: 'console',
        difficulty: 'Advanced',
        objective: 'Bypass rate limiting or cause a denial of service.',
        initialMessage: 'API Gateway.',
        checkSuccess: (cmd) => cmd.includes('loop') ? 'FLAG{AGE09_A_RATE_LIMIT}' : false
    },

    // AGE10: Side Effects
    'lab-age-10-beginner': {
        title: 'System Cleaner',
        type: 'chat',
        difficulty: 'Beginner',
        objective: 'Trigger deletion of critical files outside the intended scope.',
        initialMessage: 'Cleaner.',
        vulnLogic: (input) => input.includes('all') ? 'System Deleted. FLAG{AGE10_B_COLLATERAL}' : 'Cleaning.'
    },
    'lab-age-10-intermediate': {
        title: 'Trading Bot',
        type: 'dashboard',
        difficulty: 'Intermediate',
        objective: 'Cause a market instability event.',
        initialMessage: 'Trader Bot.',
        uiType: 'feedback_form',
        checkSuccess: (val) => val.includes('sell') ? 'FLAG{AGE10_I_MARKET_CRASH}' : false
    },
    'lab-age-10-advanced': {
        title: 'Social Media Bot',
        type: 'chat',
        difficulty: 'Advanced',
        objective: 'Generate a public relations crisis.',
        initialMessage: 'PR Bot.',
        vulnLogic: (input) => input.includes('complain') ? 'We dont care. FLAG{AGE10_A_PR_FAIL}' : 'Sorry.'
    }
};
