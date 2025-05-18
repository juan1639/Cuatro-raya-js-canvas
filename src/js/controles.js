import { settings } from "./main.js";
import { inicia_tirarFicha } from "./jugadorFunctions.js";

// ======================================================================
//  EVENTOS Click
// 
// ----------------------------------------------------------------------
export const click = document.addEventListener('click', (event) =>
{
    console.log(event.target.id);
    console.log(event);
    const clickar = event.target.id;
    const evento = event;

    if (settings.estado.enJuego)
    {
        if (clickar === 'canvas')
        {
            console.log("*** realizando jugada ***");
            realizarJugada(evento);
        }
    }
});

function realizarJugada(evento)
{
    const rect = settings.doms.tablero.getBoundingClientRect();
    const x = evento.clientX - rect.left;

    // Calcular en qué columna está el click
    const columna = Math.floor(x / settings.constantes.TILE_X);
    console.log("Columna clickeada:", columna);
    
    inicia_tirarFicha(columna);
}

// ======================================================================
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
const touchStart = document.addEventListener('touchstart', (event) =>
{
    console.log(event.target.id, event.targetTouches);
    const touch = event.target.id;
    const evento = event;

    if (settings.estado.enJuego)
    {
        if (touch === 'canvas')
        {
            console.log("*** realizando jugada ***");
            realizarJugada(evento);
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchend
// 
// ----------------------------------------------------------------------
/* const touchEnd = document.addEventListener('touchend', (event) => {

    console.log(event.target.id, event.targetTouches);
    const keysTeclas = Object.keys(settings.tecla);
    const touchEnd = event.target.id;
    
    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (touchEnd === settings.tecla[idTecla][0] || touchEnd === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = false;
            }
        }
    }
}); */
