// Modal de Video
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.querySelector('.close-video');
    const introVideo = document.getElementById('introVideo');

    // Mostrar modal al cargar la página
    if (videoModal && !sessionStorage.getItem('videoShown')) {
        videoModal.classList.remove('hidden');
        // Pausar video si el usuario cierra el modal
        if (closeVideo) {
            closeVideo.addEventListener('click', function() {
                videoModal.classList.add('hidden');
                if (introVideo) {
                    introVideo.pause();
                }
                sessionStorage.setItem('videoShown', 'true');
            });
        }

        // Cerrar al hacer clic fuera del video
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.add('hidden');
                if (introVideo) {
                    introVideo.pause();
                }
                sessionStorage.setItem('videoShown', 'true');
            }
        });
    } else if (videoModal) {
        videoModal.classList.add('hidden');
    }

    // Menú Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.package-card, .testimonial-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola, mi nombre es ${name}.\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message}`;
            const whatsappUrl = `https://wa.me/573193981055?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Mostrar mensaje de confirmación
            alert('Redirigiendo a WhatsApp para enviar tu mensaje...');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }

    // Efecto parallax suave en el hero (deshabilitado para evitar superposición)
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const hero = document.querySelector('.hero');
    //     if (hero) {
    //         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    //     }
    // });

    // Navbar con efecto al hacer scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Agregar funcionalidad para cargar paquetes dinámicamente
    // Esta función puede ser llamada cuando tengas los datos del documento RTour Bocana
    function loadPackages(packagesData) {
        const packagesGrid = document.getElementById('packagesGrid');
        if (!packagesGrid || !packagesData) return;

        packagesGrid.innerHTML = '';
        
        packagesData.forEach(package => {
            const packageCard = document.createElement('div');
            packageCard.className = 'package-card';
            packageCard.innerHTML = `
                <div class="package-image">
                    <div class="image-placeholder">
                        <p>Imagen del Paquete: ${package.name}</p>
                    </div>
                </div>
                <div class="package-content">
                    <h3>${package.name}</h3>
                    <p>${package.description}</p>
                    <ul class="package-features">
                        ${package.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="package-price">${package.price}</div>
                    <a href="https://wa.me/573193981055?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20el%20paquete:%20${encodeURIComponent(package.name)}" 
                       class="btn-whatsapp" target="_blank">
                        Consultar en WhatsApp
                    </a>
                </div>
            `;
            packagesGrid.appendChild(packageCard);
        });
    }

    // Ejemplo de cómo usar loadPackages (comentar cuando tengas los datos reales)
    /*
    const packagesData = [
        {
            name: "Paquete 1",
            description: "Descripción del paquete",
            features: ["Transporte", "Alojamiento", "Guía"],
            price: "$XXX.XXX"
        }
    ];
    loadPackages(packagesData);
    */
});

// Función para agregar videos de TikTok en testimonios
function loadTikTokVideos(videoIds) {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid || !videoIds) return;

    testimonialsGrid.innerHTML = '';
    
    videoIds.forEach(videoId => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        testimonialItem.innerHTML = `
            <div class="video-placeholder">
                <p>Video de TikTok</p>
                <!-- Aquí puedes incrustar el video de TikTok usando su ID -->
                <!-- <blockquote class="tiktok-embed" data-video-id="${videoId}"> -->
            </div>
        `;
        testimonialsGrid.appendChild(testimonialItem);
    });
}

