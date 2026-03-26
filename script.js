// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // --- Live Volunteer Counter Logic ---
    const counterDisplay = document.getElementById('live-volunteer-count');
    
    // Check if a count already exists in local storage, if not, set base to 246
    // (Changed key to _v2 to force a reset from the old 1245 number)
    let currentTotal = localStorage.getItem('cleanIndiaTotal_v2');
    if (!currentTotal) {
        currentTotal = 246; // <--- Changed from 1245 to 246 here!
        localStorage.setItem('cleanIndiaTotal_v2', currentTotal);
    }
    
    // Smooth Increasing Number Effect on Page Load
    if (counterDisplay) {
        let targetCount = parseInt(currentTotal);
        let duration = 2000; // 2 seconds animation
        let startTimestamp = null;

        function countUpAnimation(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            let progress = timestamp - startTimestamp;
            
            // Calculate current number based on time passed
            let current = Math.min(Math.floor((progress / duration) * targetCount), targetCount);
            counterDisplay.innerText = current.toLocaleString();
            
            if (progress < duration) {
                window.requestAnimationFrame(countUpAnimation);
            } else {
                counterDisplay.innerText = targetCount.toLocaleString();
            }
        }
        // Start animation
        window.requestAnimationFrame(countUpAnimation);
    }

    // Function to increase the counter visually when a form is submitted
    function triggerCounterIncrease() {
        currentTotal++;
        localStorage.setItem('cleanIndiaTotal_v2', currentTotal); // <--- Updated key here too!
        
        if (counterDisplay) {
            // Cool pop animation
            counterDisplay.style.transform = 'scale(1.4)';
            counterDisplay.style.color = '#DAA520'; // Flashes Gold
            
            setTimeout(() => {
                counterDisplay.innerText = parseInt(currentTotal).toLocaleString();
                counterDisplay.style.transform = 'scale(1)';
                counterDisplay.style.color = '#fff'; // Returns to white
            }, 400);
        }
    }

    // --- 5️⃣ UI Polish: Scroll Progress Bar ---
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = progress + "%";
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // --- 1. Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const ctaButton = document.querySelector('.cta-button');

    // Helper function for smooth scroll
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for sticky navbar height
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if(navLinksContainer.classList.contains('active')){
                navLinksContainer.classList.remove('active');
            }
        }
    };

    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    if (ctaButton) ctaButton.addEventListener('click', smoothScroll);


    // --- 2. Scroll Animation (Intersection Observer) ---
    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right, .fade-in, .map-image-wrapper, .map-data-grid, .feature-card');

    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));


    // --- 3. Animated Number Counters ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false; // Flag to ensure counting happens only once

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 20); // Calculate increment per frame

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-strip');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }


    // --- 4. Navbar Background on Scroll ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // --- 4️⃣ Improved Government Schemes (Toggle Read More) ---
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.previousElementSibling;
            details.classList.toggle('hidden');
            this.innerText = details.classList.contains('hidden') ? 'Read More' : 'Read Less';
        });
    });

    // --- 5. Interactive Dustbin Game ---
    const wasteItems = document.querySelectorAll('.waste-item');
    const dustbins = document.querySelectorAll('.dustbin');
    let segScore = 0;

    wasteItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', e.target.dataset.type);
            setTimeout(() => e.target.style.display = 'none', 0);
        });
        
        item.addEventListener('dragend', (e) => {
            e.target.style.display = 'block';
        });
    });

    dustbins.forEach(bin => {
        bin.addEventListener('dragover', (e) => e.preventDefault());
        bin.addEventListener('drop', (e) => {
            const type = e.dataTransfer.getData('type');
            if (type === bin.dataset.bin) {
                segScore += 10;
                document.getElementById('seg-score').innerText = segScore;
                document.getElementById('game-feedback').innerText = "Correct! +10 Points";
                document.getElementById('game-feedback').style.color = "green";
            } else {
                bin.classList.add('shake');
                setTimeout(()=> bin.classList.remove('shake'), 500);
                document.getElementById('game-feedback').innerText = "Wrong Bin! Try Again.";
                document.getElementById('game-feedback').style.color = "red";
            }
        });
    });

    // --- 2️⃣ Improved Clean the Area Game ---
    const cleanArea = document.getElementById('clean-area');
    const progressBar = document.getElementById('clean-progress');
    const winMsg = document.getElementById('clean-win-msg');
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-clean-btn');
    const restartBtn = document.getElementById('restart-game-btn');
    const timerDisplay = document.getElementById('game-timer');
    
    let trashCount = 20;
    let cleanedCount = 0;
    let gameTimer;
    let timeLeft = 60;
    let gameActive = false;

    function initCleanGame() {
        // Reset state
        cleanedCount = 0;
        timeLeft = 60;
        gameActive = true;
        progressBar.style.width = '0%';
        timerDisplay.innerText = timeLeft;
        winMsg.style.display = 'none';
        startOverlay.style.display = 'none';
        
        // Clear existing trash
        const existingTrash = cleanArea.querySelectorAll('.garbage-piece');
        existingTrash.forEach(el => el.remove());

        // Spawn trash
        for (let i = 0; i < trashCount; i++) {
            const trash = document.createElement('div');
            trash.classList.add('garbage-piece');
            trash.innerHTML = ['🥤', '🥡', '🧃', '🍬', '🍌'][Math.floor(Math.random() * 5)];
            trash.style.top = Math.random() * 260 + 'px';
            trash.style.left = Math.random() * 90 + '%';
            
            trash.addEventListener('click', function() {
                if(!gameActive) return;
                this.remove();
                cleanedCount++;
                const pct = (cleanedCount / trashCount) * 100;
                progressBar.style.width = pct + '%';
                
                if (cleanedCount === trashCount) {
                    endCleanGame(true);
                }
            });
            cleanArea.appendChild(trash);
        }

        // Start Timer
        clearInterval(gameTimer);
        gameTimer = setInterval(() => {
            if(!gameActive) return;
            timeLeft--;
            timerDisplay.innerText = timeLeft;
            if (timeLeft <= 0) {
                endCleanGame(false);
            }
        }, 1000);
    }

    function endCleanGame(won) {
        gameActive = false;
        clearInterval(gameTimer);
        if (won) {
            winMsg.innerHTML = `<h3><i class="fas fa-trophy"></i> Outstanding!</h3><p>Area Cleaned in ${60 - timeLeft}s!</p>`;
            winMsg.style.display = 'block';
            fireConfetti();
        } else {
            winMsg.innerHTML = `<h3>Time's Up!</h3><p>Try again to clean India.</p>`;
            winMsg.style.display = 'block';
        }
    }

    // Confetti Effect
    function fireConfetti() {
        const colors = ['#228B22', '#DAA520', '#fff'];
        for(let i=0; i<50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '0';
            confetti.style.transition = 'top 1s ease-out, opacity 1s';
            cleanArea.appendChild(confetti);
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.opacity = '0';
            }, 10);
            setTimeout(() => confetti.remove(), 1000);
        }
    }

    startBtn.addEventListener('click', initCleanGame);
    restartBtn.addEventListener('click', initCleanGame);


    // --- TABS LOGIC ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and target content
            btn.classList.add('active');
            document.querySelector(`[data-content="${btn.dataset.tab}"]`).classList.add('active');
        });
    });

    // File input name update logic
    document.getElementById('volunteer-proof').addEventListener('change', function(e) {
        let fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
        document.getElementById('file-name').textContent = fileName;
    });

    document.getElementById('project-proof').addEventListener('change', function(e) {
        let fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
        document.getElementById('proj-file-name').textContent = fileName;
    });


    // --- 1️⃣ Premium Certificate Generator (Volunteer) ---
    const certForm = document.getElementById('cert-form');
    const modal = document.getElementById('cert-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const toast = document.getElementById('toast');

    certForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('volunteer-name').value;
        const state = document.getElementById('volunteer-state').value;
        const city = document.getElementById('volunteer-city').value;
        const wasteType = document.getElementById('waste-type').value;
        const kg = document.getElementById('waste-kg').value;
        
        const canvas = document.getElementById('cert-canvas');
        const ctx = canvas.getContext('2d');
        const downloadBtn = document.getElementById('download-btn');

        // Draw Background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 800, 600);
        
        // Draw Watermark Pattern
        ctx.save();
        ctx.globalAlpha = 0.05;
        for(let i=0; i<800; i+=100) {
            for(let j=0; j<600; j+=100) {
                ctx.beginPath();
                ctx.arc(i, j, 30, 0, Math.PI*2);
                ctx.fillStyle = "#228B22";
                ctx.fill();
            }
        }
        ctx.restore();

        // Premium Border
        ctx.strokeStyle = "#228B22";
        ctx.lineWidth = 15;
        ctx.strokeRect(20, 20, 760, 560);
        ctx.strokeStyle = "#DAA520"; // Gold inner
        ctx.lineWidth = 3;
        ctx.strokeRect(35, 35, 730, 530);

        // Header
        ctx.fillStyle = "#1a5e3a";
        ctx.textAlign = "center";
        ctx.font = "bold 50px Montserrat";
        ctx.fillText("CLEAN INDIA INITIATIVE", 400, 110);
        
        ctx.font = "italic 30px 'Great Vibes', serif"; 
        ctx.fillStyle = "#DAA520";
        ctx.fillText("Certificate of Volunteer Pledging", 400, 160);
        
        ctx.fillStyle = "#333";
        ctx.font = "20px Open Sans";
        ctx.fillText("This is proudly presented to", 400, 220);
        
        // Volunteer Name
        ctx.font = "bold 60px Montserrat";
        ctx.fillStyle = "#228B22";
        ctx.shadowColor = "rgba(0,0,0,0.1)";
        ctx.shadowBlur = 5;
        ctx.fillText(name, 400, 300);
        ctx.shadowBlur = 0; // Reset shadow
        
        ctx.font = "18px Open Sans";
        ctx.fillStyle = "#333";
        ctx.fillText(`For successfully collecting ${kg} kg of ${wasteType} in ${city}, ${state}.`, 400, 360);
        ctx.fillText("You are officially a Clean India Volunteer!", 400, 400);

        // Gold Stars
        let stars = 1;
        if(kg > 5) stars = 2;
        if(kg > 10) stars = 3;
        if(kg > 20) stars = 4;
        if(kg > 50) stars = 5;

        let startX = 400 - ((stars - 1) * 35);
        ctx.font = "60px serif";
        for(let i=0; i<stars; i++) {
            // Gold Gradient Text for Stars
            let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#DAA520");
            gradient.addColorStop("0.5", "#FFD700");
            gradient.addColorStop("1.0", "#DAA520");
            ctx.fillStyle = gradient;
            ctx.fillText("★", startX + (i*70), 480);
        }

        // Signature & Date
        ctx.fillStyle = "#333";
        ctx.font = "16px Open Sans";
        ctx.beginPath();
        ctx.moveTo(150, 520);
        ctx.lineTo(300, 520);
        ctx.stroke();
        ctx.fillText("Project Head", 225, 540);

        const date = new Date().toLocaleDateString();
        ctx.fillText(`Date: ${date}`, 575, 540);
        
        // Unique ID
        const certID = "CID-" + Math.floor(Math.random() * 1000000);
        ctx.font = "12px monospace";
        ctx.fillStyle = "#999";
        ctx.fillText(`ID: ${certID}`, 400, 580);

        // Show Modal
        modal.classList.add('active');

        // Trigger Counter Increase
        triggerCounterIncrease();
        
        // Setup Download
        downloadBtn.onclick = function() {
            const link = document.createElement('a');
            link.download = `Clean_India_Certificate_${name}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            
            // Show Toast
            modal.classList.remove('active');
            toast.innerText = "Certificate Downloaded Successfully!";
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3000);
            certForm.reset();
            document.getElementById('file-name').textContent = "No file chosen";
        };
    });

    // --- Project Submission Logic ---
    const projectForm = document.getElementById('project-form');
    const projectSuccessModal = document.getElementById('project-success-modal');

    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show Success Modal
        projectSuccessModal.classList.add('active');

        // Trigger Counter Increase
        triggerCounterIncrease();
        
        // Reset form
        projectForm.reset();
        document.getElementById('proj-file-name').textContent = "No file chosen";
    });

    closeModal.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
            projectSuccessModal.classList.remove('active');
        });
    });

    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
        if (e.target == projectSuccessModal) {
            projectSuccessModal.classList.remove('active');
        }
    });

});