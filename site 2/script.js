// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background and effects on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission with enhanced WhatsApp integration
const appointmentForm = document.querySelector('.appointment-form');
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const age = this.querySelector('select').value;
    const service = this.querySelectorAll('select')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Service names mapping
    const serviceNames = {
        'lentes': 'Lentes de Contato Dental Premium',
        'ortodontia': 'Ortodontia Invisível (Invisalign)',
        'clareamento': 'Clareamento Laser Hollywood',
        'implantes': 'Implantes Premium',
        'harmonizacao': 'Harmonização Facial',
        'checkup': 'Check-up Premium',
        'multiplos': 'Múltiplos Tratamentos'
    };
    
    // Create enhanced WhatsApp message
    const whatsappMessage = `🦷 *CONSULTA VIP GRATUITA* 🦷

👋 Olá Dr. Carlos! Quero agendar minha consulta VIP gratuita!

📋 *DADOS PESSOAIS:*
• Nome: ${name}
• WhatsApp: ${phone}
• E-mail: ${email}
• Idade: ${age}

🎯 *TRANSFORMAÇÃO DESEJADA:*
• Tratamento: ${serviceNames[service] || service}

💭 *SONHO DE SORRISO:*
${message || 'Não informado'}

✨ *BENEFÍCIOS INCLUSOS:*
• Avaliação 3D Gratuita (Valor: R$ 300)
• Plano de Tratamento Personalizado
• Orçamento com Desconto Especial

🚀 Estou pronto(a) para transformar meu sorriso!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
    submitBtn.disabled = true;
    
    // Simulate loading and redirect
    setTimeout(() => {
        // Open WhatsApp
        window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
        
        // Show success message
        showNotification('Redirecionando para WhatsApp! Sua consulta VIP está quase agendada! 🚀', 'success');
        
        // Reset form and button
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track conversion (you can integrate with analytics here)
        trackConversion('consultation_request', service);
        
    }, 1500);
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Phone number formatting with Brazilian pattern
document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '($1');
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    e.target.value = value;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Add staggered animation for grid items
            if (entry.target.parentElement.classList.contains('services-grid') || 
                entry.target.parentElement.classList.contains('testimonials-grid')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .testimonial-card, .info-card, .credential-card, .stat-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Service card click to auto-fill form
const serviceCards = document.querySelectorAll('.service-card');
const serviceSelect = document.querySelectorAll('select')[1];

serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on the button
        if (e.target.closest('.service-btn')) return;
        
        const serviceName = card.querySelector('h3').textContent;
        const serviceMapping = {
            'Lentes Ultra Premium': 'lentes',
            'Ortodontia Invisível': 'ortodontia',
            'Clareamento Laser': 'clareamento',
            'Implantes Premium': 'implantes',
            'Harmonização Facial': 'harmonizacao',
            'Check-up Premium': 'checkup'
        };
        
        if (serviceMapping[serviceName] && serviceSelect) {
            serviceSelect.value = serviceMapping[serviceName];
            
            // Scroll to form with smooth animation
            document.querySelector('#agendamento').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight form with pulsing effect
            const form = document.querySelector('.contact-form');
            form.style.animation = 'pulse 1s ease-in-out 3';
            
            // Show helpful message
            showNotification(`Serviço "${serviceName}" selecionado! Complete o formulário abaixo. 👇`, 'info');
        }
    });
});

// Enhanced back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-rocket"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    font-size: 1.2rem;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Add rocket animation
    backToTopButton.style.transform = 'translateY(-10px) rotate(45deg)';
    setTimeout(() => {
        backToTopButton.style.transform = 'none';
    }, 300);
});

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('premium')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'none';
        }
    });
});

// Service card enhanced interactions
document.querySelectorAll('.service-card').forEach(card => {
    const btn = card.querySelector('.service-btn');
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get service info
        const serviceName = card.querySelector('h3').textContent;
        const servicePrice = card.querySelector('.price-value').textContent;
        
        // Create enhanced message for this specific service
        const specificMessage = `🎯 Tenho interesse no tratamento: ${serviceName}
💰 Preço visto: ${servicePrice}
🚀 Quero agendar minha consulta VIP GRATUITA!`;
        
        const encodedMessage = encodeURIComponent(specificMessage);
        
        // Add loading state to button
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
            showNotification(`Conectando via WhatsApp para ${serviceName}! 🚀`, 'success');
            
            // Reset button
            btn.innerHTML = originalText;
            btn.style.pointerEvents = 'auto';
        }, 1000);
    });
});

// Conversion tracking function (integrate with your analytics)
function trackConversion(event, service) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'service_type': service,
            'value': 1
        });
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: service
        });
    }
    
    console.log(`Conversion tracked: ${event} - ${service}`);
}

// Add dynamic pricing updates (you can connect this to your backend)
function updatePricing() {
    const priceElements = document.querySelectorAll('.price-value');
    // This is where you'd fetch real-time pricing from your API
    // For now, we'll just add some visual feedback
    priceElements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
}

// Initialize pricing updates
updatePricing();

// Add urgency timer (optional - for limited time offers)
function addUrgencyTimer() {
    const urgencyElement = document.querySelector('.form-urgency span');
    if (urgencyElement) {
        let spotsLeft = 3;
        setInterval(() => {
            if (Math.random() > 0.7 && spotsLeft > 1) {
                spotsLeft--;
                urgencyElement.textContent = `Apenas ${spotsLeft} vagas disponíveis esta semana!`;
                urgencyElement.parentElement.style.animation = 'pulse 0.5s ease-in-out';
            }
        }, 30000); // Update every 30 seconds
    }
}

// Initialize urgency timer
addUrgencyTimer();

// Enhanced form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            isValid = false;
            
            // Reset error styling after user starts typing
            field.addEventListener('input', () => {
                field.style.borderColor = '#e2e8f0';
                field.style.boxShadow = 'none';
            }, { once: true });
        }
    });
    
    return isValid;
}

// Add form validation to submit handler
appointmentForm.addEventListener('submit', function(e) {
    if (!validateForm(this)) {
        e.preventDefault();
        showNotification('Por favor, preencha todos os campos obrigatórios! 📝', 'warning');
        return;
    }
});

// Console welcome message
console.log(`
🦷 Site do Dr. Carlos Mendes carregado com sucesso!
🚀 Transformando sorrisos desde 2024
💎 Desenvolvido com tecnologia premium
`);

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Site carregado em ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
        console.warn('⚠️ Site demorou para carregar. Considere otimizações.');
    }
});

// Add smooth reveal animation for hero elements
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-buttons, .hero-guarantee');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});