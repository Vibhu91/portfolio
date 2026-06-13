document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       NEURAL CANVAS BACKGROUND
       ========================================== */
    const canvas = document.getElementById('neural-bg');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = 60;
    let maxDistance = 120;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust density based on screen width
        if (window.innerWidth < 768) {
            particleCount = 25;
            maxDistance = 80;
        } else {
            particleCount = 70;
            maxDistance = 130;
        }
        initParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction (pull/push)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 0.8;
                    this.y -= (dy / dist) * force * 0.8;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect neighboring particles
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    let alpha = (1 - (dist / maxDistance)) * 0.15;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();


    /* ==========================================
       TYPEWRITER EFFECT
       ========================================== */
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        "Machine Learning Solutions",
        "Deep Reinforcement Learning Systems",
        "NLP & Text Summarizers",
        "Optimized Cloud Workflows",
        "Predictive MLOps Systems"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    if (typewriterEl) {
        handleTypewriter();
    }


    /* ==========================================
       NAVIGATION & MOBILE DRAWER
       ========================================== */
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const closeDrawer = document.querySelector('.close-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    // Scroll Header Backdrop & Active Link Track
    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.style.padding = '12px 24px';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.padding = '20px 24px';
            header.style.boxShadow = 'none';
        }

        // Scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation Toggle
    mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
    });

    const closeMenu = () => {
        mobileDrawer.classList.remove('active');
    };

    closeDrawer.addEventListener('click', closeMenu);
    drawerLinks.forEach(link => link.addEventListener('click', closeMenu));


    /* ==========================================
       INTERACTIVE WIDGETS
       ========================================== */

    // 1. Cloud Scheduler Widget
    const algoBtnList = document.querySelectorAll('.algo-btn');
    const makespanFill = document.getElementById('makespan-fill');
    const makespanVal = document.getElementById('makespan-val');
    const costFill = document.getElementById('cost-fill');
    const costVal = document.getElementById('cost-val');
    const energyFill = document.getElementById('energy-fill');
    const energyVal = document.getElementById('energy-val');

    const algoMetrics = {
        heft: { makespan: '120s', makespanW: '85%', cost: '$4.20', costW: '75%', energy: '50%', energyW: '50%' },
        pso: { makespan: '95s', makespanW: '68%', cost: '$3.80', costW: '65%', energy: '65%', energyW: '65%' },
        aco: { makespan: '88s', makespanW: '62%', cost: '$3.95', costW: '69%', energy: '72%', energyW: '72%' },
        dqn: { makespan: '62s', makespanW: '44%', cost: '$2.90', costW: '48%', energy: '90%', energyW: '90%' }
    };

    algoBtnList.forEach(btn => {
        btn.addEventListener('click', () => {
            algoBtnList.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const algo = btn.dataset.algo;
            const metrics = algoMetrics[algo];

            makespanFill.style.width = metrics.makespanW;
            makespanVal.textContent = metrics.makespan;
            
            costFill.style.width = metrics.costW;
            costVal.textContent = metrics.cost;

            energyFill.style.width = metrics.energyW;
            energyVal.textContent = metrics.energy;
        });
    });

    // 2. EcoPackAI Widget
    const calcPackBtn = document.getElementById('calc-pack-btn');
    const packWeight = document.getElementById('pack-weight');
    const packFragile = document.getElementById('pack-fragile');
    const packResult = document.getElementById('pack-result');

    calcPackBtn.addEventListener('click', () => {
        const weight = packWeight.value;
        const fragile = packFragile.value;
        let suggestion = "";

        if (weight === 'light' && fragile === 'no') {
            suggestion = "📦 Eco-Envelope (Recycled Kraft Paper)<br>♻️ Efficiency: 96% | Waste Red: 25%";
        } else if (weight === 'light' && fragile === 'yes') {
            suggestion = "📦 Bio-Padded Mailing Bag (Compostable Paper)<br>♻️ Efficiency: 92% | Waste Red: 18%";
        } else if (weight === 'medium' && fragile === 'no') {
            suggestion = "📦 Custom Right-Sized Single-Wall Carton<br>♻️ Efficiency: 94% | Waste Red: 22%";
        } else if (weight === 'medium' && fragile === 'yes') {
            suggestion = "📦 Single-Wall Carton with Recycled Cardboard Honeycomb Padding<br>♻️ Efficiency: 88% | Waste Red: 20%";
        } else if (weight === 'heavy' && fragile === 'no') {
            suggestion = "📦 Right-Sized Double-Wall Heavy-Duty Box<br>♻️ Efficiency: 90% | Waste Red: 20%";
        } else {
            suggestion = "📦 Heavy Carton with Molded Pulp Protection Inserts<br>♻️ Efficiency: 86% | Waste Red: 15%";
        }

        packResult.classList.add('highlight');
        packResult.innerHTML = suggestion;
    });

    // 3. Stock Prediction Widget
    const predBar = document.getElementById('pred-bar');
    const stockBull = document.getElementById('stock-bull');
    const stockBear = document.getElementById('stock-bear');

    stockBull.addEventListener('click', () => {
        predBar.style.height = '85%';
        predBar.style.background = '#10b981';
        predBar.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
    });

    stockBear.addEventListener('click', () => {
        predBar.style.height = '25%';
        predBar.style.background = '#ef4444';
        predBar.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
    });

    // 4. SQL Widget
    const querySelect = document.getElementById('sql-query-select');
    const sqlTiming = document.getElementById('sql-timing');
    const sqlRows = document.getElementById('sql-rows');

    querySelect.addEventListener('change', () => {
        if (querySelect.value === 'raw') {
            sqlTiming.textContent = 'Execution Time: 120ms';
            sqlTiming.style.color = '#ef4444';
            sqlRows.textContent = 'Rows Scanned: 24,000';
        } else {
            sqlTiming.textContent = 'Execution Time: 8ms';
            sqlTiming.style.color = '#10b981';
            sqlRows.textContent = 'Rows Scanned: 120 (Index Hit)';
        }
    });

    // 5. NLP Summarizer Widget
    const nlpInput = document.getElementById('nlp-input');
    const nlpSumBtn = document.getElementById('nlp-sum-btn');
    const nlpResult = document.getElementById('nlp-result');

    nlpSumBtn.addEventListener('click', () => {
        const text = nlpInput.value.trim();
        if (text.length < 20) {
            nlpResult.classList.add('highlight');
            nlpResult.textContent = "Please enter a longer text sample (at least 2 sentences).";
            return;
        }

        const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
        
        // Find best sentence based on common ML keywords or sentence length
        const keywords = ['scheduling', 'optimizer', 'model', 'cloud', 'packaging', 'accuracy', 'predict', 'data', 'analytics', 'summarization'];
        let scoreIndex = 0;
        let highestScore = -1;

        sentences.forEach((sentence, index) => {
            let score = 0;
            const words = sentence.toLowerCase().split(/\s+/);
            words.forEach(w => {
                if (keywords.includes(w)) score += 5;
            });
            score += words.length * 0.1; // slight preference for mid-length sentence

            if (score > highestScore) {
                highestScore = score;
                scoreIndex = index;
            }
        });

        const summary = sentences[scoreIndex] + ".";
        nlpResult.classList.add('highlight');
        nlpResult.textContent = `Summary: "${summary}" (Length reduced by ~${Math.max(30, Math.round(100 - (summary.length / text.length) * 100))}%).`;
    });


    /* ==========================================
       CONTACT FORM SUBMIT
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Disable and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;
        
        setTimeout(() => {
            // Success response animation
            formFeedback.textContent = "Thank you! Your message has been sent successfully. Vibhu will contact you shortly.";
            formFeedback.className = "form-feedback success";
            formFeedback.style.display = "block";
            
            // Clear inputs
            contactForm.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            
            // Fade out feedback
            setTimeout(() => {
                formFeedback.style.display = "none";
            }, 6000);
        }, 1500);
    });
});
