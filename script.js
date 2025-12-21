/* =====================================================
   MAIN.JS – VERSIÓN ROBUSTA PARA PRODUCCIÓN
===================================================== */

document.addEventListener('DOMContentLoaded', function () {
    try {

        /* =========================
           MODAL DE VIDEO INICIAL
        ========================== */
        const videoModal = document.getElementById('videoModal');
        const closeVideo = document.querySelector('.close-video');
        const introVideo = document.getElementById('introVideo');

        if (videoModal && !sessionStorage.getItem('videoShown')) {
            videoModal.classList.remove('hidden');

            closeVideo?.addEventListener('click', () => {
                videoModal.classList.add('hidden');
                introVideo?.pause();
                sessionStorage.setItem('videoShown', 'true');
            });

            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    videoModal.classList.add('hidden');
                    introVideo?.pause();
                    sessionStorage.setItem('videoShown', 'true');
                }
            });
        } else {
            videoModal?.classList.add('hidden');
        }

        /* =========================
           MENÚ HAMBURGUESA
        ========================== */
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        /* =========================
           SMOOTH SCROLL
        ========================== */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        /* =========================
           ANIMACIONES AL SCROLL
        ========================== */
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document
            .querySelectorAll('.package-card, .testimonial-item, .contact-item')
            .forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

        /* =========================
           FORMULARIO CONTACTO
        ========================== */
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', e => {
                e.preventDefault();

                const name = document.getElementById('name')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const phone = document.getElementById('phone')?.value || '';
                const message = document.getElementById('message')?.value || '';

                const text = `Hola, mi nombre es ${name}.
Email: ${email}
Teléfono: ${phone}

Mensaje: ${message}`;

                window.open(
                    `https://wa.me/573193981055?text=${encodeURIComponent(text)}`,
                    '_blank'
                );

                alert('Redirigiendo a WhatsApp...');
                contactForm.reset();
            });
        }

        /* =========================
           NAVBAR SCROLL (FIX)
        ========================== */
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255,255,255,0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
                } else {
                    navbar.style.background = 'rgba(255,255,255,0.95)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }
            });
        }

        /* =========================
           FOOTER AÑO
        ========================== */
        const currentYear = document.getElementById('currentYear');
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }

        /* =========================
           MODAL MAPA
        ========================== */
        const mapImage = document.getElementById('mapImage');
        const mapModal = document.getElementById('mapModal');
        const mapClose = document.querySelector('.map-modal-close');

        mapImage?.addEventListener('click', () => {
            mapModal?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mapClose?.addEventListener('click', () => {
            mapModal?.classList.remove('active');
            document.body.style.overflow = '';
        });

        mapModal?.addEventListener('click', e => {
            if (e.target === mapModal) {
                mapModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mapModal?.classList.contains('active')) {
                mapModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        /* =========================
           CARGA DE DATOS
        ========================== */
        loadPackagesFromStorage();
        loadTikTokVideosFromStorage();

    } catch (error) {
        console.error('❌ Error general en main.js:', error);
    }
});

/* =====================================================
   PAQUETES – LOCALSTORAGE
===================================================== */
function getPackagesFromStorage() {
    return JSON.parse(localStorage.getItem('tourPackages') || '[]');
}

function loadPackagesFromStorage() {
    const data = getPackagesFromStorage();
    const grid = document.getElementById('packagesGrid');
    if (!grid || data.length === 0) return;

    grid.innerHTML = '';

    data.forEach((pkg, index) => {
        const card = document.createElement('div');
        card.className = 'package-card';

        card.innerHTML = `
            <div class="package-image">
                <img src="${pkg.image}" alt="${pkg.name}">
            </div>
            <div class="package-content">
                <h3>${pkg.name}</h3>
                <div class="package-content-wrapper">
                    <p>${pkg.description}</p>
                    <ul>${pkg.features.map(f => `<li>${f}</li>`).join('')}</ul>
                </div>
                <button class="btn-ver-mas" onclick="togglePackageContent(${index})">Ver más</button>
                <div class="package-price">${pkg.price}</div>
                <a class="btn-whatsapp" target="_blank"
                   href="https://wa.me/573193981055?text=${encodeURIComponent(pkg.name)}">
                   ¡Agenda tu viaje!
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.togglePackageContent = function (index) {
    const cards = document.querySelectorAll('.package-card');
    const card = cards[index];
    if (!card) return;

    card.classList.toggle('expanded');
    const btn = card.querySelector('.btn-ver-mas');
    btn.textContent = card.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
};

/* =====================================================
   TIKTOK – LOCALSTORAGE
===================================================== */
function getTikTokVideosFromStorage() {
    return JSON.parse(localStorage.getItem('tiktokVideos') || '[]');
}

function loadTikTokVideosFromStorage() {
    const videos = getTikTokVideosFromStorage();
    const track = document.getElementById('carouselTrack');
    if (!track || videos.length === 0) return;

    track.innerHTML = '';

    videos.forEach(video => {
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
            <blockquote class="tiktok-embed"
                cite="${video.url}"
                data-video-id="${video.videoId}">
                <section>
                    <a href="${video.url}" target="_blank">TikTok</a>
                </section>
            </blockquote>
        `;
        track.appendChild(item);
    });

    setTimeout(() => {
        window.tiktokEmbed?.lib?.render();
    }, 300);
}
