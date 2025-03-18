document.addEventListener('DOMContentLoaded', function() {
    // Dynamic colors for links
    const links = document.querySelectorAll('.link-item');
    const logo = document.querySelector('.logo');
    const colors = ['#AA00FF', '#FFFFFF', '#FF007F', '#00FFFF'];
    let currentColorIndex = 0;
    
    // Initialize the container with fade-in animation
    const container = document.querySelector('.container');
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);

    // Add staggered animation to links
    links.forEach((link, index) => {
        link.style.animationDelay = `${0.1 * (index + 1)}s`;
        link.style.opacity = '0';
        link.style.animation = 'fadeIn 0.5s forwards';
        
        const color = link.dataset.color || colors[index % colors.length];
        
        // Apply the color to the link on hover
        link.addEventListener('mouseenter', function() {
            this.style.borderColor = color;
            this.style.color = color;
            this.querySelector('.link-icon').style.fill = color;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.style.color = '#fff';
            this.querySelector('.link-icon').style.fill = 'currentColor';
        });
    });

    // Create floating particles effect
    createParticles();
    
    // Cycle brand colors for logo border
    setInterval(() => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        logo.style.borderColor = colors[currentColorIndex];
        logo.style.boxShadow = `0 0 20px ${colors[currentColorIndex]}80`;
    }, 3000);

    // Make links interactive
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // Add click animation
            this.classList.add('clicked');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.open(targetUrl, '_blank');
                this.classList.remove('clicked');
            }, 500);
        });
    });
});

// Create floating particles for background
function createParticles() {
    const particleCount = 15;
    const colors = ['#AA00FF', '#FFFFFF', '#FF007F', '#00FFFF'];
    const background = document.querySelector('.background');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set CSS properties
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            filter: blur(${Math.random() * 2}px);
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: float ${Math.random() * 10 + 15}s linear infinite;
            animation-delay: -${Math.random() * 15}s;
            z-index: -1;
        `;
        
        background.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-30px) translateX(30px) rotate(90deg);
            }
            50% {
                transform: translateY(-60px) translateX(0) rotate(180deg);
            }
            75% {
                transform: translateY(-30px) translateX(-30px) rotate(270deg);
            }
            100% {
                transform: translateY(0) translateX(0) rotate(360deg);
            }
        }
        
        .link-item.clicked {
            transform: scale(0.95);
            opacity: 0.8;
            transition: transform 0.2s, opacity 0.2s;
        }
    `;
    document.head.appendChild(style);
}