
// 1. SALUDO DEPENDIENDO DE LA HORA

let fechaActual = new Date();
let horaActual = fechaActual.getHours();
let textoSaludo = document.getElementById("mensaje-saludo");

if (horaActual < 12) {
    textoSaludo.innerHTML = "¡Buenos días! 🌅";
} else if (horaActual < 19) {
    textoSaludo.innerHTML = "¡Buenas tardes! ☀️";
} else {
    textoSaludo.innerHTML = "¡Buenas noches! 🌙";
}


// 2. CRONÓMETRO DE VISITA

let segundos = 0;
// Esto se repite cada 1000 milisegundos (1 segundo)
setInterval(function() {
    segundos = segundos + 1;
    document.getElementById("tiempo-pagina").innerHTML = segundos;
}, 1000);

// ==========================================
// 3. MODO OSCURO (CAMBIO DE CLASE)
// ==========================================
let botonOscuro = document.getElementById("boton-oscuro");

botonOscuro.onclick = function() {
    // Si el body tiene la clase modo-claro, la cambiamos a oscuro
    if (document.body.className === "modo-claro") {
        document.body.className = "modo-oscuro";
        botonOscuro.innerHTML = "☀️";
    } else {
        document.body.className = "modo-claro";
        botonOscuro.innerHTML = "🌙";
    }
};

// ==========================================
// 4. MÚSICA DE FONDO 
// ==========================================
let botonMusica = document.getElementById("boton-musica");
let audioFondo = document.getElementById("musica-fondo");
let estaSonando = false;


botonMusica.onclick = function() {
    if (estaSonando === false) {
        audioFondo.play(); 
        botonMusica.innerHTML = "🔊"; 
        estaSonando = true;
    } else {
        audioFondo.pause(); // Pausar la canción
        botonMusica.innerHTML = "🔇"; 
        estaSonando = false;
    }
};

// 5. VALIDACIÓN DEL FORMULARIO CON ALERTS

let formulario = document.getElementById("formulario-contacto");

formulario.onsubmit = function(evento) {
    // Esto evita que la página recargue cuando apreto enviar
    evento.preventDefault(); 
    
    let nombre = document.getElementById("campo-nombre").value;
    let correo = document.getElementById("campo-correo").value;
    let mensaje = document.getElementById("campo-mensaje").value;

    if (nombre === "") {
        alert("Oye, se te olvidó poner tu nombre Saiyayin.");
    } else if (correo === "") {
        alert("Falta el correo para poder responderte.");
    } else if (mensaje === "") {
        alert("El mensaje está vacío.");
    } else {
        alert("¡Gracias " + nombre + "! Mensaje enviado correctamente con pura esencia.");
        formulario.reset(); // Limpia los campos
    }
};

// ==========================================
// 6. MINIJUEGO: TRES EN LÍNEA BÁSICO 
// ==========================================
let casillas = document.getElementsByClassName("casilla");
let juegoTerminado = false;
let puntosJugador = 0;
let puntosCpu = 0;

for (let i = 0; i < casillas.length; i++) {
    casillas[i].onclick = function() {
        // Solo marcar si esta vacia y el juego no ha terminado
        if (casillas[i].innerHTML === "" && juegoTerminado === false) {
            casillas[i].innerHTML = "X";
            casillas[i].classList.add("x"); // Estilo Oro Esencia en CSS
            
            verificarGanador();
            
            // Si el jugador no ganó con esa jugada, le toca a la CPU
            if (juegoTerminado === false) {
                turnoComputadora();
            }
        }
    };
}

function turnoComputadora() {
    // Guardo en un arreglo las casillas que están vacías
    let vacias = [];
    for (let i = 0; i < casillas.length; i++) {
        if (casillas[i].innerHTML === "") {
            vacias.push(i);
        }
    }
    
    // Si hay casillas vacias, elijo una al azar
    if (vacias.length > 0) {
        let numeroAzar = Math.floor(Math.random() * vacias.length);
        let casillaElegida = vacias[numeroAzar];
        
        casillas[casillaElegida].innerHTML = "O";
        casillas[casillaElegida].classList.add("o"); // Estilo Naranja Esencia en CSS
        verificarGanador();
    }
}

function verificarGanador() {
    // Todas las combinaciones para ganar (filas, columnas, diagonales)
    let combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let i = 0; i < combinaciones.length; i++) {
        let a = combinaciones[i][0];
        let b = combinaciones[i][1];
        let c = combinaciones[i][2];

        // Reviso si la posicion a no esta vacia, y si a, b y c son iguales
        if (casillas[a].innerHTML !== "" && 
            casillas[a].innerHTML === casillas[b].innerHTML && 
            casillas[a].innerHTML === casillas[c].innerHTML) {
            
            juegoTerminado = true;
            let ganador = casillas[a].innerHTML;
            
            // Usamos un pequeño retraso para que alcance a dibujarse la letra antes de la alerta
            setTimeout(function() {
                if (ganador === "X") {
                    alert("¡Ganaste la batalla con pura esencia!");
                    puntosJugador = puntosJugador + 1;
                    document.getElementById("puntos-jugador").innerHTML = puntosJugador;
                } else {
                    alert("La computadora te ganó :(");
                    puntosCpu = puntosCpu + 1;
                    document.getElementById("puntos-cpu").innerHTML = puntosCpu;
                }
            }, 100);
            return;
        }
    }
}

// Boton para limpiar el tablero
document.getElementById("boton-reiniciar").onclick = function() {
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].innerHTML = "";
        casillas[i].classList.remove("x", "o"); // Limpiar estilos
    }
    juegoTerminado = false;
};
