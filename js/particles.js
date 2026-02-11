// Animated Particles for Hero Section

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 30 + 20;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.5 + 0.3;
            
            // Random icon type
            const icons = ['💧', '📄', '🖼️', '📝', '✨', '⚡', '🔧', '📋'];
            this.icon = icons[Math.floor(Math.random() * icons.length)];
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            // Reset if out of bounds
            if (this.y > canvas.height + 20) {
                this.reset();
            }

            if (this.x < -20 || this.x > canvas.width + 20) {
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.icon, 0, 0);
            ctx.restore();
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = Math.min(30, Math.floor(canvas.width / 40));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Recreate particles on resize
    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        createParticles();
        animate();
    });
});
