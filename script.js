const phrases = [
    "El amor no se mide por el tiempo, sino por los momentos que compartimos.",
    "Cada día contigo es un regalo que atesoro profundamente.",
    "Nuestro amor crece más fuerte con cada latido de nuestros corazones.",
    "El tiempo juntos es el mayor tesoro que podríamos tener.",
    "Eres mi razón para sonreír cada mañana.",
    "El amor verdadero no tiene fecha de vencimiento.",
    "Juntos hemos construido algo único e inolvidable.",
    "El amor es un viaje, y estoy feliz de recorrerlo contigo.",
    "Cada segundo contigo vale más que mil días sin ti.",
    "Nuestro amor es como una estrella: brilla incluso en la oscuridad.",
    "Eres mi mejor decisión y mi mayor bendición.",
    "El amor no se trata de cuánto tiempo has estado juntos, sino de lo que has hecho con ese tiempo.",
    "Gracias por ser mi compañero de vida y mi mayor apoyo.",
    "El amor es eterno cuando se vive con el corazón.",
    "Contigo, cada día es un nuevo capítulo de nuestra historia.",
    "Nuestro amor es un recordatorio de que los milagros existen.",
    "Eres mi refugio en los días difíciles y mi alegría en los buenos.",
    "El amor no se trata de encontrar a alguien perfecto, sino de amar imperfectamente a alguien especial.",
    "Juntos somos invencibles, separados solo somos mitades.",
    "El amor es la única fuerza capaz de cambiar el mundo, y tú has cambiado el mío."
];

const elapsedTimeMetElement = document.getElementById('elapsed-time-met');
const elapsedTimeCoupleElement = document.getElementById('elapsed-time-couple');
const countdownElement = document.getElementById('countdown');
const phraseElement = document.getElementById('phrase');

const startDateMet = new Date('2022-04-16'); // Fecha en que se conocieron
const startDateCouple = new Date('2022-07-05'); // Fecha en que se hicieron pareja
const anniversaryDate = new Date('2022-07-05'); // Fecha del aniversario

// Función para formatear el tiempo en el formato solicitado
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    const formattedYears = years > 0 ? `${years} A ` : '';
    const formattedDays = days % 365 > 0 ? `${days % 365} D ` : '';
    const formattedHours = `${hours % 24} H `;
    const formattedMinutes = `${minutes % 60} M `;
    const formattedSeconds = `${seconds % 60} S`;

    return `${formattedYears}${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
}

// Función para actualizar los contadores
function updateCounters() {
    const now = new Date();

    // Tiempo transcurrido desde que se conocieron
    const elapsedMet = now - startDateMet;
    elapsedTimeMetElement.textContent = formatTime(elapsedMet);

    // Tiempo transcurrido desde que son pareja
    const elapsedCouple = now - startDateCouple;
    elapsedTimeCoupleElement.textContent = formatTime(elapsedCouple);

    // Tiempo restante para el próximo aniversario
    let nextAnniversary = new Date(now.getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate());
    if (now > nextAnniversary) {
        nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
    }
    const countdown = nextAnniversary - now;
    countdownElement.textContent = formatTime(countdown);
}

// Función para cambiar las frases románticas
function updatePhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    phraseElement.textContent = phrases[randomIndex];
}

// Actualizar los contadores cada segundo
setInterval(updateCounters, 1000);

// Cambiar las frases cada 10 segundos
setInterval(updatePhrase, 10000);

// Inicializar los contadores y frases al cargar la página
updateCounters();
updatePhrase();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registrado con éxito:', registration.scope);
      }).catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
    });
  }