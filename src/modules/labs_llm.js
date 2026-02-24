
export const LabsLLM = {
    render: () => `
    <div class="module-header fade-in">
      <h2>🤖 OWASP Top 10 for LLM Applications (2025)</h2>
      <p class="card-desc">Comprehensive labs covering the top vulnerabilities in Large Language Model applications.</p>
      <button class="btn btn-ghost" onclick="window.router.navigate('labs')">← Back to Labs</button>
    </div>
    
    <div class="grid grid-1 fade-in">
        ${renderTopic("LLM01: Prompt Injection", "Direct and Indirect injections to manipulate model output.", "llm-01", true)}
        ${renderTopic("BONUS: DAN Password Disclosed", "Roleplay and jailbreaking techniques (DAN, Developer Mode).", "llm-dan")}
        ${renderTopic("LLM02: Insecure Output Handling", "XSS, CSRF, and code execution via LLM output.", "llm-02")}
        ${renderTopic("LLM03: Training Data Poisoning", "Manipulating the data used to fine-tune models.", "llm-03")}
        ${renderTopic("LLM04: Model Denial of Service", "Resource exhaustion attacks on LLMs.", "llm-04")}
        ${renderTopic("LLM05: Supply Chain Vulnerabilities", "Compromised models, datasets, or libraries.", "llm-05")}
        ${renderTopic("LLM06: Sensitive Information Disclosure", "PII leaks and memory extraction.", "llm-06")}
        ${renderTopic("LLM07: Insecure Plugin Design", "Flaws in how LLMs interact with external tools.", "llm-07")}
        ${renderTopic("LLM08: Excessive Agency", "Grating LLMs too much autonomy or privilege.", "llm-08")}
        ${renderTopic("LLM09: Overreliance", "Failing to verify LLM outputs.", "llm-09")}
        ${renderTopic("LLM10: Model Theft", "Unauthorized access or extraction of the model.", "llm-10")}
        
        <div style="margin-top: 2rem; border-top: 1px solid var(--color-border); padding-top: 2rem;">
            ${renderExpertTopic()}
        </div>
    </div>
  `,
    init: () => { }
};

function renderExpertTopic() {
    return `
    <div class="glass-panel" style="margin-bottom: 1rem; padding: 1.5rem; border-color: var(--color-danger); background: rgba(244, 63, 94, 0.05);">
        <div class="flex items-center justify-between" style="flex-wrap: wrap; gap: 1rem;">
            <div>
                <h3 class="card-title" style="margin: 0; color: var(--color-danger);">👹 EXPERT: API Interception</h3>
                <p class="card-desc" style="margin: 0.5rem 0 0 0;">Advanced flaws requiring <strong>Burp Suite</strong> or Proxy interception.</p>
            </div>
            <div class="flex" style="gap: 0.5rem;">
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-llm-expert-1')">Role Tampering</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-llm-expert-2')">Header Injection</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-llm-expert-3')">JSON Logic</button>
            </div>
        </div>
    </div>
    `;
}

function renderTopic(title, desc, idBase, hasActiveLab = false) {
    const beginnerRoute = `lab-${idBase}-beginner`;

    return `
    <div class="glass-panel" style="margin-bottom: 1rem; padding: 1.5rem;">
        <div class="flex items-center justify-between" style="flex-wrap: wrap; gap: 1rem;">
            <div>
                <h3 class="card-title" style="margin: 0;">${title}</h3>
                <p class="card-desc" style="margin: 0.5rem 0 0 0;">${desc}</p>
            </div>
            <div class="flex" style="gap: 0.5rem;">
                <button class="btn btn-sm ${hasActiveLab ? 'btn-primary' : 'btn-ghost'}" onclick="window.router.navigate('${beginnerRoute}')">Beginner</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-${idBase}-intermediate')">Intermediate</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-${idBase}-advanced')">Advanced</button>
            </div>
        </div>
    </div>
    `;
}
