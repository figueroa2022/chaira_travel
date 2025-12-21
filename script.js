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

    // Cargar paquetes desde localStorage
    loadPackagesFromStorage();
    
    // Cargar videos de TikTok desde localStorage
    loadTikTokVideosFromStorage();
    
    // Actualizar año actual en el footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Modal para imagen ampliada del mapa
    const mapImage = document.getElementById('mapImage');
    const mapModal = document.getElementById('mapModal');
    const mapModalClose = document.querySelector('.map-modal-close');
    const mapModalImage = document.getElementById('mapModalImage');

    // Abrir modal al hacer clic en la imagen del mapa
    if (mapImage && mapModal) {
        mapImage.addEventListener('click', function() {
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        });
    }

    // Cerrar modal al hacer clic en el botón X
    if (mapModalClose && mapModal) {
        mapModalClose.addEventListener('click', function() {
            mapModal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll del body
        });
    }

    // Cerrar modal al hacer clic fuera de la imagen
    if (mapModal) {
        mapModal.addEventListener('click', function(e) {
            // Solo cerrar si se hace clic en el fondo (no en la imagen)
            if (e.target === mapModal) {
                mapModal.classList.remove('active');
                document.body.style.overflow = ''; // Restaurar scroll del body
            }
        });
    }

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mapModal && mapModal.classList.contains('active')) {
            mapModal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll del body
        }
    });
});

// Función para obtener paquetes desde localStorage
function getPackagesFromStorage() {
    const stored = localStorage.getItem('tourPackages');
    return stored ? JSON.parse(stored) : [];
}

// Función para cargar paquetes desde localStorage
function loadPackagesFromStorage() {
    const packagesData = getPackagesFromStorage();
    const packagesGrid = document.getElementById('packagesGrid');
    
    if (!packagesGrid) return;
    
    // Si hay paquetes en localStorage, reemplazar el contenido estático
    if (packagesData.length > 0) {
        packagesGrid.innerHTML = '';
        packagesData.forEach((pkg, index) => {
            const packageCard = document.createElement('div');
            packageCard.className = 'package-card';
            packageCard.dataset.index = index;
            
            // Construir HTML de características
            const featuresHTML = pkg.features.map(feature => `<li>${feature}</li>`).join('');
            
            // Construir HTML de "no incluye" si existe
            const notIncludesHTML = pkg.notIncludes && pkg.notIncludes.length > 0 
                ? `<b>No incluye:<br>${pkg.notIncludes.map(item => item).join('<br>')}</b>` 
                : '';
            
            packageCard.innerHTML = `
                <div class="package-image">
                    <div class="image-placeholder">
                        <img src="${pkg.image}" alt="${pkg.name}" class="hero-main-image" onerror="this.parentElement.innerHTML='<p>Imagen no encontrada</p>'">
                    </div>
                </div>
                <div class="package-content">
                    <h3>${pkg.name}</h3>
                    <div class="package-content-wrapper">
                        <p class="package-description">${pkg.description}</p>
                        <ul class="package-features">
                            ${featuresHTML}
                        </ul>
                        ${notIncludesHTML}
                    </div>
                    <button class="btn-ver-mas" onclick="togglePackageContent(${index})">Ver más</button>
                    <div class="package-price">${pkg.price}</div>
                    <a href="https://wa.me/573193981055?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20el%20paquete:%20${encodeURIComponent(pkg.name)}" 
                       class="btn-whatsapp" target="_blank">
                        ¡Agenda tu viaje!
                    </a>
                </div>
            `;
            packagesGrid.appendChild(packageCard);
        });
        
        // Inicializar botones "Ver más" después de cargar
        setTimeout(() => {
            initVerMasButtons();
            initPackagesCarousel();
        }, 100);
        
        // Re-aplicar animaciones a los nuevos elementos
        const newCards = packagesGrid.querySelectorAll('.package-card');
        newCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            observer.observe(card);
        });
    }
    
    // Siempre inicializar el carrusel (tanto si hay paquetes en localStorage como si no)
    setTimeout(() => {
        if (packagesData.length === 0) {
            initVerMasButtons();
        }
        initPackagesCarousel();
    }, 200);
}

// Función para inicializar botones "Ver más"
function initVerMasButtons() {
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach((card, index) => {
        const contentWrapper = card.querySelector('.package-content-wrapper');
        const btnVerMas = card.querySelector('.btn-ver-mas');
        
        if (!contentWrapper || !btnVerMas) return;
        
        // Remover clases de expansión temporalmente para medir
        const wasExpanded = card.classList.contains('expanded');
        if (wasExpanded) {
            card.classList.remove('expanded');
            contentWrapper.classList.remove('expanded');
        }
        
        // Esperar un momento para que el DOM se actualice
        setTimeout(() => {
            // Obtener la altura del contenido completo
            const contentHeight = contentWrapper.scrollHeight;
            const containerHeight = contentWrapper.clientHeight;
            
            // Verificar si el contenido es más grande que el contenedor
            // Agregamos un margen de 10px para evitar problemas de redondeo
            const isOverflowing = contentHeight > containerHeight + 10;
            
            if (!isOverflowing) {
                btnVerMas.classList.add('hidden');
            } else {
                btnVerMas.classList.remove('hidden');
            }
            
            // Restaurar estado expandido si estaba expandido
            if (wasExpanded) {
                card.classList.add('expanded');
                contentWrapper.classList.add('expanded');
                btnVerMas.textContent = 'Ver menos';
            }
        }, 50);
    });
}

// Función para expandir/colapsar contenido del paquete (global)
window.togglePackageContent = function(index) {
    const packageCards = document.querySelectorAll('.package-card');
    const card = packageCards[index];
    
    if (!card) return;
    
    const contentWrapper = card.querySelector('.package-content-wrapper');
    const content = card.querySelector('.package-content');
    const btnVerMas = card.querySelector('.btn-ver-mas');
    
    if (!contentWrapper || !content || !btnVerMas) return;
    
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        card.classList.remove('expanded');
        contentWrapper.classList.remove('expanded');
        content.classList.remove('expanded');
        btnVerMas.textContent = 'Ver más';
    } else {
        card.classList.add('expanded');
        contentWrapper.classList.add('expanded');
        content.classList.add('expanded');
        btnVerMas.textContent = 'Ver menos';
    }
}

// Función para inicializar el carrusel de paquetes
function initPackagesCarousel() {
    const packagesGrid = document.getElementById('packagesGrid');
    const prevBtn = document.getElementById('packagesPrev');
    const nextBtn = document.getElementById('packagesNext');
    const indicatorsContainer = document.getElementById('packagesIndicators');
    
    if (!packagesGrid || !prevBtn || !nextBtn || !indicatorsContainer) return;
    
    const items = packagesGrid.querySelectorAll('.package-card');
    if (items.length === 0) return;
    
    let currentIndex = 0;
    let packagesPerView = window.innerWidth > 768 ? 3 : 1;
    
    // Función para calcular el número máximo de grupos
    function getMaxGroups() {
        const totalItems = items.length;
        const perView = window.innerWidth > 768 ? 3 : 1;
        return Math.max(1, Math.ceil(totalItems / perView));
    }
    
    // Crear indicadores basados en grupos
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const maxGroups = getMaxGroups();
        
        for (let i = 0; i < maxGroups; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        packagesPerView = window.innerWidth > 768 ? 3 : 1;
        
        if (items.length === 0) return;
        
        // Calcular el desplazamiento basado en el ancho real de cada item
        const firstItem = items[0];
        if (!firstItem) return;
        
        const itemWidth = firstItem.offsetWidth;
        const gap = packagesPerView === 3 ? 24 : 0; // 1.5rem = 24px aproximadamente
        const translateX = -currentIndex * (itemWidth * packagesPerView + gap * (packagesPerView - 1));
        
        packagesGrid.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Mostrar/ocultar botones según la posición
        const maxGroups = getMaxGroups();
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex >= maxGroups - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxGroups - 1 ? 'none' : 'auto';
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        const maxGroups = getMaxGroups();
        if (index < 0 || index >= maxGroups) return;
        currentIndex = index;
        updateCarousel();
    }
    
    // Función para avanzar
    function nextSlide() {
        const maxGroups = getMaxGroups();
        if (currentIndex < maxGroups - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Función para retroceder
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Recalcular al cambiar el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldPackagesPerView = packagesPerView;
            packagesPerView = window.innerWidth > 768 ? 3 : 1;
            
            // Recalcular el índice actual si cambió el número de paquetes por vista
            if (oldPackagesPerView !== packagesPerView) {
                const maxGroups = getMaxGroups();
                if (currentIndex >= maxGroups) {
                    currentIndex = maxGroups - 1;
                }
                createIndicators();
                updateCarousel();
                initVerMasButtons(); // Re-inicializar botones después de resize
            }
        }, 250);
    });
    
    // Inicializar
    createIndicators();
    updateCarousel();
}

// Función para obtener videos de TikTok desde localStorage
function getTikTokVideosFromStorage() {
    const stored = localStorage.getItem('tiktokVideos');
    return stored ? JSON.parse(stored) : [];
}

// Función para cargar videos de TikTok desde localStorage
function loadTikTokVideosFromStorage() {
    const videos = getTikTokVideosFromStorage();
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;
    
    // Si hay videos en localStorage, reemplazar el contenido estático
    if (videos.length > 0) {
        carouselTrack.innerHTML = '';
        
        videos.forEach(video => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item';
            testimonialItem.innerHTML = `
                <div class="video-placeholder">
                    <blockquote class="tiktok-embed" cite="${video.url}"
                        data-video-id="${video.videoId}" style="max-width: 100%; min-width: 325px;">
                        <section>
                            <a href="${video.url}" target="_blank">TikTok</a>
                        </section>
                    </blockquote>
                </div>
            `;
            carouselTrack.appendChild(testimonialItem);
        });
        
        // Inicializar el carrusel después de cargar los videos
        initCarousel();
        
        // Recargar el script de TikTok para renderizar los nuevos embeds
        // Esperar un momento para que el DOM se actualice
        setTimeout(() => {
            if (window.tiktokEmbed && window.tiktokEmbed.lib) {
                window.tiktokEmbed.lib.render();
            } else {
                // Si el script aún no está cargado, esperar a que se cargue
                const checkTikTokScript = setInterval(() => {
                    if (window.tiktokEmbed && window.tiktokEmbed.lib) {
                        window.tiktokEmbed.lib.render();
                        clearInterval(checkTikTokScript);
                    }
                }, 100);
                
                // Timeout después de 5 segundos
                setTimeout(() => {
                    clearInterval(checkTikTokScript);
                }, 5000);
            }
        }, 100);
    } else {
        // Si no hay videos en localStorage, inicializar el carrusel con los videos estáticos
        initCarousel();
    }
}

// Función para obtener el número de videos visibles según el tamaño de pantalla
function getVideosPerView() {
    return window.innerWidth > 768 ? 3 : 1;
}

// Función para inicializar el carrusel
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !prevBtn || !nextBtn || !indicatorsContainer) return;
    
    const items = carouselTrack.querySelectorAll('.testimonial-item');
    if (items.length === 0) return;
    
    let currentIndex = 0;
    let videosPerView = getVideosPerView();
    
    // Función para calcular el número máximo de grupos
    function getMaxGroups() {
        const totalItems = items.length;
        const perView = getVideosPerView();
        return Math.max(1, Math.ceil(totalItems / perView));
    }
    
    // Crear indicadores basados en grupos
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const maxGroups = getMaxGroups();
        
        for (let i = 0; i < maxGroups; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Ir al grupo ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        videosPerView = getVideosPerView();
        
        if (items.length === 0) return;
        
        // Calcular el desplazamiento basado en el ancho real de cada item
        const firstItem = items[0];
        if (!firstItem) return;
        
        const itemWidth = firstItem.offsetWidth;
        const gap = videosPerView === 3 ? 24 : 0; // 1.5rem = 24px aproximadamente
        const translateX = -currentIndex * (itemWidth * videosPerView + gap * (videosPerView - 1));
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Mostrar/ocultar botones según la posición
        const maxGroups = getMaxGroups();
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex >= maxGroups - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxGroups - 1 ? 'none' : 'auto';
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        const maxGroups = getMaxGroups();
        if (index < 0 || index >= maxGroups) return;
        currentIndex = index;
        updateCarousel();
    }
    
    // Función para avanzar
    function nextSlide() {
        const maxGroups = getMaxGroups();
        if (currentIndex < maxGroups - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Función para retroceder
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        const testimonialsSection = document.getElementById('testimonios');
        if (!testimonialsSection) return;
        
        const rect = testimonialsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Recalcular al cambiar el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldVideosPerView = videosPerView;
            videosPerView = getVideosPerView();
            
            // Recalcular el índice actual si cambió el número de videos por vista
            if (oldVideosPerView !== videosPerView) {
                const maxGroups = getMaxGroups();
                if (currentIndex >= maxGroups) {
                    currentIndex = maxGroups - 1;
                }
                createIndicators();
                updateCarousel();
            }
        }, 250);
    });
    
    // Inicializar
    createIndicators();
    updateCarousel();
}


