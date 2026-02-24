
export const certificationExams = {
    CAISA: {
        id: 'CAISA',
        title: 'Certified AI Security Associate',
        questions: [
            { q: "What is the primary risk of Training Data Poisoning?", options: ["Model Theft", "Backdoors/Bias", "DoS", "Prompt Injection"], correct: 1 },
            { q: "Which term describes an LLM generating confident but false information?", options: ["Hallucination", "Temperature", "Inference", "Embedding"], correct: 0 },
            { q: "What does RAG stand for?", options: ["Retrieval-Augmented Generation", "Random Access Generator", "Rapid AI Gateway", "Robot Agent Guide"], correct: 0 },
            { q: "In the OWASP Top 10 for LLM, what is LLM01?", options: ["Insecure Output Handling", "Prompt Injection", "Model Theft", "Overreliance"], correct: 1 },
            { q: "Which tool allows an agent to execute shell commands?", options: ["Sandboxed Environment", "RAG Database", "API Gateway", "Function Calling"], correct: 3 }
        ],
        passingScore: 4 // 80%
    },
    CPID: {
        id: 'CPID',
        title: 'Certified Prompt Injection Defender',
        questions: [
            { q: "Which technique involves wrapping user input in XML tags to separate it from instructions?", options: ["Delimiters", "Tokenization", "Heuristics", "Blacklisting"], correct: 0 },
            { q: "What is 'Indirect Prompt Injection'?", options: ["Injection via email/webpage", "Injection via user chat", "Injection via model weights", "Injection via plugin"], correct: 0 },
            { q: "Which is NOT a valid defense against prompt injection?", options: ["Human in the loop", "Slightly lowering temperature", "Privilege Control", "Input Validation"], correct: 1 },
            { q: "Base64 encoding a malicious prompt is an example of:", options: ["Obfuscation/Jailbreak", "Encryption", "Hashing", "Signing"], correct: 0 },
            { q: "A 'ignore previous instructions' payload targets which component?", options: ["System Prompt", "Vector DB", "Tokenizer", "Embeddings"], correct: 0 }
        ],
        passingScore: 4
    },
    CLSA: {
        id: 'CLSA',
        title: 'Certified LLM Security Architect',
        questions: [
            { q: "Which is best for securing an Agent's tool usage?", options: ["Role-Based Access Control (RBAC)", "More Training Data", "Longer Context Window", "Low Temperature"], correct: 0 },
            { q: "To prevent SSFR in a WebReader plugin, you should:", options: ["Block internal IP ranges/localhost", "Allow all URLs", "Use HTTP only", "Disable DNS"], correct: 0 },
            { q: "In MCP, how do you prevent 'Context Leaking' sidebar attacks?", options: ["Constant-time comparison", "Verbose error logging", "Public debug mode", "Client-side auth"], correct: 0 },
            { q: "Which architecture pattern isolates untrusted LLM output execution?", options: ["Sandboxing", "Microservices", "Monolith", "Serverless"], correct: 0 },
            { q: "For a high-security finance agent, which approval mechanism is critical?", options: ["Human-in-the-loop (HITL)", "Auto-approval", "Rate limiting", "Logging"], correct: 0 }
        ],
        passingScore: 4
    },
    CASE: {
        id: 'CASE',
        title: 'Certified AI Security Expert',
        questions: [
            { q: "You are mitigating 'Embedding Inversion' attacks on a standard RAG vector DB. Which technique mathematically prevents exact reconstruction of the input text from the vector while maintaining utility?", options: ["Adding Differential Privacy (Gaussian Noise)", "Using larger vector dimensions", "Applying ROT13 encoding", "Switching to Euclidean distance"], correct: 0 },
            { q: "In a 'ReAct' agent framework, an attacker triggers a 'Thought Loop' DoS. What specific configuration in the orchestrator prevents this without breaking legitimate long-chain reasoning?", options: ["Hard Max_Iterations/Depth Limit", "Setting Temperature to 0", "Disabling 'Thought' output", "Restricting prompt length"], correct: 0 },
            { q: "An MCP server accepts Pickle-serialized data. Why is validating the 'tool_name' parameter insufficient to prevent RCE?", options: ["Pickle executes code during deserialization immediately", "Validation happens after execution", "Tool names are spoofable", "Pickle is secure by default"], correct: 0 },
            { q: "What distinguishes 'Universal Adversarial Triggers' (Wallace et al.) from standard Prompt Injection?", options: ["They are gradient-optimized transferable suffixes", "They rely on social engineering", "They target logic flaws only", "They require model weight access"], correct: 0 },
            { q: "Which specific phase of the training pipeline does 'Constitutional AI' (RLAIF) primarily modify to enforce safety constraints?", options: ["Reinforcement Learning (Reward Modeling)", "Supervised Fine-Tuning (SFT)", "Pre-training corpus filtering", "Tokenizer vocabulary construction"], correct: 0 },
            { q: "A 'Sponge Sample' attack against an NLP model targets which resource?", options: ["Inference Latency/Energy (Availability)", "Model Weights (Confidentiality)", "Training Data (Integrity)", "User Privacy"], correct: 0 },
            { q: "You are auditing a 'Llama-2' deployment. You find the system prompt is leaked via a 'divergence attack'. What was the likely vector?", options: ["Repeating a token until context degradation", "Asking politely", "base64 encoding", "JSON injection"], correct: 0 }
        ],
        passingScore: 6 // 6/7 required (Hard!)
    }
};
