/**
 * SOFIA LANGKILDE — PORTFOLIO INTERAKTION & DATA
 * Indeholder:
 * 1. Detaljeret projektdata (Beskrivelse, Min rolle, Teknologier, Læringspunkter, Resultater)
 * 2. Projekt-filtrering (Studie/Gruppe vs. Egne projekter)
 * 3. Case Study Modal-logik
 * 4. Scroll-reveal animationer via IntersectionObserver
 * 5. Mobil-navigation & Kontaktformular-håndtering
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PROJEKTDATA TIL CASE STUDY MODAL
     (Her kan du nemt tilføje eller redigere dine projekter!)
     ========================================================================== */
  const projectData = {
    "proj-1": {
      title: "Kinesthetic VR Experience & Spatial UI",
      type: "Studie- & Gruppeprojekt (Medialogi, AAU)",
      cover: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1000&q=80",
      intro: "Et interaktivt VR-spilprojekt udviklet til Meta Quest med fokus på kropslig involvering (kinesthetic agency), fysikdrevne interaktioner og rumligt 3D-lyddesign.",
      role: "Jeg var ansvarlig for design af det diegetiske 3D World Canvas UI, opsætning af brugerinteraktioner i Unity, tilpasning af sværhedsgrader samt planlægning og gennemførelse af brugerevalueringen.",
      technologies: ["Unity 6", "C#", "Meta Quest SDK", "3D Spatial Audio", "Brugertest"],
      learnings: "Jeg lærte, hvor afgørende øjeblikkelig visuel og auditiv feedback er for at skabe immersion i VR, samt hvordan man strukturerer iterative tests for at finjustere fysik og sværhedsgrad.",
      results: "En fuldt spilbar VR-prototype med signifikant højere brugerinvolvering i vores afsluttende evaluering."
    },
    "proj-2": {
      title: "Nordic Mind — Interaktiv App & Designsystem",
      type: "Eget Individuelt Projekt • UX/UI & App Design",
      cover: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
      intro: "Design af en mobilapplikation med fokus på mental ro, intuitiv navigation og et skalerbart nordisk komponentbibliotek i Figma.",
      role: "Individuelt projekt hvor jeg varetog hele UX/UI-processen: Fra indledende brugerundersøgelser og papirprototyper til wireframes, designsystem og interaktiv klik-prototype.",
      technologies: ["Figma", "Auto-Layout", "UX Research", "Wireframing", "Usability Testing"],
      learnings: "Arbejdet styrkede min evne til at validere narrative og funktionelle valg tidligt via hurtige prototyper, før man binder sig til endelig kode.",
      results: "Et komplet, responsivt designsystem og en brugervenlig prototype med 0 kritiske fejl i tænke-højt-tests."
    },
    "proj-3": {
      title: "Botanical Shaders & 3D Miljødesign",
      type: "Eget Individuelt Projekt • Blender & 3D",
      cover: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
      intro: "En kunstnerisk og teknisk 3D-udforskning i Blender med fokus på naturinspirerede overflader, procedurale materialer og levende partikelsystemer.",
      role: "Jeg stod for al 3D-modellering, opbygning af node-baserede shaders, partikelsystemer (organisk bevægelse og bobler/græs) samt keyframe-animation i Action Editor.",
      technologies: ["Blender 3D", "Procedural Shaders", "Particle Systems", "3D Animation", "Lighting"],
      learnings: "Jeg opnåede dyb forståelse for, hvordan procedurale materialer og lysopsætning kan skabe en organisk, ikke-plastikagtig æstetik, der kan genbruges i både film og spil.",
      results: "En serie højopløselige 3D-animationer og genanvendelige shader-assets."
    },
    "proj-4": {
      title: "Alternative Input-Controllere & HCI Studie",
      type: "Studie- & Gruppeprojekt (Medialogi, AAU)",
      cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      intro: "Udvikling og videnskabelig test af en brugerdefineret computer-controller, der omdanner smartphone-gyroskop og touch-data til præcis markørstyring via UDP.",
      role: "Medudvikler på netværksprototypen i Processing/Java samt medansvarlig for forsøgsdesign, dataindsamling og statistisk sammenligning af fejlrate og præcision.",
      technologies: ["Processing", "Java Robot Class", "UDP Netværk", "Sensor-data", "Empirisk Brugertest"],
      learnings: "Lærte at håndtere sensor-drift i realtid og omsætte kvantitative brugerdata til konkrete forbedringer af interaktionsdesignet.",
      results: "Fungerende hardware/software-prototype og veldokumenteret HCI-studie."
    }
  };

  /* ==========================================================================
     2. PROJEKTFILTRERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Opdatér aktiv knap
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const selectedFilter = button.getAttribute('data-filter');

      // Filtrér projektkort med blød overgang
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (selectedFilter === 'all' || categories.includes(selectedFilter)) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     3. CASE STUDY MODAL LOGIK
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="section-eyebrow">${data.type}</span>
      <h2 id="modal-title" style="font-size: 2rem; margin-top: 0.3rem;">${data.title}</h2>
      <img src="${data.cover}" alt="${data.title}" class="modal-cover" />
      
      <h3 style="margin-bottom: 0.5rem;">Om projektet</h3>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.intro}</p>

      <div class="modal-meta-grid">
        <div class="modal-box">
          <h4>Min rolle & bidrag</h4>
          <p style="font-size: 0.94rem;">${data.role}</p>
        </div>
        <div class="modal-box">
          <h4>Hvad jeg har lært & tager videre</h4>
          <p style="font-size: 0.94rem;">${data.learnings}</p>
        </div>
      </div>

      <div class="modal-box" style="margin-bottom: 1.5rem;">
        <h4>Resultater</h4>
        <p style="font-size: 0.94rem;">${data.results}</p>
      </div>

      <div>
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; text-transform: uppercase; margin-bottom: 0.6rem;">Anvendte Teknologier</h4>
        <div class="skill-tags">
          ${data.technologies.map(tech => `<span>${tech}</span>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openProjectModal(projectId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card.getAttribute('data-project-id'));
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeProjectModal();
  });

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONER (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     5. MOBIL MENU & KONTAKTFORMULAR
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });

  // Luk mobilmenu ved klik på link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Kontaktformular feedback
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    formFeedback.textContent = `Tak for din besked, ${name}! Jeg vender tilbage hurtigst muligt.`;
    contactForm.reset();
  });

  // Sæt årstal i footer automatisk
  document.getElementById('current-year').textContent = new Date().getFullYear();
});