// ================================================================
//         C O N E C T A - 4  (canvas) |  By Juan Eguia, 2024
// 
// ----------------------------------------------------------------
import { Settings } from './settings.js';
import { click } from './controles.js';
import mediaQuery from './mediaQueryEvents.js';
import { comenzar_partida, crea_arrayTablero } from './iniFunctions.js';
import { toggle_music } from './functions.js';

import
{
    actualizar_fichas_en_tablero,
    dibuja_tablero,
    borrar_canvas,
    instanciar_confeti
} from './functions.js';

let settings;
const particulasConfeti = [];

window.onload = () =>
{
    settings = new Settings();

    settings.doms.botonesInicio[0].addEventListener('click', comenzar_partida);
    settings.doms.botonesFunc[0].addEventListener('click', toggle_music);

    crea_arrayTablero();// Tablero (parte logica)
    dibuja_tablero();// Tablero (parte grafica)
    instanciar_confeti(particulasConfeti);

    bucle_principal();
};

function bucle_principal()
{
    requestAnimationFrame(bucle_principal);
    //console.log("running");

    const tablero = settings.doms.tablero;
    const ctx = tablero.getContext('2d');

    borrar_canvas(ctx, settings.colores.FONDO, tablero.width, tablero.height);

    dibuja_tablero();

    if (settings.ficha)
    {
        settings.ficha.actualizaFichaCayendo();
    }

    actualizar_fichas_en_tablero();

    if (!settings.estado.enJuego && settings.resultado.ganaJugador)
    {
        particulasConfeti.forEach(particula => particula.dibuja());
    }
    
    //console.log("Resultado:", settings.resultado.ganaJugador);
}

export { settings };
