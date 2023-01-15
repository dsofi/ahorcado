const contPalabra = document.getElementById("contPalabra");
const startButton = document.getElementById("startButton");
const letrasUsadasElement = document.getElementById("letrasUsadas");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
]

let palabraElegida;
let letrasUsadas;
let errores;
let aciertos;


const agregarCuerpo = partesCuerpo => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(...partesCuerpo);
}

const letraIncorrecta = letra => {
    agregarCuerpo(partesCuerpo[errores]);        
    const letraElement = document.createElement("span");
    letraElement.innerHTML = letra;
    letrasUsadasElement.appendChild(letraElement); 
    errores++;
    if(errores === partesCuerpo.length) fin();
}

const fin = () => {
    document.removeEventListener("keydown", eventoLetra);
    startButton.style.display = "block";
}

const letraCorrecta = letra => {
    const { children } = contPalabra;
    for(let i=0; i<children.length; i++){
        if(children[i].innerHTML === letra){
            children[i].classList.toggle("hidden");
            aciertos++;
        }
    }
    if(aciertos === palabraElegida.length) fin();
    
}

const letraIngresada = letra => {
    if(palabraElegida.includes(letra)){
        letraCorrecta(letra);
    } else{
        letraIncorrecta(letra);        
    }
    letrasUsadas.push(letra);
}

const eventoLetra = event => {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)){
        letraIngresada(nuevaLetra);
    }
}

const dibujarPalabra = () => {
    palabraElegida.forEach(letra => {
        const letraElement = document.createElement("span");
        letraElement.innerHTML = letra;
        letraElement.classList.add("letra");
        letraElement.classList.add("hidden");
        contPalabra.appendChild(letraElement);
    })
}

const selectPalabraAleatoria = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    palabraElegida = palabra.split('');
}

const dibujarEstructura = () =>{
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20,20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#b10f2e";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
}

const startGame = () =>{
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contPalabra.innerHTML = "";
    letrasUsadasElement.innerHTML = "";
    startButton.style.display = "none";
    dibujarEstructura();
    selectPalabraAleatoria();
    dibujarPalabra();
    document.addEventListener("keydown", eventoLetra);
}

startButton.addEventListener("click", startGame);
