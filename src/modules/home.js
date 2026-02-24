export function renderHome() {
  return `
    <div class="module-header fade-in">
      <h1 style="font-size: 3.5rem; background: linear-gradient(to right, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem;">SecureFlow AI</h1>
      <h2>AppSec for the AI Era</h2>
      <p class="card-desc" style="font-size: 1.2rem; max-width: 600px; margin: 0 auto; margin-bottom: 2rem;">
        Master the art of securing AI systems. Learn to exploit, harden, and certify your skills.
        <br><span style="opacity: 0.7; font-size: 0.9rem;">(Simulated Educational Environment)</span>
      </p>
      <div class="flex items-center" style="justify-content: center; gap: 1rem; margin-top: 2rem;">
        <button class="btn btn-primary" onclick="window.router.navigate('labs')">
          <span>Start Hacking (Simulated)</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
    
    <div class="grid grid-2 fade-in" style="animation-delay: 0.1s; margin-top: 4rem;">
      <div class="glass-panel" onclick="window.router.navigate('labs')" style="cursor:pointer; position: relative; overflow: hidden;">
        <div style="position: absolute; top:0; right:0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.2), transparent 70%);"></div>
        <span class="badge badge-red">Module 1</span>
        <h3 class="card-title" style="margin-top:0.5rem">🔴 Advanced Labs</h3>
        <p class="card-desc">Explore OWASP Top 10 for LLMs, Agentic AI, and MCP protocols.</p>
      </div>
      

      
      <div class="glass-panel" onclick="window.router.navigate('training')" style="cursor:pointer; position: relative; overflow: hidden;">
        <div style="position: absolute; top:0; right:0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(6, 182, 212, 0.2), transparent 70%);"></div>
        <span class="badge badge-blue">Module 3</span>
        <h3 class="card-title" style="margin-top:0.5rem">🎓 Training Mode</h3>
        <p class="card-desc">Interactive scenarios to text your knowledge. Beginner to Advanced.</p>
      </div>
      
      <div class="glass-panel" onclick="window.router.navigate('certification')" style="cursor:pointer; position: relative; overflow: hidden;">
        <div style="position: absolute; top:0; right:0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.2), transparent 70%);"></div>
        <span class="badge badge-blue" style="border-color: rgba(139, 92, 246, 0.3); color: #c4b5fd; background: rgba(139, 92, 246, 0.1);">Module 4</span>
        <h3 class="card-title" style="margin-top:0.5rem">🏅 Certification</h3>
        <p class="card-desc">Validate your skills. Earn CAISA, CPID, and CLSA badges.</p>
      </div>

       <div class="glass-panel" onclick="window.router.navigate('reports')" style="cursor:pointer; position: relative; overflow: hidden;">
        <div style="position: absolute; top:0; right:0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.2), transparent 70%);"></div>
        <span class="badge badge-blue" style="border-color: rgba(139, 92, 246, 0.3); color: #c4b5fd; background: rgba(139, 92, 246, 0.1);">Module 5</span>
        <h3 class="card-title" style="margin-top:0.5rem">📄 Audit Reports</h3>
        <p class="card-desc">Generate Compliance-ready audit reports (OWASP MCP, NIST AI RMF).</p>
      </div>
    </div>
  `;
}
