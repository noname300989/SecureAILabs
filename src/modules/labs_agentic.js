
export const LabsAgentic = {
    render: () => `
    <div class="module-header fade-in">
      <h2>🕴️ OWASP Top 10 for Agentic Applications (2026)</h2>
      <p class="card-desc">Advanced labs for autonomous agents and multi-agent systems.</p>
      <button class="btn btn-ghost" onclick="window.router.navigate('labs')">← Back to Labs</button>
    </div>
    
    <div class="grid grid-1 fade-in">
        ${renderTopic("AGE01: Autonomous Action Loop", "Agents entering infinite or destructive loops.", "age-01")}
        ${renderTopic("AGE02: Goal Misalignment", "Agent pursuing goals in unintended, harmful ways.", "age-02")}
        ${renderTopic("AGE03: Tool Access Control Failure", "Agents using tools they shouldn't have access to.", "age-03")}
        ${renderTopic("AGE04: Multi-Agent Logic Flaw", "Race conditions and conflicts between agents.", "age-04")}
        ${renderTopic("AGE05: Memory/Context Corruption", "Injecting false memories or context into agents.", "age-05")}
        ${renderTopic("AGE06: Human-in-the-Loop Bypass", "Circumventing required human approval steps.", "age-06")}
        ${renderTopic("AGE07: Environment Manipulation", "Altering the environment to mislead the agent.", "age-07")}
        ${renderTopic("AGE08: Agent Identity Spoofing", "Impersonating an agent to another agent.", "age-08")}
        ${renderTopic("AGE09: Resource Exhaustion (Agent DoS)", "Overloading agent cognitive or compute resources.", "age-09")}
        ${renderTopic("AGE10: Unintended Side Effects", "Collateral damage from agent actions.", "age-10")}
    </div>
  `,
    init: () => { }
};

function renderTopic(title, desc, idBase) {
    return `
    <div class="glass-panel" style="margin-bottom: 1rem; padding: 1.5rem;">
        <div class="flex items-center justify-between" style="flex-wrap: wrap; gap: 1rem;">
            <div>
                <h3 class="card-title" style="margin: 0;">${title}</h3>
                <p class="card-desc" style="margin: 0.5rem 0 0 0;">${desc}</p>
            </div>
            <div class="flex" style="gap: 0.5rem;">
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-${idBase}-beginner')">Beginner</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-${idBase}-intermediate')">Intermediate</button>
                <button class="btn btn-sm btn-ghost" onclick="window.router.navigate('lab-${idBase}-advanced')">Advanced</button>
            </div>
        </div>
    </div>
    `;
}
