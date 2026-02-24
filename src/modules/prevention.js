
const defenses = {
    mcp01: {
        title: "Defending Prompt Injection",
        vulnerability: "MCP-01",
        controls: [
            { id: "c1", name: "Prompt Hardening (Delimiters)", impact: "Reduces risk by clearly separating instructions from data." },
            { id: "c2", name: "Parametrization / ChatML", impact: "Eliminates injection surface by structuring messages." }
        ],
        outcome: "Input is treated strictly as data, not instructions. The model refuses to execute the payload."
    },
    mcp04: {
        title: "Defending Unsafe Tools",
        vulnerability: "MCP-04",
        controls: [
            { id: "c3", name: "Human-in-the-loop", impact: "Ensures sensitive actions require approval." },
            { id: "c4", name: "Strict Input Validation (Schema)", impact: "Prevents malformed or malicious arguments." }
        ],
        outcome: "Tool execution is blocked pending user approval. Invalid arguments are rejected before reaching the tool."
    }
};

export const Prevention = {
    render: () => `
    <div class="module-header fade-in">
      <h2>🟢 Prevention & Hardening Labs</h2>
      <p class="card-desc">Teach secure-by-design patterns to prevent vulnerabilities.</p>
    </div>
    
    <div class="lab-interface fade-in">
      <div class="glass-panel">
        <h3 class="card-title">Security Controls</h3>
        <form id="prev-form">
          <label>Select Scenario to Harden</label>
          <select id="scenario-select">
            <option value="mcp01">MCP-01: Prompt Injection</option>
            <option value="mcp04">MCP-04: Unsafe Tools</option>
          </select>
          
          <div id="controls-container" style="margin-top: 1.5rem;">
            <!-- controls injected via JS -->
          </div>
          
          <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.2);">
            <h4 style="font-size: 0.9rem; color: #6ee7b7; margin-bottom: 0.5rem;">Secure Architecture Preview</h4>
            <p style="font-size: 0.8rem; color: #d1fae5;">
              Applying these controls modifies the system architecture to enforce trust boundaries and input validation.
            </p>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem; background: var(--color-success); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
            Apply Defenses & Verify
          </button>
        </form>
      </div>
      
      <div class="glass-panel">
        <h3 class="card-title">Hardened Output</h3>
        <div id="prev-output" class="console-output" style="border-color: var(--color-success)">
          <span style="color: #64748b;">// Apply controls to see the difference...</span>
        </div>
      </div>
    </div>
  `,
    init: () => {
        const scenarioSelect = document.getElementById('scenario-select');
        const controlsContainer = document.getElementById('controls-container');
        const form = document.getElementById('prev-form');

        function updateControls() {
            const val = scenarioSelect.value;
            const data = defenses[val];
            controlsContainer.innerHTML = `<label>Available Controls</label>` +
                data.controls.map(c => `
          <div class="flex items-center" style="margin-bottom: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: var(--radius-sm);">
            <input type="checkbox" id="${c.id}" checked style="width: auto; margin:0;">
            <div style="margin-left: 0.5rem;">
              <div style="font-weight: 500; font-size: 0.9rem;">${c.name}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${c.impact}</div>
            </div>
          </div>
        `).join('');
        }

        scenarioSelect.addEventListener('change', updateControls);
        updateControls(); // init

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = scenarioSelect.value;
            const data = defenses[val];
            const output = document.getElementById('prev-output');

            output.innerHTML = `
        <div class="fade-in">
          <div style="color: #6ee7b7; font-weight: bold; margin-bottom: 0.5rem;">[SECURE] Attack Mitigated</div>
          
          <div style="margin-bottom: 0.5rem;">
             <span style="color: #94a3b8;">Controls Applied:</span><br>
             All selected controls active.
          </div>
          
          <div style="margin-bottom: 0.5rem;">
            <span style="color: #94a3b8;">Outcome:</span><br>
            <span style="color: #d1fae5;">${data.outcome}</span>
          </div>

          <div style="margin-top: 1rem; border-top: 1px solid #334155; padding-top: 0.5rem;">
             <span style="color: #94a3b8;">Residual Risk:</span> <span class="badge badge-green">Low</span>
          </div>
        </div>
      `;
        });
    }
};
