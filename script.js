// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de fade-in al hacer scroll
function observeElements() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Cambio de estilo del header al hacer scroll
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        header.style.background = 'rgba(44, 44, 44, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(44, 44, 44, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Manejo del formulario de contacto
function handleContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Animación de envío
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simular envío (aquí integrarías con tu backend)
        setTimeout(() => {
            submitBtn.textContent = '¡Mensaje Enviado!';
            submitBtn.style.background = '#4CAF50';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Efectos de hover para las tarjetas de proyecto
function enhanceProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    observeElements();
    handleContactForm();
    enhanceProjectCards();
});

// Event listeners
window.addEventListener('scroll', handleHeaderScroll);

// Efecto de partículas en el hero (opcional)
function createParticleEffect() {
    const hero = document.querySelector('.hero');

    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 107, 53, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: 100%;
                    animation: particleFloat 8s linear forwards;
                `;

        hero.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 8000);
    }, 500);
}

// Agregar CSS para las partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
            @keyframes particleFloat {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(particleStyle);

// Activar efecto de partículas
createParticleEffect();