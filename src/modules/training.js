
import { trainingData } from '../data/db_training.js';
import { studyGuideData } from '../data/db_study_guide.js';

export const Training = {
  state: {
    activeTab: 'study' // 'study' or 'quiz'
  },

  render: () => {
    return `
    <div class="module-header fade-in">
      <h2>🎓 Training & Certification Prep</h2>
      <p class="card-desc">Review the curriculum or test your knowledge. (v2.0)</p>
      
      <div class="flex justify-center" style="margin-top: 2rem; gap: 1rem;">
          <button class="btn ${Training.state.activeTab === 'study' ? 'btn-primary' : 'btn-ghost'}" id="tab-study">📚 Study Guide</button>
          <button class="btn ${Training.state.activeTab === 'quiz' ? 'btn-primary' : 'btn-ghost'}" id="tab-quiz">📝 Practice Quiz</button>
      </div>
    </div>
    
    <div class="container fade-in" id="training-content" style="max-width: 900px; margin: 0 auto;">
      ${Training.state.activeTab === 'study' ? renderStudyGuide() : renderQuiz()}
    </div>
  `;
  },

  init: () => {
    // Tab switching logic
    const btnStudy = document.getElementById('tab-study');
    const btnQuiz = document.getElementById('tab-quiz');

    if (btnStudy && btnQuiz) {
      btnStudy.addEventListener('click', () => {
        Training.state.activeTab = 'study';
        updateContent();
      });
      btnQuiz.addEventListener('click', () => {
        Training.state.activeTab = 'quiz';
        updateContent();
      });
    }

    if (Training.state.activeTab === 'quiz') {
      initQuizLogic();
    }
  }
};

function updateContent() {
  const container = document.getElementById('training-content');
  const btnStudy = document.getElementById('tab-study');
  const btnQuiz = document.getElementById('tab-quiz');

  // Update buttons
  if (Training.state.activeTab === 'study') {
    btnStudy.className = 'btn btn-primary';
    btnQuiz.className = 'btn btn-ghost';
    container.innerHTML = renderStudyGuide();
  } else {
    btnStudy.className = 'btn btn-ghost';
    btnQuiz.className = 'btn btn-primary';
    container.innerHTML = renderQuiz();
    initQuizLogic();
  }
}

function renderStudyGuide() {
  return `
        <div class="grid" style="gap: 3rem;">
            ${renderSection(studyGuideData.llm, 'llm')}
            ${renderSection(studyGuideData.agentic, 'agentic')}
            ${renderSection(studyGuideData.mcp, 'mcp')}
        </div>
    `;
}

function renderSection(data, type) {
  let color = type === 'llm' ? 'blue' : (type === 'agentic' ? 'red' : 'green');
  return `
    <div>
        <div class="flex items-center" style="margin-bottom: 1.5rem;">
            <span class="badge badge-${color}" style="font-size: 1rem; padding: 0.5rem 1rem;">${data.title}</span>
        </div>
        <p style="margin-bottom: 2rem; color: var(--color-text-muted);">${data.description}</p>
        
        <div class="grid grid-1" style="gap: 1.5rem;"> 
            ${data.topics.map(t => `
                <div class="glass-panel" style="padding: 1.5rem;">
                    <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
                        <h3 style="margin:0; color: white;">${t.id}: ${t.name}</h3>
                    </div>
                    
                    <p style="font-size: 1rem; color: #e2e8f0; margin-bottom: 1rem;"><strong>Definition:</strong> ${t.def}</p>
                    
                    ${t.details ? `<p style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 1.5rem; line-height: 1.6;">${t.details}</p>` : ''}

                    <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #86efac;">🛡️ Prevention & Mitigation</h4>
                        <p style="margin: 0; color: #cbd5e1;">${t.prevention}</p>
                    </div>

                    <div class="flex wrap" style="gap: 0.8rem; margin-top: 1rem; border-top: 1px solid var(--color-border); padding-top: 1rem;">
                         ${t.youtube ? `<a href="${t.youtube}" target="_blank" class="btn btn-sm btn-ghost" style="color: #f87171;">📺 Watch Tutorial</a>` : ''}
                         ${t.github ? `<a href="${t.github}" target="_blank" class="btn btn-sm btn-ghost" style="color: #fff;">🐙 Exploits/PoC</a>` : ''}
                         ${t.resources ? t.resources.map(r => `<a href="${r.url}" target="_blank" class="btn btn-sm btn-ghost" style="color: #60a5fa;">🔗 ${r.label}</a>`).join('') : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

function renderQuiz() {
  return trainingData.map((q, idx) => `
        <div class="glass-panel" style="margin-bottom: 2rem;">
          <div class="flex items-center justify-between" style="margin-bottom: 1rem;">
             <h3 class="card-title" style="margin:0;">Question ${idx + 1}</h3>
             <span class="badge badge-blue">${q.category}</span>
          </div>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${q.q}</p>
          
          <div class="grid grid-2" id="q-${idx}-options">
            ${q.options.map((opt, oIdx) => `
              <button class="btn btn-ghost option-btn" data-q="${idx}" data-o="${oIdx}" style="justify-content: flex-start; text-align: left;">
                ${opt}
              </button>
            `).join('')}
          </div>
          
          <div id="feedback-${idx}" style="margin-top: 1.5rem; display: none; padding: 1rem; border-radius: var(--radius-sm);"></div>
        </div>
      `).join('');
}

function initQuizLogic() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qIdx = parseInt(btn.getAttribute('data-q'));
      const oIdx = parseInt(btn.getAttribute('data-o'));
      const question = trainingData[qIdx];
      const feedbackEl = document.getElementById(`feedback-${qIdx}`);

      // Disable other buttons for this question
      document.querySelectorAll(`.option-btn[data-q="${qIdx}"]`).forEach(b => {
        b.disabled = true;
        if (parseInt(b.getAttribute('data-o')) === question.correct) {
          b.style.background = 'rgba(16, 185, 129, 0.2)';
          b.style.borderColor = 'var(--color-success)';
        } else if (parseInt(b.getAttribute('data-o')) === oIdx && oIdx !== question.correct) {
          b.style.background = 'rgba(239, 68, 68, 0.2)';
          b.style.borderColor = 'var(--color-danger)';
        }
      });

      feedbackEl.style.display = 'block';
      if (oIdx === question.correct) {
        feedbackEl.style.background = 'rgba(16, 185, 129, 0.1)';
        feedbackEl.innerHTML = `<strong style="color: var(--color-success)">Correct!</strong><br>${question.explanation}`;
      } else {
        feedbackEl.style.background = 'rgba(239, 68, 68, 0.1)';
        feedbackEl.innerHTML = `<strong style="color: var(--color-danger)">Incorrect.</strong><br>${question.explanation}`;
      }
    });
  });
}
