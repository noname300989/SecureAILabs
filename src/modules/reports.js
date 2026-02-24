export const Reports = {
    render: () => `
    <div class="module-header fade-in">
       <h2>📄 Audit & Compliance Reports</h2>
       <p class="card-desc">Generate enterprise audit artifacts aligned with standards.</p>
    </div>
    
    <div class="grid grid-2 fade-in">
       <div class="glass-panel">
          <h3 class="card-title">Report Configuration</h3>
          <form onsubmit="event.preventDefault(); document.getElementById('report-preview').style.display='block';">
            <label>Standards to Map</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
               <label class="flex items-center" style="margin:0"><input type="checkbox" checked> OWASP MCP Top 10</label>
               <label class="flex items-center" style="margin:0"><input type="checkbox" checked> NIST AI RMF (Govern, Map, Measure)</label>
               <label class="flex items-center" style="margin:0"><input type="checkbox"> ISO/IEC 42001</label>
            </div>
            
            <label>Format</label>
            <select>
               <option>PDF (Executive Summary)</option>
               <option>JSON (Machine Readable)</option>
               <option>HTML (Interactive)</option>
            </select>
            
            <button class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">Generate Artifacts</button>
          </form>
       </div>
       
       <div class="glass-panel" id="report-preview" style="display: none;">
           <h3 class="card-title">Preview: audit_report_2024.json</h3>
           <div class="console-output" style="height: 300px; color: #94a3b8;">
{
  "audit_id": "aud_8f92a3",
  "timestamp": "${new Date().toISOString()}",
  "scope": "SecureFlow Labs Simulation",
  "compliance_matrix": {
    "OWASP_MCP_01": {
      "status": "MITIGATED",
      "control_id": "CTRL-882",
      "evidence": "Prompt Hardening implementation verified."
    },
    "NIST_AI_RMF_MAP_1": {
      "status": "COMPLIANT",
      "description": "Context capabilities mapped and bounded."
    }
  },
  "risk_summary": {
    "critical_count": 0,
    "high_count": 0,
    "residual_risk": "LOW"
  }
}
           </div>
           <button class="btn btn-ghost" style="width: 100%; margin-top: 1rem;">Download File</button>
       </div>
    </div>
  `,
    init: () => { }
};
