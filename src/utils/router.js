
import { renderHome } from '../modules/home.js';
import { Vulnerable } from '../modules/vulnerable.js';
import { Prevention } from '../modules/prevention.js';
import { Training } from '../modules/training.js';
import { Certification } from '../modules/certification.js';
import { Reports } from '../modules/reports.js';
import { Labs } from '../modules/labs.js';

import { LabsLLM } from '../modules/labs_llm.js';
import { LabsAgentic } from '../modules/labs_agentic.js';
import { LabsMCP } from '../modules/labs_mcp.js';
import { UniversalLab } from '../modules/universal_lab.js';

const routes = {
  home: { render: renderHome, init: () => { } },
  training: Training,
  certification: Certification,
  reports: Reports,
  labs: Labs,
  'labs-llm': LabsLLM,
  'labs-agentic': LabsAgentic,
  'labs-mcp': LabsMCP,

};

export class Router {
  constructor(appElement) {
    this.app = appElement;
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    let module = routes[hash];

    // Dynamic Route Handling for Labs
    if (!module && hash.startsWith('lab-')) {
      module = UniversalLab;
    }

    if (!module) {
      module = routes['home'];
    }

    window.scrollTo(0, 0);

    this.app.innerHTML = `
      ${this.renderNavbar(hash)}
      <div class="container fade-in">
        ${module.render(hash)}
      </div>
      <footer style="text-align: center; color: var(--color-text-muted); padding: 2rem; margin-top: 4rem; border-top: 1px solid var(--color-border); font-size: 0.9rem;">
        <p>SecureFlow AI Security Labs &copy; 2025</p>
      </footer>
    `;

    if (module.init) {
      setTimeout(() => module.init(), 0);
    }
  }

  renderNavbar(currentHash) {
    const links = [
      { id: 'labs', label: 'Advanced Labs' },
      { id: 'training', label: 'Training' },
      { id: 'certification', label: 'Certify' },
    ];

    return `
      <nav class="navbar container">
        <a href="#home" class="logo">
          <span style="font-size: 1.5rem; margin-right: 0.5rem;">🛡️</span> SecureFlow
        </a>
        <div class="nav-links">
          ${links.map(l => `
            <a href="#${l.id}" class="nav-link ${currentHash === l.id ? 'active' : ''}">${l.label}</a>
          `).join('')}
        </div>
      </nav>
    `;
  }
}
