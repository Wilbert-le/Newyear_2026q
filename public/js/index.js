// Index page JavaScript - Main page interactions

document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const sparklesContainer = document.getElementById('sparklesContainer');
    
    // Create random sparkles effect
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = 3 + Math.random() * 4;
        const duration = 1 + Math.random() * 2;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle-fade ${duration}s ease-out forwards;
            box-shadow: 0 0 ${size * 2}px #ffd700;
        `;
        
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }
    
    // Add sparkle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-fade {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            }
            50% {
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5),
                            0 0 30px rgba(255, 215, 0, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Generate sparkles periodically
    setInterval(createSparkle, 300);
    
    // Envelope hover effect
    envelope.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.animation = 'pulse-glow 1s ease-in-out infinite';
    });
    
    envelope.addEventListener('mouseleave', function() {
        this.style.animation = 'shake 4s ease-in-out infinite';
    });
    
    // Create particle burst effect around mouse on envelope
    envelope.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.85) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            createMouseSparkle(x, y);
        }
    });
    
    function createMouseSparkle(x, y) {
        const sparkle = document.createElement('div');
        const colors = ['#ffd700', '#ffed4e', '#ff6b35'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
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
        const velocity = 2 + Math.random() * 3;
        const life = 800;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress < 1) {
                const distance = velocity * elapsed / 10;
                const newX = x + Math.cos(angle) * distance;
                const newY = y + Math.sin(angle) * distance - (progress * 40);
                
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
    
    // Click event - Create confetti and redirect
    envelope.addEventListener('click', function() {
        // Stop shake animation
        this.style.animation = 'none';
        
        // Create dramatic effect
        createConfettiExplosion();
        createGoldenRays();
        
        // Scale up animation
        this.style.transition = 'transform 0.6s ease-out';
        this.style.transform = 'scale(1.3) rotate(5deg)';
        
        // Redirect after animation
        setTimeout(() => {
            // Add fade out effect
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = '/greetings';
            }, 500);
        }, 800);
    });
    
    // Confetti explosion effect - Changed to gold coins
    function createConfettiExplosion() {
        const coinCount = 50;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                const size = 25 + Math.random() * 15;
                
                // Create gold coin
                coin.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle at 30% 30%, #ffed4e, #ffd700 45%, #d4a017 70%, #b8860b);
                    left: ${centerX}px;
                    top: ${centerY}px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    box-shadow: 
                        0 0 ${size/2}px rgba(255, 215, 0, 0.8),
                        inset -${size/4}px -${size/4}px ${size/3}px rgba(0, 0, 0, 0.3),
                        inset ${size/4}px ${size/4}px ${size/3}px rgba(255, 255, 255, 0.4);
                    border: 2px solid #d4a017;
                `;
                
                // Add coin symbol
                const symbol = document.createElement('span');
                symbol.textContent = '¥';
                symbol.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #8b0000;
                    font-size: ${size * 0.6}px;
                    font-weight: bold;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
                `;
                coin.appendChild(symbol);
                
                document.body.appendChild(coin);
                
                const angle = (Math.PI * 2 * i) / coinCount;
                const velocity = 6 + Math.random() * 8;
                const spin = (Math.random() - 0.5) * 720;
                const wobble = Math.random() * 360;
                const life = 2000 + Math.random() * 1000;
                const startTime = Date.now();
                
                function animateCoin() {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / life;
                    
                    if (progress < 1) {
                        const distance = velocity * elapsed / 10;
                        const x = centerX + Math.cos(angle) * distance;
                        const y = centerY + Math.sin(angle) * distance + (progress * progress * 600);
                        
                        // 3D rotation effect
                        const rotateY = wobble + (spin * progress);
                        const scaleX = Math.abs(Math.cos(rotateY * Math.PI / 180));
                        
                        coin.style.left = x + 'px';
                        coin.style.top = y + 'px';
                        coin.style.opacity = 1 - progress;
                        coin.style.transform = `
                            rotate(${spin * progress}deg) 
                            scaleX(${scaleX})
                        `;
                        
                        // Add shine effect when coin flips
                        if (scaleX > 0.9) {
                            coin.style.boxShadow = `
                                0 0 ${size}px rgba(255, 215, 0, 1),
                                inset -${size/4}px -${size/4}px ${size/3}px rgba(0, 0, 0, 0.3),
                                inset ${size/4}px ${size/4}px ${size/3}px rgba(255, 255, 255, 0.6)
                            `;
                        }
                        
                        requestAnimationFrame(animateCoin);
                    } else {
                        coin.remove();
                    }
                }
                
                animateCoin();
            }, i * 15);
        }
    }
    
    // Golden rays effect
    function createGoldenRays() {
        const rays = document.createElement('div');
        rays.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: rays-expand 0.8s ease-out forwards;
        `;
        
        const raysStyle = document.createElement('style');
        raysStyle.textContent = `
            @keyframes rays-expand {
                0% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(raysStyle);
        document.body.appendChild(rays);
        
        setTimeout(() => rays.remove(), 800);
    }
    
    // Falling coins animation
    function createFallingCoin() {
        const coin = document.createElement('div');
        const symbols = ['¥', '💰', '🧧'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        coin.textContent = symbol;
        coin.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 15}px;
            color: #ffd700;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            pointer-events: none;
            z-index: 1;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            filter: drop-shadow(0 0 5px #ffd700);
        `;
        
        document.body.appendChild(coin);
        
        const duration = 4000 + Math.random() * 2000;
        const startTime = Date.now();
        const startX = parseFloat(coin.style.left);
        const sway = 40 + Math.random() * 60;
        
        function animateCoin() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1 && parseFloat(coin.style.top) < window.innerHeight + 50) {
                const y = progress * (window.innerHeight + 100);
                const x = startX + Math.sin(progress * Math.PI * 4) * sway;
                
                coin.style.top = y + 'px';
                coin.style.left = x + 'px';
                coin.style.transform = `rotate(${progress * 720}deg)`;
                coin.style.opacity = 1 - (progress * 0.3);
                
                requestAnimationFrame(animateCoin);
            } else {
                coin.remove();
            }
        }
        
        animateCoin();
    }
    
    // Create falling coins periodically
    setInterval(() => {
        if (Math.random() > 0.6) {
            createFallingCoin();
        }
    }, 2000);
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            envelope.click();
        }
    });
    
    // Initial coin drop
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createFallingCoin, i * 400);
        }
    }, 1000);
});