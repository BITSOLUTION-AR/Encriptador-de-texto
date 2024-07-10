const texto_encriptado = document.querySelector(".texto-encriptado");
const texto_mensaje = document.querySelector(".texto-mensaje");
const boton_copiar = document.querySelector(".botonCopiar");
const advertencia = document.getElementById("advertencia");
const boton_encriptar = document.querySelector(".botonEncriptar");
const boton_desencriptar = document.querySelector(".botonDesencriptar");

// para cerrar el mensaje
document.addEventListener("click", function (event) {
    // Verificar: 1)Si esta abierto/block // 2)Si el click fue dentro del cuadro //
    if (advertencia.style.display === "block" && !advertencia.contains(event.target) &&
        // 3) 4) Si el click fue en el boton de encriptar o el de desencriptar
        !boton_encriptar.contains(event.target) && !boton_desencriptar.contains(event.target)) {
        cerrarAdvertencia();
    }
});

const codigo_enigma = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

function botonEncriptar() {
    encriptar(texto_encriptado.value);
}

function botonDesencriptar() {
    desencriptar(texto_encriptado.value);
}

function encriptar(frase) {
    if (estaVacio()) {
        advertencia.style.display = "block";
    } else {
        controlarAncho();
        for (let i = 0; i < codigo_enigma.length; i++) {
            if (frase.includes(codigo_enigma[i][0])) {
                frase = frase.replaceAll(codigo_enigma[i][0], codigo_enigma[i][1]);
            }
        }
        limpiar();
        texto_mensaje.value = frase;
    }
}

function desencriptar(frase) {
    if (estaVacio()) {
        advertencia.style.display = "block";
    } else {
        controlarAncho();
        for (let i = 0; i < codigo_enigma.length; i++) {
            if (frase.includes(codigo_enigma[i][1])) {
                frase = frase.replaceAll(codigo_enigma[i][1], codigo_enigma[i][0]);
            }
        }
        limpiar();
        texto_mensaje.value = frase;
    }
}

function copiar() {
    // navigator.clipboard.writeText(texto_mensaje.value);
    texto_encriptado.value  = texto_mensaje.value;
    texto_mensaje.value = "";
    boton_copiar.style.display = "none";
    let windowWidth = window.innerWidth;
    if (windowWidth > 800) {
        texto_mensaje.style.backgroundImage = "url('img/inspector-gadget.png')";
    }else{
        let seccion_desencriptado = document.querySelector(".seccion-desencriptado");
        seccion_desencriptado.style.height = "10vh";
    }
}

function controlarAncho() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 800) {
        let seccion_desencriptado = document.querySelector(".seccion-desencriptado");
        seccion_desencriptado.style.height = "35vh";
    }
}

function estaVacio() {
    return texto_encriptado.value === "";
}

function cerrarAdvertencia() {
    var advertencia = document.getElementById("advertencia");
    advertencia.style.display = "none";
}

function limpiar() {
    texto_encriptado.value = "";
    texto_mensaje.style.backgroundImage = "none";
    boton_copiar.style.display = "inline-block";
}
