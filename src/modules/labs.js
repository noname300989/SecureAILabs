
export const Labs = {
  render: () => `
    <div class="module-header fade-in">
      <h2>🥷 Advanced Security Labs</h2>
      <p class="card-desc">Intercept and manipulate traffic using Burp Suite or similar tools. Find the flags.</p>
    </div>
    
    <div class="grid grid-3 fade-in">
      <div class="glass-panel" onclick="window.router.navigate('labs-llm')" style="cursor: pointer;">
         <span class="badge badge-red">OWASP LLM 2025</span>
         <h3 class="card-title">LLM Application Labs</h3>
         <p class="card-desc">Top 10 vulnerabilities for LLM apps: Injection, Output Handling, Poisoning, etc.</p>
         <button class="btn btn-primary" onclick="event.stopPropagation(); window.router.navigate('labs-llm')">View Labs</button>
      </div>
      
      <div class="glass-panel" onclick="window.router.navigate('labs-agentic')" style="cursor: pointer;">
         <span class="badge badge-red">OWASP Agentic 2026</span>
         <h3 class="card-title">Agentic AI Labs</h3>
         <p class="card-desc">Top 10 vulnerabilities for Autonomous Agents: Loops, Logic Flaws, Identity Spoofing.</p>
         <button class="btn btn-primary" onclick="event.stopPropagation(); window.router.navigate('labs-agentic')">View Labs</button>
      </div>
      
      <div class="glass-panel" onclick="window.router.navigate('labs-mcp')" style="cursor: pointer;">
         <span class="badge badge-red">OWASP MCP</span>
         <h3 class="card-title">MCP Protocol Labs</h3>
         <p class="card-desc">Top 10 vulnerabilities for Model Context Protocol: Context leaking, Injection, etc.</p>
         <button class="btn btn-primary" onclick="event.stopPropagation(); window.router.navigate('labs-mcp')">View Labs</button>
      </div>
    </div>
    
    <div class="glass-panel fade-in" style="margin-top: 2rem;">
      <h3 class="card-title">🚩 Submit Flag</h3>
      <form id="flag-form" class="flex">
        <input type="text" id="flag-input" placeholder="Start with {...}" style="margin:0;">
        <button type="submit" class="btn btn-success" style="background: var(--color-success); color: #000;">Submit</button>
      </form>
      <div id="flag-result" style="margin-top: 1rem;"></div>
    </div>
  `,
  init: () => {
    document.getElementById('flag-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const flag = document.getElementById('flag-input').value;
      try {
        const res = await fetch('http://localhost:3000/api/verify-flag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ flag })
        });
        const data = await res.json();
        const resultDiv = document.getElementById('flag-result');
        if (data.success) {
          resultDiv.innerHTML = `<span style="color: var(--color-success)">${data.message}</span>`;
        } else {
          resultDiv.innerHTML = `<span style="color: var(--color-danger)">${data.message}</span>`;
        }
      } catch (err) {
        document.getElementById('flag-result').innerHTML = `<span style="color: var(--color-danger)">Error: Correct server is not passing data? Make sure server is running on port 3000.</span>`;
      }
    });
  }
};
