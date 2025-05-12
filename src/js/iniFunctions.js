import { settings } from "./main.js";
import { juega_CPU } from "./cpuFunctions.js";
import { borrar_canvas, play_sonidos } from "./functions.js";

// FUNCIONES ==============================================================
function crea_arrayTablero() {

    settings.arrayTablero = new Array(settings.constantes.FILAS);

    for (let i = 0; i < settings.arrayTablero.length; i ++)
    {
        // fill(0) = casilla vacia | 1 = Jugador | 2 = CPU
        settings.arrayTablero[i] = new Array(settings.constantes.COLUMNAS).fill(0);
    }

    console.log(settings.arrayTablero);
}

function crea_tablero_canvas()
{
    const tablero = settings.doms.tablero;
    const ctx = tablero.getContext('2d');

    const {TILE_X, TILE_Y, FILAS, COLUMNAS} = settings.constantes;

    tablero.width = TILE_X * COLUMNAS;
    tablero.height = TILE_Y * FILAS;

    borrar_canvas(ctx, settings.colores.FONDO, tablero.width, tablero.height);

    ctx.fillStyle = "#0055aa";
    ctx.fillRect(0, 0,  tablero.width, tablero.height);

    ctx.globalCompositeOperation = "destination-out";
    for (let col = 0; col < COLUMNAS; col++)
    {
        for (let row = 0; row < FILAS; row++)
        {
            let x = 0 + col * TILE_X + TILE_X / 2;
            let y = 0 + row * TILE_Y + TILE_Y / 2;

            ctx.beginPath();
            ctx.arc(x, y, TILE_X / 2 - 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.globalCompositeOperation = "source-over";
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
    crea_tablero_canvas,
    comenzar_partida,
    poner_textos
};
