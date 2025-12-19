// Script para el Panel de Administración

// Contraseña de administración (cambiar por una más segura en producción)
const ADMIN_PASSWORD = 'chaira2026';

// Verificar que el script se haya cargado
console.log('Script de administración cargado. Contraseña configurada:', ADMIN_PASSWORD);

// Verificar si el usuario está autenticado
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Mostrar pantalla de login
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').classList.add('hidden');
}

// Mostrar panel de administración
function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').classList.remove('hidden');
    loadPackages();
    loadTikTokVideos();
}

// Manejar login
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener y limpiar la contraseña ingresada
            const enteredPassword = passwordInput.value.trim();
            
            console.log('Contraseña ingresada:', enteredPassword);
        
            console.log('Contraseña esperada:', ADMIN_PASSWORD);
            console.log('¿Coinciden?', enteredPassword === ADMIN_PASSWORD);

            if (enteredPassword === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminAuthenticated', 'true');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                    errorMsg.textContent = '';
                }
                showAdminPanel();
            } else {
                if (errorMsg) {
                    errorMsg.textContent = 'Contraseña incorrecta. Por favor intenta nuevamente.';
                    errorMsg.classList.add('show');
                } else {
                    alert('Contraseña incorrecta');
                }
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    } else {
        console.error('No se encontró el formulario de login');
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('adminAuthenticated');
            showLoginScreen();
        });
    }

    // Formulario de paquetes
    const packageForm = document.getElementById('packageForm');
    if (packageForm) {
        packageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addPackage();
        });
    }

    // Formulario de TikTok
    const tiktokForm = document.getElementById('tiktokForm');
    if (tiktokForm) {
        tiktokForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addTikTokVideo();
        });
    }
});

// Funciones para manejar paquetes
function addPackage() {
    const packageId = document.getElementById('packageId').value;
    const name = document.getElementById('packageName').value.trim();
    const description = document.getElementById('packageDescription').value.trim();
    const image = document.getElementById('packageImage').value.trim();
    const price = document.getElementById('packagePrice').value.trim();
    const featuresText = document.getElementById('packageFeatures').value.trim();
    const notIncludesText = document.getElementById('packageNotIncludes').value.trim();

    if (!name || !description || !image || !price || !featuresText) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }

    const features = featuresText.split('\n').filter(f => f.trim() !== '');
    const notIncludes = notIncludesText.split('\n').filter(f => f.trim() !== '');

    const packages = getPackages();
    
    if (packageId) {
        // Editar paquete existente
        const index = packages.findIndex(pkg => pkg.id === parseInt(packageId));
        if (index !== -1) {
            packages[index] = {
                id: parseInt(packageId),
                name,
                description,
                image,
                price,
                features,
                notIncludes
            };
            localStorage.setItem('tourPackages', JSON.stringify(packages));
            showSuccessMessage('Paquete actualizado exitosamente');
        }
    } else {
        // Agregar nuevo paquete
        const newPackage = {
            id: Date.now(),
            name,
            description,
            image,
            price,
            features,
            notIncludes
        };
        packages.push(newPackage);
        localStorage.setItem('tourPackages', JSON.stringify(packages));
        showSuccessMessage('Paquete agregado exitosamente');
    }

    document.getElementById('packageForm').reset();
    document.getElementById('packageId').value = '';
    document.getElementById('packageFormTitle').textContent = 'Agregar Nuevo Paquete';
    document.getElementById('packageSubmitBtn').textContent = 'Agregar Paquete';
    document.getElementById('packageCancelBtn').style.display = 'none';
    loadPackages();
}

function editPackage(id) {
    const packages = getPackages();
    const pkg = packages.find(p => p.id === id);
    
    if (!pkg) {
        alert('Paquete no encontrado');
        return;
    }

    // Llenar el formulario con los datos del paquete
    document.getElementById('packageId').value = pkg.id;
    document.getElementById('packageName').value = pkg.name;
    document.getElementById('packageDescription').value = pkg.description;
    document.getElementById('packageImage').value = pkg.image;
    document.getElementById('packagePrice').value = pkg.price;
    document.getElementById('packageFeatures').value = pkg.features.join('\n');
    document.getElementById('packageNotIncludes').value = pkg.notIncludes ? pkg.notIncludes.join('\n') : '';
    
    // Cambiar el título y botón del formulario
    document.getElementById('packageFormTitle').textContent = 'Editar Paquete';
    document.getElementById('packageSubmitBtn').textContent = 'Actualizar Paquete';
    document.getElementById('packageCancelBtn').style.display = 'inline-block';
    
    // Scroll al formulario
    document.querySelector('.admin-form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEditPackage() {
    document.getElementById('packageForm').reset();
    document.getElementById('packageId').value = '';
    document.getElementById('packageFormTitle').textContent = 'Agregar Nuevo Paquete';
    document.getElementById('packageSubmitBtn').textContent = 'Agregar Paquete';
    document.getElementById('packageCancelBtn').style.display = 'none';
}

function getPackages() {
    const stored = localStorage.getItem('tourPackages');
    return stored ? JSON.parse(stored) : [];
}

function loadPackages() {
    const packages = getPackages();
    const packagesList = document.getElementById('packagesList');

    if (packages.length === 0) {
        packagesList.innerHTML = '<div class="empty-state"><p>No hay paquetes agregados aún</p></div>';
        return;
    }

    packagesList.innerHTML = packages.map(pkg => `
        <div class="admin-item">
            <div class="admin-item-header">
                <div class="admin-item-title">${pkg.name}</div>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="editPackage(${pkg.id})">Editar</button>
                    <button class="btn-delete" onclick="deletePackage(${pkg.id})">Eliminar</button>
                </div>
            </div>
            <div class="admin-item-content">
                <p><strong>Descripción:</strong> ${pkg.description}</p>
                <p><strong>Precio:</strong> ${pkg.price}</p>
                <p><strong>Imagen:</strong> ${pkg.image}</p>
                <p><strong>Características:</strong> ${pkg.features.length} items</p>
            </div>
        </div>
    `).join('');
}

function deletePackage(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
        const packages = getPackages();
        const filtered = packages.filter(pkg => pkg.id !== id);
        localStorage.setItem('tourPackages', JSON.stringify(filtered));
        loadPackages();
    }
}

// Funciones para manejar videos de TikTok
function addTikTokVideo() {
    const videoId = document.getElementById('tiktokId').value;
    const url = document.getElementById('tiktokUrl').value.trim();

    if (!url) {
        alert('Por favor ingresa la URL del video');
        return;
    }

    // Validar que sea una URL de TikTok
    if (!url.includes('tiktok.com')) {
        alert('Por favor ingresa una URL válida de TikTok');
        return;
    }

    // Extraer el ID del video de la URL
    const extractedVideoId = extractTikTokVideoId(url);
    if (!extractedVideoId) {
        alert('No se pudo extraer el ID del video. Asegúrate de usar una URL válida de TikTok');
        return;
    }

    const videos = getTikTokVideos();
    
    if (videoId) {
        // Editar video existente
        const index = videos.findIndex(v => v.id === parseInt(videoId));
        if (index !== -1) {
            videos[index] = {
                id: parseInt(videoId),
                url: url,
                videoId: extractedVideoId
            };
            localStorage.setItem('tiktokVideos', JSON.stringify(videos));
            showSuccessMessage('Video de TikTok actualizado exitosamente');
        }
    } else {
        // Agregar nuevo video
        const video = {
            id: Date.now(),
            url: url,
            videoId: extractedVideoId
        };
        videos.push(video);
        localStorage.setItem('tiktokVideos', JSON.stringify(videos));
        showSuccessMessage('Video de TikTok agregado exitosamente');
    }

    document.getElementById('tiktokForm').reset();
    document.getElementById('tiktokId').value = '';
    document.getElementById('tiktokFormTitle').textContent = 'Agregar Nuevo Video de TikTok';
    document.getElementById('tiktokSubmitBtn').textContent = 'Agregar Video';
    document.getElementById('tiktokCancelBtn').style.display = 'none';
    loadTikTokVideos();
}

function extractTikTokVideoId(url) {
    // Intentar extraer el ID del video de diferentes formatos de URL de TikTok
    const patterns = [
        /\/video\/(\d+)/,                    // /video/1234567890
        /\/video\/(\d+)\?/,                   // /video/1234567890?
        /\/@[\w.]+\/video\/(\d+)/,            // /@usuario/video/1234567890
        /\/@[\w.]+\/video\/(\d+)\?/,          // /@usuario/video/1234567890?
        /tiktok\.com\/.*\/video\/(\d+)/,      // tiktok.com/.../video/1234567890
        /vm\.tiktok\.com\/.*\/(\d+)/          // vm.tiktok.com/.../1234567890
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    // Si no se encuentra, intentar extraer cualquier número largo que pueda ser el ID
    const numbers = url.match(/\d{15,}/);
    return numbers ? numbers[0] : null;
}

function getTikTokVideos() {
    const stored = localStorage.getItem('tiktokVideos');
    return stored ? JSON.parse(stored) : [];
}

function loadTikTokVideos() {
    const videos = getTikTokVideos();
    const tiktokList = document.getElementById('tiktokList');

    if (videos.length === 0) {
        tiktokList.innerHTML = '<div class="empty-state"><p>No hay videos agregados aún</p></div>';
        return;
    }

    tiktokList.innerHTML = videos.map(video => `
        <div class="admin-item">
            <div class="admin-item-header">
                <div class="admin-item-title">Video ID: ${video.videoId}</div>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="editTikTokVideo(${video.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteTikTokVideo(${video.id})">Eliminar</button>
                </div>
            </div>
            <div class="admin-item-content">
                <div class="admin-item-url">${video.url}</div>
            </div>
        </div>
    `).join('');
}

function editTikTokVideo(id) {
    const videos = getTikTokVideos();
    const video = videos.find(v => v.id === id);
    
    if (!video) {
        alert('Video no encontrado');
        return;
    }

    // Llenar el formulario con los datos del video
    document.getElementById('tiktokId').value = video.id;
    document.getElementById('tiktokUrl').value = video.url;
    
    // Cambiar el título y botón del formulario
    document.getElementById('tiktokFormTitle').textContent = 'Editar Video de TikTok';
    document.getElementById('tiktokSubmitBtn').textContent = 'Actualizar Video';
    document.getElementById('tiktokCancelBtn').style.display = 'inline-block';
    
    // Scroll al formulario
    document.querySelectorAll('.admin-form-container')[1].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEditTikTok() {
    document.getElementById('tiktokForm').reset();
    document.getElementById('tiktokId').value = '';
    document.getElementById('tiktokFormTitle').textContent = 'Agregar Nuevo Video de TikTok';
    document.getElementById('tiktokSubmitBtn').textContent = 'Agregar Video';
    document.getElementById('tiktokCancelBtn').style.display = 'none';
}

function deleteTikTokVideo(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este video?')) {
        const videos = getTikTokVideos();
        const filtered = videos.filter(video => video.id !== id);
        localStorage.setItem('tiktokVideos', JSON.stringify(filtered));
        loadTikTokVideos();
    }
}

function showSuccessMessage(message) {
    // Crear o actualizar mensaje de éxito
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        const form = document.querySelector('.admin-form-container');
        if (form) {
            form.insertBefore(successMsg, form.firstChild);
        }
    }
    successMsg.textContent = message;
    successMsg.classList.add('show');

    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
}

