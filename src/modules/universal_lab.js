
import { llmLabsData } from '../data/db_llm_labs.js';
import { agenticLabsData } from '../data/db_agentic_labs.js';
import { mcpLabsData } from '../data/db_mcp_labs.js';

/* Combined Data Source */
const allLabs = {
    ...llmLabsData,
    ...agenticLabsData,
    ...mcpLabsData
};

export const UniversalLab = {
    state: {
        messages: [],
        labId: null,
        status: 'active' // active, solved
    },

    render: (id) => {
        const lab = allLabs[id];
        UniversalLab.state.labId = id;

        // Reset state if new lab (simple check)
        const isNewSession = !UniversalLab.state.messages.length || UniversalLab.state.messages[0].labId !== id;
        if (isNewSession && lab) {
            UniversalLab.state.messages = [{
                role: 'system',
                text: lab.initialMessage || 'System Online.',
                labId: id
            }];
            UniversalLab.state.status = 'active';
        }

        if (!lab) {
            return render404(id);
        }

        return `
        <div class="module-header fade-in">
          <div class="flex items-center" style="gap: 1rem; justify-content: center; margin-bottom: 1rem;">
             <span class="badge badge-blue">${lab.type.toUpperCase()} LAB</span>
             <span class="badge badge-${getDifficultyColor(lab.difficulty)}">${lab.difficulty}</span>
          </div>
          <h2>${lab.title}</h2>
          <p class="card-desc" style="max-width: 700px; margin: 0 auto;">${lab.objective}</p>
          <button class="btn btn-ghost" onclick="window.history.back()">← Exit Lab</button>
        </div>

        <div class="container fade-in" style="max-width: 900px; margin: 0 auto;">
            ${renderInterface(lab)}
        </div>
        `;
    },

    init: () => {
        const lab = allLabs[UniversalLab.state.labId];
        if (!lab) return;

        if (lab.type === 'chat') {
            setupChat(lab);
        } else if (lab.type === 'console') {
            setupConsole(lab);
        } else if (lab.type === 'dashboard') {
            setupDashboard(lab);
        }
    }
};

/* --- Render Helpers --- */

function render404(id) {
    return `
    <div class="module-header fade-in">
      <h2>Lab Not Found</h2>
      <p>ID: ${id}</p>
      <button class="btn btn-primary" onclick="window.history.back()">Go Back</button>
    </div>`;
}

function getDifficultyColor(diff) {
    if (diff === 'Beginner') return 'green';
    if (diff === 'Intermediate') return 'yellow';
    return 'red';
}

function renderInterface(lab) {
    if (lab.type === 'chat') {
        return `
        <div class="glass-panel" style="height: 60vh; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
            <div id="chat-history" style="flex: 1; padding: 1.5rem; overflow-y: auto; background: rgba(0,0,0,0.2);">
                ${UniversalLab.state.messages.map(m => `
                    <div class="chat-msg ${m.role}">
                        <div class="chat-bubble ${m.role}">
                            ${lab.unsafeOutput ? m.text : escapeHtml(m.text)}
                        </div>
                    </div>
                `).join('')}
            </div>
            <form id="chat-form" style="display: flex; gap: 1rem; padding: 1rem; border-top: 1px solid var(--color-border); background: var(--color-card-bg);">
                <input type="text" id="chat-input" placeholder="Type your message..." style="flex: 1; margin: 0;" autocomplete="off">
                <button type="submit" class="btn btn-primary">Send</button>
            </form>
        </div>
        `;
    }

    if (lab.type === 'console') {
        return `
        <div class="glass-panel" style="font-family: monospace; padding: 2rem;">
            <div id="console-output" style="min-height: 300px; margin-bottom: 1rem; color: #10b981;">
                > System initialized.<br>
                > ${lab.initialMessage}<br>
            </div>
            <div class="flex">
                <span style="color: #10b981; margin-right: 10px; align-self: center;">$</span>
                <input type="text" id="console-input" style="flex: 1; background: transparent; border: none; font-family: monospace; color: white;" autofocus>
            </div>
        </div>
        `;
    }

    if (lab.type === 'dashboard') {
        return `
        <div class="glass-panel">
            <h3>Administrative Panel</h3>
            <p>${lab.initialMessage}</p>
            <div style="margin: 2rem 0; padding: 2rem; border: 2px dashed var(--color-border); border-radius: 8px; text-align: center;">
                ${lab.uiType === 'feedback_form' ? '<input type="text" placeholder="Enter Feedback..." id="dash-input"><button class="btn btn-primary" id="dash-submit">Submit</button>' : ''}
                ${lab.uiType === 'upload_interface' ? '<button class="btn btn-ghost" id="dash-submit">📁 Upload Dataset</button>' : ''}
                ${lab.uiType === 'dataset_editor' ? '<textarea id="dash-input" placeholder="Row ID, Content, Label..." style="width: 100%; height: 100px;"></textarea><button class="btn btn-primary" id="dash-submit">Save Changes</button>' : ''}
                
                ${lab.uiType === 'api_trigger' ? `
                    <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 4px; font-family: monospace; margin-bottom: 1rem;">
                        <div><strong>${lab.method}</strong> ${lab.endpoint}</div>
                        ${lab.headers ? `<div>Headers: ${JSON.stringify(lab.headers)}</div>` : ''}
                        ${lab.body ? `<div>Body: ${JSON.stringify(lab.body, null, 2)}</div>` : ''}
                    </div>
                    <button class="btn btn-primary" id="dash-submit" style="width: 100%;">🚀 Send Request</button>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.7;">(Intercept this request with your Proxy)</p>
                ` : ''}
            </div>
            <div id="dash-result"></div>
        </div>
        `;
    }

    return `<div>Unknown Lab Type</div>`;
}

/* --- Logic Handlers --- */

function setupChat(lab) {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const historyDiv = document.getElementById('chat-history');

    // Scroll to bottom
    historyDiv.scrollTop = historyDiv.scrollHeight;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = input.value.trim();
        if (!msg) return;

        // User Message
        UniversalLab.state.messages.push({ role: 'user', text: msg, labId: UniversalLab.state.labId });

        // AI Response (Simulated Delay)
        /* Ideally we would re-render the whole component here, but for speed we append DOM */
        appendMessage('user', msg);
        input.value = '';
        historyDiv.scrollTop = historyDiv.scrollHeight;

        setTimeout(() => {
            let response = "Error: Logic not defined.";
            if (lab.vulnLogic) {
                const res = lab.vulnLogic(msg, UniversalLab.state.messages);
                if (typeof res === 'object' && res.type === 'system_crash') {
                    response = "SYSTEM CRASH: " + res.msg;
                    // Handle crash UI
                } else {
                    response = res;
                }
            }
            UniversalLab.state.messages.push({ role: 'system', text: response, labId: UniversalLab.state.labId });
            appendMessage('system', response, lab.unsafeOutput);
            historyDiv.scrollTop = historyDiv.scrollHeight;
        }, 600);
    });
}

function appendMessage(role, text, unsafe = false) {
    const historyDiv = document.getElementById('chat-history');
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = `<div class="chat-bubble ${role}">${unsafe ? text : escapeHtml(text)}</div>`;
    historyDiv.appendChild(div);
}

function setupConsole(lab) {
    const input = document.getElementById('console-input');
    const output = document.getElementById('console-output');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value;
            output.innerHTML += `> ${escapeHtml(cmd)}<br>`;
            input.value = '';

            let response = "Command not recognized.";
            if (lab.validPackages && cmd.startsWith('install ')) {
                const pkg = cmd.split(' ')[1];
                if (lab.validPackages.includes(pkg)) {
                    response = `Installing ${pkg}... Done.`;
                    const result = lab.checkSuccess && lab.checkSuccess(pkg);
                    if (result) {
                        const successMsg = typeof result === 'string' ? result : '[EXPLOIT SUCCESSFUL]';
                        response += ` <span style="color:var(--color-success)">${successMsg}</span>`;
                    }
                } else {
                    response = `Package ${pkg} not found.`;
                }
            } else if (lab.checkSuccess) {
                const result = lab.checkSuccess(cmd);
                if (result) {
                    const successMsg = typeof result === 'string' ? result : '[Success Condition Met]';
                    response = `Command executed successfully. <span style='color:var(--color-success)'>${successMsg}</span>`;
                } else {
                    response = "Command executed. (No effect observed)";
                }
            } else if (lab.successCondition) {
                // Simplified generic console
                response = "Executing...";
            }

            setTimeout(() => {
                output.innerHTML += `<span style="opacity:0.7">${response}</span><br>`;
                output.scrollTop = output.scrollHeight;
            }, 300);
        }
    });
}


function setupDashboard(lab) {
    const btn = document.getElementById('dash-submit');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const resDiv = document.getElementById('dash-result');
        resDiv.innerHTML = '<span class="loading">Processing...</span>';

        if (lab.uiType === 'api_trigger') {
            // Real fetch for Burp interception
            try {
                const options = {
                    method: lab.method || 'POST',
                    headers: { 'Content-Type': 'application/json', ...(lab.headers || {}) },
                    body: lab.body ? JSON.stringify(lab.body) : undefined
                };

                // We use relative path so it hits localhost:3000 via proxy if configured or direct
                const req = await fetch(`http://localhost:3000${lab.endpoint}`, options);
                const data = await req.json();

                resDiv.innerHTML = `
                    <div class="glass-panel" style="background: rgba(0,0,0,0.4);">
                        <h4>Response: ${req.status}</h4>
                        <pre style="color: ${data.flag ? '#86efac' : '#cbd5e1'}">${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;
            } catch (err) {
                resDiv.innerHTML = `<div class="alert alert-danger">Connection Error: ${err.message}. Ensure Server is running.</div>`;
            }
            return;
        }

        // SIMULATED LABS (Previous Logic)
        const input = document.getElementById('dash-input');
        const val = input ? input.value : 'upload_trigger';

        setTimeout(() => {
            if (lab.checkSuccess && lab.checkSuccess(val)) {
                resDiv.innerHTML = '<div class="alert alert-success">Vulnerability exploited! (Simulation)</div>';
            } else {
                resDiv.innerHTML = '<div class="alert alert-info">Action processed safely.</div>';
            }
        }, 1000);
    });
}

function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
