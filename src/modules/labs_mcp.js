
export const LabsMCP = {
    render: () => `
    <div class="module-header fade-in">
      <h2>🔌 OWASP Top 10 for MCP (Model Context Protocol)</h2>
      <p class="card-desc">Securing the protocol that connects models to data and tools.</p>
      <button class="btn btn-ghost" onclick="window.router.navigate('labs')">← Back to Labs</button>
    </div>
    
    <div class="grid grid-1 fade-in">
        ${renderTopic("MCP01: Context Leaking", "Unauthorized exposure of context data.", "mcp-01")}
        ${renderTopic("MCP02: Unauthorized Context Access", "Accessing context without proper permissions.", "mcp-02")}
        ${renderTopic("MCP03: Protocol Downgrade Attack", "Forcing insecure protocol versions.", "mcp-03")}
        ${renderTopic("MCP04: Context Injection", "Malicious data inserted into the context stream.", "mcp-04")}
        ${renderTopic("MCP05: State Desynchronization", "Exploiting state mismatches between client/server.", "mcp-05")}
        ${renderTopic("MCP06: Header Manipulation", "Spoofing or altering MCP headers.", "mcp-06")}
        ${renderTopic("MCP07: Improper Session Management", "Hijacking or fixating MCP sessions.", "mcp-07")}
        ${renderTopic("MCP08: Insecure Data Serialization", "Deserialization attacks within the protocol.", "mcp-08")}
        ${renderTopic("MCP09: Broken Access Control", "Bypassing restrictions on resources.", "mcp-09")}
        ${renderTopic("MCP10: API Abuse", "Rate limiting and logic flaws in MCP endpoints.", "mcp-10")}
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
