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

        const formData = {
            nombre: form.nombre.value,
            email: form.email.value,
            asunto: form.asunto.value,
            mensaje: form.mensaje.value
        };

        // Animación de envío
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        sendWithFormspree(formData, form, submitBtn, originalText);
    });
}

// Envio de correo
function sendWithFormspree(formData, form, submitBtn, originalText) {
    const formspreeUrl = 'https://formspree.io/f/mrbkabaj';

    fetch(formspreeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = '¡Mensaje Enviado!';
                submitBtn.style.background = '#4CAF50';
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            submitBtn.textContent = 'Error al enviar';
            submitBtn.style.background = '#f44336';
            console.error('Error:', error);
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
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