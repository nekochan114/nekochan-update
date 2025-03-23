// Funcionalidad del reproductor de audio futurista
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad existente del sitio
    initializeExistingFunctionality();
    
    // Inicializar el reproductor de audio
    initializeAudioPlayer();
    
    // Inicializar la animación de Hex Maniac
    initializeHexManiacAnimation();
    
    // Inicializar el indicador de búsqueda arcoíris
    initializeRainbowSearchIndicator();
    
    // Añadir partículas al fondo (ya existente en el código original)
    createParticles();
});

// Mantener la funcionalidad existente del sitio
function initializeExistingFunctionality() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            searchInput.value = '';
            // Resetear el indicador de búsqueda arcoíris
            resetRainbowIndicator();
        }
    }

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Inicializar el reproductor de audio futurista
function initializeAudioPlayer() {
    // Crear el botón flotante para mostrar el reproductor cuando está oculto
    createFloatButton();
    
    // Crear la biblioteca de música
    createMusicLibrary();
    
    // Elementos del reproductor
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBar = document.getElementById('audio-progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeLevel = document.getElementById('volume-level');
    const audioElement = document.getElementById('audio-element');
    const toggleBtn = document.getElementById('player-toggle-btn');
    const minimizeBtn = document.getElementById('player-minimize-btn');
    const libraryBtn = document.getElementById('player-library-btn');
    const floatButton = document.getElementById('audio-player-float-button');
    
    // Estado del reproductor
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let isMinimized = false;
    
    // Biblioteca de música
    const musicLibrary = document.getElementById('music-library');
    const musicCategories = document.querySelectorAll('.music-library-category');
    const musicTracks = document.querySelectorAll('.music-track');
    const libraryCloseBtn = document.getElementById('library-close-btn');
    
    // Simular la reproducción de audio (sin audio real)
    let progressInterval;
    let currentProgress = 0;
    const totalDuration = 183; // 3:03 en segundos
    
    // Actualizar la visualización del tiempo
    function updateTimeDisplay() {
        const currentSeconds = Math.floor(currentProgress);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        
        currentTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        progressBar.style.width = `${(currentProgress / totalDuration) * 100}%`;
    }
    
    // Formatear el tiempo total
    const totalMinutes = Math.floor(totalDuration / 60);
    const totalSeconds = totalDuration % 60;
    totalTimeEl.textContent = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
    
    // Función para reproducir/pausar
    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            // Cambiar icono a pausa
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            `;
            
            // Iniciar la simulación de progreso
            progressInterval = setInterval(() => {
                if (currentProgress < totalDuration) {
                    currentProgress += 0.1;
                    updateTimeDisplay();
                } else {
                    if (isRepeat) {
                        currentProgress = 0;
                        updateTimeDisplay();
                    } else {
                        clearInterval(progressInterval);
                        isPlaying = false;
                        playPauseBtn.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        `;
                    }
                }
            }, 100);
        } else {
            // Cambiar icono a reproducir
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            
            // Detener la simulación de progreso
            clearInterval(progressInterval);
        }
    }
    
    // Función para canción anterior
    function previousTrack() {
        currentProgress = 0;
        updateTimeDisplay();
        if (isPlaying) {
            clearInterval(progressInterval);
            togglePlayPause();
            togglePlayPause();
        }
    }
    
    // Función para siguiente canción
    function nextTrack() {
        currentProgress = 0;
        updateTimeDisplay();
        if (isPlaying) {
            clearInterval(progressInterval);
            togglePlayPause();
            togglePlayPause();
        }
    }
    
    // Función para activar/desactivar reproducción aleatoria
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }
    
    // Función para activar/desactivar repetición
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    }
    
    // Función para ocultar/mostrar el reproductor
    function togglePlayerVisibility() {
        audioPlayer.classList.toggle('hidden');
        floatButton.classList.toggle('visible');
    }
    
    // Función para minimizar/maximizar el reproductor
    function togglePlayerSize() {
        isMinimized = !isMinimized;
        audioPlayer.classList.toggle('minimized', isMinimized);
        
        // Actualizar el icono del botón
        if (isMinimized) {
            minimizeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
            `;
        } else {
            minimizeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z"/>
                </svg>
            `;
        }
    }
    
    // Función para mostrar/ocultar la biblioteca de música
    function toggleMusicLibrary() {
        musicLibrary.classList.toggle('active');
    }
    
    // Función para seleccionar una categoría de música
    function selectMusicCategory(category) {
        // Remover la clase active de todas las categorías
        musicCategories.forEach(cat => cat.classList.remove('active'));
        
        // Añadir la clase active a la categoría seleccionada
        category.classList.add('active');
        
        // Filtrar las pistas según la categoría seleccionada
        const selectedCategory = category.getAttribute('data-category');
        
        musicTracks.forEach(track => {
            const trackCategory = track.getAttribute('data-category');
            if (selectedCategory === 'all' || trackCategory === selectedCategory) {
                track.style.display = 'flex';
            } else {
                track.style.display = 'none';
            }
        });
    }
    
    // Función para seleccionar una pista de música
    function selectMusicTrack(track) {
        // Actualizar la información del reproductor
        const title = track.querySelector('.music-track-title').textContent;
        const artist = track.querySelector('.music-track-artist').textContent;
        const coverSrc = track.querySelector('.music-track-cover img').src;
        
        document.querySelector('.audio-player-title').textContent = title;
        document.querySelector('.audio-player-artist').textContent = artist;
        document.querySelector('.audio-player-album img').src = coverSrc;
        
        // Reiniciar la reproducción
        currentProgress = 0;
        updateTimeDisplay();
        
        // Si estaba reproduciendo, reiniciar la reproducción
        if (isPlaying) {
            clearInterval(progressInterval);
            togglePlayPause();
            togglePlayPause();
        } else {
            // Iniciar la reproducción
            togglePlayPause();
        }
        
        // Cerrar la biblioteca
        musicLibrary.classList.remove('active');
    }
    
    // Asignar eventos a los botones
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    if (prevBtn) prevBtn.addEventListener('click', previousTrack);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
    if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
    if (toggleBtn) toggleBtn.addEventListener('click', togglePlayerVisibility);
    if (minimizeBtn) minimizeBtn.addEventListener('click', togglePlayerSize);
    if (libraryBtn) libraryBtn.addEventListener('click', toggleMusicLibrary);
    if (floatButton) floatButton.addEventListener('click', togglePlayerVisibility);
    if (libraryCloseBtn) libraryCloseBtn.addEventListener('click', toggleMusicLibrary);
    
    // Asignar eventos a las categorías de música
    musicCategories.forEach(category => {
        category.addEventListener('click', () => selectMusicCategory(category));
    });
    
    // Asignar eventos a las pistas de música
    musicTracks.forEach(track => {
        track.addEventListener('click', () => selectMusicTrack(track));
    });
    
    // Inicializar con la primera categoría seleccionada
    if (musicCategories.length > 0) {
        selectMusicCategory(musicCategories[0]);
    }
}

// Crear el botón flotante para mostrar el reproductor cuando está oculto
function createFloatButton() {
    const floatButton = document.createElement('div');
    floatButton.id = 'audio-player-float-button';
    floatButton.className = 'audio-player-float-button';
    floatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
    `;
    document.body.appendChild(floatButton);
}

// Crear la biblioteca de música
function createMusicLibrary() {
    const musicLibrary = document.createElement('div');
    musicLibrary.id = 'music-library';
    musicLibrary.className = 'music-library';
    
    // Datos de la biblioteca de música
    const musicData = {
        breakcore: [
            { title: "Newlove", artist: "Sewerslvt", cover: "images/music/sewerslvt.jpg", duration: "4:21" },
            { title: "Cyberia lyr3", artist: "Sewerslvt", cover: "images/music/sewerslvt.jpg", duration: "5:12" },
            { title: "Ecifircas", artist: "Sewerslvt", cover: "images/music/sewerslvt.jpg", duration: "3:45" },
            { title: "Looming.Sorrow.Descent", artist: "Sewerslvt", cover: "images/music/sewerslvt.jpg", duration: "6:02" },
            { title: "Broken Memory", artist: "Sabuze", cover: "images/music/sabuze.jpg", duration: "3:18" },
            { title: "Neon Dystopia", artist: "Sabuze", cover: "images/music/sabuze.jpg", duration: "4:33" },
            { title: "I'll See You in 40", artist: "Death Dynamic Shroud", cover: "images/music/dds.jpg", duration: "5:27" },
            { title: "Faith in Persona", artist: "Death Dynamic Shroud", cover: "images/music/dds.jpg", duration: "4:15" },
            { title: "Ghosted", artist: "2hollis", cover: "images/music/2hollis.jpg", duration: "3:56" },
            { title: "Midnight Run", artist: "2hollis", cover: "images/music/2hollis.jpg", duration: "4:08" },
            { title: "Phantom Ensemble", artist: "Remilia Bandxz", cover: "images/music/remilia.jpg", duration: "3:42" },
            { title: "Digital Tears", artist: "Remilia Bandxz", cover: "images/music/remilia.jpg", duration: "5:01" }
        ],
        kanye: [
            { title: "Vultures 1", artist: "Ye & Ty Dolla $ign", cover: "images/music/vultures.jpg", duration: "3:14" },
            { title: "Vultures 2", artist: "Ye & Ty Dolla $ign", cover: "images/music/vultures.jpg", duration: "2:57" },
            { title: "Keys To My Life", artist: "Ye", cover: "images/music/vultures.jpg", duration: "4:22" },
            { title: "Talking", artist: "Ye & Ty Dolla $ign", cover: "images/music/vultures.jpg", duration: "3:35" },
            { title: "Back To Me", artist: "Ye & Ty Dolla $ign", cover: "images/music/vultures.jpg", duration: "3:08" }
        ],
        carti: [
            { title: "Sky", artist: "Playboi Carti", cover: "images/music/carti.jpg", duration: "3:18" },
            { title: "ILoveUIHateU", artist: "Playboi Carti", cover: "images/music/carti.jpg", duration: "2:35" },
            { title: "Vamp Anthem", artist: "Playboi Carti", cover: "images/music/carti.jpg", duration: "2:10" },
            { title: "New N3on", artist: "Playboi Carti", cover: "images/music/carti.jpg", duration: "1:32" },
            { title: "Control", artist: "Playboi Carti", cover: "images/music/carti.jpg", duration: "3:02" }
        ]
    };
    
    // Crear el HTML de la biblioteca
    let libraryHTML = `
        <div class="music-library-header">
            <div class="music-library-title">Biblioteca de Música</div>
            <button id="library-close-btn" class="music-library-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/>
                </svg>
            </button>
        </div>
        <div class="music-library-categories">
            <button class="music-library-category active" data-category="all">Todos</button>
            <button class="music-library-category" data-category="breakcore">Breakcore</button>
            <button class="music-library-category" data-category="kanye">Kanye West</button>
            <button class="music-library-category" data-category="carti">Playboi Carti</button>
        </div>
        <div class="music-library-tracks">
    `;
    
    // Añadir las pistas de breakcore
    musicData.breakcore.forEach(track => {
        libraryHTML += `
            <div class="music-track" data-category="breakcore">
                <div class="music-track-cover">
                    <img src="${track.cover}" alt="${track.title}">
                </div>
                <div class="music-track-info">
                    <div class="music-track-title">${track.title}</div>
                    <div class="music-track-artist">${track.artist}</div>
                </div>
                <div class="music-track-duration">${track.duration}</div>
            </div>
        `;
    });
    
    // Añadir las pistas de Kanye West
    musicData.kanye.forEach(track => {
        libraryHTML += `
            <div class="music-track" data-category="kanye">
                <div class="music-track-cover">
                    <img src="${track.cover}" alt="${track.title}">
                </div>
                <div class="music-track-info">
                    <div class="music-track-title">${track.title}</div>
                    <div class="music-track-artist">${track.artist}</div>
                </div>
                <div class="music-track-duration">${track.duration}</div>
            </div>
        `;
    });
    
    // Añadir las pistas de Playboi Carti
    musicData.carti.forEach(track => {
        libraryHTML += `
            <div class="music-track" data-category="carti">
                <div class="music-track-cover">
                    <img src="${track.cover}" alt="${track.title}">
                </div>
                <div class="music-track-info">
                    <div class="music-track-title">${track.title}</div>
                    <div class="music-track-artist">${track.artist}</div>
                </div>
                <div class="music-track-duration">${track.duration}</div>
            </div>
        `;
    });
    
    libraryHTML += `</div>`;
    
    musicLibrary.innerHTML = libraryHTML;
    document.body.appendChild(musicLibrary);
}

// Inicializar la animación de Hex Maniac
function initializeHexManiacAnimation() {
    const hexManiac = document.querySelector('.hex-maniac-img');
    
    // Aplicar animación sutil de flotación
    if (hexManiac) {
        // Añadir clase para la animación
        hexManiac.classList.add('floating');
    }
}

// Inicializar el indicador de búsqueda arcoíris
function initializeRainbowSearchIndicator() {
    // Crear el tubo arcoíris
    const searchContainer = document.querySelector('.search-container');
    const rainbowTube = document.createElement('div');
    rainbowTube.className = 'rainbow-tube';
    
    // Crear el líquido dentro del tubo
    const rainbowLiquid = document.createElement('div');
    rainbowLiquid.className = 'rainbow-liquid';
    
    // Añadir el líquido al tubo
    rainbowTube.appendChild(rainbowLiquid);
    
    // Añadir el tubo después del cuadro de búsqueda
    searchContainer.appendChild(rainbowTube);
    
    // Obtener el input de búsqueda
    const searchInput = document.getElementById('search-input');
    
    // Añadir evento para actualizar el nivel del líquido
    searchInput.addEventListener('input', updateRainbowIndicator);
}

// Actualizar el indicador de búsqueda arcoíris
function updateRainbowIndicator() {
    const searchInput = document.getElementById('search-input');
    const rainbowLiquid = document.querySelector('.rainbow-liquid');
    
    if (searchInput && rainbowLiquid) {
        const inputLength = searchInput.value.length;
        const maxLength = 30; // Longitud máxima estimada
        
        // Calcular el porcentaje de llenado (máximo 100%)
        const fillPercentage = Math.min((inputLength / maxLength) * 100, 100);
        
        // Actualizar la altura del líquido
        rainbowLiquid.style.height = `${fillPercentage}%`;
        
        // Cambiar el color según el nivel de llenado
        updateRainbowColor(fillPercentage);
    }
}

// Actualizar el color del líquido arcoíris
function updateRainbowColor(percentage) {
    const rainbowLiquid = document.querySelector('.rainbow-liquid');
    
    if (rainbowLiquid) {
        // Crear un efecto de color basado en el porcentaje
        const hue = Math.floor(percentage * 3.6); // 0-100% -> 0-360 (grados de color)
        
        // Aplicar el color con un gradiente
        rainbowLiquid.style.background = `
            linear-gradient(to top, 
                hsl(${hue}, 100%, 60%), 
                hsl(${(hue + 30) % 360}, 100%, 60%)
            )
        `;
        
        // Aumentar el brillo a medida que se llena
        const brightness = 1 + (percentage / 100);
        rainbowLiquid.style.filter = `brightness(${brightness})`;
    }
}

// Resetear el indicador de búsqueda arcoíris
function resetRainbowIndicator() {
    const rainbowLiquid = document.querySelector('.rainbow-liquid');
    
    if (rainbowLiquid) {
        rainbowLiquid.style.height = '0%';
    }
}

// Mantener la funcionalidad de partículas existente
function createParticles() {
    const container = document.querySelector('.container');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    
    document.body.insertBefore(particlesContainer, document.body.firstChild);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.1) + ')';
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.boxShadow = '0 0 ' + Math.random() * 10 + 'px rgba(255, 255, 255, 0.5)';
    
    const duration = Math.random() * 60 + 30;
    particle.style.animation = `float ${duration}s linear infinite`;
    
    const keyframes = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: ${Math.random() * 0.5 + 0.3};
            }
            50% {
                transform: translateY(-${Math.random() * 30 + 10}vh) translateX(${Math.random() * 20 - 10}vw);
                opacity: ${Math.random() * 0.5 + 0.5};
            }
            100% {
                transform: translateY(-${Math.random() * 50 + 20}vh) translateX(${Math.random() * 40 - 20}vw);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation ends
    setTimeout(() => {
        container.removeChild(particle);
        document.head.removeChild(style);
        createParticle(container);
    }, duration * 1000);
}
