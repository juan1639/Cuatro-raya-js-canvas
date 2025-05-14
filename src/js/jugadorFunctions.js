import { settings } from "./main.js";

import
{
    creaFicha_yAnimaLanzamiento,
    check_colision,
    check_4raya
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
    creaFicha_yAnimaLanzamiento(1, filaLibre, columna);
}

export { inicia_tirarFicha };
