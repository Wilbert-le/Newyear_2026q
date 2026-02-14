// Greetings page JavaScript - Fireworks and animations

document.addEventListener('DOMContentLoaded', function() {
    const fireworksContainer = document.getElementById('fireworksContainer');
    const floatingDecorations = document.getElementById('floatingDecorations');
    const greetingText = document.getElementById('greetingText');
    
    // Load greetings from MongoDB via API
    greetingText.classList.add('loading');
    
    fetch('/api/greetings/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải lời chúc từ server');
            }
            return response.json();
        })
        .then(data => {
            if (!data.success || !data.greeting) {
                throw new Error('Không có lời chúc nào');
            }
            
            const greeting = data.greeting;
            
            console.log('Loaded greeting from MongoDB:', greeting._id);
            
            // Remove loading state and display greeting
            setTimeout(() => {
                greetingText.classList.remove('loading');
                greetingText.innerHTML = greeting.content;
            }, 300);
        })
        .catch(error => {
            console.error('Error loading greetings:', error);
            // Fallback greeting if API fails
            greetingText.classList.remove('loading');
            greetingText.innerHTML = 'Chúc bạn năm Ngựa<br>tình yêu vào chuồng,<br>tiền vào ví! ❤️💰';
        });
    
    // Create firework effect
    function createFirework() {
        const colors = ['#ffd700', '#ff6b35', '#ffed4e', '#ff4444', '#ff69b4', '#00ff88', '#00bfff'];
        const x = 100 + Math.random() * (window.innerWidth - 200);
        const y = 50 + Math.random() * (window.innerHeight * 0.4);
        
        // Create explosion center
        const center = document.createElement('div');
        center.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
        `;
        fireworksContainer.appendChild(center);
        
        // Create particles
        const particleCount = 35;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 6px ${color};
                z-index: 100;
            `;
            
            fireworksContainer.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 3;
            const life = 1200 + Math.random() * 800;
            const startTime = Date.now();
            
            function animateParticle() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / life;
                
                if (progress < 1) {
                    const distance = velocity * elapsed / 8;
                    const newX = x + Math.cos(angle) * distance;
                    const newY = y + Math.sin(angle) * distance + (progress * progress * 150);
                    
                    particle.style.left = newX + 'px';
                    particle.style.top = newY + 'px';
                    particle.style.opacity = 1 - progress;
                    particle.style.transform = `scale(${1 - progress * 0.5})`;
                    
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            animateParticle();
        }
        
        setTimeout(() => center.remove(), 100);
    }
    
    // Launch fireworks periodically
    function launchFireworks() {
        createFirework();
        
        const nextDelay = 1500 + Math.random() * 2000;
        setTimeout(launchFireworks, nextDelay);
    }
    
    // Start fireworks after a short delay
    setTimeout(launchFireworks, 800);
    
    // Initial burst
    setTimeout(createFirework, 500);
    setTimeout(createFirework, 700);
    setTimeout(createFirework, 900);
    
    // Create floating particles
    function createFloatingParticle() {
        const symbols = ['💰', '🧧', '💎', '⭐', '✨', '🌸', '🎋', '🏮'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const particle = document.createElement('div');
        particle.textContent = symbol;
        particle.style.cssText = `
            position: fixed;
            font-size: ${18 + Math.random() * 12}px;
            left: ${Math.random() * window.innerWidth}px;
            bottom: -40px;
            pointer-events: none;
            opacity: 0.7;
            z-index: 1;
        `;
        
        floatingDecorations.appendChild(particle);
        
        const duration = 6000 + Math.random() * 4000;
        const startTime = Date.now();
        const startX = parseFloat(particle.style.left);
        const sway = 40 + Math.random() * 60;
        
        function animateFloat() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const y = window.innerHeight - (progress * (window.innerHeight + 100));
                const x = startX + Math.sin(progress * Math.PI * 3) * sway;
                
                particle.style.bottom = (window.innerHeight - y) + 'px';
                particle.style.left = x + 'px';
                particle.style.transform = `rotate(${progress * 360}deg)`;
                particle.style.opacity = 0.7 - (progress * 0.7);
                
                requestAnimationFrame(animateFloat);
            } else {
                particle.remove();
            }
        }
        
        animateFloat();
    }
    
    // Create floating particles periodically
    setInterval(() => {
        if (Math.random() > 0.5) {
            createFloatingParticle();
        }
    }, 1200);
    
    // Create sparkles on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.93) {
            createSparkle(e.clientX, e.clientY);
        }
    });
    
    function createSparkle(x, y) {
        const colors = ['#ffd700', '#ffed4e', '#ff69b4', '#00bfff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 2;
        const life = 600;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress < 1) {
                const distance = velocity * elapsed / 10;
                const newX = x + Math.cos(angle) * distance;
                const newY = y + Math.sin(angle) * distance - (progress * 30);
                
                sparkle.style.left = newX + 'px';
                sparkle.style.top = newY + 'px';
                sparkle.style.opacity = 1 - progress;
                sparkle.style.transform = `scale(${1 - progress * 0.5})`;
                
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        }
        
        animate();
    }
    
    // Confetti burst on page load
    setTimeout(() => {
        createConfettiBurst();
    }, 300);
    
    function createConfettiBurst() {
        const colors = ['#ffd700', '#ff6b35', '#ffed4e', '#d4a017', '#ff4444', '#ff69b4'];
        const confettiCount = 60;
        const centerX = window.innerWidth / 2;
        const centerY = 0;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const size = 8 + Math.random() * 8;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    left: ${centerX + (Math.random() - 0.5) * 400}px;
                    top: ${centerY}px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 0 ${size}px ${color};
                `;
                
                document.body.appendChild(confetti);
                
                const angle = Math.random() * Math.PI - Math.PI / 2;
                const velocity = 3 + Math.random() * 6;
                const spin = (Math.random() - 0.5) * 1080;
                const life = 3000 + Math.random() * 2000;
                const startTime = Date.now();
                
                function animateConfetti() {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / life;
                    
                    if (progress < 1) {
                        const distance = velocity * elapsed / 10;
                        const x = parseFloat(confetti.style.left) + Math.cos(angle) * distance / 30;
                        const y = centerY + Math.sin(angle) * distance + (progress * progress * 1000);
                        
                        confetti.style.left = x + 'px';
                        confetti.style.top = y + 'px';
                        confetti.style.opacity = 1 - progress;
                        confetti.style.transform = `rotate(${spin * progress}deg)`;
                        
                        requestAnimationFrame(animateConfetti);
                    } else {
                        confetti.remove();
                    }
                }
                
                animateConfetti();
            }, i * 20);
        }
    }
    
    // Add hover effect to greeting card
    const greetingCard = document.querySelector('.greeting-card');
    
    greetingCard.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    greetingCard.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Back button effect
    const backButton = document.querySelector('.back-button');
    
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create fade effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #d32f2f;
            z-index: 100000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    });
    
    // Initial floating particles
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingParticle, i * 300);
        }
    }, 1000);
});