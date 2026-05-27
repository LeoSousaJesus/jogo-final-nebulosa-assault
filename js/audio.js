const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

const soundCache = {};
const soundFiles = {
    shoot: 'assets/sounds/shoot.wav',
    enemyShoot: 'assets/sounds/enemyShoot.wav',
    hit: 'assets/sounds/hit.wav',
    explosion: 'assets/sounds/explosion.wav',
    pickup: 'assets/sounds/pickup.wav',
    select: 'assets/sounds/select.wav'
};

const soundVolumes = {
    shoot: 0.05,
    enemyShoot: 0.03,
    hit: 0.05,
    explosion: 0.15,
    pickup: 0.05,
    select: 0.05
};

// Pre-load sound effects
for (const [key, path] of Object.entries(soundFiles)) {
    try {
        const audio = new Audio();
        audio.src = path;
        audio.preload = 'auto';
        soundCache[key] = audio;
    } catch(e) {
        console.warn(`Failed to preload sound ${key}:`, e);
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        const cached = soundCache[type];
        if (cached) {
            // Clone the audio node so the same sound can overlap when triggered rapidly
            const playNode = cached.cloneNode();
            playNode.volume = soundVolumes[type] || 0.05;
            playNode.play().catch(e => console.warn(`Sound ${type} playback blocked/failed:`, e));
        }
    } catch (e) {
        console.error("Error in playSound:", e);
    }
}

// Background Music Management
let currentMusic = null;
let currentMusicPath = '';

function stopMusic() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic = null;
        currentMusicPath = '';
    }
}

function playMusic(path) {
    if (!soundEnabled) return;
    if (currentMusicPath === path) return; // Keep playing if it's the same track

    stopMusic();

    if (!path) return;

    try {
        currentMusic = new Audio(path);
        currentMusic.loop = true;
        currentMusic.volume = 0.08; // moderate background volume
        currentMusic.play().catch(e => console.warn(`Music playback blocked/failed for ${path}:`, e));
        currentMusicPath = path;
    } catch (e) {
        console.error("Error in playMusic:", e);
    }
}

function updateMusicForStage(stage) {
    // Normalize stage if there are more than 40 stages (loops back)
    const normalizedStage = ((stage - 1) % 40) + 1;

    let musicPath = '';

    if (normalizedStage >= 1 && normalizedStage <= 4) {
        // Cinturão de Asteroides (fases normais)
        musicPath = 'assets/music/Hard_Burn_Trajectory.mp3';
    } else if (normalizedStage === 5) {
        // Red Nebula Boss 1 (Titanus Omega)
        musicPath = 'assets/music/Kinetic_Drift.mp3';
    } else if (normalizedStage >= 6 && normalizedStage <= 7) {
        // Nebulosa Vermelha (fases normais)
        musicPath = 'assets/music/Crushing_Orbit.mp3';
    } else if (normalizedStage === 8) {
        // Nebulosa Vermelha Boss 2 (Escorpião Estelar)
        musicPath = 'assets/music/Dancing_All_Night.mp3';
    } else if (normalizedStage >= 9 && normalizedStage <= 11) {
        // Vórtice Solar (fases normais)
        musicPath = 'assets/music/Electric_Street_Symphony.mp3';
    } else if (normalizedStage === 12) {
        // Vórtice Solar Boss (Leviathan Nebular)
        musicPath = 'assets/music/Eletro_Night.mp3';
    } else if (normalizedStage >= 13 && normalizedStage <= 15) {
        // Setor Proibido (fases normais)
        musicPath = 'assets/music/Godspell.MP3';
    } else if (normalizedStage === 16) {
        // Setor Proibido Boss (Devorador de Mundos)
        musicPath = 'assets/music/Gravity_s_Maw.mp3';
    } else if (normalizedStage >= 17 && normalizedStage <= 19) {
        // Trono do Universo (fases normais)
        musicPath = 'assets/music/Head_Splitter.MP3';
    } else if (normalizedStage === 20) {
        // Trono do Universo Boss (Imperador Cósmico)
        musicPath = 'assets/music/Heaven.MP3';
    } else if (normalizedStage >= 21 && normalizedStage <= 23) {
        // Fronteira Sombria (fases normais)
        musicPath = 'assets/music/Joy.MP3';
    } else if (normalizedStage === 24) {
        // Fronteira Sombria Boss (Sentinela do Abismo)
        musicPath = 'assets/music/Make_It_Bun_Dem.MP3';
    } else if (normalizedStage >= 25 && normalizedStage <= 27) {
        // Cemitério de Naves (fases normais)
        musicPath = 'assets/music/Run_Freedom.mp3';
    } else if (normalizedStage === 28) {
        // Cemitério de Naves Boss (Espectro da Morte)
        musicPath = 'assets/music/Skank_N_Flex.MP3';
    } else if (normalizedStage >= 29 && normalizedStage <= 31) {
        // Abismo Cósmico (fases normais)
        musicPath = 'assets/music/Tarantula.MP3';
    } else if (normalizedStage === 32) {
        // Abismo Cósmico Boss (Colosso de Gelo)
        musicPath = 'assets/music/Vinyl_Crackle_Slide.mp3';
    } else if (normalizedStage >= 33 && normalizedStage <= 35) {
        // Dimensão Fraturada (fases normais)
        musicPath = 'assets/music/Voodoo_People.MP3';
    } else if (normalizedStage === 36) {
        // Dimensão Fraturada Boss (Anomalia Dimensional)
        musicPath = 'assets/music/Windows.MP3';
    } else if (normalizedStage >= 37 && normalizedStage <= 39) {
        // O Verdadeiro Vazio (fases normais)
        musicPath = 'assets/music/Catedral.mp3';
    } else if (normalizedStage === 40) {
        // O Verdadeiro Vazio Boss final (Deus da Nebulosa)
        musicPath = 'assets/music/Ultima_Fractura.mp3';
    }

    if (musicPath) {
        playMusic(musicPath);
    } else {
        stopMusic();
    }
}

// Resume audio context on first interaction (keeps standard AudioContext alive if needed)
window.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});
window.addEventListener('keydown', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});
