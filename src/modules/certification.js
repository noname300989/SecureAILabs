
import { certificationExams } from '../data/db_certification.js';

export const Certification = {
   state: {
      status: 'start', // start, taking, result
      activeExamId: null,
      userAnswers: {}, // { 0: 1, 1: 0 ... }
      passedExams: [] // ['CAISA']
   },

   render: () => {
      const { status, activeExamId } = Certification.state;

      if (status === 'start') {
         return renderDashboard();
      } else if (status === 'taking') {
         return renderExam(activeExamId);
      } else if (status === 'result') {
         return renderResult();
      }
   },

   init: () => {
      const { status } = Certification.state;
      if (status === 'start') {
         // Attach listeners to start buttons
         ['CAISA', 'CPID', 'CLSA', 'CASE'].forEach(id => {
            const btn = document.getElementById(`btn-start-${id}`);
            if (btn && !btn.disabled) {
               btn.addEventListener('click', () => {
                  Certification.state.activeExamId = id;
                  Certification.state.status = 'taking';
                  Certification.state.userAnswers = {};
                  window.router.handleRoute(); // re-render
               });
            }
         });
      } else if (status === 'taking') {
         // Attach listeners to options and submit
         document.querySelectorAll('.exam-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
               const qIdx = parseInt(btn.getAttribute('data-q'));
               const oIdx = parseInt(btn.getAttribute('data-o'));

               // visually select
               document.querySelectorAll(`.exam-option[data-q="${qIdx}"]`).forEach(b => {
                  b.classList.remove('btn-primary');
                  b.classList.add('btn-ghost');
               });
               btn.classList.remove('btn-ghost');
               btn.classList.add('btn-primary');

               Certification.state.userAnswers[qIdx] = oIdx;
            });
         });

         document.getElementById('btn-submit-exam').addEventListener('click', () => {
            Certification.state.status = 'result';
            window.router.handleRoute();
         });
      } else if (status === 'result') {
         document.getElementById('btn-return').addEventListener('click', () => {
            Certification.state.status = 'start';
            Certification.state.activeExamId = null;
            Certification.state.userAnswers = {};
            window.router.handleRoute();
         });
      }
   }
};

function renderDashboard() {
   const passed = Certification.state.passedExams;
   // Unlock all exams strictly for user request
   const canTakeCpid = true;
   const canTakeClsa = true;
   const canTakeCase = true;

   return `
    <div class="module-header fade-in">
      <h2>🏅 Certification Engine</h2>
      <p class="card-desc">Validate your skills. Earn industry-recognized (simulated) badges.</p>
    </div>
    
    <div class="flex wrap justify-between fade-in" style="justify-content: center; gap: 2rem;">
       ${renderBadgeCard('CAISA', '🛡️', 'Certified AI Security Associate', 'Foundational knowledge of AI architecture and basic risks.', true, passed.includes('CAISA'))}
       ${renderBadgeCard('CPID', '🕵️', 'Certified Prompt Injection Defender', 'Advanced skills in detecting and mitigating prompt injection attacks.', canTakeCpid, passed.includes('CPID'))}
       ${renderBadgeCard('CLSA', '🏗️', 'Certified LLM Security Architect', 'Expert-level secure design of complex Agentic and RAG systems.', canTakeClsa, passed.includes('CLSA'))}
       ${renderBadgeCard('CASE', '👑', 'Certified AI Security Expert', 'Master-level adversarial simulation, math-proven defenses, and red teaming.', canTakeCase, passed.includes('CASE'))}
    </div>
  `;
}

function renderBadgeCard(id, icon, title, desc, unlocked, passed) {
   let btnHtml;
   if (passed) {
      btnHtml = `<button class="btn btn-ghost" style="color: var(--color-success); border-color: var(--color-success);" disabled>✅ Certified</button>`;
   } else if (unlocked) {
      btnHtml = `<button class="btn btn-primary" id="btn-start-${id}">Take Exam</button>`;
   } else {
      btnHtml = `<button class="btn btn-ghost" disabled>🔒 Locked</button>`;
   }

   return `
       <div class="glass-panel" style="text-align: center; max-width: 350px; display: flex; flex-direction: column; align-items: center; ${!unlocked ? 'opacity: 0.6;' : ''}">
          <div style="font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));">${icon}</div>
          <h3 class="card-title">${id}</h3>
          <p style="color: #a5b4fc; font-weight: 600; margin-bottom: 0.5rem;">${title}</p>
          <p class="card-desc">${desc}</p>
          <div style="margin-top: auto;">
             ${btnHtml}
          </div>
       </div>
    `;
}

function renderExam(id) {
   const exam = certificationExams[id];
   return `
        <div class="module-header fade-in">
            <h2>📝 ${id} Exam</h2>
            <p class="card-desc">Answer all questions to pass. Passing Score: ${exam.passingScore}/${exam.questions.length}</p>
        </div>
        <div class="container fade-in" style="max-width: 800px;">
            ${exam.questions.map((q, idx) => `
                <div class="glass-panel" style="margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>Q${idx + 1}:</strong> ${q.q}</p>
                    <div class="grid grid-2">
                        ${q.options.map((opt, oIdx) => `
                            <button class="btn btn-ghost exam-option" data-q="${idx}" data-o="${oIdx}" style="justify-content: flex-start; text-align: left;">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" id="btn-submit-exam" style="padding: 1rem 3rem; font-size: 1.2rem;">Submit Exam</button>
            </div>
        </div>
    `;
}

function renderResult() {
   const id = Certification.state.activeExamId;
   const exam = certificationExams[id];
   const userAnswers = Certification.state.userAnswers;

   let score = 0;
   exam.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) score++;
   });

   const passed = score >= exam.passingScore;
   if (passed && !Certification.state.passedExams.includes(id)) {
      Certification.state.passedExams.push(id);
   }

   return `
        <div class="module-header fade-in">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${passed ? '🎉' : '❌'}</div>
            <h2>${passed ? 'Congratulations!' : 'Exam Failed'}</h2>
            <p class="card-desc" style="font-size: 1.5rem;">You scored ${score} / ${exam.questions.length}</p>
            
            ${passed ?
         `<div class="alert alert-success" style="display:inline-block; margin-top:1rem;">You have earned the <strong>${id}</strong> Badge!</div>` :
         `<div class="alert alert-info" style="display:inline-block; margin-top:1rem;">You need ${exam.passingScore} correct to pass. Review the material and try again.</div>`
      }

            <div style="margin-top: 3rem;">
                <button class="btn btn-primary" id="btn-return">Return to Dashboard</button>
            </div>
        </div>
    `;
}
