import { settings } from "./main.js";
import { Ficha } from './ficha.js';
import { poner_textos } from "./iniFunctions.js";
import { ParticulaConfeti } from "./confeti.js";

function creaFicha_yAnimaLanzamiento(id, filaLibre, columna)
{
    console.log('tirada: ' + id);

    const {TILE_X, TILE_Y} = settings.constantes;
    const radio = Math.floor(settings.constantes.TILE_X / 2);

    let coorX = (columna * TILE_X) + radio;
    let coorY = (filaLibre * TILE_Y) + radio;

    settings.ficha = new Ficha(id, coorX, 0, coorY, columna, filaLibre);

    setTimeout(() =>
    {
        play_sonidos('ficha2', false);
    }, 1000);
}

function check_colision(columna)
{
    const filas = settings.constantes.FILAS - 1;

    for (let i = filas; i >= 0; i --)
    {
        if (settings.arrayTablero[i][columna] === 0) return i;
    }

    return 9; // No deberia ser posible (error)
}

function check_4raya(id)
{
    for (let i = 0; i < settings.constantes.FILAS; i ++)
    {
        for (let ii = 0; ii < settings.constantes.COLUMNAS; ii ++)
        {
            if (check_horizontales(id, i, ii, 0)) return true;
            if (check_verticales(id, i, ii, 0)) return true;
            if (check_diagonalesDerecha(id, i, ii, 0)) return true;
            if (check_diagonalesIzquierda(id, i, ii, 0)) return true;
        }
    }

    return false;
}

function check_horizontales(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii + offset < settings.constantes.COLUMNAS)
        {

            if (settings.arrayTablero[i][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_verticales(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_diagonalesDerecha(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii + offset < settings.constantes.COLUMNAS && i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_diagonalesIzquierda(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii - offset >= 0 && i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii - offset] === id) contador ++;
        }
    }
    
    if (contador === 4) return true;
    
    return false;
}

function actualizar_fichas_en_tablero()
{
    for (let row = 0; row < settings.constantes.FILAS; row ++)
    {
        for (let col = 0; col < settings.constantes.COLUMNAS; col ++)
        {
            const casilla = settings.arrayTablero[row][col];
            
            if (casilla !== 0)
            {
                settings.ficha.dibujaFichaArray(casilla, col, row);
            }
        }
    }
}

function checkWinner(winner, txtWin, color, sonido)
{
    if (winner)
    {
        settings.estado.enJuego = false;
        settings.estado.gameOver = true;

        setTimeout(() =>
        {
            poner_textos(txtWin, color);
            settings.sonidos.musicafondo.pause();
            play_sonidos(sonido, false);
        }, settings.constantes.DELAY_WINNER_MODAL);

        setTimeout(() =>
        {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            const boton = Array.from(settings.doms.botonesInicio);
            boton[0].style.display = 'inline-block';
            play_sonidos('gameover', false);
            
        }, settings.constantes.DELAY_GAMEOVER);
    }
}

function instanciar_confeti(particulasConfeti)
{
    const tablero = settings.doms.tablero;

    const {TILE_X, COLUMNAS} = settings.constantes;
    tablero.width = TILE_X * COLUMNAS;

    const posY_spawn_confeti = 200;

    for (let i = 0; i < settings.constantes.NUMERO_PARTICULAS_CONFETI; i ++)
    {
        particulasConfeti.push(
            new ParticulaConfeti(Math.floor(Math.random() * tablero.width), 
            Math.floor(Math.random() * posY_spawn_confeti) * -1)
        );
    }
}

function dibuja_tablero()
{
    const tablero = settings.doms.tablero;
    const ctx = tablero.getContext('2d');

    const {TILE_X, TILE_Y, FILAS, COLUMNAS} = settings.constantes;

    tablero.width = TILE_X * COLUMNAS;
    tablero.height = TILE_Y * FILAS;

    ctx.fillStyle = settings.colores.TABLERO;
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

function borrar_canvas(ctx, color, width, height)
{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
}

function play_sonidos(id, loop) {

    settings.sonidos[id].play();
    settings.sonidos[id].volume = settings.volumen[id];
    settings.sonidos[id].loop = loop;
}

export {
    creaFicha_yAnimaLanzamiento,
    check_colision,
    check_4raya,
    actualizar_fichas_en_tablero,
    checkWinner,
    instanciar_confeti,
    dibuja_tablero,
    borrar_canvas,
    play_sonidos
};
