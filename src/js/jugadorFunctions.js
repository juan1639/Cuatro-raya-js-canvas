import { settings } from "./main.js";
import { poner_textos } from './iniFunctions.js';

import
{
    creaFicha_yAnimaLanzamiento,
    check_colision,
    check_4raya,
    play_sonidos
} from './functions.js';

function inicia_tirarFicha(columna)
{
    if (!settings.turno || !settings.estado.enJuego) return;

    if (settings.arrayTablero[0][columna] !== 0)
    {
        console.log('columna ocupada');
        return;
    }

    // ---------------------------------------------------------------
    const filaLibre = check_colision(columna);

    settings.resultado.ganaJugador = check_4raya(1);

    if (settings.resultado.ganaJugador)
    {
        settings.estado.enJuego = false;
        settings.estado.gameOver = true;
        console.log('ganaJugador:', settings.resultado.ganaJugador);

        setTimeout(() =>
        {
            crear_letras_winnerModal('GANASTE!');
            settings.doms.winnerModal.style.visibility = 'visible';
            poner_textos('Has ganado!', 'var(--blanco)');
            settings.sonidos.musicafondo.pause();
            play_sonidos('winner', false);
        }, settings.constantes.tiempoApareceWinnerModal);

        setTimeout(() =>
        {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            const boton = Array.from(settings.doms.botonesInicio);
            boton[0].style.display = 'inline-block';
            play_sonidos('gameover', false);
            
        }, 5900);// ...5,9s suena 'gameover'
    }
    
    creaFicha_yAnimaLanzamiento(1, filaLibre, columna);
}

export { inicia_tirarFicha };
