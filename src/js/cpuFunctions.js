import { settings } from "./main.js";

import
{
    check_colision,
    check_4raya,
    creaFicha_yAnimaLanzamiento
} from "./functions.js";

function juega_CPU()
{
    if (settings.turno || !settings.estado.enJuego) return;

    let columna;

    // ----------------------------------------------------------------
    // 1ro CPU intenta 4raya... Si NO es posible...
    // 2do CPU se defiende (de posible 4raya del jugador chekeando)...
    // 3ro como ultimo recurso, juega Random
    // ----------------------------------------------------------------
    columna = hacer4raya_siEsPosible();

    if (!settings.resultado.ganaCPU)
    {
        columna = defender();

        if (columna < 0 || columna > 6) columna = jugar_aleatorio_comoUltimoRecurso();
    }

    // Centrar Tirada en la 1ra jugada IA
    if (settings.contadorJugadas === 0)
    {
        columna = centrar_primeraJugadaCPU();
    }

    settings.contadorJugadas ++;
    console.log("contador:" + settings.contadorJugadas);

    const filaLibre = check_colision(columna);
    creaFicha_yAnimaLanzamiento(2, filaLibre, columna);
}

function hacer4raya_siEsPosible()
{
    for (let i = 0; i < settings.constantes.COLUMNAS; i ++)
    {
        if (settings.arrayTablero[0][i] === 0)
        {
            let filaLibre = check_colision(i);
            settings.arrayTablero[filaLibre][i] = 2; // Momentaneamente colocamos ficha (para checkear despues)
            settings.resultado.ganaCPU = check_4raya(2);
            settings.arrayTablero[filaLibre][i] = 0;

            if (settings.resultado.ganaCPU) return i;
        }
    }

    return -99; // No es posible 4Raya y devuleve columna -99
}

function defender()
{
    for (let i = 0; i < settings.constantes.COLUMNAS; i ++)
    {
        if (settings.arrayTablero[0][i] === 0)
        {
            let filaLibre = check_colision(i);
            settings.arrayTablero[filaLibre][i] = 1; // Momentaneamente colocamos ficha '1' (para checkear despues)
            let check_posibilidadJugador = check_4raya(1);
            settings.arrayTablero[filaLibre][i] = 0;

            if (check_posibilidadJugador) return i;
        }
    }

    return -99; // No es posible 4Raya y devuleve columna -99
}

function jugar_aleatorio_comoUltimoRecurso()
{
    let jugada_rnd;

    do {
        jugada_rnd = Math.floor(Math.random()* 7);
        console.log(jugada_rnd);

    } while (settings.arrayTablero[0][jugada_rnd] !== 0);

    return jugada_rnd;
}

function centrar_primeraJugadaCPU()
{
    if (settings.arrayTablero[5][3] === 0)
    {
        return 3;
    }
    else if (settings.arrayTablero[5][4] === 0)
    {
        return 4;
    }
    else if (settings.arrayTablero[5][2] === 0)
    {
        return 2;
    }

    return jugar_aleatorio_comoUltimoRecurso();
}

export { juega_CPU };
