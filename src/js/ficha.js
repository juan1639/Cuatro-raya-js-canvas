import { settings } from "./main.js";
import { juega_CPU } from "./cpuFunctions.js";

export class Ficha
{
    constructor(id, x, y, finRecorrido, columna, filaLibre)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.finRecorrido = finRecorrido;
        this.columna = columna;
        this.filaLibre = filaLibre;

        this.vel = 10;
        this.radio = Math.floor(settings.constantes.TILE_X / 2);
        this.radioVisual = Math.floor(settings.constantes.TILE_X / 2.15);

        this.tablero = settings.doms.tablero;
        this.ctx = this.tablero.getContext('2d');

        this.banderaCambioTurno = false;
    }

    actualizaFichaCayendo()
    {
        if (this.y >= this.finRecorrido)
        {
            this.cambioTurno();
            return;
        }

        this.y += this.vel;
        this.dibujaFichaCayendo();
    }

    dibujaFichaCayendo()
    {
        this.ctx.fillStyle = this.id === 1 ? settings.colores.FICHA_ROJA : settings.colores.FICHA_VERDE;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radioVisual, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    cambioTurno()
    {
        if (this.banderaCambioTurno)
        {
            return;
        }

        this.banderaCambioTurno = true;

        settings.arrayTablero[this.filaLibre][this.columna] = this.id;

        settings.turno = !settings.turno;

        if (!settings.turno)
        {
            //poner_textos('Turno CPU, pensando...', 'var(--colorTxtCPU)');

            setTimeout(() =>
            {
                console.log('tirada CPU');
                juega_CPU();
            }, settings.constantes.tiempoRespuestaCPU);
        }
        else
        {
            //poner_textos('Tu turno, haz click debajo...', 'var(--colorTxtJugador)');
        }
    }

    dibujaFichaArray(idFicha, x, y)
    {
        const {TILE_X, TILE_Y} = settings.constantes;

        this.ctx.fillStyle = idFicha === 1 ? settings.colores.FICHA_ROJA : settings.colores.FICHA_VERDE;

        this.ctx.beginPath();
        this.ctx.arc((x * TILE_X) + this.radio, (y * TILE_Y) + this.radio, this.radioVisual, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
