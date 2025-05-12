// ================================================================
//         C O N E C T A - 4  (canvas) |  By Juan Eguia, 2024
// 
// ----------------------------------------------------------------
import { Settings } from './settings.js';
import {touchStart, click} from './controles.js';
import {crea_tablero_canvas, crea_arrayTablero} from './iniFunctions.js';

let settings;

window.onload = () =>
{
    settings = new Settings();

    crea_arrayTablero();// Tablero (parte logica)
    crea_tablero_canvas();// Tablero (parte grafica)
};

export { settings };
