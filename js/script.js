// Funcionalidad del reproductor de audio futurista
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad existente del sitio
    initializeExistingFunctionality();
    
    // Inicializar el reproductor de audio
    initializeAudioPlayer();
    
    // Inicializar la animación de Hex Maniac
    initializeHexManiacAnimation();
    
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
    
    // Estado del reproductor
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    
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
    
    // Asignar eventos a los botones
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
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
