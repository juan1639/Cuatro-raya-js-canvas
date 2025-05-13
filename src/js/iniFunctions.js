import { settings } from "./main.js";
import { juega_CPU } from "./cpuFunctions.js";
import { play_sonidos } from "./functions.js";

function crea_arrayTablero() {

    settings.arrayTablero = new Array(settings.constantes.FILAS);

    for (let i = 0; i < settings.arrayTablero.length; i ++)
    {
        // fill(0) = casilla vacia | 1 = Jugador | 2 = CPU
        settings.arrayTablero[i] = new Array(settings.constantes.COLUMNAS).fill(0);
    }

    console.log(settings.arrayTablero);
}

function comenzar_partida()
{
    Object.keys(settings.estado).forEach(estado_bool =>
    {
        settings.estado[estado_bool] = false;
    });

    if (!settings.primera_partida)
    {
        settings.arrayTablero.forEach(fila =>
        {
            fila.fill(0);
        });
    }

    console.log(settings.arrayTablero);

    settings.contadorJugadas = 0;
    settings.estado.enJuego = true;
    console.log(Object.values(settings.estado));
    settings.primera_partida = false;
    
    const boton = Array.from(settings.doms.botonesInicio);
    boton[0].style.display = 'none';
    
    sorteo_quienComienza(99);

    settings.doms.textosP.style.animation = 'animaTxt 12s linear infinite';
    //settings.doms.info.style.animation = 'gradientInfo 2s linear infinite';

    play_sonidos('musicafondo', true);
}

function sorteo_quienComienza(rango)
{
    const sorteo = Math.floor(Math.random() * rango);

    if (sorteo < rango / 2)
    {
        settings.turno = true;
        poner_textos('Tu turno, haz click debajo...', 'var(--colorTxtJugador)');
    }
    else
    {
        settings.turno = false;
        poner_textos('Turno CPU, pensando...', 'var(--colorTxtCPU)');
        juega_CPU();
    }
}

function poner_textos(txt, color)
{
    settings.doms.textosP.style.color = color;
    settings.doms.textosP.innerText = txt;
}

export {
    crea_arrayTablero,
    comenzar_partida,
    poner_textos
};
